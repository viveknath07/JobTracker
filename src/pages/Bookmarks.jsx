import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useApplications } from '../hooks/useApplications';
import JobCard from '../components/JobCard';
import { FiBookmark } from 'react-icons/fi';
import './Bookmarks.css';

export default function Bookmarks() {
  const { applications, deleteApplication, toggleBookmark } = useApplications();
  const bookmarked = applications.filter((a) => a.bookmarked);

  const handleDelete = (id) => {
    deleteApplication(id);
    toast.success('Application removed');
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Bookmarks</h1>
          <p className="page-subtitle">{bookmarked.length} saved application{bookmarked.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {bookmarked.length === 0 ? (
        <div className="empty-state">
          <FiBookmark size={40} color="#374151" />
          <p>No bookmarks yet.</p>
          <small>Click the bookmark icon on any application to save it here.</small>
        </div>
      ) : (
        <AnimatePresence>
          <div className="cards-grid">
            {bookmarked.map((app) => (
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
