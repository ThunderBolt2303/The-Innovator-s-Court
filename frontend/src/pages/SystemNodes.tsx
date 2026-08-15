import React, { useEffect, useState } from 'react';
import { Server, Cpu, HardDrive, Network, Shield } from 'lucide-react';

const INITIAL_NODES = [
  { id: 'gateway-proxy-01', region: 'us-east-1', role: 'Ingress', load: 45, mem: 60, status: 'healthy' },
  { id: 'auth-service-02', region: 'us-east-1', role: 'Auth', load: 85, mem: 72, status: 'warning' },
  { id: 'ml-inference-01', region: 'eu-west-1', role: 'AI Engine', load: 92, mem: 88, status: 'warning' },
  { id: 'db-primary-cluster', region: 'us-east-2', role: 'Database', load: 30, mem: 45, status: 'healthy' },
  { id: 'worker-pool-alpha', region: 'us-west-1', role: 'Background', load: 15, mem: 20, status: 'healthy' },
  { id: 'redis-cache-layer', region: 'us-east-1', role: 'Cache', load: 10, mem: 55, status: 'healthy' },
];

export default function SystemNodes() {
  const [nodes, setNodes] = useState(INITIAL_NODES);

  // Simulate live metric fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(n => ({
        ...n,
        load: Math.max(5, Math.min(100, n.load + (Math.random() * 10 - 5))),
        mem: Math.max(10, Math.min(100, n.mem + (Math.random() * 4 - 2)))
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 h-full flex flex-col space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide">System Nodes Topology</h2>
          <p className="text-slate-400 mt-1">Real-time health and load metrics for critical infrastructure components.</p>
        </div>
        <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg border border-slate-600 transition-colors text-sm font-medium flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Initiate Lockdown
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nodes.map(node => (
          <div key={node.id} className="bg-card rounded-xl p-5 border border-slate-700/50 shadow-lg relative overflow-hidden">
            {node.load > 90 && <div className="absolute top-0 left-0 w-full h-1 bg-danger animate-pulse"></div>}
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-primary shadow-inner">
                  <Server className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-200">{node.id}</h3>
                  <p className="text-xs text-slate-400 font-mono">{node.region} • {node.role}</p>
                </div>
              </div>
              <span className={`flex h-3 w-3 rounded-full ${node.load > 85 ? 'bg-warning animate-ping' : 'bg-success'}`}></span>
            </div>
            
            <div className="space-y-4">
              <MetricBar icon={<Cpu className="w-4 h-4" />} label="CPU Load" value={node.load} />
              <MetricBar icon={<HardDrive className="w-4 h-4" />} label="Memory" value={node.mem} color="bg-secondary" />
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/50 flex justify-between text-xs font-medium">
              <button className="text-primary hover:text-white transition-colors">View Logs</button>
              <button className="text-slate-400 hover:text-white transition-colors">Restart Node</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricBar({ icon, label, value, color = "bg-primary" }: { icon: React.ReactNode, label: string, value: number, color?: string }) {
  const isHigh = value > 80;
  const barColor = isHigh ? 'bg-warning' : color;
  
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">{icon} {label}</span>
        <span className="font-mono">{value.toFixed(1)}%</span>
      </div>
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden shadow-inner">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${barColor}`} 
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}
