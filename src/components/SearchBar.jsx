import { FiSearch, FiX } from 'react-icons/fi';
import './SearchBar.css';

export default function SearchBar({ value, onChange, placeholder = 'Search by company or role...' }) {
  return (
    <div className="search-bar">
      <FiSearch size={16} className="search-icon" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')}>
          <FiX size={14} />
        </button>
      )}
    </div>
  );
}
