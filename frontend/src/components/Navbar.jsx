import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 8000,
        padding: scrolled ? '14px 0' : '22px 0',
        background: scrolled ? 'rgba(10,7,3,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,100,0,0.1)' : 'none',
        transition: 'all 0.4s ease',
      }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #ff4500, #ffcc00)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue, sans-serif', fontSize: 17, color: 'black', letterSpacing: '0.02em' }}>VT</div>
          <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: '0.06em' }}>
            Virtual<span style={{ background: 'linear-gradient(135deg,#ff6b00,#ffcc00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Taps</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="desktop-nav" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              padding: '8px 18px', borderRadius: 4,
              fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600,
              fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase',
              color: pathname === l.to ? 'white' : 'rgba(255,255,255,0.45)',
              background: pathname === l.to ? 'rgba(255,100,0,0.12)' : 'transparent',
              border: pathname === l.to ? '1px solid rgba(255,100,0,0.25)' : '1px solid transparent',
              transition: 'all 0.2s ease',
            }}
              onMouseEnter={e => { if (pathname !== l.to) e.currentTarget.style.color = 'rgba(255,149,0,0.8)' }}
              onMouseLeave={e => { if (pathname !== l.to) e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
            >{l.label}</Link>
          ))}
        </div>

        <Link to="/contact" className="btn-fire" style={{ padding: '10px 24px', fontSize: 13 }}>
          Get a Quote
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} className="hamburger"
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'none', padding: 8 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <><path d="M18 6L6 18M6 6l12 12" /></> : <><path d="M3 12h18M3 6h18M3 18h18" /></>}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(10,7,3,0.98)', borderTop: '1px solid rgba(255,100,0,0.1)', overflow: 'hidden' }}>
            <div className="container" style={{ padding: '20px 32px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {links.map(l => (
                <Link key={l.to} to={l.to} style={{ padding: '13px 16px', borderRadius: 6, color: pathname === l.to ? 'var(--fire3)' : 'rgba(255,255,255,0.6)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontSize: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{l.label}</Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:768px){
          .desktop-nav{display:none!important;}
          .hamburger{display:flex!important;}
          nav > .container > a.btn-fire{display:none!important;}
        }
      `}</style>
    </motion.nav>
  )
}
