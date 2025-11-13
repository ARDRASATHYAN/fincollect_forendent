"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import {
  Banknote, Building2, Users, TrendingUp, ChevronRight
} from "lucide-react";
import Sidebar from "@/components/commen/SideBar";

const COLORS = ["#6366F1","#06B6D4","#10B981","#F59E0B","#EF4444","#8B5CF6","#06B6D4","#FB7185","#0EA5E9","#7C3AED","#F97316","#14B8A6"];

export default function Dashboard() {
  const [banks, setBanks] = useState([]);
  const [selectedBankId, setSelectedBankId] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch data from backend
  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("http://localhost:5000/dashboard");
        const data = await res.json();
        setBanks(data.banks || []);
        setSelectedBankId(data.banks?.[0]?.id || null);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);
  
    const selectedBank = useMemo(
    () => banks.find((b) => b.id === selectedBankId) || banks[0],
    [banks, selectedBankId]
  );

  if (loading) return <div className="p-8 text-center">Loading Dashboard...</div>;



  const totalBanks = banks.length;
  const totalBranches = banks.reduce((acc, b) => acc + b.branches.length, 0);
  const totalAgents = banks.reduce((acc, b) => acc + b.totalAgents, 0);
  const agentsPerBank = banks.map((b) => ({ name: b.name, agents: b.totalAgents }));

  const pieData = (selectedBank?.branches || []).map((br) => ({
    name: br.name,
    value: br.agents,
  }));

  // ✅ Then your JSX stays the same below


  return (
    <Sidebar>
    <div className="min-h-screen  p-2">
      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Bank Insights</h1>
            <p className="text-sm text-slate-600 mt-1">Live view — Banks · Branches · Agents</p>
          </div>
         
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          <KpiCard title="Total Banks" value={totalBanks} description="Active banking partners" colorFrom="from-indigo-500" colorTo="to-indigo-700" icon={<Banknote className="w-5 h-5" />} />
          <KpiCard title="Total Branches" value={totalBranches} description="All branches across banks" colorFrom="from-emerald-500" colorTo="to-emerald-700" icon={<Building2 className="w-5 h-5" />} />
          <KpiCard title="Total Agents" value={totalAgents} description="Registered agents" colorFrom="from-violet-500" colorTo="to-violet-700" icon={<Users className="w-5 h-5" />} />
          {/* <KpiCard title="Growth (30d)" value="+8.4%" description="Agent growth rate" colorFrom="from-yellow-400" colorTo="to-orange-500" icon={<TrendingUp className="w-5 h-5" />} /> */}
        </div>

        {/* Main area: left charts, right bank panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Charts area (span two columns on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Agents per bank (bar chart) */}
            <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Agents — bank comparison</h3>
                  <p className="text-sm text-slate-500">Shows total agents per bank</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    className="text-sm rounded-md border px-2 py-1"
                    value={selectedBankId}
                    onChange={(e) => setSelectedBankId(e.target.value)}
                  >
                    {banks.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ width: "100%", height: 320 }}>
                <ResponsiveContainer>
                  <BarChart data={agentsPerBank} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e6eef6" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="agents" radius={[8,8,0,0]} fill="#6366F1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Agent trend + mini-list */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> */}
              {/* <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 md:col-span-2">
                <h4 className="text-sm font-medium text-slate-700 mb-2">Agent growth (last 6 months)</h4>
                <MiniAreaChart />
              </div> */}

              <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
                <h4 className="text-sm font-medium text-slate-700 mb-2">Top Banks by Agents</h4>
                <ul className="space-y-3">
                  {banks
                    .slice()
                    .sort((a,b) => b.totalAgents - a.totalAgents)
                    .slice(0,5)
                    .map((b) => (
                      <li key={b.id} className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-slate-800">{b.name}</div>
                          <div className="text-xs text-slate-500">{b.branches.length} branches</div>
                        </div>
                        <div className="text-sm font-semibold text-slate-800">{b.totalAgents}</div>
                      </li>
                    ))}
                </ul>
              </div>
            {/* </div> */}
          </div>

          {/* RIGHT: Selected Bank panel */}
          <motion.aside
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-5 shadow-md border border-gray-100"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-slate-500">Selected Bank</div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg" style={{ background: `linear-gradient(135deg, ${selectedBank.color}, rgba(0,0,0,0.02))` }} />
                  <div>
                    <div className="text-sm font-semibold text-slate-800">{selectedBank.name}</div>
                    <div className="text-xs text-slate-500">Established {selectedBank.established}</div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-500">Total Agents</div>
                <div className="text-lg font-bold text-slate-800">{selectedBank.totalAgents}</div>
              </div>
            </div>

            <div className="mt-4">
              <h5 className="text-sm font-medium text-slate-700 mb-2">Branch distribution</h5>
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie dataKey="value" data={pieData} nameKey="name" outerRadius={80} innerRadius={36} paddingAngle={4}>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={selectedBank.color || COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={36} />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-3">
                <h6 className="text-xs text-slate-500 mb-2">Branches</h6>
                <div className="space-y-2 overflow-auto pr-2">
                  {selectedBank.branches.map((br) => (
                    <div key={br.id} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg">
                      <div>
                        <div className="text-sm font-medium text-slate-800">{br.name}</div>
                        <div className="text-xs text-slate-500">{br.id}</div>
                      </div>
                      <div className="text-sm font-semibold text-slate-800">{br.agents}</div>
                    </div>
                  ))}
                </div>
              </div>
{/* 
              <button
                onClick={() => {
                  // Example: navigate to bank detail page, or open full modal
                  alert(`Open detail view for ${selectedBank.name}`);
                }}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:opacity-95"
              >
                View full bank report <ChevronRight className="w-4 h-4" />
              </button> */}
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
    </Sidebar>
  );
}

/* =========================
   Helper components
   ========================= */

function KpiCard({ title, value, description, colorFrom="from-indigo-500", colorTo="to-indigo-700", icon }) {
  return (
    <motion.div
      whileHover={{ translateY: -4 }}
      className={`rounded-2xl p-4 shadow-lg relative overflow-hidden text-white bg-gradient-to-br ${colorFrom} ${colorTo}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs opacity-90">{title}</div>
          <div className="text-2xl font-bold mt-1">{value}</div>
          {description && <div className="text-xs opacity-90 mt-1">{description}</div>}
        </div>
        <div className="opacity-80">{icon}</div>
      </div>
      <div className="absolute -right-10 -top-6 opacity-20 transform rotate-45 w-40 h-40 rounded-full" />
    </motion.div>
  );
}

// function MiniAreaChart() {
//   // Tiny mock time-series for look & feel
//   const trend = [
//     { x: "Jan", y: 80 }, { x: "Feb", y: 95 }, { x: "Mar", y: 110 },
//     { x: "Apr", y: 125 }, { x: "May", y: 138 }, { x: "Jun", y: 145 }
//   ];
//   // We'll use a bar-style micro chart using recharts Area / Bar is fine — keep minimal
//   return (
//     <div style={{ width: "100%", height: 110 }}>
//       <ResponsiveContainer>
//         <BarChart data={trend}>
//           <CartesianGrid vertical={false} horizontal={false} />
//           <XAxis dataKey="x" axisLine={false} tick={{ fontSize: 11 }} />
//           <Tooltip />
//           <Bar dataKey="y" fill="#7C3AED" radius={[6,6,6,6]} />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
