import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function KpiCard({ title, value, description, colorFrom, colorTo, icon,isLoading }) {
  if (isLoading) {
    return (
      <div className="bg-white p-4 rounded-2xl shadow border">
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-8 w-20 mb-1" />
        <Skeleton className="h-4 w-24" />
      </div>
    );
  }
  return (
    <motion.div whileHover={{ translateY: -4 }} className={`rounded-2xl p-4 shadow-lg relative overflow-hidden text-white bg-gradient-to-br ${colorFrom} ${colorTo}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs opacity-90">{title}</div>
          <div className="text-2xl font-bold mt-1">{value}</div>
          {description && <div className="text-xs opacity-90 mt-1">{description}</div>}
        </div>
        <div className="opacity-80">{icon}</div>
      </div>
    </motion.div>
  );
}
