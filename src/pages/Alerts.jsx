// src/pages/Alerts.jsx
import React, { useState } from "react";
import { useTraffic } from "../context/TrafficContext";

export default function Alerts() {
  const { alerts } = useTraffic();
  const [resolved, setResolved] = useState([]);

  const toggleResolve = (idx) => {
    if (resolved.includes(idx)) {
      setResolved(resolved.filter((i) => i !== idx));
    } else {
      setResolved([...resolved, idx]);
    }
  };

  return (
    <main className="main">
      <header className="header">
        <div>
          <h1>Security Incident Dispatch</h1>
          <p>SOC Level-1 Triaging, Incident Mitigation & Audit Trails</p>
        </div>
        <span className="cyber-badge cyber-badge-purple">● SIEM INTEGRATION ON</span>
      </header>

      <section className="panel cyber-card">
        <div className="panel-header">
          <h2>Active Incident Queues</h2>
          <span className="alert-number">{alerts.length - resolved.length} Open Incidents</span>
        </div>

        <div className="alerts">
          {alerts.map((alert, index) => {
            const isDone = resolved.includes(index);
            return (
              <div
                key={index}
                className={`alert ${alert.level}`}
                style={{
                  opacity: isDone ? 0.35 : 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderLeft: `4px solid ${
                    alert.level === "high" ? "#ef4444" : alert.level === "medium" ? "#f59e0b" : "#22c55e"
                  }`,
                }}
              >
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <strong>[{alert.level.toUpperCase()}]</strong>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: "600" }}>{alert.title}</div>
                    <small style={{ color: "#9ca3af" }}>Trigger Source: {alert.ip} • Timestamp: {alert.time || "Live"}</small>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => toggleResolve(index)}
                    style={{
                      background: isDone ? "#374151" : "#1e293b",
                      color: isDone ? "#9ca3af" : "#22c55e",
                      border: "1px solid rgba(255,255,255,0.1)",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "11px",
                      cursor: "pointer",
                      fontFamily: "monospace",
                    }}
                  >
                    {isDone ? "RESOLVED" : "ACKNOWLEDGE"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}