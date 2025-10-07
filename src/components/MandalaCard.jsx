import React from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../store/useStore.jsx'

export function MandalaCard({ title, amount, shares, participants }) {
  const { users } = useApp()
  const total = Object.values(shares||{}).reduce((a,b)=>a+b,0) || 1
  const list = participants.map(id => ({ id, share: shares[id]||0, user: users.find(u=>u.id===id) }))

  let angle = -90
  const wedges = list.map(({ id, share, user }) => {
    const frac = total ? (share/total) : 0
    const sweep = frac * 360
    const start = angle
    const end = angle + sweep
    angle = end
    return { id, start, end, color: user?.avatarColor || '#1CA9C9' }
  })

  const R = 80
  return (
    <div className="relative card-carved p-4" aria-label="Mandala Expense Card">
      <h4 className="font-display mb-2">{title}</h4>
      <div className="flex items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <defs>
            <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" />
            </filter>
          </defs>
          <circle cx="100" cy="100" r="86" fill="white" className="dark:fill-indigo-800/40" />
          {wedges.map(w => (
            <motion.path
              key={w.id}
              d={describeArc(100,100,R, w.start, w.end)}
              fill={w.color}
              initial={{ opacity: 0.7 }}
              whileHover={{ scale: 1.02, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))' }}
              animate={{ opacity: 0.95 }}
              transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            />
          ))}
          <circle cx="100" cy="100" r="45" fill="#F8F5F0" className="dark:fill-indigo-900" />
          <text x="100" y="102" textAnchor="middle" className="fill-charcoal dark:fill-amber-100" style={{fontSize: '12px'}}>
            ₹{amount || 0}
          </text>
        </svg>
      </div>
    </div>
  )
}

// SVG arc helper
function polarToCartesian(cx, cy, r, angle) {
  const rad = (angle - 90) * Math.PI / 180.0
  return { x: cx + (r * Math.cos(rad)), y: cy + (r * Math.sin(rad)) }
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
  return [
    'M', cx, cy,
    'L', end.x, end.y,
    'A', r, r, 0, largeArcFlag, 0, start.x, start.y,
    'Z'
  ].join(' ')
}
