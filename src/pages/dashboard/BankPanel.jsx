import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#6366F1", "#06B6D4", "#10B981", "#F59E0B", "#EF4444"];

export default function BankPanel({ bank }) {
  const pieData = (bank?.branches || []).map((br) => ({ name: br.name, value: br.agents }));

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-slate-500">Selected Bank</div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg" style={{ background: `linear-gradient(135deg, ${bank.color}, rgba(0,0,0,0.02))` }} />
            <div>
              <div className="text-sm font-semibold text-slate-800">{bank.name}</div>
              <div className="text-xs text-slate-500">Established {bank.established}</div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">Total Agents</div>
          <div className="text-lg font-bold text-slate-800">{bank.totalAgents}</div>
        </div>
      </div>

      <div className="mt-4">
        <h5 className="text-sm font-medium text-slate-700 mb-2">Branch distribution</h5>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie dataKey="value" data={pieData} nameKey="name" outerRadius={80} innerRadius={36} paddingAngle={4}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={bank.color || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3">
          <h6 className="text-xs text-slate-500 mb-2">Branches</h6>
          <div className="space-y-2 overflow-auto pr-2">
            {bank.branches.map((br) => (
              <div key={br.name} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg">
                <div className="text-sm font-medium text-slate-800">{br.name}</div>
                <div className="text-sm font-semibold text-slate-800">{br.agents}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
