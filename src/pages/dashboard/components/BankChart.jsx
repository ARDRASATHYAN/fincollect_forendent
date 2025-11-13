import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function BankChart({ data, chartType }) {
  return (
    <ResponsiveContainer width="100%" height={380}>
      {chartType === "area" ? (
        <AreaChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="colorAgents" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.6}/>
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#e6eef6" />
          <XAxis dataKey="name" hide />
          <YAxis tick={{ fontSize: 12, fill: "#374151" }} />
          <Tooltip cursor={{ stroke: "#6366F1", strokeWidth: 1, strokeDasharray: "3 3" }} />
          <Area type="natural" dataKey="agents" stroke="#6366F1" fill="url(#colorAgents)" strokeWidth={2} activeDot={{ r: 6 }} />
        </AreaChart>
      ) : (
        <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <CartesianGrid vertical={false} stroke="#e6eef6" />
          <XAxis dataKey="name" hide />
          <YAxis tick={{ fontSize: 12, fill: "#374151" }} />
          <Tooltip />
          <Bar dataKey="agents" fill="#6366F1" radius={[6,6,0,0]} />
        </BarChart>
      )}
    </ResponsiveContainer>
  );
}
