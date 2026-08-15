import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardHome from './pages/DashboardHome';
import ThreatIntelligence from './pages/ThreatIntelligence';
import SystemNodes from './pages/SystemNodes';
import Incidents from './pages/Incidents';
import Forensics from './pages/Forensics';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardHome />} />
          <Route path="threats" element={<ThreatIntelligence />} />
          <Route path="nodes" element={<SystemNodes />} />
          <Route path="incidents" element={<Incidents />} />
          <Route path="forensics" element={<Forensics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
