import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';
import { STATUSES, getStatusColor } from '../utils/helpers';
import './Charts.css';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-label">{payload[0].name}</p>
        <p className="tooltip-value">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export function StatusPieChart({ applications }) {
  const data = STATUSES.map((s) => ({
    name: s,
    value: applications.filter((a) => a.status === s).length,
  })).filter((d) => d.value > 0);

  if (data.length === 0) {
    return <div className="chart-empty">No data yet</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={85}
          innerRadius={45}
          paddingAngle={3}
          stroke="none"
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={getStatusColor(entry.name)} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={10}
          formatter={(val) => <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>{val}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function MonthlyBarChart({ applications }) {
  const monthCounts = {};
  applications.forEach((app) => {
    if (!app.appliedDate) return;
    const d = new Date(app.appliedDate);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    monthCounts[key] = (monthCounts[key] || 0) + 1;
  });

  const data = Object.entries(monthCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, count]) => ({
      month: new Date(month + '-01').toLocaleString('default', { month: 'short', year: '2-digit' }),
      Applications: count,
    }));

  if (data.length === 0) {
    return <div className="chart-empty">No data yet</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis allowDecimals={false} tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ background: '#0f0f1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
          labelStyle={{ color: '#c7d2fe' }}
          itemStyle={{ color: '#818cf8' }}
        />
        <Bar dataKey="Applications" fill="#6366f1" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
