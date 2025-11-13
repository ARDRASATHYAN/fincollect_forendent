import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#6366F1", "#06B6D4", "#10B981", "#F59E0B", "#EF4444"];

export default function BankPanel({ bank, banks = [], onSelectBank }) {
  if (!bank) {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 text-center text-gray-500">
        Loading bank data...
      </div>
    );
  }

  const pieData = (bank.branches || []).map((br) => ({
    name: br.name,
    value: br.agents,
  }));

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
      {/* Bank Selector */}
      <div className="mb-4">
        <Select
          value={bank?.id?.toString() || ""}
          onValueChange={(value) => onSelectBank(value)}
        >
          <SelectTrigger className="w-full border text-sm focus:ring-2 focus:ring-indigo-500">
            <SelectValue placeholder="Choose bank" />
          </SelectTrigger>
          <SelectContent className="max-h-48 overflow-y-auto">
            {banks.map((b) => (
              <SelectItem key={b.id} value={b.id}>
                {b.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bank Info */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-lg"
            style={{
              background: bank?.color
                ? `linear-gradient(135deg, ${bank.color}, rgba(0,0,0,0.02))`
                : "#e5e7eb",
            }}
          />
          <div>
            <div className="text-sm font-semibold text-slate-800">{bank.name}</div>
            <div className="text-xs text-slate-500">
              Established {bank.established || "N/A"}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">Total Agents</div>
          <div className="text-lg font-bold text-slate-800">
            {bank.totalAgents || 0}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-4">
        <h5 className="text-sm font-medium text-slate-700 mb-2">
          Branch distribution
        </h5>
       <div style={{ width: "100%", height: 240, paddingBottom: "20px" }}>
  <ResponsiveContainer>
    <PieChart>
      <Pie
        dataKey="value"
        data={pieData}
        nameKey="name"
        outerRadius={80}
        innerRadius={36}
        paddingAngle={4}
      >
        {pieData.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={
              bank.color || COLORS[index % COLORS.length] || "#6366F1"
            }
          />
        ))}
      </Pie>

      {/* Add small margin below the legend */}
      <Legend
        verticalAlign="bottom"
        height={36}
        wrapperStyle={{ marginTop: 10 }}
      />
    </PieChart>
  </ResponsiveContainer>
</div>


        {/* Branch List */}
        <div className="mt-3 p-2">
          <h6 className="text-xs text-slate-500 mb-2">Branches</h6>
          <div className="space-y-2 overflow-y-auto pr-2 max-h-56 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {(bank.branches || []).map((br) => (
              <div
                key={br.name}
                className="flex items-center justify-between bg-slate-50 p-2 rounded-lg"
              >
                <div className="text-sm font-medium text-slate-800">{br.name}</div>
                <div className="text-sm font-semibold text-slate-800">
                  {br.agents}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
