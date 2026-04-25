import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const token = () => localStorage.getItem('vt_token')

const badge = { new: { bg:'rgba(245,158,11,0.15)', color:'#fbbf24', border:'rgba(245,158,11,0.3)' }, read: { bg:'rgba(6,182,212,0.1)', color:'#67e8f9', border:'rgba(6,182,212,0.2)' }, replied: { bg:'rgba(34,197,94,0.1)', color:'#86efac', border:'rgba(34,197,94,0.2)' } }

export default function Admin() {
  const nav = useNavigate()
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const adminName = localStorage.getItem('vt_admin') || 'Admin'

  useEffect(() => {
    if (!token()) { nav('/login'); return }
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const { data } = await axios.get('/api/contact', { headers: { Authorization: `Bearer ${token()}` } })
      setContacts(data)
    } catch (e) {
      if (e.response?.status === 401) { nav('/login') }
      else toast.error('Failed to load contacts')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`/api/contact/${id}`, { status }, { headers: { Authorization: `Bearer ${token()}` } })
      setContacts(c => c.map(x => x._id === id ? {...x, status} : x))
      if (selected?._id === id) setSelected(s => ({...s, status}))
      toast.success('Status updated')
    } catch { toast.error('Update failed') }
  }

  const logout = () => {
    localStorage.removeItem('vt_token')
    localStorage.removeItem('vt_admin')
    nav('/login')
  }

  const stats = [
    { label:'Total Leads', val: contacts.length, color:'#7c3aed' },
    { label:'New', val: contacts.filter(c=>c.status==='new').length, color:'#f59e0b' },
    { label:'Read', val: contacts.filter(c=>c.status==='read').length, color:'#06b6d4' },
    { label:'Replied', val: contacts.filter(c=>c.status==='replied').length, color:'#22c55e' },
  ]

  const s = { th: { padding:'10px 16px', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'rgba(255,255,255,0.3)', textAlign:'left' }, td: { padding:'14px 16px', fontSize:14, color:'rgba(255,255,255,0.7)', borderTop:'1px solid rgba(255,255,255,0.05)' } }

  return (
    <div style={{ minHeight:'100vh', background:'#050507', fontFamily:'Outfit,sans-serif' }}>
      {/* Top nav */}
      <div style={{ background:'rgba(10,10,15,0.9)', borderBottom:'1px solid rgba(255,255,255,0.05)', backdropFilter:'blur(20px)', position:'sticky', top:0, zIndex:100, padding:'14px 0' }}>
        <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <Link to="/" style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:32,height:32,background:'linear-gradient(135deg,#7c3aed,#06b6d4)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:13,color:'white' }}>VT</div>
            </Link>
            <div style={{ width:1, height:20, background:'rgba(255,255,255,0.1)' }} />
            <span style={{ fontSize:14, fontWeight:600, color:'rgba(255,255,255,0.6)' }}>Admin Dashboard</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ fontSize:13, color:'rgba(255,255,255,0.4)' }}>Hi, {adminName}</span>
            <button onClick={logout} style={{ padding:'7px 16px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, color:'rgba(255,255,255,0.5)', fontSize:13, cursor:'pointer' }}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding:'40px 24px' }}>
        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:40 }}>
          {stats.map((st, i) => (
            <motion.div key={st.label}
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay: i * 0.1 }}
              style={{ background:'rgba(15,15,22,1)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:'24px', borderTop:`2px solid ${st.color}` }}
            >
              <p style={{ fontSize:12, color:'rgba(255,255,255,0.3)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10 }}>{st.label}</p>
              <p style={{ fontSize:36, fontWeight:800, fontFamily:'Syne,sans-serif', color:st.color }}>{st.val}</p>
            </motion.div>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap:20 }}>
          {/* Table */}
          <motion.div layout style={{ background:'rgba(15,15,22,1)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, overflow:'hidden' }}>
            <div style={{ padding:'20px 24px', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <h2 style={{ fontSize:16, fontFamily:'Syne,sans-serif', fontWeight:600 }}>Leads ({contacts.length})</h2>
              <button onClick={fetchContacts} style={{ padding:'6px 14px', background:'rgba(124,58,237,0.1)', border:'1px solid rgba(124,58,237,0.2)', borderRadius:8, color:'#a78bfa', fontSize:12, fontWeight:600, cursor:'pointer' }}>↻ Refresh</button>
            </div>
            {loading ? (
              <div style={{ padding:'60px', textAlign:'center', color:'rgba(255,255,255,0.2)' }}>Loading leads...</div>
            ) : contacts.length === 0 ? (
              <div style={{ padding:'60px', textAlign:'center', color:'rgba(255,255,255,0.2)' }}>
                <div style={{ fontSize:48, marginBottom:16 }}>📭</div>
                <p>No leads yet. Share your contact form and they'll appear here.</p>
              </div>
            ) : (
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse' }}>
                  <thead>
                    <tr>
                      {['Name','Email','Service','Budget','Status','Date','Action'].map(h => (
                        <th key={h} style={s.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map(c => (
                      <tr key={c._id}
                        onClick={() => setSelected(selected?._id===c._id ? null : c)}
                        style={{ cursor:'pointer', background: selected?._id===c._id ? 'rgba(124,58,237,0.06)' : 'transparent', transition:'background 0.2s' }}
                        onMouseEnter={e=>{ if(selected?._id!==c._id) e.currentTarget.style.background='rgba(255,255,255,0.02)' }}
                        onMouseLeave={e=>{ if(selected?._id!==c._id) e.currentTarget.style.background='transparent' }}
                      >
                        <td style={s.td}><span style={{ fontWeight:500, color:'white' }}>{c.name}</span></td>
                        <td style={s.td}>{c.email}</td>
                        <td style={s.td}>{c.service || '—'}</td>
                        <td style={s.td}>{c.budget || '—'}</td>
                        <td style={s.td}>
                          <span style={{ padding:'3px 10px', borderRadius:100, fontSize:11, fontWeight:700, background:badge[c.status]?.bg, color:badge[c.status]?.color, border:`1px solid ${badge[c.status]?.border}` }}>
                            {c.status}
                          </span>
                        </td>
                        <td style={{...s.td, fontSize:12, color:'rgba(255,255,255,0.3)'}}>
                          {new Date(c.createdAt).toLocaleDateString('en-PK', { day:'numeric', month:'short', year:'2-digit' })}
                        </td>
                        <td style={s.td} onClick={e=>e.stopPropagation()}>
                          <select
                            value={c.status}
                            onChange={e=>updateStatus(c._id, e.target.value)}
                            style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:6, color:'white', fontSize:12, padding:'4px 8px', cursor:'pointer' }}
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* Detail pane */}
          {selected && (
            <motion.div
              initial={{ opacity:0, x:20 }}
              animate={{ opacity:1, x:0 }}
              exit={{ opacity:0, x:20 }}
              style={{ background:'rgba(15,15,22,1)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:28, height:'fit-content', position:'sticky', top:80 }}
            >
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:24 }}>
                <h3 style={{ fontSize:16, fontFamily:'Syne,sans-serif' }}>Lead Detail</h3>
                <button onClick={()=>setSelected(null)} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.3)', cursor:'pointer', fontSize:18 }}>✕</button>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                {[
                  { l:'Name', v: selected.name },
                  { l:'Email', v: selected.email },
                  { l:'Phone', v: selected.phone || 'Not provided' },
                  { l:'Service', v: selected.service || 'Not specified' },
                  { l:'Budget', v: selected.budget || 'Not specified' },
                  { l:'Status', v: selected.status },
                  { l:'Date', v: new Date(selected.createdAt).toLocaleString('en-PK') },
                ].map(({l,v}) => (
                  <div key={l}>
                    <p style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'rgba(255,255,255,0.25)', marginBottom:4 }}>{l}</p>
                    <p style={{ fontSize:14, color:'rgba(255,255,255,0.8)' }}>{v}</p>
                  </div>
                ))}
                <div>
                  <p style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'rgba(255,255,255,0.25)', marginBottom:8 }}>Message</p>
                  <p style={{ fontSize:14, color:'rgba(255,255,255,0.7)', lineHeight:1.7, padding:'12px', background:'rgba(255,255,255,0.03)', borderRadius:8, border:'1px solid rgba(255,255,255,0.06)' }}>{selected.message}</p>
                </div>
                <a href={`mailto:${selected.email}`} className="btn-primary" style={{ justifyContent:'center', marginTop:8, textDecoration:'none' }}>
                  <span>Reply via Email</span>
                </a>
                {selected.phone && (
                  <a href={`https://wa.me/${selected.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer"
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'11px', background:'rgba(37,211,102,0.1)', border:'1px solid rgba(37,211,102,0.2)', borderRadius:100, color:'#86efac', fontSize:14, fontWeight:600, textDecoration:'none' }}
                  >WhatsApp Client</a>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <style>{`@media(max-width:768px){ div[style*="repeat(4,1fr)"]{grid-template-columns:1fr 1fr!important} }`}</style>
    </div>
  )
}
