import { motion } from 'motion/react';
import type { Key } from 'react';
import { ArrowUpRight, Users, Eye, TrendingUp } from 'lucide-react';

export interface KPI {
  label: string;
  value: string;
  icon?: 'users' | 'views' | 'growth' | 'default';
}

interface KPIStatsProps {
  kpis: KPI[];
}

const getIcon = (type?: string) => {
  switch (type) {
    case 'users': return <Users className="w-4 h-4 text-brand-bold dark:text-brand-light" />;
    case 'views': return <Eye className="w-4 h-4 text-brand-bold dark:text-brand-light" />;
    case 'growth': return <TrendingUp className="w-4 h-4 text-brand-bold dark:text-brand-light" />;
    default: return <ArrowUpRight className="w-4 h-4 text-brand-bold dark:text-brand-light" />;
  }
};

export function KPIBadge({ kpi, delay = 0 }: { key?: Key; kpi: KPI; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className="inline-flex items-center gap-2.5 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full"
    >
      <div className="shrink-0 flex items-center justify-center">
        {getIcon(kpi.icon)}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-base font-bold text-white tracking-normal">
          {kpi.value}
        </span>
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {kpi.label}
        </span>
      </div>
    </motion.div>
  );
}

export default function KPIStats({ kpis }: KPIStatsProps) {
  if (!kpis || kpis.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3 mt-6 mb-8">
      {kpis.map((kpi, i) => (
        <KPIBadge key={i} kpi={kpi} delay={i * 0.1} />
      ))}
    </div>
  );
}
