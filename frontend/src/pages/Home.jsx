import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

/* ── helpers ── */
function Reveal({ children, delay = 0, y = 50 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  )
}

/* ── 3D NFC Card ── */
function NFCCard3D({ image, color = '#ff6b00', aspect = '1.586/1' }) {
  const cardRef = useRef(null)
  const [rot, setRot] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)

  const onMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setRot({ x: -dy * 15, y: dx * 15 })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setHovering(false); setRot({ x: 0, y: 0 }) }}
      style={{ perspective: 1000, cursor: 'pointer', width: '100%' }}
    >
      <motion.div
        animate={{ 
            rotateX: rot.x, rotateY: rot.y, scale: hovering ? 1.05 : 1,
            borderColor: hovering ? "#ff6b00" : "rgba(255, 107, 0, 0.2)",
            boxShadow: hovering ? `0 0 20px rgba(255,107,0,0.4)` : `0 10px 30px rgba(0,0,0,0.5)`
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        style={{
          width: '100%', 
          aspectRatio: aspect, 
          borderRadius: 16,
          background: '#000',
          border: `1px solid rgba(255,107,0,0.2)`,
          position: 'relative', overflow: 'hidden'
        }}
      >
        <img 
          src={image} 
          alt="NFC Product" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <motion.div
          animate={{ x: hovering ? '100%' : '-100%' }}
          transition={{ duration: 0.7 }}
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            transform: 'skewX(-20deg)', pointerEvents: 'none'
          }}
        />
      </motion.div>
    </div>
  )
}

function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 4 + 1, duration: Math.random() * 8 + 6,
    delay: Math.random() * 4, color: ['#ff4500', '#ff6b00', '#ff9500', '#ffcc00', '#ffd700'][Math.floor(Math.random() * 5)]
  }))
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map(p => (
        <motion.div key={p.id}
          style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: '50%', background: p.color, boxShadow: `0 0 ${p.size * 3}px ${p.color}` }}
          animate={{ y: [-20, -80, -20], opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function Marquee() {
  const items = ['NFC Stands', 'Smart Cards', 'Google Review', 'Tap to Connect', 'NFC Business Cards', 'Digital Identity', 'Contactless Tech', 'Premium Stands']
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,100,0,0.2)', borderBottom: '1px solid rgba(255,100,0,0.2)', background: 'rgba(255,100,0,0.04)', padding: '14px 0' }}>
      <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} style={{ display: 'flex', gap: 60, whiteSpace: 'nowrap', width: 'max-content' }}>
        {[...Array(2)].map((_, i) => (
          <div key={i} style={{ display: 'flex', gap: 60 }}>
            {items.map(item => (
              <span key={item} style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,149,0,0.5)' }}>✦ {item}</span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

const products = [
  { title: 'NFC Stands', img: '/st.png', desc: 'Premium acrylic stands with embedded NFC chip. Customers tap to follow, review, or connect instantly.', color: '#ffcc00', price: 'AED 149' },
  { title: 'NFC Business Cards', img: '/bis.png', desc: 'Sleek metal or plastic cards that share your full profile with a single tap. No app needed.', color: '#ffcc00', price: 'AED 79' },
  { title: 'Google Review Stands', img: '/go.png', desc: 'Dedicated stands to boost Google reviews. Place at counter and watch 5-stars roll in automatically.', color: '#ffcc00', price: 'AED 129' },
  { title: 'Custom NFC Solutions', img: '/vir.png', desc: 'Fully custom NFC products designed for your brand. Any shape, any size, any finish.', color: '#ffd700', price: 'Custom Quote' },
]

const steps = [
  { n: '01', title: 'Choose Your Product', desc: 'Pick from NFC stands, cards, or custom solutions.' },
  { n: '02', title: 'Send Your Brand', desc: 'Share your logo, colors, and links with us.' },
  { n: '03', title: 'We Design & Produce', desc: 'Premium production with NFC chip programming.' },
  { n: '04', title: 'Tap & Convert', desc: 'Customers tap — they follow, review, connect instantly.' },
]

const testimonials = [
  { name: 'Ahmad Al Rashid', role: 'Restaurant Owner, Dubai', text: 'Our reviews went from 47 to 380 within months.', rating: 5, avatar: 'AR' },
  { name: 'Sara Al Mansoori', role: 'Salon Owner, Abu Dhabi', text: 'The NFC cards look absolutely premium.', rating: 5, avatar: 'SM' },
  { name: 'Khalid Hassan', role: 'Gym Owner, Sharjah', text: 'Best investment for our business.', rating: 5, avatar: 'KH' },
]

export default function Home() {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, -100])
  const heroOp = useTransform(scrollY, [0, 500], [1, 0])
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <main>
      <style>{`
        .glass-border-hover {
            border: 1px solid rgba(255, 107, 0, 0.2) !important;
            transition: all 0.4s ease !important;
        }
        .glass-border-hover:hover {
            border: 1px solid rgba(255, 107, 0, 1) !important;
            box-shadow: 0 0 20px rgba(255, 107, 0, 0.4), inset 0 0 10px rgba(255, 107, 0, 0.1) !important;
        }

        @media (max-width: 768px) {
            .hero-container { 
                grid-template-columns: 1fr !important; 
                text-align: center !important; 
                padding-top: 60px !important;
                gap: 20px !important;
            }
            .hero-btns { justify-content: center !important; }
            .hide-mobile { display: none !important; }
            
            .product-grid { 
                display: flex !important; 
                overflow-x: auto !important; 
                scroll-snap-type: x mandatory !important; 
                gap: 20px !important;
                padding-top: 200px !important; 
                padding-bottom: 60px !important;
                scrollbar-width: none;
            }
            .product-grid::-webkit-scrollbar { display: none; }
            .product-item { 
                flex: 0 0 80% !important; 
                scroll-snap-align: center !important; 
                aspect-ratio: 1/1 !important; 
                padding: 30px !important;
                justify-content: center !important;
            }

            .steps-grid { 
                grid-template-columns: repeat(2, 1fr) !important; 
                gap: 20px !important; 
            }
            .step-desc { display: none !important; }

            .testimonial-grid { 
                display: flex !important; 
                overflow-x: auto !important; 
                scroll-snap-type: x mandatory !important; 
                gap: 20px !important;
                scrollbar-width: none;
            }
            .testimonial-grid::-webkit-scrollbar { display: none; }
            .testimonial-item { 
                flex: 0 0 85% !important; 
                scroll-snap-align: center !important; 
            }

            .cta-layout { 
                flex-direction: row !important; 
                align-items: center !important; 
                justify-content: space-between !important;
                gap: 0px !important;
                padding: 40px 0px !important; /* REMOVED SIDE PADDING */
                display: flex !important;
                width: 100% !important;
            }
            .cta-img-mobile { 
                width: 45% !important; 
                max-width: 180px !important;
                flex-shrink: 0 !important; 
                margin: 0 !important;
                padding: 0 !important;
            }
            .cta-text-mobile { 
                text-align: right !important; 
                padding-right: 15px !important; /* SLIGHT PADDING FOR TEXT */
                padding-bottom: 0 !important;
                flex: 1 !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: flex-end !important; 
            }
            .cta-btn-mobile {
                width: auto !important;
                min-width: 160px !important;
                margin-left: auto !important;
                align-self: flex-end !important; /* PUSHES BUTTON TO RIGHT */
                text-align: center !important;
                white-space: normal !important;
                line-height: 1.2 !important;
                font-size: 14px !important;
            }
        }
      `}</style>

      {/* ══ HERO ══ */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', background: 'var(--dark)' }}>
        <Particles />
        <motion.div className="container hero-container" style={{ y: heroY, opacity: heroOp, position: 'relative', zIndex: 1, paddingTop: 100, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <Reveal><span className="tag-fire" style={{ marginBottom: 28, display: 'inline-block' }}>🔥 The Future of Networking</span></Reveal>
            <Reveal delay={0.2}><h1 style={{ fontSize: 'clamp(48px, 7vw, 96px)', marginBottom: 24, lineHeight: 0.95 }}>TAP.<br /><span className="fire-text">CONNECT.</span><br />DOMINATE.</h1></Reveal>
            <Reveal delay={0.4}><p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', marginBottom: 40, maxWidth: 480, margin: '0 auto 40px' }}>Premium NFC stands and smart cards for modern professionals.</p></Reveal>
            <div className="hero-btns" style={{ display: 'flex', gap: 16 }}>
              <Link to="/products" className="btn-fire">Shop Now</Link>
              <Link to="/contact" className="btn-outline-fire">Quote</Link>
            </div>
          </div>

          <div className="hide-mobile" style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', width: 400, height: 400, background: 'radial-gradient(circle, rgba(255,100,0,0.15) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }} style={{ width: '100%', maxWidth: 350 }}>
              <NFCCard3D image="/nfc5.jpg" color="#ff6b00" />
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, width: '100%', maxWidth: 350 }}>
              <NFCCard3D image="/nfc4.jpg" color="#ffcc00" aspect="1.1/1" />
              <NFCCard3D image="/dt.jpg" color="#ff4500" aspect="1.1/1" />
            </div>
          </div>
        </motion.div>
      </section>

      <Marquee />

      {/* ══ PRODUCTS SECTION ══ */}
      <section className="section" style={{ paddingTop: '120px', paddingBottom: '100px', position: 'relative' }}>
        <div className="container">
          <Reveal><div style={{ textAlign: 'center', marginBottom: 80 }}><h2 style={{ fontSize: 'clamp(40px, 5vw, 70px)' }}>OUR <span className="fire-text">PRODUCTS</span></h2></div></Reveal>
          
          <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 80 }}>
            {products.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <motion.div 
                  className="product-item glass-border-hover"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  whileHover={{ scale: 1.02 }}
                  style={{ 
                    padding: 50, borderRadius: 30, background: '#0a0a0a',
                    position: 'relative', minHeight: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    zIndex: hoveredIdx === i ? 50 : 1, overflow: 'visible'
                  }}
                >
                  <motion.img
                    src={p.img}
                    variants={{
                      initial: { y: 50, opacity: 0, scale: 0.8 },
                      hover: { y: -180, opacity: 1, scale: 1 } 
                    }}
                    animate={hoveredIdx === i ? "hover" : "initial"}
                    transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                    style={{ position: 'absolute', top: '0', left: '50%', x: '-50%', zIndex: -1, width: '280px', height: '350px', objectFit: 'contain' }}
                    alt="nfc-product"
                  />
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <h3 style={{ fontSize: 36, fontFamily: 'Bebas Neue', marginBottom: 14 }}>{p.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, fontSize: 17 }}>{p.desc}</p>
                    <Link to="/contact" style={{ display: 'inline-block', marginTop: 28, color: '#ffcc00', fontWeight: 'bold', textTransform: 'uppercase' }}>
                      Order Now — {p.price} →
                    </Link>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="section" style={{ background: 'var(--dark2)' }}>
        <div className="container">
          <Reveal><div style={{ textAlign: 'center', marginBottom: 60 }}><span className="tag-fire" style={{ marginBottom: 20, display: 'inline-block' }}>How It Works</span><h2 style={{ fontSize: 'clamp(40px,5vw,72px)' }}>FROM ORDER TO<br /><span className="fire-text">FIRST TAP IN 3 DAYS</span></h2></div></Reveal>
          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.15}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', border: '1px solid orange', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}><span className="fire-text" style={{ fontSize: 28, fontFamily: 'Bebas Neue' }}>{s.n}</span></div>
                  <h4 style={{ fontWeight: 'bold', marginBottom: 10 }}>{s.title}</h4>
                  <p className="step-desc" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="section" style={{ background: 'var(--dark)' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <span className="tag-fire" style={{ marginBottom: 20, display: 'inline-block' }}>Testimonials</span>
              <h2 style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}>
                WHAT OUR <br />
                <span className="fire-text">CLIENTS SAY</span>
              </h2>
            </div>
          </Reveal>
          <div className="testimonial-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.12}>
                <div className="testimonial-item card-fire" style={{ padding: 36 }}>
                  <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'orange', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{t.avatar}</div>
                    <div><p style={{ fontWeight: 'bold', color: 'white' }}>{t.name}</p><p style={{ fontSize: 12, opacity: 0.6, color: 'white' }}>{t.role}</p></div>
                  </div>
                  <p style={{ color: 'white', fontStyle: 'italic', fontSize: 16, lineHeight: 1.6 }}>"{t.text}"</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA SECTION (CORNER FIXED) ══ */}
      <section className="cta-layout" style={{ padding: '80px 0', background: '#000', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Particles />
        <motion.div 
            initial={{ x: -20, opacity: 0 }} 
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="cta-img-container cta-img-mobile"
            style={{ width: '100%', maxWidth: '400px', zIndex: 10 }}
        >
            <img src="/about.jpg" style={{ width: '100%', display: 'block' }} alt="Brand Character" />
        </motion.div>

        <div className="container cta-text-container" style={{ textAlign: 'right', flex: 1, paddingRight: '40px' }}>
            <Reveal>
                <h2 style={{ fontSize: 'clamp(40px,7vw,96px)', lineHeight: 1, textAlign: 'right' }}>READY TO<br /><span className="fire-text">GROW YOUR BRAND?</span></h2>
                <Link to="/contact" className="btn-fire cta-btn-mobile" style={{ marginTop: 30, display: 'inline-block', padding: '15px 40px', textAlign: 'center' }}>
                    Order Your NFC Kit Now
                </Link>
            </Reveal>
        </div>
        <div style={{ width: '400px' }} className="lg:block hidden"></div>
      </section>
    </main>
  )
}