import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getLawyers, deleteLawyer } from '../services/storage'

function useLawyers() {
  const [lawyers, setLawyers] = useState([])
  useEffect(() => {
    setLawyers(getLawyers())
  }, [])
  return { lawyers, refresh: () => setLawyers(getLawyers()) }
}

function LawyerList() {
  const { lawyers, refresh } = useLawyers()
  const [category, setCategory] = useState('All')
  const [locationQuery, setLocationQuery] = useState('')
  const [sortBy, setSortBy] = useState('price')

  const categories = useMemo(() => {
    const set = new Set(lawyers.map(l => l.expertise))
    return ['All', ...Array.from(set).sort()]
  }, [lawyers])

  const filtered = useMemo(() => {
    let list = [...lawyers]
    if (category !== 'All') {
      list = list.filter(l => l.expertise === category)
    }
    if (locationQuery.trim()) {
      const q = locationQuery.trim().toLowerCase()
      list = list.filter(l => l.location.toLowerCase().includes(q))
    }
    if (sortBy === 'price') {
      list.sort((a, b) => a.pricePerHour - b.pricePerHour)
    } else {
      list.sort((a, b) => b.experienceYears - a.experienceYears)
    }
    return list
  }, [lawyers, category, locationQuery, sortBy])

  function handleDelete(id) {
    deleteLawyer(id)
    refresh()
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Find a Lawyer</h1>
        <Link to="/add" className="primary">Add Lawyer</Link>
      </div>

      <div className="filters">
        <div className="field">
          <label>Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Location</label>
          <input value={locationQuery} onChange={e => setLocationQuery(e.target.value)} placeholder="Search city/country" />
        </div>
        <div className="field">
          <label>Sort by</label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="price">Lowest price</option>
            <option value="experience">Most experienced</option>
          </select>
        </div>
      </div>

      <div className="list">
        {filtered.length === 0 && (
          <div className="empty">
            No lawyers found. Try changing filters or
            {' '}<Link to="/add">add the first lawyer</Link>.
          </div>
        )}
        <ul className="cards">
          {filtered.map(lawyer => (
            <li key={lawyer.id} className="card">
              <div className="card-header">
                <h3>{lawyer.name}</h3>
                <span className="badge">{lawyer.expertise}</span>
              </div>
              <div className="card-body">
                <div className="meta"><strong>Location:</strong> {lawyer.location}</div>
                <div className="meta"><strong>Experience:</strong> {lawyer.experienceYears} years</div>
                <div className="meta"><strong>Price:</strong> ${lawyer.pricePerHour}/hr</div>
                {lawyer.description && <p className="desc">{lawyer.description}</p>}
              </div>
              <div className="card-actions">
                <button className="primary" onClick={() => alert(`Selected ${lawyer.name}`)}>Select</button>
                <button className="danger" onClick={() => handleDelete(lawyer.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default LawyerList