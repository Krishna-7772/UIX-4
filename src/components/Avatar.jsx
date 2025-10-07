import React from 'react'
export function Avatar({ name, color = '#1CA9C9', size = 28 }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()
  return (
    <div className="rounded-full text-white flex items-center justify-center" style={{ width: size, height: size, background: color }} aria-label={name}>
      <span className="text-xs font-semibold" aria-hidden>{initials}</span>
    </div>
  )
}
