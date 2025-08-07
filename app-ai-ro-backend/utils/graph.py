from langchain_ollama import ChatOllama
from pydantic import BaseModel
from langchain_core.prompts import PromptTemplate
from langgraph.graph import StateGraph, END
import json
from typing import List
from models.music_style import MusicStyle
from models.cocktail import Cocktail
from models.recipe import Recipe
from models.ingredient import Ingredient
from models.db import db
import uuid

llm = ChatOllama(model="llama3.1")

class ApairoState(BaseModel):
    message: str
    is_cocktail: bool = False
    cocktail_name: str = None
    description: str = None
    ingredients: List[str] = None
    music_style: str = None
    reply: str = None
    
class IsCocktail(BaseModel):
    is_cocktail: bool

detect_prompt = PromptTemplate.from_template(
    """Tu es un assistant qui détermine si l'input de l'utilisateur devrait être traité comme une demande de cocktail ou non.
    Tu dois répondre avec un booléem `is_cocktail`:
    - `True` si l'input est une demande transformable en cocktail
    - `False` sinon

    Input de l'utilisateur:
    {message}
    """
)

def detect_cocktail_intent(state: ApairoState) -> ApairoState:
    message = state.message
    structured_llm = llm.with_structured_output(IsCocktail)
    chain = detect_prompt | structured_llm
    result = chain.invoke({"message":message})
    return ApairoState(
        is_cocktail = result.is_cocktail,
        message = message,
    )

client_prompt = PromptTemplate.from_template(
    """
        Tu es un assistant qui crée des cocktails suivant l'input d'un client.
        Des exemples d'input ci-après :
        - J'ai envie de quelque chose de fruité mais avec du gin, et pas trop sucré
        - Un cocktail sans alcool pour une après-midi en terrasse
        - Une création originale à base de whisky et citron vert
        - Je suis de bonne humeur et il fait beau aujourd'hui, tu me conseilles de boire quoi ?
        Tu dois répondre suivant plusieurs champs obligatoires :
        - `cocktail_name` qui est le nom du cocktail (string)
        - `description` qui est la description ou l'histoire du cocktail (string de 20 mots maximum)
        - `ingredients` qui est une liste d'ingrédients en JSON, par exemple ["gin", "citron", "sucre"]
        - `music_style` qui est un style de musique qui correspond au cocktail à sélectionner parmi la liste ci-après {music_style_list}

        Input du client :
        {message}
    
    """
)

def create_cocktail(state: ApairoState) -> ApairoState:
    message = state.message
    music_style_list = [name for (name,) in db.session.query(MusicStyle.name).all()]
    structured_llm = llm.with_structured_output(ApairoState)
    chain = client_prompt | structured_llm
    music_style_str = ", ".join(music_style_list)
    result = chain.invoke({"message": message, "music_style_list": music_style_str})
    ingredients_list = parse_ingredient_list(result.ingredients)



    return ApairoState(
        message = state.message,
        cocktail_name = result.cocktail_name,
        description = result.description,
        ingredients = ingredients_list,
        music_style = result.music_style,
        is_cocktail = True
    )


def persist_cocktail(state: ApairoState) -> ApairoState:
    if not state.cocktail_name or not state.ingredients or not state.music_style:
        print("Champs obligatoires manquants, cocktail non enregistré.")
        return state
    existing = db.session.query(Cocktail).filter_by(name=state.cocktail_name).first()
    if existing:
        print("Cocktail déjà existant, on ne le recrée pas.")
        return state
    
    music_style = db.session.query(MusicStyle).filter_by(name=state.music_style).first()

    new_cocktail = Cocktail(
        id=str(uuid.uuid4()),
        name=state.cocktail_name,
        description=state.description,
        music_style_id=music_style.id if music_style else None
    )

    db.session.add(new_cocktail)
    db.session.flush()

    for ingredient_name in state.ingredients:
        name = ingredient_name.strip().lower()
        ingredient = db.session.query(Ingredient).filter_by(name=name).first()
        if not ingredient:
            ingredient = Ingredient(name=name)
            db.session.add(ingredient)
            db.session.flush()

        recipe = Recipe(
            cocktail_id=new_cocktail.id,
            ingredient_id=ingredient.id
        )
        db.session.add(recipe)

    db.session.commit()
    return state

class ReplyCocktail(BaseModel):
    reply: str

acknowledge_prompt = PromptTemplate.from_template(
    """
        Tu dois répondre `a l'utilisateur pour lui proposer le cocktail.
        Tu dois répondre d'une façon sympathique et adaptée au cocktail présenté.
        Tu dois inclure un jeu de mot dans ta réponse.

        Cocktail proposé :
            Nom : {cocktail_name}
            Description : {description}
            Ingrédients : {ingredients}
            Style de musique recommandé : {music_style}
        Message original du client :
            {message}
    """
)

def acknowledge_cocktail_creation(state: ApairoState) -> ApairoState:
    message = state.message
    cocktail_name = state.cocktail_name
    description = state.description
    music_style = state.music_style
    ingredients = state.ingredients

    structured_llm = llm.with_structured_output(ReplyCocktail)
    chain = acknowledge_prompt | structured_llm
    result = chain.invoke({
        "message":message,
        "cocktail_name":cocktail_name,
        "description":description,
        "music_style":music_style,
        "ingredients":ingredients
    })
    state.reply = result.reply
    return state



# def imagine_cocktail(state: ApairoState) -> ApairoState:
    
#     def generate_image_prompt(cocktail_name = state.cocktail_name, description = state.description):
#         return f"un cocktail du nom de : {cocktail_name}, ayant pour description : {description}"
    
#     imagine_prompt = generate_image_prompt()

#     width, height = 512, 512
#     negative_prompt = " " 

#     image = pipe(
#         prompt=imagine_prompt,
#         negative_prompt=negative_prompt,
#         width=width,
#         height=height,
#         num_inference_steps=50,
#         true_cfg_scale=4.0,
#         generator=torch.Generator(device="mps").manual_seed(42)
#     ).images[0]
    
#     image.save("cocktail.png")

response_prompt = PromptTemplate.from_template("""
Tu dois répondre à l'utilisateur en t'appuyant sur test connaissance générales. 
Question : {message}""")

def response_to_client(state):
    message = state.message
    structured_llm = llm.with_structured_output(ReplyCocktail)
    chain = response_prompt | structured_llm 
    result = chain.invoke({"message": message})
    return ApairoState(
        reply = result.reply,
        is_cocktail = state.is_cocktail,
        message = state.message,
    )

def parse_ingredient_list(ingredients_field) -> list[str]:
    """
    Parse correctement un champ 'ingredients' renvoyé par un LLM.
    - Si c'est une liste (déjà parsée), on la retourne.
    - Si c'est une string JSON : on utilise json.loads
    - Si c'est une string CSV : on split
    """
    
    if isinstance(ingredients_field, list):
        return [i.strip().lower() for i in ingredients_field if i.strip()]
    if not ingredients_field:
        return []
    
    try:
        parsed = json.loads(ingredients_field)
        if isinstance(parsed, list):
            return [i.strip().lower() for i in parsed if isinstance(i, str) and i.strip()]
    except Exception:
        pass  # Pas un JSON valide

    # Dernier recours : split CSV
    return [i.strip().lower() for i in ingredients_field.split(",") if i.strip()]


graph = StateGraph(ApairoState)

graph.add_node("detect_cocktail_intent",detect_cocktail_intent)
graph.add_node("create_cocktail", create_cocktail)
graph.add_node("persist_cocktail", persist_cocktail)
graph.add_node("acknowledge_cocktail_creation", acknowledge_cocktail_creation)
# graph.add_node("imagine_cocktail", imagine_cocktail)

graph.add_node("response_to_client", response_to_client)

graph.set_entry_point("detect_cocktail_intent")
graph.add_conditional_edges("detect_cocktail_intent", lambda state: "create_cocktail" if state.is_cocktail else "response_to_client")
graph.add_edge("create_cocktail", "persist_cocktail")
graph.add_edge("persist_cocktail", "acknowledge_cocktail_creation")
graph.add_edge("acknowledge_cocktail_creation", END)
# graph.add_edge("acknowledge_cocktail_creation", "imagine_cocktail")
# graph.add_edge("imagine_cocktail", END)
graph.add_edge("response_to_client", END)

assistant_graph = graph.compile()
# assistant_graph.get_graph().draw_mermaid_png(output_file_path="assistant_graph.png")
