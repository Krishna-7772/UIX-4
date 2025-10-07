import React from 'react'
import { useApp } from '../store/useStore.jsx'
import { formatCurrency } from '../utils/format'
import { motion, AnimatePresence } from 'framer-motion'
import { UpiPayModal } from './UpiPayModal'

export function Summary() {
  const { users, expenses, netBalances, settlements, ui, setUi } = useApp()
  const [payTo, setPayTo] = React.useState(null)
  const [showDetails, setShowDetails] = React.useState(false)

  const items = Object.entries(netBalances).map(([id, amt]) => ({ id, amount: amt, user: users.find(u=>u.id===id) }))

  const copyExport = async () => {
    const lines = settlements.map(s => `${idToName(users, s.from)} owes ${idToName(users, s.to)} ${formatCurrency(s.amount)}`)
    const text = `S.U.Y.O.G — Optimized Settlements\n` + lines.join('\n')
    await navigator.clipboard.writeText(text)
    alert('Summary copied to clipboard!')
  }

  return (
    <section id="summary" className="card-carved p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl">Summary</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-lg border" onClick={copyExport}>Export Summary</button>
          <button className="px-3 py-1 rounded-lg bg-saffron text-indigo-950" onClick={()=>setUi(p=>({...p, showUpi:true}))}>Settle All</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div>
          <h4 className="font-medium mb-2">Net Balances</h4>
          <ul className="space-y-2">
            {items.map(it => (
              <li key={it.id} className="flex items-center justify-between p-2 rounded-lg border">
                <span>{it.user?.name}</span>
                <span className={it.amount>=0? 'text-jade':'text-terracottaRed'}>{formatCurrency(it.amount)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">Optimized Settlements</h4>
          <ul className="space-y-2">
            {settlements.map((s, i) => (
              <motion.li key={i} className="flex items-center justify-between p-2 rounded-lg border"
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                <span>{idToName(users, s.from)} owes {idToName(users, s.to)}</span>
                <span>{formatCurrency(s.amount)}</span>
              </motion.li>
            ))}
            {!settlements.length && <li className="opacity-70">All balanced ✨</li>}
          </ul>
        </div>
      </div>
      <div className="mt-4">
        <button className="px-3 py-1 rounded-lg border" onClick={()=>setShowDetails(v=>!v)} aria-expanded={showDetails}>
          {showDetails ? 'Hide' : 'Show'} Per-Expense Breakdown
        </button>
        <AnimatePresence>
          {showDetails && (
            <motion.div className="mt-3 grid gap-2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              {expenses.map(e => (
                <div key={e.id} className="p-3 rounded-xl border bg-white/70 dark:bg-indigo-900/40">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{e.title} <span className="text-xs opacity-70">({e.category})</span></div>
                    <div className="font-semibold">{formatCurrency(e.amount)}</div>
                  </div>
                  <div className="text-xs opacity-80">Paid by {idToName(users, e.paidBy)} • {new Date(e.date).toLocaleDateString()} • {e.splitMode}
                  </div>
                  <ul className="mt-1 grid grid-cols-2 sm:grid-cols-3 gap-1 text-sm">
                    {Object.entries(e.shares).map(([uid, share]) => (
                      <li key={uid} className="flex items-center justify-between">
                        <span>{idToName(users, uid)}</span>
                        <span>{formatCurrency(share)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <UpiPayModal />
    </section>
  )
}

function idToName(users, id){ return users.find(u=>u.id===id)?.name || id }
