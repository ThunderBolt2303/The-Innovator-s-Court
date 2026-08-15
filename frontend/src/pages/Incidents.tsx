import React, { useEffect, useState } from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle, Clock } from 'lucide-react';
import { fetchRecentActivity } from '../services/api';
import type { LogEvent } from '../types';

export default function Incidents() {
  const [incidents, setIncidents] = useState<LogEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const loadIncidents = async () => {
    try {
      const logs = await fetchRecentActivity();
      // Filter only high-risk or suspicious events for the incidents hub
      const filtered = logs.filter(log => log.threat_level === 'High-Risk' || log.threat_level === 'Suspicious');
      setIncidents(filtered);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIncidents();
    const interval = setInterval(loadIncidents, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 h-full flex flex-col space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide">Incident Response Hub</h2>
          <p className="text-slate-400 mt-1">Review flagged anomalies and AI-mitigated threats.</p>
        </div>
        <button className="px-4 py-2 bg-primary/10 text-primary border border-primary/30 rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium">
          Export Incident Report
        </button>
      </div>

      <div className="flex-1 bg-card rounded-xl border border-slate-700/50 shadow-lg overflow-hidden flex flex-col">
         {loading ? (
           <div className="flex-1 flex items-center justify-center text-slate-500">Loading incidents...</div>
         ) : incidents.length === 0 ? (
           <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
              <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center border border-success/30 mb-6">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <h3 className="text-xl font-semibold text-slate-200">No Active Incidents</h3>
              <p className="text-slate-400 max-w-sm mt-2">
                The framework is monitoring traffic. No high-risk threats detected recently.
              </p>
           </div>
         ) : (
           <div className="overflow-x-auto flex-1">
             <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 bg-slate-900/80 border-b border-slate-700/50 uppercase sticky top-0">
                  <tr>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Timestamp</th>
                    <th className="px-6 py-4">Source IP</th>
                    <th className="px-6 py-4">Target Endpoint</th>
                    <th className="px-6 py-4">Attack Vector</th>
                    <th className="px-6 py-4">Action Taken</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {incidents.map((inc) => (
                    <tr key={inc.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${inc.threat_level === 'High-Risk' ? 'bg-danger animate-pulse' : 'bg-warning'}`}></span>
                          <span className={`font-semibold ${inc.threat_level === 'High-Risk' ? 'text-danger' : 'text-warning'}`}>{inc.threat_level}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-400">
                        {new Date(inc.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-300">{inc.source_ip}</td>
                      <td className="px-6 py-4 text-slate-300 font-mono text-xs">{inc.endpoint}</td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700 text-xs text-slate-300">
                          {inc.pattern_match || 'Unknown Anomaly'} (Score: {inc.anomaly_score.toFixed(2)})
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 text-success font-medium text-xs bg-success/10 px-2 py-1 rounded border border-success/20">
                          <ShieldAlert className="w-3 h-3" /> Auto-Blocked
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
           </div>
         )}
      </div>
    </div>
  );
}
