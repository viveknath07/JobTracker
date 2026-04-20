import { STATUSES, PLATFORMS } from '../utils/helpers';
import './Filters.css';

const LOCATIONS = ['Remote', 'New York', 'San Francisco', 'Austin', 'Seattle'];

export default function Filters({ filters, onChange, onReset }) {
  const hasActive = filters.status || filters.platform || filters.location;

  return (
    <div className="filters">
      <select
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
        className="filter-select"
      >
        <option value="">All Statuses</option>
        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>

      <select
        value={filters.platform}
        onChange={(e) => onChange({ ...filters, platform: e.target.value })}
        className="filter-select"
      >
        <option value="">All Platforms</option>
        {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
      </select>

      <select
        value={filters.location}
        onChange={(e) => onChange({ ...filters, location: e.target.value })}
        className="filter-select"
      >
        <option value="">All Locations</option>
        {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
      </select>

      <select
        value={filters.sortBy}
        onChange={(e) => onChange({ ...filters, sortBy: e.target.value })}
        className="filter-select"
      >
        <option value="">Sort By</option>
        <option value="appliedDate">Applied Date</option>
        <option value="salary">Salary</option>
        <option value="company">Company Name</option>
      </select>

      {hasActive && (
        <button className="btn-reset" onClick={onReset}>Reset</button>
      )}
    </div>
  );
}
