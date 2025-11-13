export default function TopBanksList({ banks }) {
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
