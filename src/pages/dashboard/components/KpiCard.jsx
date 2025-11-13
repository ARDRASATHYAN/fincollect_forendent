import { motion } from "framer-motion";

export default function KpiCard({ title, value, description, colorFrom, colorTo, icon }) {
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
