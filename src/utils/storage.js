export function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(`suyog_${key}`)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(`suyog_${key}` , JSON.stringify(value))
  } catch {}
}
