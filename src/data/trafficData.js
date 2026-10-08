// src/data/trafficData.js

export const initialPackets = [
  {
    time: "13:45:21",
    source: "192.168.1.15",
    destination: "8.8.8.8",
    protocol: "DNS",
    port: "53",
    size: "82 B",
    risk: "Low",
  },
  {
    time: "13:45:18",
    source: "192.168.1.15",
    destination: "142.250.1.1",
    protocol: "TCP",
    port: "443",
    size: "1.2 KB",
    risk: "Low",
  },
  {
    time: "13:45:12",
    source: "192.168.1.21",
    destination: "192.168.1.10",
    protocol: "TCP",
    port: "22",
    size: "64 B",
    risk: "Medium",
  },
  {
    time: "13:45:07",
    source: "192.168.1.25",
    destination: "192.168.1.10",
    protocol: "TCP",
    port: "445",
    size: "128 B",
    risk: "High",
  },
];

export const initialAlerts = [
  { level: "high", title: "Port Scan Detected", ip: "192.168.1.25" },
  { level: "medium", title: "Multiple SSH Attempts", ip: "192.168.1.21" },
  { level: "low", title: "Unusual DNS Query", ip: "192.168.1.15" },
];