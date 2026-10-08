// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TrafficProvider } from './context/TrafficContext';

import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Traffic from './pages/Traffic';
import PacketAnalyzer from './pages/PacketAnalyzer';
import Protocols from './pages/Protocols';
import IPAnalysis from './pages/IPAnalysis';
import ThreatDetection from './pages/ThreatDetection';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

export default function App() {
  return (
    <TrafficProvider>
      <Router>
        <div className="app">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/live-traffic" element={<Traffic />} />
            <Route path="/packet-analyzer" element={<PacketAnalyzer />} />
            <Route path="/protocols" element={<Protocols />} />
            <Route path="/ip-analysis" element={<IPAnalysis />} />
            <Route path="/threat-detection" element={<ThreatDetection />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </TrafficProvider>
  );
}