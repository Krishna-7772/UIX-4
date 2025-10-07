import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AppProvider, useApp } from './store/useStore'
import { Hero } from './components/Hero'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { AddExpenseModal } from './components/AddExpenseModal'
import { Summary } from './components/Summary'
import { Timeline } from './components/Timeline'
import { Leaderboard } from './components/Leaderboard'
import { LotusVoice } from './components/LotusVoice'
import { ReminderCenter } from './components/ReminderCenter'
import { Onboarding } from './components/Onboarding'
import { Confetti } from './components/Confetti'

export function AppRoot() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  )
}

export function App() {
  const { ui } = useApp()
  const [showOnboarding, setShowOnboarding] = useState(true)

  useEffect(() => {
    const seen = localStorage.getItem('suyog_seen_onboarding')
    if (seen) setShowOnboarding(false)
  }, [])

  const closeOnboarding = () => {
    localStorage.setItem('suyog_seen_onboarding', '1')
    setShowOnboarding(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-mandala">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 space-y-8">
        <Hero />
        <div className="grid md:grid-cols-3 gap-6">
          <section className="md:col-span-2 space-y-6">
            <Summary />
            <Timeline />
          </section>
          <aside className="space-y-6">
            <Leaderboard />
            <LotusVoice />
            <ReminderCenter />
          </aside>
        </div>
      </main>
      <Footer />
      <AnimatePresence>{ui.showAdd && <AddExpenseModal />}</AnimatePresence>
      <AnimatePresence>
        {ui.confetti ? <Confetti key={ui.confetti} /> : null}
      </AnimatePresence>
      <AnimatePresence>
        {showOnboarding && (
          <Onboarding onClose={closeOnboarding} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default AppRoot
