import type { RiskLevel } from '@/data/mockData';
import { getRiskConfig } from '@/data/mockData';

interface RiskBadgeProps {
  level: RiskLevel | 'None';
  size?: 'sm' | 'md';
  pulse?: boolean;
}

export function RiskBadge({ level, size = 'md', pulse = false }: RiskBadgeProps) {
  if (level === 'None') {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-ink-50 ${size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'} font-semibold text-ink-500`}>
        <span className="w-1.5 h-1.5 rounded-full bg-ink-400" />
        None
      </span>
    );
  }

  const cfg = getRiskConfig(level);
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${cfg.border} ${cfg.bg} ${size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'} font-semibold ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${pulse ? 'animate-pulse' : ''}`} />
      {level}
    </span>
  );
}

interface StatusBadgeProps {
  status: 'Active' | 'Acknowledged' | 'Resolved';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    Active: { className: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500' },
    Acknowledged: { className: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
    Resolved: { className: 'bg-green-50 text-green-700 border-green-200', dot: 'bg-green-500' },
  };
  const cfg = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${cfg.className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {status}
    </span>
  );
}
