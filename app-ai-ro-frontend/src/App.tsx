import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Home from './components/home/Home'
import Navbar from './components/navbar/Navbar'
import Mixer from './components/mixer/Mixer'
import Glass from './components/glass/Glass'
import HeroSection from './components/herosection/HeroSection'
import GlassDesc from './components/glassdesc/GlassDesc'
import Sandwich from './components/sandwich/Sandwich'
import Quatre from './components/quatre/Quatre'


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<HeroSection/>} />
            <Route path="/mixer" element={<Mixer/>} />
            <Route path="/sandwich" element={<Sandwich/>} />
            <Route path="/glass" element={<Glass/>} />
            <Route path="/glass/:cocktailId" element={<GlassDesc/>} />
          </Route>

          {/* Routes additionnelles */}
          {/* <Route path="/product" element={<Product />} /> */}
          {/* <Route path="/features" element={<Features />} /> */}
          {/* <Route path="/marketplace" element={<Marketplace />} /> */}
          {/* <Route path="/company" element={<Company />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          
          {/* Route 404 */}
          <Route path="*" element={<Quatre />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
