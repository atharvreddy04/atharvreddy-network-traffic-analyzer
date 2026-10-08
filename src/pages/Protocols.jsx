// src/pages/Protocols.jsx
import React from "react";
import { useTraffic } from "../context/TrafficContext";

export default function Protocols() {
  const { packets } = useTraffic();

  const total = packets.length || 1;
  const counts = packets.reduce((acc, p) => {
    acc[p.protocol] = (acc[p.protocol] || 0) + 1;
    return acc;
  }, {});

  const protocolData = [
    { name: "TCP", color: "#38bdf8", count: counts["TCP"] || 28, desc: "Transmission Control Protocol (Stateful)" },
    { name: "UDP", color: "#a855f7", count: counts["UDP"] || 14, desc: "User Datagram Protocol (Streaming / DNS)" },
    { name: "DNS", color: "#22c55e", count: counts["DNS"] || 10, desc: "Domain Name Resolution Queries" },
    { name: "HTTPS", color: "#f59e0b", count: counts["HTTPS"] || 18, desc: "TLS Encrypted Web Communication" },
    { name: "ICMP", color: "#ef4444", count: counts["ICMP"] || 4, desc: "Control & Diagnostic Echoes (Ping)" },
  ];

  return (
    <main className="main">
      <header className="header">
        <div>
          <h1>Protocol Telemetry & Matrix</h1>
          <p>Real-time OSI Layer 4 & Layer 7 volumetric distribution</p>
        </div>
        <span className="cyber-badge cyber-badge-cyan">● L4 / L7 SNIFFER LIVE</span>
      </header>

      {/* METRIC CHIPS */}
      <section className="stats">
        {protocolData.map((proto) => {
          const pct = Math.round((proto.count / total) * 100);
          return (
            <div key={proto.name} className="stat cyber-card">
              <div
                className="stat-icon"
                style={{ background: `${proto.color}15`, border: `1px solid ${proto.color}40`, color: proto.color }}
              >
                {proto.name.slice(0, 3)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>{proto.name}</p>
                  <span style={{ color: proto.color, fontWeight: "bold", fontSize: "12px" }}>{pct}%</span>
                </div>
                <h2>{proto.count} pkts</h2>
                <div className="cyber-bar-track" style={{ marginTop: "8px" }}>
                  <div className="cyber-bar-fill" style={{ width: `${pct}%`, backgroundColor: proto.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* DETAILED SPECIFICATION GRID */}
      <section className="panel cyber-card">
        <div className="panel-header">
          <h2>Protocol Layer Breakdown</h2>
          <span style={{ fontSize: "11px", color: "#6b7280" }}>DEEP PACKET INSPECTION ACTIVE</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {protocolData.map((proto) => (
            <div
              key={proto.name}
              style={{
                background: "#080c14",
                border: "1px solid #1f2937",
                borderRadius: "8px",
                padding: "16px",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="protocol" style={{ background: `${proto.color}25`, color: proto.color, border: `1px solid ${proto.color}50` }}>
                  {proto.name}
                </span>
                <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#9ca3af" }}>
                  {(proto.count * 1.2).toFixed(1)} KB/s
                </span>
              </div>
              <p style={{ marginTop: "12px", fontSize: "12px", color: "#94a3b8", lineHeight: "1.5" }}>
                {proto.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}