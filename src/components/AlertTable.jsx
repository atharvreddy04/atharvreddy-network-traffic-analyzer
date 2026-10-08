import {
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

function AlertTable() {
  const alerts = [
    {
      time: "13:45:21",
      severity: "High",
      type: "Port Scan Detected",
      source: "192.168.1.25",
      destination: "192.168.1.10",
      status: "Open",
    },
    {
      time: "13:44:08",
      severity: "Medium",
      type: "Multiple SSH Attempts",
      source: "192.168.1.21",
      destination: "192.168.1.10",
      status: "Investigating",
    },
    {
      time: "13:42:55",
      severity: "Low",
      type: "Unusual DNS Query",
      source: "192.168.1.15",
      destination: "8.8.8.8",
      status: "Resolved",
    },
    {
      time: "13:41:32",
      severity: "High",
      type: "Traffic Spike",
      source: "192.168.1.30",
      destination: "192.168.1.10",
      status: "Open",
    },
  ];

  return (
    <div className="alert-table">

      <div className="alert-header">
        <div>
          <h2>Security Alerts</h2>
          <p>Recent detected network security events</p>
        </div>

        <div className="alert-count">
          <AlertTriangle size={18} />
          <span>{alerts.length} Alerts</span>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Severity</th>
              <th>Alert Type</th>
              <th>Source IP</th>
              <th>Destination IP</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {alerts.map((alert, index) => (
              <tr key={index}>

                <td>{alert.time}</td>

                <td>
                  <span
                    className={`alert-severity ${alert.severity.toLowerCase()}`}
                  >
                    {alert.severity === "High" && (
                      <ShieldAlert size={14} />
                    )}

                    {alert.severity === "Medium" && (
                      <AlertTriangle size={14} />
                    )}

                    {alert.severity === "Low" && (
                      <ShieldCheck size={14} />
                    )}

                    {alert.severity}
                  </span>
                </td>

                <td className="alert-type">
                  {alert.type}
                </td>

                <td>{alert.source}</td>

                <td>{alert.destination}</td>

                <td>
                  <span
                    className={`alert-status ${alert.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {alert.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default AlertTable;