import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    let mx = 0, my = 0
    let rx = 0, ry = 0
    let raf

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate(${mx - 6}px, ${my - 6}px)`
      }
    }

    const animate = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (ring.current) {
        ring.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`
      }
      raf = requestAnimationFrame(animate)
    }

    const onEnter = () => {
      if (dot.current) dot.current.style.transform += ' scale(2)'
      if (ring.current) ring.current.style.opacity = '0'
    }
    const onLeave = () => {
      if (ring.current) ring.current.style.opacity = '1'
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor" />
      <div ref={ring} className="cursor-follower" />
    </>
  )
}
