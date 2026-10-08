// src/pages/PacketAnalyzer.jsx
import React, { useState } from "react";

const PACKET_SAMPLES = [
  {
    id: 1,
    time: "14:10:02.124",
    source: "192.168.1.15",
    destination: "142.250.190.46",
    protocol: "TCP",
    port: 443,
    size: "1.4 KB",
    info: "443 → 52410 [ACK] Seq=1 Ack=1 Win=65535 Len=1380",
    layers: {
      ethernet: {
        srcMac: "00:1a:2b:3c:4d:5e",
        dstMac: "f0:9f:c2:11:22:33",
        type: "IPv4 (0x0800)",
      },
      ip: {
        version: 4,
        headerLength: "20 bytes",
        ttl: 64,
        protocol: "TCP (6)",
        checksum: "0x4a21 [verified]",
      },
      transport: {
        srcPort: 443,
        dstPort: 52410,
        flags: "ACK (0x010)",
        windowSize: 65535,
      },
      hex: "17 03 03 00 28 00 00 00 00 00 00 00 01 a1 b2 c3 d4 e5 f6 ...",
    },
  },
  {
    id: 2,
    time: "14:10:05.811",
    source: "192.168.1.25",
    destination: "8.8.8.8",
    protocol: "DNS",
    port: 53,
    size: "74 B",
    info: "Standard query 0x1a2b A api.threat-intel.io",
    layers: {
      ethernet: {
        srcMac: "00:1a:2b:3c:4d:5e",
        dstMac: "c8:4c:75:88:99:aa",
        type: "IPv4 (0x0800)",
      },
      ip: {
        version: 4,
        headerLength: "20 bytes",
        ttl: 128,
        protocol: "UDP (17)",
        checksum: "0x8f19 [verified]",
      },
      transport: {
        srcPort: 54120,
        dstPort: 53,
        flags: "None (UDP)",
        windowSize: "N/A",
      },
      hex: "00 35 d3 68 00 24 00 00 1a 2b 01 00 00 01 00 00 00 00 00 00 ...",
    },
  },
  {
    id: 3,
    time: "14:10:09.432",
    source: "192.168.1.21",
    destination: "192.168.1.10",
    protocol: "SSH",
    port: 22,
    size: "98 B",
    info: "Client: Key Exchange Init (Diffie-Hellman-Group-Exchange-SHA256)",
    layers: {
      ethernet: {
        srcMac: "00:1a:2b:3c:4d:5e",
        dstMac: "aa:bb:cc:dd:ee:ff",
        type: "IPv4 (0x0800)",
      },
      ip: {
        version: 4,
        headerLength: "20 bytes",
        ttl: 54,
        protocol: "TCP (6)",
        checksum: "0x23a1 [verified]",
      },
      transport: {
        srcPort: 50114,
        dstPort: 22,
        flags: "PSH, ACK (0x018)",
        windowSize: 32768,
      },
      hex: "53 53 48 2d 32 2e 30 2d 4f 70 65 6e 53 53 48 5f 38 2e 39 70 31 ...",
    },
  },
];

export default function PacketAnalyzer() {
  const [selectedPacket, setSelectedPacket] = useState(PACKET_SAMPLES[0]);

  return (
    <main className="main">
      <header className="header">
        <div>
          <h1>Packet Analyzer</h1>
          <p>Deep Layer Dissection & Hexadecimal Payload Inspection</p>
        </div>
      </header>

      {/* PACKET LIST (TOP VIEW) */}
      <section className="panel">
        <div className="panel-header">
          <h2>Captured Packets</h2>
          <span className="live">Select a row to inspect</span>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Time</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Protocol</th>
                <th>Length</th>
                <th>Info</th>
              </tr>
            </thead>
            <tbody>
              {PACKET_SAMPLES.map((pkt) => (
                <tr
                  key={pkt.id}
                  onClick={() => setSelectedPacket(pkt)}
                  style={{
                    cursor: "pointer",
                    background: selectedPacket.id === pkt.id ? "#17202b" : "transparent",
                  }}
                >
                  <td>#{pkt.id}</td>
                  <td>{pkt.time}</td>
                  <td>{pkt.source}</td>
                  <td>{pkt.destination}</td>
                  <td>
                    <span className="protocol">{pkt.protocol}</span>
                  </td>
                  <td>{pkt.size}</td>
                  <td style={{ color: "#9ca3af" }}>{pkt.info}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* DISSECTION DETAILS (BOTTOM VIEW) */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "20px" }}>
        {/* LAYER DETAILS */}
        <section className="panel" style={{ margin: 0 }}>
          <div className="panel-header">
            <h2>Packet #{selectedPacket.id} Dissection</h2>
            <span className="live">● PROTOCOL STACK</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px" }}>
            <div style={{ background: "#111827", padding: "12px", borderRadius: "6px" }}>
              <strong style={{ color: "#38bdf8" }}>▶ Frame / Ethernet Layer</strong>
              <div style={{ marginTop: "6px", color: "#9ca3af" }}>
                Source MAC: <code>{selectedPacket.layers.ethernet.srcMac}</code><br />
                Destination MAC: <code>{selectedPacket.layers.ethernet.dstMac}</code><br />
                Type: {selectedPacket.layers.ethernet.type}
              </div>
            </div>

            <div style={{ background: "#111827", padding: "12px", borderRadius: "6px" }}>
              <strong style={{ color: "#22c55e" }}>▶ Internet Protocol Version 4 (IPv4)</strong>
              <div style={{ marginTop: "6px", color: "#9ca3af" }}>
                Source: <code>{selectedPacket.source}</code> → Dest: <code>{selectedPacket.destination}</code><br />
                TTL: {selectedPacket.layers.ip.ttl} | Protocol: {selectedPacket.layers.ip.protocol}<br />
                Checksum: {selectedPacket.layers.ip.checksum}
              </div>
            </div>

            <div style={{ background: "#111827", padding: "12px", borderRadius: "6px" }}>
              <strong style={{ color: "#f59e0b" }}>▶ Transport Layer ({selectedPacket.protocol})</strong>
              <div style={{ marginTop: "6px", color: "#9ca3af" }}>
                Port: <code>{selectedPacket.layers.transport.srcPort}</code> → <code>{selectedPacket.layers.transport.dstPort}</code><br />
                Flags: {selectedPacket.layers.transport.flags}<br />
                Window Size: {selectedPacket.layers.transport.windowSize}
              </div>
            </div>
          </div>
        </section>

        {/* HEX VIEW */}
        <section className="panel" style={{ margin: 0 }}>
          <div className="panel-header">
            <h2>Hex Dump & Payload</h2>
            <span style={{ fontSize: "11px", color: "#9ca3af" }}>ASCII / HEX</span>
          </div>

          <pre
            style={{
              background: "#05070d",
              padding: "16px",
              borderRadius: "6px",
              color: "#4ade80",
              fontFamily: "monospace",
              fontSize: "12px",
              lineHeight: "1.6",
              overflowX: "auto",
              border: "1px solid #1f2937",
            }}
          >
            {selectedPacket.layers.hex}
          </pre>
        </section>
      </div>
    </main>
  );
}