// src/pages/ThreatDetection.jsx
import React, { useState } from "react";
import { useTraffic } from "../context/TrafficContext";

export default function ThreatDetection() {
  const { alerts } = useTraffic();
  const [filterLevel, setFilterLevel] = useState("ALL");
  const [blockedIPs, setBlockedIPs] = useState(["192.168.1.100"]);

  const filteredAlerts = alerts.filter(
    (a) => filterLevel === "ALL" || a.level.toUpperCase() === filterLevel
  );

  const handleBlockIP = (ip) => {
    if (!blockedIPs.includes(ip)) {
      setBlockedIPs([...blockedIPs, ip]);
    }
  };

  return (
    <main className="main">
      <header className="header">
        <div>
          <h1>Threat Detection Engine</h1>
          <p>IDS/IPS signature matches, anomalous behaviour & automated mitigation</p>
        </div>
      </header>

      {/* METRICS */}
      <section className="stats">
        <div className="stat alert-stat">
          <div className="stat-icon">🚨</div>
          <div>
            <p>Total Incidents</p>
            <h2>{alerts.length}</h2>
          </div>
        </div>
        <div className="stat">
          <div className="stat-icon">🛑</div>
          <div>
            <p>Blocked Attackers</p>
            <h2>{blockedIPs.length}</h2>
          </div>
        </div>
        <div className="stat">
          <div className="stat-icon">⚡</div>
          <div>
            <p>Active Detection Rules</p>
            <h2>14 Enforced</h2>
          </div>
        </div>
        <div className="stat">
          <div className="stat-icon">🛡️</div>
          <div>
            <p>Firewall Rule Engine</p>
            <h2 style={{ color: "#22c55e", fontSize: "16px" }}>SYNCHRONIZED</h2>
          </div>
        </div>
      </section>

      {/* THREAT STREAM */}
      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Detected Security Events</h2>
            <p>Real-time intrusion alerts flagged by heuristic rules</p>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => setFilterLevel("ALL")}
              className={`capture-button`}
              style={{ background: filterLevel === "ALL" ? "#22c55e" : "#111827", color: "#fff" }}
            >
              All
            </button>
            <button
              onClick={() => setFilterLevel("HIGH")}
              className={`capture-button`}
              style={{ background: filterLevel === "HIGH" ? "#ef4444" : "#111827", color: "#fff" }}
            >
              High
            </button>
            <button
              onClick={() => setFilterLevel("MEDIUM")}
              className={`capture-button`}
              style={{ background: filterLevel === "MEDIUM" ? "#f59e0b" : "#111827", color: "#fff" }}
            >
              Medium
            </button>
          </div>
        </div>

        <div className="alerts">
          {filteredAlerts.length === 0 ? (
            <p style={{ color: "#6b7280", padding: "10px" }}>No threats detected matching criteria.</p>
          ) : (
            filteredAlerts.map((alert, index) => {
              const isBlocked = blockedIPs.includes(alert.ip);
              return (
                <div key={index} className={`alert ${alert.level}`} style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <strong>{alert.level.toUpperCase()}</strong>
                    <span>{alert.title}</span>
                    <small>Target: {alert.ip}</small>
                  </div>

                  <div>
                    <button
                      onClick={() => handleBlockIP(alert.ip)}
                      disabled={isBlocked}
                      style={{
                        background: isBlocked ? "#374151" : "#ef4444",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "5px",
                        cursor: isBlocked ? "not-allowed" : "pointer",
                        fontSize: "11px",
                        fontWeight: "bold",
                      }}
                    >
                      {isBlocked ? "BLOCKED" : "BLOCK IP"}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* FIREWALL DROP TABLE */}
      <section className="panel">
        <div className="panel-header">
          <h2>Active Firewall Drop Rules</h2>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {blockedIPs.map((ip) => (
            <span
              key={ip}
              style={{
                background: "#3a1515",
                color: "#ef4444",
                padding: "6px 12px",
                borderRadius: "6px",
                fontSize: "12px",
                fontFamily: "monospace",
                border: "1px solid #ef4444",
              }}
            >
              DROP {ip}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}