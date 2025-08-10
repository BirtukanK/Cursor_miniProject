const STORAGE_KEY = 'lawyers'

export function getLawyers() {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveLawyer(newLawyer) {
  const lawyer = { ...newLawyer, id: (crypto?.randomUUID ? crypto.randomUUID() : String(Date.now())) }
  const list = getLawyers()
  list.push(lawyer)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  return lawyer
}

export function setLawyers(lawyers) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lawyers))
}

export function deleteLawyer(id) {
  const list = getLawyers().filter(l => l.id !== id)
  setLawyers(list)
}