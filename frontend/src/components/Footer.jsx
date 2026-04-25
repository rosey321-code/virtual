import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#050301', borderTop: '1px solid rgba(255,100,0,0.1)', padding: '80px 0 32px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }}>
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 38, height: 38, background: 'linear-gradient(135deg, #ff4500, #ffcc00)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, color: 'black' }}>VT</div>
              <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, letterSpacing: '0.06em' }}>
                Virtual<span style={{ background: 'linear-gradient(135deg,#ff6b00,#ffcc00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Taps</span>
              </span>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, lineHeight: 1.8, maxWidth: 260, marginBottom: 28 }}>
              Premium NFC stands and smart cards that grow your Google reviews, Instagram followers, and business connections — one tap at a time.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { label: 'IG', href: 'https://www.instagram.com/virtualtaps' },
                { label: 'FB', href: '#' },
                { label: 'WA', href: 'https://wa.me/923000000000' },
                { label: 'TK', href: '#' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  style={{ width: 38, height: 38, border: '1px solid rgba(255,100,0,0.2)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue, sans-serif', fontSize: 12, color: 'rgba(255,149,0,0.5)', transition: 'all 0.3s', letterSpacing: '0.05em' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,149,0,0.5)'; e.currentTarget.style.color = 'var(--fire3)'; e.currentTarget.style.background = 'rgba(255,100,0,0.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,100,0,0.2)'; e.currentTarget.style.color = 'rgba(255,149,0,0.5)'; e.currentTarget.style.background = 'transparent' }}
                >{s.label}</a>
              ))}
            </div>
          </div>

          {[
            { title: 'Products', items: [['NFC Stands', '#'], ['NFC Business Cards', '#'], ['Google Review Stands', '#'], ['Custom Solutions', '#']] },
            { title: 'Company', items: [['About Us', '/about'], ['How It Works', '/how-it-works'], ['Contact', '/contact'], ['Admin', '/login']] },
            { title: 'Contact', items: [['📍 Pakistan / UAE', '#'], ['📱 +92 300 0000000', '#'], ['📧 hello@virtualtaps.com', '#'], ['💬 WhatsApp Order', 'https://wa.me/923000000000']] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,149,0,0.4)', marginBottom: 20 }}>{col.title}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.items.map(([label, href]) => (
                  <Link key={label} to={href} style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,149,0,0.8)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                  >{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,100,0,0.08)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13, fontFamily: 'Barlow Condensed, sans-serif' }}>© 2025 VirtualTaps. All rights reserved.</p>
          <p style={{ color: 'rgba(255,100,0,0.25)', fontSize: 13, fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.05em' }}>BUILT WITH REACT + NODE.JS + MONGODB</p>
        </div>
      </div>

      <style>{`@media(max-width:768px){ footer > .container > div:first-child{grid-template-columns:1fr 1fr!important} footer > .container > div:first-child > div:first-child{grid-column:1/-1} } @media(max-width:480px){ footer > .container > div:first-child{grid-template-columns:1fr!important} }`}</style>
    </footer>
  )
}
