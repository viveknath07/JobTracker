import { format, parseISO, isValid } from 'date-fns';

export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  try {
    const d = typeof dateStr === 'string' ? parseISO(dateStr) : new Date(dateStr);
    return isValid(d) ? format(d, 'MMM dd, yyyy') : '—';
  } catch {
    return '—';
  }
};

export const formatSalary = (salary) => {
  if (!salary) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(salary);
};

export const getStatusColor = (status) => {
  const map = {
    'Applied': '#3b82f6',
    'Interview Scheduled': '#f59e0b',
    'Offer Received': '#10b981',
    'Rejected': '#ef4444',
  };
  return map[status] || '#6b7280';
};

export const getStatusBg = (status) => {
  const map = {
    'Applied': '#1e3a5f',
    'Interview Scheduled': '#4a3500',
    'Offer Received': '#063a2a',
    'Rejected': '#3b0f0f',
  };
  return map[status] || '#1f2937';
};

export const generateId = () => `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const STATUSES = ['Applied', 'Interview Scheduled', 'Offer Received', 'Rejected'];
export const PLATFORMS = ['LinkedIn', 'Indeed', 'Glassdoor', 'Company Website', 'Referral', 'Other'];

export const getLogoFromCompany = (company) => {
  if (!company) return null;
  const domainMap = {
    Google: 'google.com',
    Apple: 'apple.com',
    Microsoft: 'microsoft.com',
    Amazon: 'amazon.com',
    Meta: 'meta.com',
    Netflix: 'netflix.com',
    Tesla: 'tesla.com',
    Uber: 'uber.com',
    Airbnb: 'airbnb.com',
    Spotify: 'spotify.com',
    Adobe: 'adobe.com',
    Salesforce: 'salesforce.com',
  };
  const key = Object.keys(domainMap).find((k) =>
    company.toLowerCase().includes(k.toLowerCase())
  );
  if (key) return `https://logo.clearbit.com/${domainMap[key]}`;
  const slug = company.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
  return `https://logo.clearbit.com/${slug}.com`;
};
