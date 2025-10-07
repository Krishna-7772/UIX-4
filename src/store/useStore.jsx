import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { demoUsers, demoExpenses } from '../data/demo'
import { minimizeSettlements } from '../utils/settlement'
import { categorizeTitle } from '../utils/categorize'
import { loadFromStorage, saveToStorage } from '../utils/storage'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [users, setUsers] = useState(() => loadFromStorage('users', demoUsers))
  const [expenses, setExpenses] = useState(() => loadFromStorage('expenses', demoExpenses))
  const [karma, setKarma] = useState(() => loadFromStorage('karma', Object.fromEntries(demoUsers.map(u => [u.id, 0]))))
  const [ui, setUi] = useState({ showAdd: false, dark: loadFromStorage('dark', false), sound: false, showUpi: false, confetti: 0 })

  useEffect(() => { saveToStorage('users', users) }, [users])
  useEffect(() => { saveToStorage('expenses', expenses) }, [expenses])
  useEffect(() => { saveToStorage('karma', karma) }, [karma])
  useEffect(() => { saveToStorage('dark', ui.dark) }, [ui.dark])

  const addExpense = (payload) => {
    const withCat = { ...payload, category: categorizeTitle(payload.title) }
    setExpenses(prev => [{ id: crypto.randomUUID(), date: new Date().toISOString(), ...withCat }, ...prev])
  }

  const resetDemo = () => {
    setUsers(demoUsers)
    setExpenses(demoExpenses)
    setKarma(Object.fromEntries(demoUsers.map(u => [u.id, 0])))
  }

  const netBalances = useMemo(() => {
    const map = Object.fromEntries(users.map(u => [u.id, 0]))
    for (const exp of expenses) {
      const total = exp.amount
      // paid by exp.paidBy, shares in exp.shares: {userId: amount}
      map[exp.paidBy] += total
      for (const [uid, share] of Object.entries(exp.shares)) {
        map[uid] -= share
      }
    }
    return map
  }, [expenses, users])

  const settlements = useMemo(() => minimizeSettlements(netBalances), [netBalances])

  const awardKarma = (uid, delta) => setKarma(prev => ({ ...prev, [uid]: (prev[uid] || 0) + delta }))

  const settleAll = () => {
    // Simulate success: award +10 to payers, -5 to late ones (debtors)
    const creditors = Object.entries(netBalances).filter(([, v]) => v > 0).map(([id]) => id)
    const debtors = Object.entries(netBalances).filter(([, v]) => v < 0).map(([id]) => id)
    creditors.forEach(id => awardKarma(id, 10))
    debtors.forEach(id => awardKarma(id, -5))
  }

  const value = {
    users,
    setUsers,
    expenses,
    addExpense,
    setExpenses,
    karma,
    awardKarma,
    ui,
    setUi,
    resetDemo,
    netBalances,
    settlements,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
