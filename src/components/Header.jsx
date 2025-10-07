import React from 'react'
import { useApp } from '../store/useStore.jsx'

export function Header() {
  const { ui, setUi, resetDemo } = useApp()
  const toggleDark = () => {
    const next = !ui.dark
    setUi(prev => ({ ...prev, dark: next }))
    document.documentElement.classList.toggle('dark', next)
  }
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', ui.dark)
  }, [])
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-ivory/70 dark:bg-indigo-950/50 border-b border-sandstone/60">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/assets/lotus.svg" alt="S.U.Y.O.G" className="w-8 h-8" />
          <div>
            <h1 className="font-display text-xl">S.U.Y.O.G — Smart User Yielding Organized Growth</h1>
            <p className="text-sm opacity-80">Where every expense finds harmony, and every friendship grows.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded-lg border focus-ring" onClick={() => setUi(p => ({...p, showAdd: true}))} aria-label="Add Expense">
            + Add Expense
          </button>
          <button className="px-3 py-1 rounded-lg border focus-ring" onClick={toggleDark} aria-label="Toggle dark mode">
            {ui.dark ? 'Light' : 'Dark'} Mode
          </button>
          <button className="px-3 py-1 rounded-lg border focus-ring" onClick={resetDemo} aria-label="Reset demo data">
            Reset Demo Data
          </button>
        </div>
      </div>
    </header>
  )
}
