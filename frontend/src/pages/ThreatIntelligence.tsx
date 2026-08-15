import React, { useEffect, useState } from 'react';
import { ShieldCheck, Globe, Activity, FileText } from 'lucide-react';

const MOCK_FEEDS = [
  { id: 'CVE-2024-3451', severity: 'Critical', source: 'Mitre', description: 'Zero-day in popular TLS library' },
  { id: 'APT-29-Update', severity: 'High', source: 'CISA', description: 'New C2 domains associated with APT29' },
  { id: 'Ransom-LockBit', severity: 'Critical', source: 'Kaspersky', description: 'LockBit 3.0 new encryption signatures' },
  { id: 'SQLi-Campaign', severity: 'Medium', source: 'Cloudflare', description: 'Widespread automated SQLi probing' },
  { id: 'CVE-2024-1120', severity: 'High', source: 'NVD', description: 'Remote code execution in WebLogic' },
];

export default function ThreatIntelligence() {
  return (
    <div className="p-6 h-full flex flex-col space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide">Threat Intelligence Feed</h2>
          <p className="text-slate-400 mt-1">Live updates from global security networks and known attacker signatures.</p>
        </div>
        <div className="flex items-center gap-2 text-success bg-success/10 px-3 py-1.5 rounded-full border border-success/20 text-sm font-medium">
          <Globe className="w-4 h-4 animate-pulse" />
          Syncing with Global DB
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border border-slate-700/50 shadow-lg overflow-hidden">
          <div className="p-4 border-b border-slate-700/50 bg-slate-800/50 flex justify-between items-center">
            <h3 className="font-semibold text-slate-200">Latest Advisories & Signatures</h3>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-400 bg-slate-900/80 border-b border-slate-700/50 uppercase">
              <tr>
                <th className="px-6 py-3">Identifier</th>
                <th className="px-6 py-3">Severity</th>
                <th className="px-6 py-3">Source</th>
                <th className="px-6 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {MOCK_FEEDS.map((feed, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-primary font-medium">{feed.id}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      feed.severity === 'Critical' ? 'bg-danger/20 text-danger' : 
                      feed.severity === 'High' ? 'bg-warning/20 text-warning' : 
                      'bg-secondary/20 text-secondary'
                    }`}>
                      {feed.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-slate-500" /> {feed.source}
                  </td>
                  <td className="px-6 py-4 text-slate-400">{feed.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-card rounded-xl border border-slate-700/50 shadow-lg p-5 flex flex-col space-y-4">
          <h3 className="font-semibold text-slate-200 border-b border-slate-700 pb-2">Intelligence Sources</h3>
          
          <div className="space-y-4 flex-1">
            <SourceCard name="MITRE ATT&CK" status="Connected" ping="12ms" />
            <SourceCard name="CISA Alerts" status="Connected" ping="24ms" />
            <SourceCard name="AlienVault OTX" status="Connected" ping="45ms" />
            <SourceCard name="Custom ML Signatures" status="Active Local" ping="1ms" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SourceCard({ name, status, ping }: { name: string, status: string, ping: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-success"></div>
        <span className="text-sm font-medium text-slate-300">{name}</span>
      </div>
      <div className="text-right">
        <div className="text-xs text-success">{status}</div>
        <div className="text-xs text-slate-500 font-mono">{ping}</div>
      </div>
    </div>
  );
}
