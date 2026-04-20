import { useApplicationContext } from '../context/ApplicationContext';

export function useApplications() {
  const { applications, addApplication, updateApplication, deleteApplication, toggleBookmark } =
    useApplicationContext();

  const getById = (id) => applications.find((app) => app.id === id);

  const getByStatus = (status) => applications.filter((app) => app.status === status);

  const getBookmarked = () => applications.filter((app) => app.bookmarked);

  return {
    applications,
    addApplication,
    updateApplication,
    deleteApplication,
    toggleBookmark,
    getById,
    getByStatus,
    getBookmarked,
  };
}
