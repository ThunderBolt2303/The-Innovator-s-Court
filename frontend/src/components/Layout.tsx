import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  ShieldAlert, ShieldCheck, Activity, Server, AlertTriangle, 
  Search, Bell, Settings
} from 'lucide-react';

export default function Layout() {
  return (
    <div className="flex h-screen bg-background text-slate-200 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-slate-700/50 flex flex-col">
        <div className="p-6 border-b border-slate-700/50 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30">
            <ShieldAlert className="text-primary w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-wide text-white">INNOVATOR'S</h1>
            <h2 className="text-xs text-primary font-medium tracking-widest">COURT</h2>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavItem to="/" icon={<Activity />} label="Dashboard" />
          <NavItem to="/threats" icon={<ShieldCheck />} label="Threat Intelligence" />
          <NavItem to="/nodes" icon={<Server />} label="System Nodes" />
          <NavItem to="/incidents" icon={<AlertTriangle />} label="Incidents" />
          <NavItem to="/forensics" icon={<Search />} label="Forensics" />
        </nav>
        
        <div className="p-4 border-t border-slate-700/50">
          <div className="text-xs text-slate-500 mb-2 font-medium">SYSTEM STATUS</div>
          <div className="flex items-center gap-2 text-sm text-success">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
            Model Active & Learning
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-slate-700/50 flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm z-10 sticky top-0">
          <h2 className="text-xl font-semibold text-white tracking-wide">AI-Powered Security Framework</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-700 rounded-full transition-colors relative">
              <Bell className="w-5 h-5 text-slate-400" />
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-full transition-colors">
              <Settings className="w-5 h-5 text-slate-400" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-sm">
              CB
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, to }: { icon: React.ReactNode, label: string, to: string }) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
          isActive 
            ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm shadow-primary/5' 
            : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
        }`
      }
    >
      <span className="w-5 h-5">{icon}</span>
      <span className="font-medium text-sm">{label}</span>
    </NavLink>
  );
}
