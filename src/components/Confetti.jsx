import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const PETALS = Array.from({ length: 28 }).map((_, i) => ({
  id: i,
  color: i % 2 ? '#1CA9C9' : '#FFC145',
  shape: i % 3 ? 'M0 10 C 10 -5, 20 -5, 30 10 C 20 20, 10 20, 0 10 Z' : 'M15 0 L30 30 L0 30 Z'
}))

export function Confetti() {
  const [done, setDone] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1500)
    return () => clearTimeout(t)
  }, [])
  if (done) return null
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <svg width="100%" height="100%">
        {PETALS.map((p, i) => (
          <motion.path key={p.id} d={p.shape} fill={p.color}
            initial={{ opacity: 0, x: window.innerWidth/2, y: 0, rotate: 0 }}
            animate={{ opacity: 1, x: Math.random()*window.innerWidth, y: window.innerHeight + 20, rotate: 360 }}
            transition={{ duration: 1.4, ease: 'easeOut', delay: i * 0.02 }} />
        ))}
      </svg>
    </div>
  )
}

export default Confetti
