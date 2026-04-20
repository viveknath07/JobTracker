import { NavLink } from 'react-router-dom';
import { FiBriefcase, FiGrid, FiBarChart2, FiBookmark } from 'react-icons/fi';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <FiBriefcase size={24} />
        <span>JobTracker</span>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <FiGrid size={18} />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/applications" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <FiBriefcase size={18} />
            Applications
          </NavLink>
        </li>
        <li>
          <NavLink to="/analytics" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <FiBarChart2 size={18} />
            Analytics
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookmarks" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <FiBookmark size={18} />
            Bookmarks
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
