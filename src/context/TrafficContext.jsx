// src/context/TrafficContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const TrafficContext = createContext();

const PROTOCOLS = ["TCP", "UDP", "DNS", "HTTP", "HTTPS", "SSH", "ICMP"];
const SAMPLE_IPS = [
  "192.168.1.15",
  "192.168.1.25",
  "192.168.1.42",
  "10.0.0.12",
  "142.250.1.1",
  "8.8.8.8",
  "1.1.1.1",
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

  const port = ports[protocol] || 80;
  const sizeBytes = Math.floor(Math.random() * 1400) + 40;
  const now = new Date();
  const time = now.toTimeString().split(" ")[0];

  // Threat rules logic
  let risk = "Low";
  let alertTriggered = null;

  if (port === 22) {
    risk = "Medium";
    alertTriggered = { level: "medium", title: "SSH Connection Attempt", ip: src, time };
  } else if (port === 445 || port === 3389) {
    risk = "High";
    alertTriggered = { level: "high", title: "Suspicious SMB/RDP Activity", ip: src, time };
  } else if (Math.random() < 0.08) {
    risk = "High";
    alertTriggered = { level: "high", title: "Potential Port Scan Detected", ip: src, time };
  }

  return {
    packet: {
      id: Math.random().toString(36).substring(2, 9),
      time,
      source: src,
      destination: dst,
      protocol,
      port,
      size: sizeBytes > 1000 ? `${(sizeBytes / 1024).toFixed(1)} KB` : `${sizeBytes} B`,
      sizeBytes,
      risk,
      layers: {
        ethernet: {
          srcMac: "00:1a:2b:3c:4d:5e",
          dstMac: "f0:9f:c2:11:22:33",
          type: "IPv4 (0x0800)",
        },
        ip: {
          version: 4,
          ttl: 64,
          protocol: `${protocol} (${protocol === "TCP" ? 6 : protocol === "UDP" ? 17 : 1})`,
          checksum: "0x4a21 [verified]",
        },
        transport: {
          srcPort: Math.floor(Math.random() * 40000) + 10240,
          dstPort: port,
          flags: protocol === "TCP" ? "PSH, ACK" : "N/A",
        },
        hex: "17 03 03 00 28 00 00 00 00 00 00 00 01 a1 b2 c3 d4 e5 f6 ...",
      },
    },
    alert: alertTriggered,
  };
};

export function TrafficProvider({ children }) {
  const [isRunning, setIsRunning] = useState(true);
  const [packets, setPackets] = useState([]);
  const [alerts, setAlerts] = useState([
    { level: "high", title: "Port Scan Detected", ip: "192.168.1.25", time: "13:45:07" },
    { level: "medium", title: "Multiple SSH Attempts", ip: "192.168.1.21", time: "13:45:12" },
    { level: "low", title: "Unusual DNS Query", ip: "192.168.1.15", time: "13:45:21" },
  ]);
  const [chartBars, setChartBars] = useState([35, 55, 45, 70, 50, 85, 65, 90, 60, 75]);
  const [totalBytes, setTotalBytes] = useState(1950000000); // ~1.82 GB baseline

  // Live Packet Stream Loop
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const { packet, alert } = generatePacket();

      setPackets((prev) => [packet, ...prev.slice(0, 79)]); // Keep latest 80 packets
      setTotalBytes((prev) => prev + packet.sizeBytes);

      setChartBars((prev) => [
        ...prev.slice(1),
        Math.floor(Math.random() * 65) + 30,
      ]);

      if (alert) {
        setAlerts((prev) => [alert, ...prev.slice(0, 19)]);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleCapture = () => setIsRunning((prev) => !prev);

  return (
    <TrafficContext.Provider
      value={{
        isRunning,
        toggleCapture,
        packets,
        alerts,
        chartBars,
        totalBytes,
      }}
    >
      {children}
    </TrafficContext.Provider>
  );
}

export const useTraffic = () => useContext(TrafficContext);