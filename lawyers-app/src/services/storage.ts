import type { Lawyer } from '../types'

const STORAGE_KEY = 'lawyers'

export function getLawyers(): Lawyer[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Lawyer[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveLawyer(newLawyer: Omit<Lawyer, 'id'>): Lawyer {
  const lawyer: Lawyer = { ...newLawyer, id: crypto.randomUUID() }
  const list = getLawyers()
  list.push(lawyer)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  return lawyer
}

export function setLawyers(lawyers: Lawyer[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lawyers))
}

export function deleteLawyer(id: string): void {
  const list = getLawyers().filter(l => l.id !== id)
  setLawyers(list)
}