import React from 'react'
import { useApp } from '../store/useStore.jsx'

export function Leaderboard() {
  const { users, karma } = useApp()
  const total = Object.values(karma).reduce((a,b)=>a+b,0) || 1
  let angle = -90
  const slices = users.map(u => {
    const frac = Math.max(0, (karma[u.id]||0)) / Math.max(1, Math.max(...Object.values(karma).map(n=>Math.abs(n)||1)))
    const sweep = Math.max(8, frac * 360)
    const start = angle
    const end = angle + sweep
    angle = end
    return { id: u.id, start, end, color: u.avatarColor, name: u.name, score: karma[u.id]||0 }
  })
  return (
    <section className="card-carved p-4">
      <h3 className="font-display text-lg mb-2">Karma Chakra Leaderboard — Grow Together</h3>
      <div className="flex items-center gap-4">
        <svg width="160" height="160" viewBox="0 0 200 200">
          {slices.map(s => (
            <path key={s.id} d={describeArc(100,100,80,s.start,s.end)} fill={s.color} opacity="0.9" />
          ))}
          <circle cx="100" cy="100" r="50" fill="#F8F5F0" className="dark:fill-indigo-900" />
          <text x="100" y="103" textAnchor="middle" style={{fontSize:12}}>Karma</text>
        </svg>
        <ul className="flex-1 space-y-2">
          {users.map(u => (
            <li key={u.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{background:u.avatarColor}} />
                <span>{u.name}</span>
              </div>
              <FeatherProgress value={Math.min(100, Math.max(0, (karma[u.id]||0) + 50))} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function FeatherProgress({ value }){
  return (
    <div className="relative w-40 h-4 rounded-full bg-sandstone/60 overflow-hidden">
      <div className="absolute inset-y-0 left-0 feather-gradient" style={{ width: `${value}%` }} />
    </div>
  )
}

function polarToCartesian(cx, cy, r, angle) {
  const rad = (angle - 90) * Math.PI / 180.0
  return { x: cx + (r * Math.cos(rad)), y: cy + (r * Math.sin(rad)) }
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
  return ['M', cx, cy, 'L', end.x, end.y, 'A', r, r, 0, largeArcFlag, 0, start.x, start.y, 'Z'].join(' ')
}
