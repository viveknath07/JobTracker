import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiBookmark, FiMapPin, FiDollarSign, FiCalendar } from 'react-icons/fi';
import { getLogoFromCompany, getStatusColor, getStatusBg, formatDate, formatSalary } from '../utils/helpers';
import './JobCard.css';

export default function JobCard({ app, onDelete, onToggleBookmark }) {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const logoUrl = getLogoFromCompany(app.company);

  return (
    <motion.div
      className="job-card"
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
    >
      <div className="card-header">
        <div className="company-logo">
          {!imgError && logoUrl ? (
            <img src={logoUrl} alt={app.company} onError={() => setImgError(true)} />
          ) : (
            <span>{app.company?.charAt(0)?.toUpperCase()}</span>
          )}
        </div>
        <div className="card-title">
          <h3>{app.role}</h3>
          <p className="company-name">{app.company}</p>
        </div>
        <span
          className="status-badge"
          style={{ color: getStatusColor(app.status), background: getStatusBg(app.status) }}
        >
          {app.status}
        </span>
      </div>

      <div className="card-meta">
        {app.location && (
          <span><FiMapPin size={13} />{app.location}</span>
        )}
        {app.salary && (
          <span><FiDollarSign size={13} />{formatSalary(app.salary)}</span>
        )}
        <span><FiCalendar size={13} />{formatDate(app.appliedDate)}</span>
        {app.platform && (
          <span className="platform-tag">{app.platform}</span>
        )}
      </div>

      {app.notes && <p className="card-notes">{app.notes}</p>}

      <div className="card-actions">
        <button
          className={`btn-icon bookmark ${app.bookmarked ? 'bookmarked' : ''}`}
          onClick={() => onToggleBookmark(app.id)}
          title="Bookmark"
        >
          <FiBookmark size={16} />
        </button>
        <button className="btn-icon edit" onClick={() => navigate(`/applications/${app.id}`)} title="Edit">
          <FiEdit2 size={16} />
        </button>
        <button className="btn-icon delete" onClick={() => onDelete(app.id)} title="Delete">
          <FiTrash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
}
