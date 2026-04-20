import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiPlus } from 'react-icons/fi';
import { useApplications } from '../hooks/useApplications';
import { useDebounce } from '../hooks/useDebounce';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import { STATUSES } from '../utils/helpers';
import './Applications.css';

const TABS = ['All', ...STATUSES];
const DEFAULT_FILTERS = { status: '', platform: '', location: '', sortBy: '' };

export default function Applications() {
  const { applications, deleteApplication, toggleBookmark } = useApplications();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const debouncedSearch = useDebounce(search, 500);

  const handleDelete = (id) => {
    deleteApplication(id);
    toast.success('Application removed');
  };

  const filtered = useMemo(() => {
    let list = [...applications];

    if (activeTab !== 'All') {
      list = list.filter((a) => a.status === activeTab);
    }
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter(
        (a) =>
          a.company?.toLowerCase().includes(q) ||
          a.role?.toLowerCase().includes(q)
      );
    }
    if (filters.status) list = list.filter((a) => a.status === filters.status);
    if (filters.platform) list = list.filter((a) => a.platform === filters.platform);
    if (filters.location) list = list.filter((a) => a.location === filters.location);
    if (filters.sortBy === 'appliedDate') {
      list.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
    } else if (filters.sortBy === 'salary') {
      list.sort((a, b) => (b.salary || 0) - (a.salary || 0));
    } else if (filters.sortBy === 'company') {
      list.sort((a, b) => (a.company || '').localeCompare(b.company || ''));
    }

    return list;
  }, [applications, activeTab, debouncedSearch, filters]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Applications</h1>
          <p className="page-subtitle">{applications.length} total tracked</p>
        </div>
        <Link to="/applications/new" className="btn-primary">
          <FiPlus size={16} /> Add New
        </Link>
      </div>

      <div className="tabs">
        {TABS.map((tab) => {
          const count = tab === 'All'
            ? applications.length
            : applications.filter((a) => a.status === tab).length;
          return (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              <span className="tab-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <Filters
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(DEFAULT_FILTERS)}
        />
      </div>

      {filtered.length === 0 ? (
        <motion.div className="empty-state" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p>No applications found.</p>
          <Link to="/applications/new" className="btn-primary" style={{ marginTop: '1rem' }}>
            <FiPlus size={16} /> Add your first application
          </Link>
        </motion.div>
      ) : (
        <AnimatePresence>
          <div className="cards-grid">
            {filtered.map((app) => (
              <JobCard
                key={app.id}
                app={app}
                onDelete={handleDelete}
                onToggleBookmark={toggleBookmark}
              />
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
