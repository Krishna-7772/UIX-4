import React from 'react'
import { useApp } from '../store/useStore.jsx'
import { formatCurrency } from '../utils/format'
import { motion } from 'framer-motion'

export function Timeline() {
  const { expenses, users } = useApp()
  return (
    <section id="timeline" className="relative card-carved p-4 overflow-hidden">
      <h3 className="font-display text-xl mb-2">Scroll-Painting Timeline</h3>
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_50%_0,rgba(217,162,130,.5),transparent_60%)]" />
      <div className="relative max-h-[420px] overflow-y-auto pr-2">
        <ul className="relative border-l-4 border-sandstone pl-4">
          {expenses.map((e, idx) => (
            <motion.li key={e.id} className="mb-6 relative" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
              <div className="absolute -left-[34px] top-0 w-6 h-6 rounded-full bg-peacock/70 border-4 border-ivory dark:border-indigo-900" />
              <div className="p-3 rounded-xl border bg-white/70 dark:bg-indigo-900/40">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{e.title} <span className="text-xs opacity-70">({e.category})</span></div>
                  <div className="font-semibold">{formatCurrency(e.amount)}</div>
                </div>
                <div className="text-sm opacity-80">Paid by {idToName(users, e.paidBy)} • {new Date(e.date).toLocaleDateString()}</div>
                <div className="text-xs mt-1 opacity-80">Split: {e.splitMode} • Participants: {e.participants.length}</div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function idToName(users, id){ return users.find(u=>u.id===id)?.name || id }
