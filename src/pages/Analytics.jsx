import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useApplications } from '../hooks/useApplications';
import { StatusPieChart, MonthlyBarChart } from '../components/Charts';
import { STATUSES, getStatusColor, formatSalary } from '../utils/helpers';
import './Analytics.css';

export default function Analytics() {
  const { applications } = useApplications();

  const stats = useMemo(() => {
    const salaries = applications.filter((a) => a.salary).map((a) => a.salary);
    const avgSalary = salaries.length ? Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length) : 0;
    const maxSalary = salaries.length ? Math.max(...salaries) : 0;
    const successRate = applications.length
      ? Math.round((applications.filter((a) => a.status === 'Offer Received').length / applications.length) * 100)
      : 0;
    const platforms = applications.reduce((acc, a) => {
      if (a.platform) acc[a.platform] = (acc[a.platform] || 0) + 1;
      return acc;
    }, {});
    const topPlatform = Object.entries(platforms).sort((a, b) => b[1] - a[1])[0];
    return { avgSalary, maxSalary, successRate, topPlatform };
  }, [applications]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Analytics</h1>
          <p className="page-subtitle">Detailed insights into your job search</p>
        </div>
      </div>

      <div className="analytics-stats">
        {[
          { label: 'Avg. Salary', value: stats.avgSalary ? formatSalary(stats.avgSalary) : '—' },
          { label: 'Max Salary', value: stats.maxSalary ? formatSalary(stats.maxSalary) : '—' },
          { label: 'Success Rate', value: `${stats.successRate}%` },
          { label: 'Top Platform', value: stats.topPlatform ? stats.topPlatform[0] : '—' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            className="analytics-stat"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <p className="stat-label">{s.label}</p>
            <h2 className="stat-value">{s.value}</h2>
          </motion.div>
        ))}
      </div>

      <div className="analytics-grid">
        <div className="chart-card">
          <h3 className="chart-title">Status Distribution</h3>
          <StatusPieChart applications={applications} />
          <div className="status-breakdown">
            {STATUSES.map((s) => {
              const count = applications.filter((a) => a.status === s).length;
              const pct = applications.length ? Math.round((count / applications.length) * 100) : 0;
              return (
                <div key={s} className="status-row">
                  <div className="status-dot" style={{ background: getStatusColor(s) }} />
                  <span className="status-name">{s}</span>
                  <span className="status-count">{count}</span>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${pct}%`, background: getStatusColor(s) }} />
                  </div>
                  <span className="status-pct">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Monthly Activity</h3>
          <MonthlyBarChart applications={applications} />
        </div>
      </div>
    </div>
  );
}
