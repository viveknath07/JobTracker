import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateId } from '../utils/helpers';

const ApplicationContext = createContext(null);

const SAMPLE_APPLICATIONS = [
  {
    id: 'app_sample_1',
    company: 'Google',
    role: 'Frontend Engineer',
    location: 'Remote',
    salary: 150000,
    platform: 'LinkedIn',
    status: 'Interview Scheduled',
    appliedDate: '2025-03-01',
    interviewDate: '2025-03-15',
    notes: 'Great culture, exciting team.',
    bookmarked: true,
  },
  {
    id: 'app_sample_2',
    company: 'Amazon',
    role: 'Software Developer',
    location: 'Seattle',
    salary: 130000,
    platform: 'Indeed',
    status: 'Applied',
    appliedDate: '2025-03-05',
    interviewDate: '',
    notes: '',
    bookmarked: false,
  },
  {
    id: 'app_sample_3',
    company: 'Netflix',
    role: 'React Developer',
    location: 'San Francisco',
    salary: 180000,
    platform: 'Referral',
    status: 'Offer Received',
    appliedDate: '2025-02-20',
    interviewDate: '2025-03-01',
    notes: 'Great offer, reviewing terms.',
    bookmarked: true,
  },
  {
    id: 'app_sample_4',
    company: 'Meta',
    role: 'UI Engineer',
    location: 'New York',
    salary: 160000,
    platform: 'Glassdoor',
    status: 'Rejected',
    appliedDate: '2025-02-10',
    interviewDate: '',
    notes: 'Position was filled internally.',
    bookmarked: false,
  },
  {
    id: 'app_sample_5',
    company: 'Spotify',
    role: 'Product Engineer',
    location: 'Remote',
    salary: 140000,
    platform: 'Company Website',
    status: 'Applied',
    appliedDate: '2025-03-10',
    interviewDate: '',
    notes: '',
    bookmarked: false,
  },
];

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useLocalStorage('job_tracker_apps', SAMPLE_APPLICATIONS);

  const addApplication = (data) => {
    const newApp = { ...data, id: generateId(), bookmarked: false };
    setApplications((prev) => [newApp, ...prev]);
    return newApp;
  };

  const updateApplication = (id, data) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...data } : app))
    );
  };

  const deleteApplication = (id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  const toggleBookmark = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, bookmarked: !app.bookmarked } : app
      )
    );
  };

  return (
    <ApplicationContext.Provider
      value={{ applications, addApplication, updateApplication, deleteApplication, toggleBookmark }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplicationContext() {
  const ctx = useContext(ApplicationContext);
  if (!ctx) throw new Error('useApplicationContext must be used inside ApplicationProvider');
  return ctx;
}
