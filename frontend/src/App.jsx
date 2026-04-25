import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import Admin from './pages/Admin'
import Login from './pages/Login'

// Placeholder pages
const Products = () => (
  <main style={{ paddingTop: 160, paddingBottom: 120, textAlign: 'center' }}>
    <div className="container">
      <h1 style={{ fontSize: 'clamp(48px,7vw,96px)', fontFamily: 'Bebas Neue, sans-serif' }}>
        Products <span className="fire-text">Coming Soon</span>
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: 20, fontSize: 17 }}>Full product catalog with ordering system launching soon.</p>
    </div>
  </main>
)

const HowItWorks = () => (
  <main style={{ paddingTop: 160, paddingBottom: 120, textAlign: 'center' }}>
    <div className="container">
      <h1 style={{ fontSize: 'clamp(48px,7vw,96px)', fontFamily: 'Bebas Neue, sans-serif' }}>
        How It <span className="fire-text">Works</span>
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: 20, fontSize: 17 }}>Detailed guide coming soon.</p>
    </div>
  </main>
)

export default function App() {
  return (
    <Router>
      <Cursor />
      <Toaster position="top-right" toastOptions={{
        style: { background: '#120d05', color: '#fff', border: '1px solid rgba(255,100,0,0.3)', fontFamily: 'Barlow, sans-serif' },
        success: { iconTheme: { primary: '#ff9500', secondary: '#000' } },
      }} />
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  )
}
