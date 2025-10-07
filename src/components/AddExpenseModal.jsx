import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../store/useStore.jsx'
import { MandalaCard } from './MandalaCard'
import { formatCurrency } from '../utils/format'

export function AddExpenseModal() {
  const { users, setUi, addExpense } = useApp()
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [paidBy, setPaidBy] = useState(users[0]?.id)
  const [participants, setParticipants] = useState(users.map(u => u.id))
  const [mode, setMode] = useState('equal') // equal | percentage | custom
  const [percentages, setPercentages] = useState(Object.fromEntries(users.map(u => [u.id, Math.round(100/users.length)])))
  const [custom, setCustom] = useState(Object.fromEntries(users.map(u => [u.id, 0])))
  const [error, setError] = useState('')

  const parsedAmount = Number(amount) || 0

  const shares = useMemo(() => {
    if (mode === 'equal') {
      const each = parsedAmount / participants.length
      return Object.fromEntries(participants.map(id => [id, round2(each)]))
    }
    if (mode === 'percentage') {
      return Object.fromEntries(participants.map(id => [id, round2(parsedAmount * ((percentages[id]||0)/100))]))
    }
    if (mode === 'custom') {
      return Object.fromEntries(participants.map(id => [id, Number(custom[id]||0)]))
    }
    return {}
  }, [mode, parsedAmount, percentages, custom, participants])

  const isValid = useMemo(() => {
    if (!title.trim()) { setError('Title is required'); return false }
    if (parsedAmount <= 0) { setError('Amount must be positive'); return false }
    if (!paidBy) { setError('Select who paid'); return false }
    if (!participants.length) { setError('Pick at least one participant'); return false }
    if (mode === 'percentage') {
      const sum = participants.reduce((a,id)=> a + Number(percentages[id]||0), 0)
      if (Math.round(sum) !== 100) { setError('Percentages must sum to 100%'); return false }
    }
    if (mode === 'custom') {
      const sum = participants.reduce((a,id)=> a + Number(custom[id]||0), 0)
      if (Math.round(sum*100)/100 !== Math.round(parsedAmount*100)/100) { setError('Custom shares must sum to total'); return false }
    }
    setError('');
    return true
  }, [title, parsedAmount, paidBy, participants, mode, percentages, custom])

  const confirm = () => {
    if (!isValid) return
    addExpense({
      title: title.trim(),
      amount: round2(parsedAmount),
      paidBy,
      participants: [...participants],
      splitMode: mode,
      shares,
      percentages: mode === 'percentage' ? percentages : undefined,
    })
    setUi(p => ({ ...p, showAdd: false }))
    alert('Expense added — S.U.Y.O.G balance updated ⚖️')
  }

  return (
    <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-modal aria-label="Add expense">
      <motion.div className="relative w-full max-w-3xl card-carved p-4 sm:p-6 temple-arch"
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
        <div className="flex items-start gap-4 flex-col md:flex-row">
          <div className="flex-1 space-y-3 w-full">
            <h3 className="font-display text-xl">Add Expense</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="text-sm">Title<input className="w-full mt-1 px-3 py-2 rounded-lg border focus-ring" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Dinner, Rent..."/></label>
              <label className="text-sm">Amount (₹)<input className="w-full mt-1 px-3 py-2 rounded-lg border focus-ring" value={amount} onChange={e=>setAmount(e.target.value)} type="number" min="0" step="0.01"/></label>
              <label className="text-sm">Who Paid<select className="w-full mt-1 px-3 py-2 rounded-lg border focus-ring" value={paidBy} onChange={e=>setPaidBy(e.target.value)}>
                {users.map(u=> <option key={u.id} value={u.id}>{u.name}</option>)}
              </select></label>
              <fieldset className="text-sm"><legend>Participants</legend>
                <div className="flex flex-wrap gap-2 mt-1">
                  {users.map(u => (
                    <label key={u.id} className={`px-3 py-1 rounded-full border cursor-pointer select-none ${participants.includes(u.id)?'bg-peacock/10 border-peacock':'opacity-80'}`}>
                      <input type="checkbox" className="hidden" checked={participants.includes(u.id)} onChange={() => toggleParticipant(participants, setParticipants, u.id)} />
                      {u.name}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="mt-2">
              <div className="flex items-center gap-2 text-sm">
                <button className={`px-3 py-1 rounded-lg border ${mode==='equal'?'bg-peacock/10 border-peacock':''}`} onClick={()=>setMode('equal')}>Equal</button>
                <button className={`px-3 py-1 rounded-lg border ${mode==='percentage'?'bg-peacock/10 border-peacock':''}`} onClick={()=>setMode('percentage')}>Percentage</button>
                <button className={`px-3 py-1 rounded-lg border ${mode==='custom'?'bg-peacock/10 border-peacock':''}`} onClick={()=>setMode('custom')}>Custom</button>
              </div>
              {mode === 'percentage' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                  {participants.map(id => (
                    <div key={id} className="text-sm">
                      <div className="flex items-center justify-between"><span>{id}</span><span>{percentages[id]||0}%</span></div>
                      <input type="range" min="0" max="100" value={percentages[id]||0} onChange={e => setPercentages(p => ({ ...p, [id]: Number(e.target.value) }))} />
                      <input type="number" className="w-full mt-1 px-2 py-1 rounded border" value={percentages[id]||0} onChange={e => setPercentages(p => ({ ...p, [id]: Number(e.target.value) }))} />
                    </div>
                  ))}
                </div>
              )}
              {mode === 'custom' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                  {participants.map(id => (
                    <label key={id} className="text-sm">{id}
                      <input type="number" min="0" step="0.01" className="w-full mt-1 px-2 py-1 rounded border" value={custom[id]||0} onChange={e => setCustom(p => ({ ...p, [id]: Number(e.target.value) }))} />
                    </label>
                  ))}
                </div>
              )}
            </div>
            {!!error && <p className="text-red-600 text-sm" role="alert">{error}</p>}

            <div className="flex items-center gap-2 mt-2">
              <button className="px-4 py-2 rounded-lg bg-saffron text-indigo-950 focus-ring" onClick={confirm}>Add Expense</button>
              <button className="px-4 py-2 rounded-lg border focus-ring" onClick={()=>setUi(p => ({...p, showAdd:false}))}>Cancel</button>
            </div>
          </div>
          <div className="md:w-[320px] w-full">
            <MandalaCard title={title||'Preview'} amount={parsedAmount} shares={shares} participants={participants} />
            <div className="mt-3 text-sm">
              <h4 className="font-medium mb-1">Live Split Preview</h4>
              <ul className="space-y-1">
                {participants.map(id => (
                  <li key={id} className="flex justify-between"><span>{id}</span><span>{formatCurrency(shares[id]||0)}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function toggleParticipant(list, setList, id) {
  setList(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id])
}

function round2(n){ return Math.round(n*100)/100 }
