import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import trafficData from "../data/trafficData";

function TrafficChart() {
  return (
    <div className="traffic-chart">

      <div className="chart-header">

        <div>
          <h2>Network Traffic</h2>

          <p>
            Packets captured over time
          </p>
        </div>

        <div className="live-indicator">
          <span></span>
          LIVE
        </div>

      </div>

      <div className="chart-container">

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <AreaChart data={trafficData}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1f2937"
            />

            <XAxis
              dataKey="time"
              stroke="#6b7280"
              fontSize={11}
            />

            <YAxis
              stroke="#6b7280"
              fontSize={11}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0d1117",
                border: "1px solid #374151",
                borderRadius: "6px",
                color: "#e5e7eb",
              }}
            />

            <Area
              type="monotone"
              dataKey="packets"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.12}
              strokeWidth={2}
            />

          </AreaChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default TrafficChart;