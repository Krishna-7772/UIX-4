import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../store/useStore.jsx'

export function UpiPayModal() {
  const { ui, setUi, users, settlements, settleAll } = useApp()
  const [confirming, setConfirming] = React.useState(false)
  const total = settlements.reduce((a,s)=> a + s.amount, 0)

  const onClose = () => setUi(p=>({...p, showUpi:false}))

  const onConfirm = async () => {
    setConfirming(true)
    await new Promise(r => setTimeout(r, 900))
    settleAll()
    setUi(p=>({...p, showUpi:false, confetti: Date.now()}))
    setConfirming(false)
    alert('S.U.Y.O.G Payment Portal: Settlements simulated ✓')
  }

  return (
    <AnimatePresence>
      {ui.showUpi && (
        <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="relative w-full max-w-md card-carved p-6 temple-arch"
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
            <h3 className="font-display text-xl mb-2">S.U.Y.O.G Payment Portal</h3>
            <p className="opacity-80 text-sm">Mock UPI settlement flow. Total to settle (netted): <strong>₹{Math.round(total)}</strong></p>
            <div className="mt-4 rounded-xl border p-3">
              <div className="text-sm">UPI ID</div>
              <div className="font-mono">group@suyog</div>
              <motion.div className="mt-4 h-2 rounded-full feather-gradient" initial={{ width: '0%' }} animate={{ width: confirming? '100%':'0%' }} />
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-saffron text-indigo-950" disabled={confirming}>{confirming?'Processing…':'Pay Now'}</button>
              <button onClick={onClose} className="px-4 py-2 rounded-lg border">Close</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
