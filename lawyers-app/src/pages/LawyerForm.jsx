import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveLawyer } from '../services/storage'

function LawyerForm() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [expertise, setExpertise] = useState('Corporate Law')
  const [location, setLocation] = useState('')
  const [experienceYears, setExperienceYears] = useState(0)
  const [pricePerHour, setPricePerHour] = useState(0)
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    setError(null)

    if (!name.trim() || !expertise.trim() || !location.trim()) {
      setError('Please fill in name, expertise, and location.')
      return
    }

    if (experienceYears < 0 || pricePerHour < 0) {
      setError('Experience and price must be non-negative.')
      return
    }

    saveLawyer({
      name: name.trim(),
      expertise: expertise.trim(),
      location: location.trim(),
      experienceYears,
      pricePerHour,
      description: description.trim() || undefined,
    })

    navigate('/')
  }

  return (
    <div className="page">
      <h1>Add Lawyer</h1>
      <form className="form" onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <div className="field">
          <label>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" required />
        </div>
        <div className="field">
          <label>Expertise</label>
          <select value={expertise} onChange={e => setExpertise(e.target.value)}>
            <option>Corporate Law</option>
            <option>Criminal Law</option>
            <option>Family Law</option>
            <option>Immigration Law</option>
            <option>Intellectual Property</option>
            <option>Real Estate</option>
            <option>Tax Law</option>
            <option>Labor and Employment</option>
            <option>Bankruptcy</option>
            <option>Personal Injury</option>
          </select>
        </div>
        <div className="field">
          <label>Location</label>
          <input value={location} onChange={e => setLocation(e.target.value)} placeholder="City, Country" required />
        </div>
        <div className="grid">
          <div className="field">
            <label>Experience (years)</label>
            <input
              type="number"
              min={0}
              value={experienceYears}
              onChange={e => setExperienceYears(Number(e.target.value))}
            />
          </div>
          <div className="field">
            <label>Price per hour (USD)</label>
            <input
              type="number"
              min={0}
              value={pricePerHour}
              onChange={e => setPricePerHour(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="field">
          <label>Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Short bio, languages, bar membership, etc." />
        </div>
        <div className="actions">
          <button type="submit" className="primary">Save</button>
          <button type="button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default LawyerForm

