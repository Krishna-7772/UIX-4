import React from 'react'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <div className="relative overflow-hidden rounded-3xl p-6 md:p-10 card-carved bg-white/70 dark:bg-indigo-900/40">
      <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full border-4 border-peacock/30 animate-ripple" />
      <motion.div
        className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full border-4 border-saffron/30"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
      />
      <div className="relative">
        <h2 className="font-display text-2xl md:text-3xl mb-2">S.U.Y.O.G — Smart User Yielding Organized Growth</h2>
        <p className="opacity-80 mb-6">Where every expense finds harmony, and every friendship grows.</p>
        <div className="flex gap-3 flex-wrap">
          <a href="#summary" className="px-4 py-2 rounded-lg text-indigo-950 bg-saffron font-medium focus-ring">Enter the Flow of Balance</a>
          <a href="#timeline" className="px-4 py-2 rounded-lg border focus-ring">Explore History</a>
        </div>
      </div>
    </div>
  )
}
