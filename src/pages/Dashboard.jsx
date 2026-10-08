// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { useTraffic } from "../context/TrafficContext";

export default function Dashboard() {
  const { isRunning, toggleCapture, packets, alerts, chartBars, totalBytes } = useTraffic();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPackets = packets.filter(
    (p) =>
      p.source.includes(searchTerm) ||
      p.destination.includes(searchTerm) ||
      p.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.port.toString().includes(searchTerm)
  );

  const formattedTraffic = (totalBytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";

  return (
    <main className="main">
      {/* HEADER */}
      <header className="header">
        <div>
          <h1>Network Traffic Analyzer</h1>
          <p>Network security monitoring dashboard</p>
        </div>

        <div className="header-controls">
          <span className={isRunning ? "online" : "offline"}>
            ● {isRunning ? "Monitoring" : "Stopped"}
          </span>

          <button
            className="capture-button"
            onClick={toggleCapture}
            style={{
              background: isRunning ? "#ef4444" : "#22c55e",
              color: "#fff",
            }}
          >
            {isRunning ? "Stop Capture" : "Start Capture"}
          </button>
        </div>
      </header>

      {/* DEMO MESSAGE */}
      <div className="demo">
        <strong>LIVE NETWORK ENGINE</strong>
        <span>Promiscuous packet telemetry active and synced across all tabs.</span>
      </div>

      {/* STATS */}
      <section className="stats">
        <div className="stat">
          <div className="stat-icon">📦</div>
          <div>
            <p>Packets Captured</p>
            <h2>{12845 + packets.length}</h2>
          </div>
        </div>

        <div className="stat">
          <div className="stat-icon">🌐</div>
          <div>
            <p>Total Traffic</p>
            <h2>{formattedTraffic}</h2>
          </div>
        </div>

        <div className="stat">
          <div className="stat-icon">🔗</div>
          <div>
            <p>Active Connections</p>
            <h2>{48 + (packets.length % 5)}</h2>
          </div>
        </div>

        <div className="stat alert-stat">
          <div className="stat-icon">⚠️</div>
          <div>
            <p>Security Alerts</p>
            <h2>{alerts.length}</h2>
          </div>
        </div>
      </section>

      {/* DYNAMIC TRAFFIC CHART */}
      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Network Traffic</h2>
            <p>Packets per second</p>
          </div>
          <span className="live">{isRunning ? "● LIVE" : "PAUSED"}</span>
        </div>

        <div className="chart">
          {chartBars.map((height, i) => (
            <div key={i} style={{ height: `${height}%`, transition: "height 0.3s ease" }} />
          ))}
        </div>
      </section>

      {/* PACKET TABLE */}
      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Recent Network Traffic</h2>
            <p>Latest analyzed packets</p>
          </div>

          <input
            type="text"
            placeholder="Search IP / Protocol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Source IP</th>
                <th>Destination IP</th>
                <th>Protocol</th>
                <th>Port</th>
                <th>Size</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {filteredPackets.slice(0, 8).map((packet) => (
                <tr key={packet.id}>
                  <td>{packet.time}</td>
                  <td>{packet.source}</td>
                  <td>{packet.destination}</td>
                  <td><span className="protocol">{packet.protocol}</span></td>
                  <td>{packet.port}</td>
                  <td>{packet.size}</td>
                  <td><span className={`risk ${packet.risk.toLowerCase()}`}>{packet.risk}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ALERTS */}
      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Security Alerts</h2>
            <p>Recently detected security events</p>
          </div>
          <span className="alert-number">{alerts.length} Alerts</span>
        </div>

        <div className="alerts">
          {alerts.slice(0, 4).map((alert, index) => (
            <div key={index} className={`alert ${alert.level}`}>
              <strong>{alert.level.toUpperCase()}</strong>
              <span>{alert.title}</span>
              <small>{alert.ip}</small>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}