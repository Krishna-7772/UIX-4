import React, { useState } from 'react'
import { useApp } from '../store/useStore.jsx'
import { parseVoicePhrase } from '../utils/voiceParser'

export function LotusVoice() {
  const { users, addExpense } = useApp()
  const [listening, setListening] = useState(false)
  const [input, setInput] = useState('')

  const submit = () => {
    const parsed = parseVoicePhrase(input, users)
    if (!parsed) { alert('Could not parse phrase. Try: "Add ₹200 chai by Raj"'); return }
    addExpense({ ...parsed, participants: users.map(u=>u.id), splitMode: 'equal', shares: Object.fromEntries(users.map(u => [u.id, Math.round(parsed.amount/users.length)])) })
    setInput('')
    setListening(false)
  }

  return (
    <section className="card-carved p-4">
      <h3 className="font-display text-lg">Lotus Voice Input (simulated)</h3>
      <div className="mt-2 flex items-center gap-3">
        <button className={`relative w-12 h-12 rounded-full bg-peacock/80 ${listening?'animate-pulseLotus':''}`} onClick={()=>setListening(v=>!v)} aria-label="Toggle voice input">
          <span className="absolute inset-0 rounded-full border-4 border-white/40" />
        </button>
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Add ₹200 chai by Raj" className="flex-1 px-3 py-2 rounded-lg border" />
        <button className="px-3 py-2 rounded-lg bg-saffron text-indigo-950" onClick={submit}>Add</button>
      </div>
    </section>
  )
}
