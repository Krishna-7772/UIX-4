import React from 'react'

export function Footer() {
  return (
    <footer className="mt-10 border-t border-sandstone/60">
      <div className="container mx-auto px-4 py-6 text-sm flex flex-col md:flex-row items-center justify-between gap-2">
        <span>Built by Krishna Pandey – Powered by S.U.Y.O.G — Smart User Yielding Organized Growth 🌺</span>
        <a href="https://github.com/" className="underline opacity-70 hover:opacity-100" aria-label="Project source">Source</a>
      </div>
    </footer>
  )
}
