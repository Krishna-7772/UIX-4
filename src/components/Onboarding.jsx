import React from 'react'
import { motion } from 'framer-motion'

export function Onboarding({ onClose }) {
  const steps = [
    { title: 'Add Expense', text: 'Capture a cost with equal, percentage, or custom splits.' },
    { title: 'Summary', text: 'See net balances and optimized settlements.' },
    { title: 'Settle', text: 'Mock UPI portal, karma, and confetti.' },
  ]
  return (
    <motion.div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="card-carved p-6 max-w-lg w-full temple-arch"
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <h3 className="font-display text-xl mb-2">Welcome to S.U.Y.O.G</h3>
        <ul className="space-y-2">
          {steps.map((s,i) => (
            <li key={i} className="p-3 rounded-lg border bg-white/70 dark:bg-indigo-900/40">
              <div className="font-medium">{i+1}. {s.title}</div>
              <div className="text-sm opacity-80">{s.text}</div>
            </li>
          ))}
        </ul>
        <div className="text-right mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-saffron text-indigo-950">Enter</button>
        </div>
      </motion.div>
    </motion.div>
  )
}
