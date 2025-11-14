import { Skeleton } from "@/components/ui/skeleton";

export default function TopBanksList({ banks,isLoading  }) {
  if (isLoading) {
    return (
      <div className="bg-white p-5 rounded-2xl shadow-md border space-y-3">
        <Skeleton className="h-6 w-40 mb-3" />
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
      <h4 className="text-sm font-medium text-slate-700 mb-2">Top Banks by Agents</h4>
      <ul className="space-y-3">
        {banks
          .slice()
          .sort((a, b) => b.totalAgents - a.totalAgents)
          .slice(0, 5)
          .map((b) => (
            <li key={b.id} className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-800">{b.name}</div>
                <div className="text-xs text-slate-500"> {b.branches?.length || 0} branches</div>
              </div>
              <div className="text-sm font-semibold text-slate-800">{b.totalAgents}</div>
            </li>
          ))}
      </ul>
    </div>
  );
}
