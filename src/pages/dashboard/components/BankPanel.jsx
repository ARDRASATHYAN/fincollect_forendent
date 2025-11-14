import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#6366F1","#06B6D4","#10B981","#F59E0B",
      "#EF4444","#170939ff","#FB7185","#0EA5E9",
      "#7C3AED","#F97316","#14B8A6","#0EA5E9"];

export default function BankPanel({ bank, banks = [], onSelectBank,isLoading  }) {
 if (isLoading || !bank) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow border">
        <Skeleton className="h-6 w-32 mb-4" />
        <Skeleton className="h-10 w-full mb-3" />
        <Skeleton className="h-10 w-full mb-3" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full mt-4 rounded-xl" /> {/* chart placeholder */}
      </div>
    );
  }



  const pieData = (bank.branches || []).map((br) => ({
    name: br.name,
    value: br.agents,
  }));

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
     
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

      {/* 🧾 Bank Info */}
      <div className="flex items-start pb-2">
            <div className="text-sm font-semibold text-slate-800">{bank.name}</div>
      </div>
      <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg">
          <div className="text-sm font-medium text-slate-800">Total Agents</div>
          <div className="text-sm font-medium text-slate-800">
            {bank.totalAgents || 0}
          </div>
        </div>

      {/* 🥧 Chart Section */}
      <div className="mt-4">

        {/* Chart container */}
        <div style={{ width: "100%", height: 200 }}>
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
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend BELOW chart (no overlap) */}
        <div className="mt-4 mb-3 flex flex-wrap justify-center gap-3 text-xs text-slate-600">
          {pieData.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded-sm"
                style={{
                  background: COLORS[index % COLORS.length],
                }}
              ></span>
              {entry.name}
            </div>
          ))}
        </div>
      </div>

      {/* Branch List */}
      <div className="mt-3 p-2">
        <div className="space-y-2 overflow-y-auto pr-2 max-h-[250px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
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
  );
}
