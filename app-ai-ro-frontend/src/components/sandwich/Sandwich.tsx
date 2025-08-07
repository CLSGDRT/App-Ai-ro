import React from "react";

const Sandwich: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-100 to-emerald-200 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-3xl p-10 border border-green-500">
        <h1 className="text-4xl font-extrabold text-green-700 mb-6 text-center">Ode au Sandwich</h1>
        <p className="text-gray-800 text-m leading-relaxed space-y-4">
          Le sandwich, bien plus qu’un simple encas, est une invention géniale qui transcende les cultures, les époques et les goûts. Il est l’alliance parfaite entre praticité et gourmandise, simplicité et créativité. Qu’il soit dégusté sur un coin de table, lors d’un pique-nique champêtre ou au comptoir d’un café new-yorkais, il s’impose avec fierté comme un pilier de la gastronomie populaire mondiale.

          Facile à préparer, le sandwich offre une infinité de combinaisons. Deux tranches de pain — ou même une seule baguette fendue — suffisent à enfermer un univers de saveurs. Fromages fondants, charcuteries fumées, légumes croquants, sauces onctueuses… le sandwich n’a pas de règles, si ce n’est celle du plaisir.

          Le sandwich est aussi un symbole de liberté. Contrairement aux plats figés dans des recettes ancestrales, il invite à l'improvisation. C’est une toile vierge sur laquelle chacun peut exprimer sa personnalité, ses envies, ses humeurs. En cela, il est profondément moderne, inclusif, universel.

          D’un point de vue historique, il a toujours su se rendre indispensable. Des soldats aux étudiants, des ouvriers aux cadres pressés, il accompagne les journées avec efficacité. Il est le compagnon de toutes les pauses, le sauveur des déjeuners oubliés, le héros des pique-niques improvisés. Il se mange debout, en marchant, en discutant — et c’est peut-être ce qui fait son génie : il libère les mains, l’esprit et l’imagination.

          Le sandwich est aussi un ambassadeur culturel. On le retrouve partout : le panini italien, le bánh mì vietnamien, le döner turc, le croque-monsieur français, le club américain… Chaque pays l’a adopté, transformé, enrichi à sa manière. Il est une métaphore comestible du mélange des influences, de la fusion des goûts, de la mondialisation dans ce qu’elle a de plus savoureux.

          Enfin, le sandwich est réconfortant. Il a ce pouvoir magique de satisfaire sans lourdeur, de rassasier sans prétention. Il évoque des souvenirs d’enfance, des repas partagés, des moments simples mais sincères. Il est, en somme, le plat du cœur.

          Alors oui, rendons hommage au sandwich. À sa croustillance, à sa tendresse, à sa générosité. Qu’il soit chaud ou froid, classique ou inventif, le sandwich mérite sa place au panthéon des nourritures emblématiques. Et surtout, n’oublions jamais : entre deux tranches de pain, il y a tout un monde à explorer.
        </p>
      </div>
    </div>
  );
};

export default Sandwich;
