// src/pages/Settings.jsx
import React, { useState } from "react";

export default function Settings() {
  const [promiscuous, setPromiscuous] = useState(true);
  const [interfaceName, setInterfaceName] = useState("wlan0");
  const [bpfFilter, setBpfFilter] = useState("ip and not port 22");

  return (
    <main className="main">
      <header className="header">
        <div>
          <h1>Engine Configuration & NIC Tuning</h1>
          <p>Berkeley Packet Filter (BPF) syntax, promiscuous driver binding and buffer limits</p>
        </div>
        <span className="cyber-badge cyber-badge-cyan">● PROMISCUOUS MODE ENABLED</span>
      </header>

      <section className="panel cyber-card" style={{ maxWidth: "760px" }}>
        <div className="panel-header">
          <h2>Network Interface Card (NIC) Properties</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ fontSize: "13px", color: "#9ca3af", display: "block", marginBottom: "8px" }}>
              Active Capture Interface:
            </label>
            <select
              value={interfaceName}
              onChange={(e) => setInterfaceName(e.target.value)}
              style={{
                background: "#080c14",
                border: "1px solid #374151",
                color: "#38bdf8",
                padding: "10px",
                borderRadius: "6px",
                width: "100%",
                fontFamily: "monospace",
              }}
            >
              <option value="wlan0">wlan0 - Wi-Fi Adapter (802.11ac)</option>
              <option value="eth0">eth0 - Realtek Gigabit Ethernet</option>
              <option value="lo0">lo0 - Localhost Loopback Interface</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: "13px", color: "#9ca3af", display: "block", marginBottom: "8px" }}>
              Berkeley Packet Filter (BPF) Expression:
            </label>
            <input
              type="text"
              value={bpfFilter}
              onChange={(e) => setBpfFilter(e.target.value)}
              style={{
                width: "100%",
                fontFamily: "monospace",
                color: "#22c55e",
                background: "#080c14",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #374151",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "10px" }}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: "600" }}>Raw Socket Promiscuous Mode</div>
              <small style={{ color: "#6b7280" }}>Allow adapter to receive frames destined for other addresses</small>
            </div>
            <button
              onClick={() => setPromiscuous(!promiscuous)}
              className="capture-button"
              style={{
                background: promiscuous ? "#22c55e" : "#374151",
                color: "#fff",
              }}
            >
              {promiscuous ? "ENABLED" : "DISABLED"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}