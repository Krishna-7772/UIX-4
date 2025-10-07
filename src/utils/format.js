export const formatCurrency = (n) => `₹${(Math.round(n*100)/100).toLocaleString('en-IN')}`
