import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import axios from 'axios'

export default function Login() {
  const [form, setForm] = useState({ email:'', password:'' })
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  const handle = e => setForm({...form, [e.target.name]: e.target.value})

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post('/api/auth/login', form)
      localStorage.setItem('vt_token', data.token)
      localStorage.setItem('vt_admin', data.name)
      toast.success(`Welcome back, ${data.name}!`)
      nav('/admin')
    } catch {
      toast.error('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  const inp = { width:'100%', padding:'14px 18px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, color:'white', fontSize:15, fontFamily:'Outfit,sans-serif', outline:'none' }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#050507' }}
      className="grid-bg">
      <div style={{ position:'absolute',top:'20%',left:'50%',transform:'translateX(-50%)',width:500,height:300,background:'radial-gradient(ellipse,rgba(124,58,237,0.12) 0%,transparent 70%)',pointerEvents:'none' }} />
      <motion.div
        initial={{ opacity:0, y:40 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}
        style={{ width:'100%', maxWidth:420, padding:'0 24px', position:'relative', zIndex:1 }}
      >
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:32, textDecoration:'none' }}>
            <div style={{ width:40,height:40,background:'linear-gradient(135deg,#7c3aed,#06b6d4)',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:17,color:'white' }}>VT</div>
            <span style={{ fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:20,color:'white' }}>Virtual<span style={{color:'#7c3aed'}}>Taps</span></span>
          </Link>
          <h1 style={{ fontSize:28, fontFamily:'Syne,sans-serif', marginBottom:8 }}>Admin Login</h1>
          <p style={{ color:'rgba(255,255,255,0.35)', fontSize:14 }}>Access your dashboard</p>
        </div>
        <div className="card" style={{ padding:36 }}>
          <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:20 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              <label style={{ fontSize:13, fontWeight:600, color:'rgba(255,255,255,0.4)', letterSpacing:'0.05em' }}>Email</label>
              <input type="email" name="email" value={form.email} onChange={handle}
                placeholder="admin@virtualtaps.com" style={inp}
                onFocus={e=>e.target.style.borderColor='rgba(124,58,237,0.5)'}
                onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}
              />
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              <label style={{ fontSize:13, fontWeight:600, color:'rgba(255,255,255,0.4)', letterSpacing:'0.05em' }}>Password</label>
              <input type="password" name="password" value={form.password} onChange={handle}
                placeholder="••••••••" style={inp}
                onFocus={e=>e.target.style.borderColor='rgba(124,58,237,0.5)'}
                onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary"
              style={{ width:'100%', justifyContent:'center', padding:'14px', fontSize:15, marginTop:4, opacity:loading?0.7:1 }}>
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            </button>
          </form>
        </div>
        <p style={{ textAlign:'center', color:'rgba(255,255,255,0.2)', fontSize:12, marginTop:20 }}>
          <Link to="/" style={{ color:'rgba(124,58,237,0.7)' }}>← Back to website</Link>
        </p>
      </motion.div>
    </div>
  )
}
