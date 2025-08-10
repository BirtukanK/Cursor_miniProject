import './App.css'
import { Link, Route, Routes, NavLink } from 'react-router-dom'
import LawyerList from './pages/LawyerList'
import LawyerForm from './pages/LawyerForm'

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <nav className="nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Lawyers</NavLink>
          <NavLink to="/add" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Add Lawyer</NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<LawyerList />} />
          <Route path="/add" element={<LawyerForm />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <span>
          Built with React + Vite
        </span>
        <Link to="/add" className="cta">Add a lawyer</Link>
      </footer>
    </div>
  )
}

export default App
