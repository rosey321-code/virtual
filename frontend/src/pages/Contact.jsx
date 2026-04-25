import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Reveal({ children, delay = 0 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>
  )
}

const inp = {
  width: '100%', padding: '14px 20px',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,100,0,0.15)',
  borderRadius: 8, color: 'white',
  fontSize: 15, fontFamily: 'Barlow, sans-serif',
  outline: 'none', transition: 'all 0.3s',
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', product: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) { toast.error('Please fill required fields.'); return }
    setLoading(true)
    try {
      await axios.post('/api/contact', { ...form, service: form.product })
      toast.success('Order request sent!')
      setSent(true)
    } catch {
      toast.error('Error. Please WhatsApp us.')
    } finally { setLoading(false) }
  }

  return (
    <main style={{ paddingTop: 60, background: '#050505', color: 'white' }}>
      
      <style>{`
        select option {
            background: #111 !important;
            color: white !important;
            padding: 10px;
        }
        input::placeholder, textarea::placeholder {
            color: rgba(255,255,255,0.3) !important;
        }
      `}</style>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          
          {/* ══ HERO SECTION WITH EXTRA BOTTOM SPACE ══ */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20, alignItems: 'flex-end', marginBottom: 120 }}> {/* Margin barha di gayi */}
            <Reveal>
              <div style={{ textAlign: 'left', paddingBottom: 40 }}>
                <span className="tag-fire" style={{ marginBottom: 20, display: 'inline-block' }}>Order / Contact</span>
                <h1 style={{ fontSize: 'clamp(40px,6vw,80px)', lineHeight: 0.95, fontWeight: 900, marginBottom: 20 }}>
                  LET'S GET YOUR<br /><span className="fire-text">NFC PRODUCTS MADE</span>
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, maxWidth: 450, lineHeight: 1.6 }}>
                  Fill the form or WhatsApp us directly. <br/>Premium branding starts with one tap.
                </p>
              </div>
            </Reveal>

            {/* MJ Image with Left Glowing Border */}
            <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                style={{ 
                    position: 'relative', 
                    borderLeft: '4px solid #ff6b00', 
                    boxShadow: '-15px 0 30px rgba(255, 107, 0, 0.2)', 
                    borderRadius: '20px 0 0 20px'
                }}
            >
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at left, rgba(255,107,0,0.1) 0%, transparent 70%)', zIndex: 0 }}></div>
                <img src="/cont2.JPG" style={{ width: '100%', display: 'block', position: 'relative', zIndex: 1 }} alt="NFC" />
            </motion.div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 60, alignItems: 'start' }}>
            
            {/* ── LEFT: CONTACT INFO ── */}
            <Reveal>
              <div>
                {[
                  { 
                    label: 'WhatsApp (Fastest)', val: '+92 300 0000000', href: 'https://wa.me/923000000000',
                    icon: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /> 
                  },
                  { 
                    label: 'Email', val: 'hello@virtualtaps.com', href: 'mailto:hello@virtualtaps.com',
                    icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></> 
                  },
                  { 
                    label: 'Instagram', val: '@virtualtaps', href: 'https://instagram.com',
                    icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>
                  },
                  { 
                    label: 'Location', val: 'Pakistan & UAE', 
                    icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>
                  },
                ].map(c => (
                  <a key={c.label} href={c.href || '#'} target={c.href ? '_blank' : '_self'} rel="noreferrer"
                    style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 32, textDecoration: 'none' }}>
                    <div style={{ width: 56, height: 56, borderRadius: 12, background: 'rgba(255,107,0,0.1)', border: '1px solid #ff6b00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff6b00', flexShrink: 0 }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg>
                    </div>
                    <div>
                      <p style={{ fontSize: 11, color: '#ff6b00', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 4 }}>{c.label}</p>
                      <p style={{ fontSize: 18, color: 'white', fontWeight: 600 }}>{c.val}</p>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>

            {/* ── RIGHT: FORM ── */}
            <Reveal delay={0.2}>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,100,0,0.1)', borderRadius: 16, padding: 45 }}>
                <h2 style={{ fontSize: 32, fontFamily: 'Bebas Neue', marginBottom: 8 }}>Request a Quote</h2>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 15, marginBottom: 35 }}>Premium service. Responses in under 1 hour.</p>
                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <input type="text" name="name" placeholder="Your Name *" style={inp} onChange={handle} />
                    <input type="email" name="email" placeholder="Email Address *" style={inp} onChange={handle} />
                  </div>
                  <input type="text" name="phone" placeholder="WhatsApp Number" style={inp} onChange={handle} />
                  
                  <select name="product" style={{ ...inp, cursor: 'pointer', appearance: 'none', background: '#0a0a0a' }} onChange={handle}>
                    <option value="">Select Product</option>
                    <option value="NFC Stand">NFC Stand</option>
                    <option value="NFC Business Card">NFC Business Card</option>
                    <option value="Google Review Stand">Google Review Stand</option>
                    <option value="Custom Solution">Custom Solution</option>
                  </select>

                  <textarea name="message" placeholder="Quantity, design, or links to program... *" rows={5} style={{ ...inp, resize: 'none' }} onChange={handle} />
                  <motion.button type="submit" disabled={loading} className="btn-fire"
                    style={{ width: '100%', padding: 18, fontSize: 16, fontWeight: 'bold' }}
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                    {loading ? 'Sending...' : 'Send Quote Request 🔥'}
                  </motion.button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  )
}