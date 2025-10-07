// Parses phrases like: "Add ₹200 chai by Raj" or "Add 450 pizza by Meena"
export function parseVoicePhrase(phrase, users) {
  const cleaned = phrase.trim()
  const rupee = /₹\s*(\d+(?:\.\d{1,2})?)/i
  const amountMatch = cleaned.match(rupee) || cleaned.match(/\b(\d+(?:\.\d{1,2})?)\b/)
  const amount = amountMatch ? Number(amountMatch[1]) : null
  const byMatch = cleaned.match(/by\s+([a-zA-Z]+)/i)
  const payerName = byMatch ? byMatch[1].toLowerCase() : null
  const payer = users.find(u => u.name.toLowerCase().startsWith(payerName || ''))
  const title = cleaned.replace(/add/i, '').replace(rupee, '').replace(/by\s+\w+/i, '').trim() || 'Untitled'
  return amount && payer ? { title, amount, paidBy: payer.id } : null
}
