// src/pages/IPAnalysis.jsx
import React, { useState } from "react";

const NODES = [
  { ip: "192.168.1.15", country: "Internal LAN", city: "Local Gateway", traffic: "1.42 GB", pkts: "11,240", type: "Client Workstation", status: "CLEAN", score: 0 },
  { ip: "142.250.190.46", country: "United States", city: "Google Cloud LLC", traffic: "840 MB", pkts: "6,512", type: "External CDN", status: "TRUSTED", score: 5 },
  { ip: "8.8.8.8", country: "United States", city: "Google Public DNS", traffic: "124 MB", pkts: "3,890", type: "Anycast DNS", status: "TRUSTED", score: 0 },
  { ip: "192.168.1.25", country: "Internal LAN", city: "Local Subnet", traffic: "320 MB", pkts: "4,110", type: "Unknown Host", status: "SUSPICIOUS", score: 68 },
  { ip: "45.154.255.88", country: "Russia", city: "Moscow Data Center", traffic: "14.2 MB", pkts: "480", type: "Tor Exit Node", status: "HOSTILE", score: 94 },
];

export default function IPAnalysis() {
  const [search, setSearch] = useState("");

  const filtered = NODES.filter((n) => n.ip.includes(search) || n.country.toLowerCase().includes(search.toLowerCase()));

  return (
    <main className="main">
      <header className="header">
        <div>
          <h1>Geo-IP & Top Talkers Intelligence</h1>
          <p>Autonomous IP profiling, host reputation and subnet mapping</p>
        </div>
        <span className="cyber-badge cyber-badge-cyan">● ASN / REPUTATION ACTIVE</span>
      </header>

      {/* QUICK STATUS HUD */}
      <section className="stats">
        <div className="stat cyber-card">
          <div className="stat-icon">🌐</div>
          <div>
            <p>Active Network Nodes</p>
            <h2>{NODES.length} Endpoints</h2>
          </div>
        </div>
        <div className="stat cyber-card">
          <div className="stat-icon" style={{ background: "rgba(239, 68, 68, 0.15)", color: "#ef4444" }}>☣️</div>
          <div>
            <p>Hostile Entities</p>
            <h2>1 Flagged</h2>
          </div>
        </div>
        <div className="stat cyber-card">
          <div className="stat-icon">🛰️</div>
          <div>
            <p>Geolocations Tracked</p>
            <h2>3 Regions</h2>
          </div>
        </div>
        <div className="stat cyber-card">
          <div className="stat-icon">🔒</div>
          <div>
            <p>Encrypted Payload Ratio</p>
            <h2>88.4%</h2>
          </div>
        </div>
      </section>

      {/* NODE TABLE */}
      <section className="panel cyber-card">
        <div className="panel-header">
          <h2>Host Vector Matrix</h2>
          <input
            type="text"
            placeholder="Search IP, Country, Subnet..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>IPv4 / Subnet</th>
                <th>Location / ASN</th>
                <th>Host Profile</th>
                <th>Bandwidth</th>
                <th>Threat Score</th>
                <th>Vector Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((node) => (
                <tr key={node.ip}>
                  <td>
                    <code style={{ color: "#38bdf8", fontWeight: "bold" }}>{node.ip}</code>
                  </td>
                  <td>
                    <div>{node.country}</div>
                    <small style={{ color: "#6b7280" }}>{node.city}</small>
                  </td>
                  <td>{node.type}</td>
                  <td>{node.traffic}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div className="cyber-bar-track" style={{ width: "60px" }}>
                        <div
                          className="cyber-bar-fill"
                          style={{
                            width: `${node.score}%`,
                            backgroundColor: node.score > 60 ? "#ef4444" : node.score > 20 ? "#f59e0b" : "#22c55e",
                          }}
                        />
                      </div>
                      <span style={{ fontSize: "11px", fontFamily: "monospace" }}>{node.score}/100</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`risk ${
                        node.status === "HOSTILE"
                          ? "high"
                          : node.status === "SUSPICIOUS"
                          ? "medium"
                          : "low"
                      }`}
                    >
                      {node.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}