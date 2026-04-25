import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function Reveal({ children, delay = 0 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.div>
  )
}

const team = [
  { name:'Ali Hassan', role:'Founder & CEO', img:'/ceo1.png', bio:'Digital strategist with 6+ years scaling brands across Pakistan and the Gulf.' },
  { name:'Fatima Noor', role:'Creative Director', img:'/ceo1.png', bio:'Award-winning designer who transforms briefs into brands people fall in love with.' },
  { name:'Bilal Ahmed', role:'Head of Performance', img:'/ceo1.png', bio:'Paid media specialist responsible for over PKR 50M in managed ad spend.' },
  { name:'Zara Malik', role:'Content Lead', img:'/ceo1.png', bio:'Storyteller who turns complex ideas into viral-worthy content that converts.' },
]

const values = [
  { title:'Speed', desc:'We move fast. Most agencies talk for weeks — we ship results in days.' },
  { title:'Data First', desc:'Every decision is backed by real numbers, not gut feelings or guesswork.' },
  { title:'Client Obsessed', desc:'Your win is our win. We treat every brand as if it were our own.' },
  { title:'Bold Creativity', desc:'We don\'t do boring. Every campaign we run turns heads.' },
]

const stats = [
  { n:150, s:'+', l:'Happy Clients' },
  { n:500, s:'+', l:'Projects Done' },
  { n:6, s:'+', l:'Years of Experience' },
  { n:12, s:'+', l:'Team Members' },
]

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <main style={{ background: '#050505', color: 'white', overflowX: 'hidden' }}>
      
      {/* ── RESPONSIVE CSS ── */}
      <style>{`
        @keyframes rotate-border {
            100% { transform: rotate(360deg); }
        }
        .animated-border-card {
            position: relative;
            padding: 3px;
            border-radius: 24px;
            overflow: hidden;
            background: rgba(255, 107, 0, 0.1);
        }
        .animated-border-card::before {
            content: "";
            position: absolute;
            top: -50%; left: -50%;
            width: 200%; height: 200%;
            background: conic-gradient(#ff6b00, #ffcc00, transparent, transparent, #ff6b00);
            animation: rotate-border 4s linear infinite;
        }
        .card-inner {
            position: relative;
            z-index: 1;
            background: #0a0a0a;
            border-radius: 21px;
            height: 100%;
            padding: 30px;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
            .hero-grid { 
                grid-template-columns: 1fr !important; 
                gap: 30px !important;
                text-align: center !important;
            }
            .hero-img-container { 
                margin-left: 0 !important; 
                order: -1 !important; /* Image ko top pe lane ke liye */
            }
            .hero-img { 
                width: 100% !important; 
                border-radius: 20px !important; 
                box-shadow: 0 10px 30px rgba(255,107,0,0.2) !important;
            }
            .hero-text-content { 
                padding-left: 0 !important; 
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
            }
            .hero-text-content p { 
                margin: 0 auto !important; 
            }

            .stats-grid { 
                grid-template-columns: repeat(2, 1fr) !important; 
                gap: 15px !important;
            }

            .team-grid { 
                display: flex !important; 
                overflow-x: auto !important; 
                scroll-snap-type: x mandatory !important;
                gap: 20px !important; 
                padding-bottom: 30px !important;
                padding-left: 10px !important;
                -webkit-overflow-scrolling: touch !important;
            }
            .team-card { 
                min-width: 260px !important; 
                scroll-snap-align: center !important;
            }
            .team-bio { 
                display: none !important; /* Grey text hide for mobile */
            }
            
            /* Hide scrollbar for team section but keep functionality */
            .team-grid::-webkit-scrollbar {
                display: none;
            }
        }
      `}</style>

      {/* Hero Section */}
      <section className="section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', paddingTop: 100, position:'relative' }}>
        <div className="container hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 40, alignItems: 'center' }}>
          
          {/* Left Peeking Image */}
          <motion.div 
            className="hero-img-container"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, type: 'spring' }}
            style={{ marginLeft: '-100px' }}
          >
            <img src="/brand1.jpg" className="hero-img" style={{ width: '110%', borderRadius: '0 40px 40px 0', boxShadow: '20px 0 50px rgba(255,107,0,0.2)' }} alt="About Hero" />
          </motion.div>

          <div className="hero-text-content" style={{ paddingLeft: 40 }}>
            <Reveal>
              <span className="tag-fire" style={{ marginBottom:24, display:'inline-block' }}>About VirtualTaps</span>
              <h1 style={{ fontSize:'clamp(45px,6vw,85px)', lineHeight: 1, fontWeight: 900, marginBottom:25 }}>
                The Agency That<br /><span className="fire-text">Doesn't Settle</span>
              </h1>
              <p style={{ color:'rgba(255,255,255,0.7)', fontSize:20, lineHeight:1.8, maxWidth:550 }}>
                Born in Pakistan. Built to compete globally. VirtualTaps was founded on one principle — that great marketing should be available to every business.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section" style={{ background: '#0a0a0a' }}>
        <div className="container">
          <div ref={ref} className="stats-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:30 }}>
            {stats.map((s, i) => (
              <Reveal key={s.l} delay={i * 0.1}>
                <div style={{ textAlign:'center', padding:'50px 20px' }}>
                  <div style={{ fontSize:'clamp(50px,6vw,75px)', fontWeight:900, lineHeight:1 }}>
                    <span className="fire-text">
                      {inView ? <CountUp end={s.n} duration={3} /> : '0'}
                    </span>
                    <span className="fire-text">{s.s}</span>
                  </div>
                  <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14, marginTop:15, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em' }}>{s.l}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section - UNTOUCHED */}
      <section className="section">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:100, alignItems:'center' }}>
            <Reveal>
              <div>
                <span className="tag-fire" style={{ marginBottom:20, display:'inline-block' }}>Our Story</span>
                <h2 style={{ fontSize:'clamp(35px,4vw,55px)', fontWeight:900, marginBottom:30, lineHeight:1.1 }}>
                  Started Small.<br />Thinking <span className="fire-text">Massive.</span>
                </h2>
                <p style={{ color:'rgba(255,255,255,0.6)', fontSize:18, lineHeight:1.8, marginBottom: 30 }}>
                  We built the agency we wished existed — one that combines sharp strategy and obsessive attention to results.
                </p>
                <Link to="/contact" className="btn-fire">Work With Us</Link>
              </div>
            </Reveal>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:25 }}>
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.1}>
                  <div className="animated-border-card">
                    <div className="card-inner">
                        <div style={{ fontSize:40, marginBottom:15 }}>{v.icon}</div>
                        <h4 style={{ fontSize:20, fontWeight: 900, marginBottom:10 }}>{v.title}</h4>
                        <p style={{ color:'rgba(255,255,255,0.5)', fontSize:15, lineHeight:1.6 }}>{v.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section" style={{ background: '#080808' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign:'center', marginBottom:80 }}>
              <span className="tag-fire" style={{ marginBottom:20, display: 'inline-block' }}>The Team</span>
              <h2 style={{ fontSize:'clamp(35px,4vw,60px)', fontWeight:900 }}>The Minds <span className="fire-text">Behind the Magic</span></h2>
            </div>
          </Reveal>

          <div className="team-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:30 }}>
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.1}>
                <div className="team-card" style={{ textAlign:'center' }}>
                  
                  {/* Circle Animation */}
                  <motion.div 
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{ 
                        width:130, height:130, borderRadius:'50%', 
                        background:'rgba(255,107,0,0.1)', 
                        border:'2px solid #ff6b00', 
                        boxShadow: '0 0 20px rgba(255,107,0,0.3)',
                        margin:'0 auto 25px',
                        overflow: 'hidden',
                        display:'flex', alignItems:'center', justifyContent:'center'
                    }}
                  >
                    <img src={m.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={m.name} />
                  </motion.div>

                  <h3 style={{ fontSize:22, fontWeight: 900, marginBottom:8 }}>{m.name}</h3>
                  
                  <p style={{ 
                      color:'#ffcc00', fontSize:12, fontWeight:800, 
                      background: 'rgba(255,107,0,0.1)', padding: '4px 12px', 
                      borderRadius: '50px', display: 'inline-block', marginBottom:15,
                      border: '1px solid rgba(255,107,0,0.2)', textTransform: 'uppercase'
                  }}>
                    {m.role}
                  </p>

                  <p className="team-bio" style={{ color:'rgba(255,255,255,0.6)', fontSize:15, lineHeight:1.7 }}>{m.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ textAlign:'center', padding: '150px 0' }}>
        <div className="container">
          <Reveal>
            <h2 style={{ fontSize:'clamp(40px,6vw,80px)', fontWeight: 900, lineHeight: 1, marginBottom:30 }}>
              READY TO JOIN <br/><span className="fire-text">150+ HAPPY CLIENTS?</span>
            </h2>
            <Link to="/contact" className="btn-fire" style={{ padding:'20px 50px', fontSize:18 }}>Get in Touch</Link>
          </Reveal>
        </div>
      </section>
    </main>
  )
}