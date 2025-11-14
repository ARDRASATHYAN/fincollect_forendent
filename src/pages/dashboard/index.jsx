"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Banknote, Building2, Users } from "lucide-react";
import Sidebar from "@/components/commen/SideBar";
import KpiCard from "./components/KpiCard";
import BankChart from "./components/BankChart";
import TopBanksList from "./components/TopBanksList";
import BankPanel from "./components/BankPanel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getDashboardData } from "@/apiservices/dashboardApi";

const COLORS = ["#6366F1", "#06B6D4", "#10B981", "#F59E0B", "#EF4444"];

export default function DashboardPage() {
  const [banks, setBanks] = useState([]);
  const [chartType, setChartType] = useState("bar");
  const [selectedBankId, setSelectedBankId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [summary, setSummary] = useState({ totalBanks: 0, totalBranches: 0, totalAgents: 0 });

  useEffect(() => {
    (async () => {
      // check skelton is working or not make 2 sec delay
      // setIsLoading(true);
      // await new Promise(resolve => setTimeout(resolve, 2000));
      try {
        const data = await getDashboardData();

        // Save both banks and summary data
        const processed = data.banks.map((b, i) => ({
          id: `BANK-${i + 1}`,
          color: COLORS[i % COLORS.length],
          ...b,
        }));

        setBanks(processed);
        setSummary(data.summary || {});
        setSelectedBankId(processed[0]?.id);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);


  const selectedBank = useMemo(
    () => banks.find((b) => b.id === selectedBankId),
    [banks, selectedBankId]
  );
  const agentsPerBank = banks.map((b) => ({
    name: b.name,
    agents: b.totalAgents,
  }));

  //  if (!banks.length) {
  //     return (
  //       <Sidebar>
  //         <div className="p-8 text-center text-gray-600">
  //           Loading Dashboard...
  //         </div>
  //       </Sidebar>
  //     );
  //   }


  return (
    <Sidebar>
      <div className="p-4 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <KpiCard
            title="Total Banks"
            value={summary.totalBanks}
            description="Active Banks"
            colorFrom="from-indigo-500"
            colorTo="to-indigo-700"
            icon={<Banknote />}
            isLoading={isLoading}
          />
          <KpiCard
            title="Total Agents"
            value={summary.totalAgents}
            description="Active Agents"
            colorFrom="from-emerald-500"
            colorTo="to-emerald-700"
            icon={<Users />}
            isLoading={isLoading}
          />
          <KpiCard
            title="Total Collections"
            value={summary.totalAmount}
            description="Of Active Agents"
            colorFrom="from-violet-500"
            colorTo="to-violet-700"
            icon={<Building2 />}
            isLoading={isLoading}
          />

        </div>

        {/* Chart + List + Bank Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
              <div className="flex justify-between ">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  Agents per Bank
                </h3>



                <Select
                  value={chartType}
                  onValueChange={(value) => setChartType(value)}
                >
                  <SelectTrigger className="w-40 border text-sm focus:ring-2 focus:ring-indigo-500">
                    <SelectValue placeholder="Select Chart Type" />
                  </SelectTrigger>
                  <SelectContent className="max-h-48 overflow-y-auto">
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="area">Area Chart</SelectItem>
                  </SelectContent>
                </Select>

              </div>



              <BankChart data={agentsPerBank} chartType={chartType} isLoading={isLoading} />
            </div>

            <TopBanksList banks={banks} isLoading={isLoading} />
          </div>

          {selectedBank && <BankPanel bank={selectedBank}
            banks={banks}
            onSelectBank={setSelectedBankId} isLoading={isLoading} />}
        </div>
      </div>
    </Sidebar>
  );
}
