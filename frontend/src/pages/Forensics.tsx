import React, { useEffect, useState } from 'react';
import { Search, Code, Terminal, FileJson } from 'lucide-react';
import { fetchRecentActivity } from '../services/api';
import type { LogEvent } from '../types';

export default function Forensics() {
  const [logs, setLogs] = useState<LogEvent[]>([]);
  const [selectedLog, setSelectedLog] = useState<LogEvent | null>(null);

  useEffect(() => {
    fetchRecentActivity().then(data => {
      setLogs(data);
      if (data.length > 0) setSelectedLog(data[0]);
    }).catch(console.error);
  }, []);

  return (
    <div className="p-6 h-full flex flex-col space-y-6">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-white tracking-wide">Deep Forensics Analysis</h2>
        <p className="text-slate-400 mt-1">Analyze raw payloads, headers, and Isolation Forest decision matrices.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Log List */}
        <div className="lg:col-span-1 bg-card rounded-xl border border-slate-700/50 shadow-lg flex flex-col overflow-hidden">
           <div className="p-4 border-b border-slate-700/50 bg-slate-800/50">
             <div className="relative">
               <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
               <input 
                 type="text" 
                 placeholder="Search logs..." 
                 className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-primary transition-colors"
               />
             </div>
           </div>
           
           <div className="flex-1 overflow-y-auto">
             {logs.map(log => (
               <button 
                 key={log.id}
                 onClick={() => setSelectedLog(log)}
                 className={`w-full text-left p-4 border-b border-slate-700/50 transition-colors ${selectedLog?.id === log.id ? 'bg-primary/10 border-l-2 border-l-primary' : 'hover:bg-slate-800/30 border-l-2 border-l-transparent'}`}
               >
                 <div className="flex justify-between items-start mb-1">
                   <span className="font-mono text-xs text-slate-300">{log.source_ip}</span>
                   <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                     log.threat_level === 'High-Risk' ? 'bg-danger/20 text-danger' : 
                     log.threat_level === 'Suspicious' ? 'bg-warning/20 text-warning' : 
                     'bg-success/20 text-success'
                   }`}>{log.threat_level}</span>
                 </div>
                 <div className="text-sm font-mono text-slate-400 truncate">{log.method} {log.endpoint}</div>
                 <div className="text-xs text-slate-500 mt-2">{new Date(log.timestamp).toLocaleTimeString()}</div>
               </button>
             ))}
           </div>
        </div>
        
        {/* Payload Inspector */}
        <div className="lg:col-span-2 bg-[#0d1117] rounded-xl border border-slate-700/50 shadow-lg flex flex-col overflow-hidden">
          <div className="h-12 bg-[#161b22] border-b border-slate-700/50 flex items-center px-4 justify-between">
             <div className="flex items-center gap-2">
               <Terminal className="w-4 h-4 text-slate-400" />
               <span className="text-sm font-mono text-slate-300">payload_inspector.json</span>
             </div>
             <div className="flex gap-2">
                <button className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors"><FileJson className="w-4 h-4" /></button>
             </div>
          </div>
          
          <div className="flex-1 p-6 font-mono text-sm text-slate-300 overflow-y-auto whitespace-pre-wrap">
             {selectedLog ? (
               <div className="space-y-6">
                 <div>
                    <span className="text-secondary"># Network Request Overview</span>
                    <br/>
                    <span className="text-primary">timestamp:</span> {new Date(selectedLog.timestamp).toISOString()}
                    <br/>
                    <span className="text-primary">source_ip:</span> {selectedLog.source_ip}
                    <br/>
                    <span className="text-primary">request:</span> {selectedLog.method} {selectedLog.endpoint} HTTP/1.1
                    <br/>
                    <span className="text-primary">status:</span> {selectedLog.status_code}
                 </div>
                 
                 <div>
                    <span className="text-secondary"># Extracted Features (Raw)</span>
                    <br/>
                    <span className="text-primary">payload_size_kb:</span> {selectedLog.payload_size.toFixed(3)}
                    <br/>
                    <span className="text-primary">response_time_ms:</span> {selectedLog.response_time.toFixed(3)}
                 </div>

                 <div>
                    <span className="text-secondary"># AI Analysis Output (Isolation Forest)</span>
                    <br/>
                    <span className="text-primary">is_anomaly:</span> <span className={selectedLog.is_anomaly ? 'text-danger font-bold' : 'text-success'}>{selectedLog.is_anomaly.toString()}</span>
                    <br/>
                    <span className="text-primary">anomaly_score:</span> {selectedLog.anomaly_score.toFixed(4)}
                    <br/>
                    <span className="text-primary">centroid_pattern_match:</span> {selectedLog.pattern_match || 'null'}
                 </div>

                 <div className="pt-4 border-t border-slate-800">
                    <span className="text-slate-500">{"// Framework Decision"}</span>
                    <br/>
                    <span className="text-primary">final_classification:</span> <span className="font-bold">{selectedLog.threat_level}</span>
                    <br/>
                    <span className="text-primary">automated_response:</span> {selectedLog.threat_level === 'Normal' ? 'ALLOW' : 'BLOCK_AND_LOG'}
                 </div>
               </div>
             ) : (
               <div className="h-full flex items-center justify-center text-slate-600 italic">
                 Select a log entry to inspect the raw payload
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
