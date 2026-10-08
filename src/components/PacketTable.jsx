import {
  Eye,
  Activity,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

function PacketTable() {
  const packets = [
    {
      time: "13:45:21",
      source: "192.168.1.15",
      destination: "8.8.8.8",
      protocol: "DNS",
      sourcePort: "52143",
      destinationPort: "53",
      size: "82 B",
      risk: "Low",
    },
    {
      time: "13:45:18",
      source: "192.168.1.15",
      destination: "142.250.1.1",
      protocol: "TCP",
      sourcePort: "52145",
      destinationPort: "443",
      size: "1.2 KB",
      risk: "Low",
    },
    {
      time: "13:45:12",
      source: "192.168.1.21",
      destination: "192.168.1.10",
      protocol: "TCP",
      sourcePort: "49231",
      destinationPort: "22",
      size: "64 B",
      risk: "Medium",
    },
    {
      time: "13:45:07",
      source: "192.168.1.25",
      destination: "192.168.1.10",
      protocol: "TCP",
      sourcePort: "49152",
      destinationPort: "445",
      size: "128 B",
      risk: "High",
    },
    {
      time: "13:44:59",
      source: "192.168.1.18",
      destination: "1.1.1.1",
      protocol: "DNS",
      sourcePort: "53221",
      destinationPort: "53",
      size: "96 B",
      risk: "Low",
    },
    {
      time: "13:44:51",
      source: "192.168.1.30",
      destination: "192.168.1.10",
      protocol: "ICMP",
      sourcePort: "-",
      destinationPort: "-",
      size: "74 B",
      risk: "Medium",
    },
  ];

  return (
    <div className="packet-table">

      {/* Header */}
      <div className="packet-header">

        <div>
          <div className="packet-title">
            <Activity size={20} />
            <h2>Network Packets</h2>
          </div>

          <p>
            Recently analyzed network traffic
          </p>
        </div>

        <div className="packet-status">
          <span className="status-dot"></span>
          Monitoring
        </div>

      </div>

      {/* Search and filters */}
      <div className="packet-controls">

        <input
          type="text"
          placeholder="Search IP, protocol or port..."
          className="packet-search"
        />

        <select className="packet-filter">
          <option value="all">All Protocols</option>
          <option value="TCP">TCP</option>
          <option value="UDP">UDP</option>
          <option value="DNS">DNS</option>
          <option value="ICMP">ICMP</option>
          <option value="HTTP">HTTP</option>
          <option value="HTTPS">HTTPS</option>
        </select>

        <select className="packet-filter">
          <option value="all">All Risks</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

      </div>

      {/* Table */}
      <div className="packet-table-container">

        <table>

          <thead>
            <tr>
              <th>Time</th>
              <th>Source IP</th>
              <th>Destination IP</th>
              <th>Protocol</th>
              <th>Source Port</th>
              <th>Destination Port</th>
              <th>Size</th>
              <th>Risk</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {packets.map((packet, index) => (

              <tr key={index}>

                <td className="packet-time">
                  {packet.time}
                </td>

                <td>
                  {packet.source}
                </td>

                <td>
                  {packet.destination}
                </td>

                <td>
                  <span
                    className={`protocol ${packet.protocol.toLowerCase()}`}
                  >
                    {packet.protocol}
                  </span>
                </td>

                <td>
                  {packet.sourcePort}
                </td>

                <td>
                  {packet.destinationPort}
                </td>

                <td>
                  {packet.size}
                </td>

                <td>

                  <span
                    className={`packet-risk ${packet.risk.toLowerCase()}`}
                  >

                    {packet.risk === "High" && (
                      <ShieldAlert size={13} />
                    )}

                    {packet.risk === "Medium" && (
                      <ShieldAlert size={13} />
                    )}

                    {packet.risk === "Low" && (
                      <ShieldCheck size={13} />
                    )}

                    {packet.risk}

                  </span>

                </td>

                <td>

                  <button
                    className="view-packet"
                    title="View packet details"
                    onClick={() =>
                      alert(
                        `Packet Details\n\n` +
                        `Time: ${packet.time}\n` +
                        `Source: ${packet.source}\n` +
                        `Destination: ${packet.destination}\n` +
                        `Protocol: ${packet.protocol}\n` +
                        `Source Port: ${packet.sourcePort}\n` +
                        `Destination Port: ${packet.destinationPort}\n` +
                        `Size: ${packet.size}\n` +
                        `Risk: ${packet.risk}`
                      )
                    }
                  >
                    <Eye size={16} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Footer */}
      <div className="packet-footer">

        <span>
          Showing {packets.length} packets
        </span>

        <div className="packet-pagination">

          <button disabled>
            Previous
          </button>

          <span className="current-page">
            1
          </span>

          <button>
            Next
          </button>

        </div>

      </div>

    </div>
  );
}

export default PacketTable;