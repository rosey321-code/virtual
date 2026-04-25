import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#050301', borderTop: '1px solid rgba(255,100,0,0.1)', padding: '80px 0 32px' }}>
      <div className="container">
        {/* Main Footer Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 64 }} className="footer-grid">
          
          {/* Logo & Description */}
          <div className="footer-brand">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, textDecoration: 'none' }}>
              <div style={{ width: 38, height: 38, background: 'linear-gradient(135deg, #ff4500, #ffcc00)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, color: 'black' }}>VT</div>
              <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, letterSpacing: '0.06em', color: 'white' }}>
                Virtual<span style={{ background: 'linear-gradient(135deg,#ff6b00,#ffcc00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Taps</span>
              </span>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, lineHeight: 1.8, maxWidth: 280, marginBottom: 28 }}>
              Premium NFC stands and smart cards that grow your brand — one tap at a time.
            </p>
            
            {/* Social Icons - FIXED TO STAY HORIZONTAL */}
            <div style={{ display: 'flex', gap: 10 }} className="footer-socials">
              {[
                { label: 'IG', href: 'https://www.instagram.com/virtualtaps' },
                { label: 'FB', href: '#' },
                { label: 'WA', href: 'https://wa.me/923000000000' },
                { label: 'TK', href: '#' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  style={{ width: 40, height: 40, border: '1px solid rgba(255,100,0,0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue, sans-serif', fontSize: 12, color: 'rgba(255,149,0,0.5)', transition: 'all 0.3s', textDecoration: 'none' }}
                >{s.label}</a>
              ))}
            </div>
          </div>

          {/* Nav Links - FIXED TO STAY IN COLUMNS */}
          {[
            { title: 'Products', items: [['NFC Stands', '#'], ['NFC Business Cards', '#'], ['Google Review Stands', '#'], ['Custom Solutions', '#']] },
            { title: 'Company', items: [['About Us', '/about'], ['How It Works', '/how-it-works'], ['Contact', '/contact'], ['Admin', '/login']] },
            { title: 'Contact', items: [[' Pakistan / UAE', '#'], [' +92 300 0000000', '#'], [' hello@virtualtaps.com', '#'], [' WhatsApp Order', 'https://wa.me/923000000000']] },
          ].map(col => (
            <div key={col.title} className="footer-column">
              <h4 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,149,0,0.4)', marginBottom: 20 }}>{col.title}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.items.map(([label, href]) => (
                  <Link key={label} to={href} style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, transition: 'color 0.2s', textDecoration: 'none' }}
                  >{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom copyright */}
        <div style={{ borderTop: '1px solid rgba(255,100,0,0.08)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>© 2025 VirtualTaps. All rights reserved.</p>
          <p style={{ color: 'rgba(255,100,0,0.2)', fontSize: 11, letterSpacing: '1px' }}>REACT + NODE.JS + MONGODB</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important; /* Mobile par 2 columns taake lamba list na bane */
            gap: 30px !important;
          }
          .footer-brand {
            grid-column: 1 / -1; /* Logo full width rahega */
            margin-bottom: 20px;
          }
          .footer-socials {
            flex-direction: row !important; /* Icons hamesha ek line mein rahenge */
          }
          .footer-column h4 {
            margin-bottom: 12px !important;
          }
        }
        @media (max-width: 480px) {
            .footer-grid {
                grid-template-columns: 1fr 1fr !important;
            }
        }
      `}</style>
    </footer>
  )
}