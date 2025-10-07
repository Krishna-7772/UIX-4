import React, { useState } from 'react'

const MEMES = [
  { id: 1, url: 'https://i.imgur.com/8Km9tLL.png', caption: 'When chai money is overdue ☕️' },
  { id: 2, url: 'https://i.imgur.com/jNNT4LE.jpeg', caption: 'UPI be like: Ding! 💸' },
  { id: 3, url: 'https://i.imgur.com/Zp9YH.png', caption: 'Teamwork makes dream work ✨' },
]

export function ReminderCenter() {
  const [open, setOpen] = useState(false)
  const [meme, setMeme] = useState(MEMES[0])

  return (
    <section className="card-carved p-4">
      <h3 className="font-display text-lg mb-2">Payment Reminders with Memes</h3>
      <div className="flex items-center gap-2">
        <select className="px-3 py-2 rounded-lg border" value={meme.id} onChange={e=>setMeme(MEMES.find(m=>m.id===Number(e.target.value)))}>
          {MEMES.map(m => <option key={m.id} value={m.id}>{m.caption}</option>)}
        </select>
        <button className="px-3 py-2 rounded-lg bg-saffron text-indigo-950" onClick={()=>setOpen(true)}>Send Reminder</button>
      </div>
      {open && (
        <div className="mt-3 border rounded-xl overflow-hidden">
          <img src={meme.url} alt={meme.caption} className="w-full h-40 object-cover" />
          <div className="p-3 text-sm">S.U.Y.O.G gently nudges: {meme.caption}</div>
          <div className="p-3 pt-0"><button className="px-3 py-1 rounded-lg border" onClick={()=>setOpen(false)}>Close</button></div>
        </div>
      )}
    </section>
  )
}
