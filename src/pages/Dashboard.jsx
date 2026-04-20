import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiAward, FiXCircle, FiPlus } from 'react-icons/fi';
import { useApplications } from '../hooks/useApplications';
import { StatusPieChart, MonthlyBarChart } from '../components/Charts';
import './Dashboard.css';

const MetricCard = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    className="metric-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    style={{ '--accent': color }}
  >
    <div className="metric-icon" style={{ background: `${color}20` }}>
      <Icon size={22} color={color} />
    </div>
    <div>
      <p className="metric-label">{label}</p>
      <h2 className="metric-value">{value}</h2>
    </div>
  </motion.div>
);

export default function Dashboard() {
  const { applications } = useApplications();
  const total = applications.length;
  const interviews = applications.filter((a) => a.status === 'Interview Scheduled').length;
  const offers = applications.filter((a) => a.status === 'Offer Received').length;
  const rejected = applications.filter((a) => a.status === 'Rejected').length;

  return (
    <div className="page dashboard-page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="page-subtitle">Your job search at a glance</p>
        </div>
        <Link to="/applications/new" className="btn-primary">
          <FiPlus size={16} /> Add Application
        </Link>
      </div>

      <div className="metrics-grid">
        <MetricCard icon={FiBriefcase} label="Total Applied" value={total} color="#6366f1" delay={0} />
        <MetricCard icon={FiCalendar} label="Interviews" value={interviews} color="#f59e0b" delay={0.05} />
        <MetricCard icon={FiAward} label="Offers" value={offers} color="#10b981" delay={0.1} />
        <MetricCard icon={FiXCircle} label="Rejected" value={rejected} color="#ef4444" delay={0.15} />
      </div>

      <div className="charts-grid">
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h3 className="chart-title">Status Breakdown</h3>
          <StatusPieChart applications={applications} />
        </motion.div>

        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <h3 className="chart-title">Monthly Applications</h3>
          <MonthlyBarChart applications={applications} />
        </motion.div>
      </div>
    </div>
  );
}
