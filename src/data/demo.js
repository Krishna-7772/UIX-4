export const demoUsers = [
  { id: 'raj', name: 'Raj', upi: 'raj@upi', avatarColor: '#1CA9C9' },
  { id: 'meena', name: 'Meena', upi: 'meena@upi', avatarColor: '#FFC145' },
  { id: 'arjun', name: 'Arjun', upi: 'arjun@upi', avatarColor: '#2FBF71' },
  { id: 'priya', name: 'Priya', upi: 'priya@upi', avatarColor: '#C75C5C' },
]

// Six sample expenses covering all split modes
export const demoExpenses = [
  {
    id: 'e6',
    title: 'Cab from airport',
    amount: 1200,
    paidBy: 'arjun',
    participants: ['raj', 'meena', 'arjun', 'priya'],
    splitMode: 'equal',
    shares: { raj: 300, meena: 300, arjun: 300, priya: 300 },
    date: new Date(Date.now() - 3600*24*6*1000).toISOString(),
    category: 'Travel'
  },
  {
    id: 'e5',
    title: 'Pizza night',
    amount: 800,
    paidBy: 'raj',
    participants: ['raj', 'meena', 'arjun', 'priya'],
    splitMode: 'percentage',
    percentages: { raj: 25, meena: 25, arjun: 25, priya: 25 },
    shares: { raj: 200, meena: 200, arjun: 200, priya: 200 },
    date: new Date(Date.now() - 3600*24*5*1000).toISOString(),
    category: 'Food'
  },
  {
    id: 'e4',
    title: 'Movie tickets',
    amount: 1200,
    paidBy: 'meena',
    participants: ['raj', 'meena', 'arjun', 'priya'],
    splitMode: 'custom',
    shares: { raj: 300, meena: 300, arjun: 300, priya: 300 },
    date: new Date(Date.now() - 3600*24*4*1000).toISOString(),
    category: 'Entertainment'
  },
  {
    id: 'e3',
    title: 'Rent utilities',
    amount: 4000,
    paidBy: 'priya',
    participants: ['raj', 'meena', 'arjun', 'priya'],
    splitMode: 'percentage',
    percentages: { raj: 20, meena: 30, arjun: 25, priya: 25 },
    shares: { raj: 800, meena: 1200, arjun: 1000, priya: 1000 },
    date: new Date(Date.now() - 3600*24*3*1000).toISOString(),
    category: 'Home'
  },
  {
    id: 'e2',
    title: 'Breakfast chai & snacks',
    amount: 300,
    paidBy: 'raj',
    participants: ['raj', 'meena', 'arjun'],
    splitMode: 'equal',
    shares: { raj: 100, meena: 100, arjun: 100 },
    date: new Date(Date.now() - 3600*24*2*1000).toISOString(),
    category: 'Food'
  },
  {
    id: 'e1',
    title: 'Stationery & prints',
    amount: 500,
    paidBy: 'meena',
    participants: ['meena', 'arjun', 'priya'],
    splitMode: 'custom',
    shares: { meena: 100, arjun: 200, priya: 200 },
    date: new Date(Date.now() - 3600*24*1*1000).toISOString(),
    category: 'Misc'
  },
]
