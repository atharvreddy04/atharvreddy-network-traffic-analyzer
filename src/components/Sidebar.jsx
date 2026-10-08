// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', path: '/', icon: '📊' },
  { name: 'Live Traffic', path: '/live-traffic', icon: '📡' },
  { name: 'Packet Analyzer', path: '/packet-analyzer', icon: '🔍' },
  { name: 'Protocol Analysis', path: '/protocols', icon: '📑' },
  { name: 'IP Analysis', path: '/ip-analysis', icon: '🌐' },
  { name: 'Threat Detection', path: '/threat-detection', icon: '🛡️' },
  { name: 'Alerts', path: '/alerts', icon: '⚠️' },
  { name: 'PCAP Analyzer', path: '/pcap-analyzer', icon: '📁' },
  { name: 'Reports', path: '/reports', icon: '📈' },
  { name: 'Settings', path: '/settings', icon: '⚙️' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="logo">
        <span style={{ marginRight: '8px' }}>🛡️</span> NetSecure
      </div>

      {/* Navigation Links */}
      <nav className="menu">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => (isActive ? 'menu-active' : '')}
          >
            <span style={{ marginRight: '10px', fontSize: '15px' }}>{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* System Status Footer */}
      <div className="sidebar-bottom">
        <span style={{ color: '#22c55e', marginRight: '6px' }}>●</span> System Online
      </div>
    </aside>
  );
}