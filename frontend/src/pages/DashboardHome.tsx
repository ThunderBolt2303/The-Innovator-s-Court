import React, { useEffect, useState } from 'react';
import { ShieldAlert, ShieldCheck, Activity, AlertTriangle, Search } from 'lucide-react';
import { fetchThreatStats, fetchRecentActivity } from '../services/api';
import type { ThreatStats, LogEvent } from '../types';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

export default function DashboardHome() {
  const [stats, setStats] = useState<ThreatStats | null>(null);
  const [activity, setActivity] = useState<LogEvent[]>([]);

  const loadData = async () => {
    try {
      const [statsData, activityData] = await Promise.all([
        fetchThreatStats(),
        fetchRecentActivity()
      ]);
      setStats(statsData);
      setActivity(activityData);
    } catch (error) {
      console.error("Error loading dashboard data", error);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!stats) return <div className="flex h-full items-center justify-center text-primary animate-pulse text-2xl font-semibold">Initializing Framework...</div>;

  const pieData = [
    { name: 'Normal', value: stats.normal_count, color: '#10b981' },
    { name: 'Suspicious', value: stats.suspicious_count, color: '#fbbf24' },
    { name: 'High-Risk', value: stats.high_risk_count, color: '#f43f5e' },
  ];

  const timeSeriesData = activity.slice(0, 30).reverse().map(log => ({
    time: new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    anomaly_score: log.anomaly_score
  }));

  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Total Traffic Analyzed" value={stats.total_events} icon={<Activity />} color="text-primary" />
        <KpiCard title="Normal Requests" value={stats.normal_count} icon={<ShieldCheck />} color="text-success" />
        <KpiCard title="Suspicious Activity" value={stats.suspicious_count} icon={<Search />} color="text-warning" />
        <KpiCard title="High-Risk Threats Blocked" value={stats.high_risk_count} icon={<ShieldAlert />} color="text-danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart: Anomaly Score Timeline */}
        <div className="lg:col-span-2 bg-card rounded-xl p-5 border border-slate-700/50 shadow-lg">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Anomaly Detection (Isolation Forest)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" tick={{fontSize: 12}} />
                <YAxis stroke="#64748b" domain={[0, 1]} tick={{fontSize: 12}} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#38bdf8' }}
                />
                <Line type="monotone" dataKey="anomaly_score" stroke="#38bdf8" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart: Threat Distribution */}
        <div className="bg-card rounded-xl p-5 border border-slate-700/50 shadow-lg flex flex-col">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Threat Classification</h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table: Recent Activity */}
      <div className="bg-card rounded-xl border border-slate-700/50 shadow-lg overflow-hidden">
        <div className="p-5 border-b border-slate-700/50 bg-slate-800/30 flex justify-between items-center">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Live System Activity</h3>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="text-xs text-primary font-medium tracking-wide">LIVE STREAM</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-400 bg-slate-900/50 border-b border-slate-700/50 uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold">Timestamp</th>
                <th className="px-6 py-4 font-semibold">Source IP</th>
                <th className="px-6 py-4 font-semibold">Endpoint</th>
                <th className="px-6 py-4 font-semibold">AI Score</th>
                <th className="px-6 py-4 font-semibold">Pattern Match</th>
                <th className="px-6 py-4 font-semibold">Threat Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {activity.slice(0, 15).map((log) => (
                <tr key={log.id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-slate-400 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour12: false })}.{new Date(log.timestamp).getMilliseconds().toString().padStart(3, '0')}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-300">{log.source_ip}</td>
                  <td className="px-6 py-4 text-slate-300">
                    <span className="bg-slate-700/50 text-slate-300 px-2 py-1 rounded text-xs font-mono">{log.method}</span>
                    <span className="ml-2 font-mono text-xs">{log.endpoint}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${log.anomaly_score > 0.7 ? 'bg-danger' : log.anomaly_score > 0.4 ? 'bg-warning' : 'bg-success'}`}
                          style={{ width: `${log.anomaly_score * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-mono">{log.anomaly_score.toFixed(2)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {log.pattern_match ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-danger/10 text-danger border border-danger/20">
                        {log.pattern_match}
                      </span>
                    ) : (
                      <span className="text-slate-500 text-xs italic">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <ThreatBadge level={log.threat_level} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color: string }) {
  return (
    <div className="bg-card rounded-xl p-5 border border-slate-700/50 shadow-lg relative overflow-hidden group">
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 ${color.replace('text-', 'bg-')} group-hover:scale-150 transition-transform duration-500`}></div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-medium text-slate-400">{title}</h3>
          <div className="text-3xl font-bold text-white mt-1 tracking-tight">{value.toLocaleString()}</div>
        </div>
        <div className={`p-2 rounded-lg bg-slate-800/50 border border-slate-700 ${color}`}>
          {icon}
        </div>
      </div>
      <div className="text-xs text-slate-500 font-medium">
        Since last system restart
      </div>
    </div>
  );
}

function ThreatBadge({ level }: { level: string }) {
  let styles = "";
  switch (level) {
    case "High-Risk":
      styles = "bg-danger/10 text-danger border-danger/20 shadow-[0_0_10px_rgba(244,63,94,0.2)]";
      break;
    case "Suspicious":
      styles = "bg-warning/10 text-warning border-warning/20";
      break;
    default:
      styles = "bg-success/10 text-success border-success/20";
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${styles}`}>
      {level === "High-Risk" && <AlertTriangle className="w-3 h-3 mr-1" />}
      {level}
    </span>
  );
}
