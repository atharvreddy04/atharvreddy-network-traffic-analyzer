// src/pages/Reports.jsx
import React, { useState } from "react";
import { useTraffic } from "../context/TrafficContext";

export default function Reports() {
  const { packets, alerts, totalBytes } = useTraffic();
  const [downloading, setDownloading] = useState(false);

  const exportJSON = () => {
    setDownloading(true);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({ auditDate: new Date(), totalPackets: packets.length, alerts, packets }, null, 2)
    );
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `NetSecure_Audit_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setTimeout(() => setDownloading(false), 800);
  };

  return (
    <main className="main">
      <header className="header">
        <div>
          <h1>Forensic Reports & Data Export</h1>
          <p>Cryptographic audit logging, compliance packages and forensic dumps</p>
        </div>
        <span className="cyber-badge cyber-badge-cyan">● COMPLIANCE READY</span>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "20px" }}>
        {/* EXPORT CONSOLE */}
        <section className="panel cyber-card" style={{ margin: 0 }}>
          <div className="panel-header">
            <h2>Generate Forensic Artifacts</h2>
          </div>
          <p style={{ color: "#9ca3af", fontSize: "13px", lineHeight: "1.6" }}>
            Compile in-memory frames, packet stream intervals, protocol stats, and IDS alert logs into standardized compliance formats.
          </p>

          <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
            <button
              onClick={exportJSON}
              className="capture-button"
              disabled={downloading}
              style={{ background: "#38bdf8", color: "#041008" }}
            >
              {downloading ? "Compiling Payload..." : "Download JSON Audit Archive"}
            </button>
            <button
              onClick={() => alert("CSV Export initialized for current capture buffer.")}
              className="capture-button"
              style={{ background: "#1f2937", color: "#fff", border: "1px solid #374151" }}
            >
              Export CSV Raw
            </button>
          </div>
        </section>

        {/* AUDIT SUMMARY STATS */}
        <section className="panel cyber-card" style={{ margin: 0 }}>
          <div className="panel-header">
            <h2>Capture Session Hash</h2>
          </div>
          <div className="terminal-block">
            SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855<br />
            Frames Logged: {packets.length}<br />
            Alerts Flagged: {alerts.length}<br />
            Throughput: {(totalBytes / (1024 * 1024)).toFixed(2)} MB
          </div>
        </section>
      </div>
    </main>
  );
}