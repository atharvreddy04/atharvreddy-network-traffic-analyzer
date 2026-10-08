import React, { useState, useEffect, useRef } from "react";

const PROTOCOLS = ["TCP", "UDP", "DNS", "HTTP", "HTTPS", "SSH", "ICMP"];
const SAMPLE_IPS = [
  "192.168.1.15",
  "192.168.1.25",
  "192.168.1.42",
  "10.0.0.12",
  "142.250.1.1",
  "8.8.8.8",
  "1.1.1.1",
  "172.217.16.206",
  "192.168.1.10",
];

const generatePacket = () => {
  const protocol = PROTOCOLS[Math.floor(Math.random() * PROTOCOLS.length)];
  const src = SAMPLE_IPS[Math.floor(Math.random() * SAMPLE_IPS.length)];
  let dst = SAMPLE_IPS[Math.floor(Math.random() * SAMPLE_IPS.length)];
  while (dst === src) {
    dst = SAMPLE_IPS[Math.floor(Math.random() * SAMPLE_IPS.length)];
  }

  const ports = {
    DNS: 53,
    HTTP: 80,
    HTTPS: 443,
    SSH: 22,
    TCP: Math.floor(Math.random() * 50000) + 1024,
    UDP: Math.floor(Math.random() * 50000) + 1024,
    ICMP: 0,
  };

  const risks = ["Low", "Low", "Low", "Medium", "High"];
  const risk = risks[Math.floor(Math.random() * risks.length)];
  const sizeBytes = Math.floor(Math.random() * 1400) + 40;

  const now = new Date();
  const time = now.toTimeString().split(" ")[0];

  return {
    id: Math.random().toString(36).substring(2, 9),
    time,
    source: src,
    destination: dst,
    protocol,
    port: ports[protocol] || 80,
    size: sizeBytes > 1000 ? `${(sizeBytes / 1024).toFixed(1)} KB` : `${sizeBytes} B`,
    risk,
  };
};

export default function Traffic() {
  const [isCapturing, setIsCapturing] = useState(true);
  const [packets, setPackets] = useState([]);
  const [chartBars, setChartBars] = useState([40, 60, 55, 75, 45, 80, 65, 90, 70, 85]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProtocol, setSelectedProtocol] = useState("ALL");

  useEffect(() => {
    // Generate initial set
    const init = Array.from({ length: 8 }, generatePacket);
    setPackets(init);
  }, []);

  useEffect(() => {
    if (!isCapturing) return;

    const interval = setInterval(() => {
      const newPacket = generatePacket();
      
      setPackets((prev) => [newPacket, ...prev.slice(0, 49)]); // keep latest 50

      setChartBars((prev) => {
        const next = [...prev.slice(1), Math.floor(Math.random() * 70) + 25];
        return next;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isCapturing]);

  const filteredPackets = packets.filter((p) => {
    const matchesSearch =
      p.source.includes(searchTerm) ||
      p.destination.includes(searchTerm) ||
      p.port.toString().includes(searchTerm);
    const matchesProtocol =
      selectedProtocol === "ALL" || p.protocol === selectedProtocol;
    return matchesSearch && matchesProtocol;
  });

  return (
    <main className="main">
      {/* HEADER */}
      <header className="header">
        <div>
          <h1>Live Traffic Stream</h1>
          <p>Real-time packet capture and flow telemetry</p>
        </div>

        <div className="header-controls">
          <span className={isCapturing ? "online" : "offline"}>
            ● {isCapturing ? "Streaming Packets" : "Capture Paused"}
          </span>

          <button
            className="capture-button"
            onClick={() => setIsCapturing(!isCapturing)}
            style={{
              background: isCapturing ? "#ef4444" : "#22c55e",
              color: "#fff",
            }}
          >
            {isCapturing ? "Pause Stream" : "Resume Stream"}
          </button>
        </div>
      </header>

      {/* STATS OVERVIEW */}
      <section className="stats">
        <div className="stat">
          <div className="stat-icon">📡</div>
          <div>
            <p>Stream Status</p>
            <h2 style={{ fontSize: "16px", color: isCapturing ? "#22c55e" : "#ef4444" }}>
              {isCapturing ? "PROMISCUOUS" : "STANDBY"}
            </h2>
          </div>
        </div>

        <div className="stat">
          <div className="stat-icon">⚡</div>
          <div>
            <p>Packets in Buffer</p>
            <h2>{packets.length}</h2>
          </div>
        </div>

        <div className="stat">
          <div className="stat-icon">🔍</div>
          <div>
            <p>Active Filters</p>
            <h2>{selectedProtocol}</h2>
          </div>
        </div>

        <div className="stat alert-stat">
          <div className="stat-icon">⚠️</div>
          <div>
            <p>High Risk Detected</p>
            <h2>{packets.filter((p) => p.risk === "High").length}</h2>
          </div>
        </div>
      </section>

      {/* REAL-TIME DYNAMIC CHART */}
      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Live Throughput Frequency</h2>
            <p>Instantaneous packet rate per second</p>
          </div>
          <span className="live">● REFRESHING 1.2s</span>
        </div>

        <div className="chart">
          {chartBars.map((height, idx) => (
            <div
              key={idx}
              style={{
                height: `${height}%`,
                transition: "height 0.4s ease",
              }}
            />
          ))}
        </div>
      </section>

      {/* LIVE PACKET TABLE */}
      <section className="panel">
        <div className="panel-header" style={{ flexWrap: "wrap", gap: "10px" }}>
          <div>
            <h2>Captured Frames</h2>
            <p>Inspecting packet headers in flight</p>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <select
              value={selectedProtocol}
              onChange={(e) => setSelectedProtocol(e.target.value)}
              style={{
                background: "#111827",
                border: "1px solid #374151",
                color: "#fff",
                padding: "8px 12px",
                borderRadius: "6px",
                fontSize: "12px",
              }}
            >
              <option value="ALL">All Protocols</option>
              {PROTOCOLS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search IP / Port..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
                <th>Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {filteredPackets.map((packet) => (
                <tr key={packet.id}>
                  <td>{packet.time}</td>
                  <td>{packet.source}</td>
                  <td>{packet.destination}</td>
                  <td>
                    <span className="protocol">{packet.protocol}</span>
                  </td>
                  <td>{packet.port}</td>
                  <td>{packet.size}</td>
                  <td>
                    <span className={`risk ${packet.risk.toLowerCase()}`}>
                      {packet.risk}
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