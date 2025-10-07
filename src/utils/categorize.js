const MAP = [
  [/pizza|chai|snack|dinner|lunch|food/i, 'Food'],
  [/uber|ola|cab|airport|train|bus|travel/i, 'Travel'],
  [/rent|utilities|bill|electric|gas|water/i, 'Home'],
  [/movie|netflix|show|concert/i, 'Entertainment'],
  [/stationery|print|book|pen/i, 'Misc'],
]

export function categorizeTitle(title) {
  for (const [re, cat] of MAP) if (re.test(title)) return cat
  return 'General'
}
