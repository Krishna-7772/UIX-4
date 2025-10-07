// Minimize number of transfers using greedy match between largest creditor and debtor
export function minimizeSettlements(netMap) {
  const creditors = [] // {id, amount}
  const debtors = [] // {id, amount}
  for (const [id, amt] of Object.entries(netMap)) {
    if (amt > 0.01) creditors.push({ id, amount: amt })
    else if (amt < -0.01) debtors.push({ id, amount: -amt }) // store as positive for ease
  }
  creditors.sort((a, b) => b.amount - a.amount)
  debtors.sort((a, b) => b.amount - a.amount)
  const transfers = []
  let i = 0, j = 0
  while (i < creditors.length && j < debtors.length) {
    const give = creditors[i]
    const take = debtors[j]
    const amt = Math.min(give.amount, take.amount)
    transfers.push({ from: take.id, to: give.id, amount: round2(amt) })
    give.amount -= amt
    take.amount -= amt
    if (give.amount <= 0.01) i++
    if (take.amount <= 0.01) j++
  }
  return transfers
}

export function round2(n) { return Math.round(n * 100) / 100 }
