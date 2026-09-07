import { AlertTriangle, Clock, MapPin, ShieldAlert, Navigation, CheckCircle2, Info } from 'lucide-react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { RiskBadge } from '@/components/ui/Badge';
import { locations, getRiskConfig, type RiskLevel } from '@/data/mockData';

interface WarningsProps {
  onSelectLocation: (id: string) => void;
}

const warningLevels: { level: RiskLevel; color: string; bg: string; border: string; description: string }[] = [
  { level: 'Low', color: '#22c55e', bg: 'bg-green-50', border: 'border-green-200', description: 'Monitor conditions' },
  { level: 'Moderate', color: '#f59e0b', bg: 'bg-amber-50', border: 'border-amber-200', description: 'Issue advisory' },
  { level: 'High', color: '#f97316', bg: 'bg-orange-50', border: 'border-orange-200', description: 'Prepare evacuation' },
  { level: 'Critical', color: '#ef4444', bg: 'bg-red-50', border: 'border-red-200', description: 'Evacuate immediately' },
];

export function Warnings({ onSelectLocation }: WarningsProps) {
  const withWarnings = locations.filter((l) => l.warning.level !== 'None');
  const sorted = [...withWarnings].sort((a, b) => {
    const order = { Critical: 4, High: 3, Moderate: 2, Low: 1 };
    return order[b.warning.level as RiskLevel] - order[a.warning.level as RiskLevel];
  });

  const counts = {
    Critical: locations.filter((l) => l.warning.level === 'Critical').length,
    High: locations.filter((l) => l.warning.level === 'High').length,
    Moderate: locations.filter((l) => l.warning.level === 'Moderate').length,
    Low: locations.filter((l) => l.warning.level === 'Low').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider">Live Monitoring</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 mt-1">Early Warning System</h1>
        <p className="text-sm text-ink-500 mt-1">Active warnings and recommended actions for landslide-prone zones</p>
      </div>

      {/* Warning level summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {warningLevels.map((wl) => (
          <Card key={wl.level} className={`p-5 border-2 ${wl.border} ${wl.bg}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold" style={{ color: wl.color }}>{counts[wl.level]}</p>
                <p className="text-sm font-semibold text-ink-700 mt-1">{wl.level}</p>
                <p className="text-[11px] text-ink-400 mt-0.5">{wl.description}</p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${wl.color}20` }}>
                <AlertTriangle className="w-6 h-6" style={{ color: wl.color }} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Active warnings list */}
      <div className="space-y-4">
        {sorted.map((loc) => {
          const cfg = getRiskConfig(loc.riskLevel);
          return (
            <Card key={loc.id} hover onClick={() => onSelectLocation(loc.id)} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                {/* Left accent bar */}
                <div className="sm:w-1.5 flex-shrink-0" style={{ backgroundColor: cfg.color }} />
                <div className="flex-1 p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <RiskBadge level={loc.warning.level as RiskLevel} pulse={loc.warning.level === 'Critical'} />
                        <span className="text-sm font-bold text-ink-900">{loc.name}</span>
                        <span className="text-xs text-ink-400">{loc.district}, {loc.state}</span>
                      </div>
                      <p className="text-sm text-ink-600 mb-3">{loc.warning.message}</p>

                      <div className="flex flex-wrap gap-4 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-ink-400" />
                          <span className="text-ink-500">Issued:</span>
                          <span className="font-semibold text-ink-700">{loc.warning.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-ink-400" />
                          <span className="text-ink-500">Risk Score:</span>
                          <span className="font-semibold" style={{ color: cfg.color }}>{loc.riskScore}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Recommended action */}
                    <div className="sm:w-64 flex-shrink-0 p-3 rounded-xl bg-ink-50 border border-ink-100">
                      <div className="flex items-center gap-2 mb-1.5">
                        <ShieldAlert className="w-4 h-4" style={{ color: cfg.color }} />
                        <p className="text-xs font-semibold text-ink-700">Recommended Action</p>
                      </div>
                      <p className="text-xs text-ink-600 leading-relaxed">{loc.warning.action}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Protocol info */}
      <Card>
        <CardHeader title="Warning Level Protocol" subtitle="Response framework for each alert level" icon={<Info className="w-4 h-4" />} />
        <CardBody className="space-y-3">
          {warningLevels.map((wl) => (
            <div key={wl.level} className="flex items-start gap-3 p-3 rounded-xl border border-ink-100">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${wl.color}20` }}>
                <AlertTriangle className="w-4 h-4" style={{ color: wl.color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold" style={{ color: wl.color }}>{wl.level}</span>
                  <span className="text-xs text-ink-400">Warning</span>
                </div>
                <p className="text-xs text-ink-500">{getProtocol(wl.level)}</p>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

function getProtocol(level: RiskLevel): string {
  const protocols = {
    Low: 'Continue routine monitoring. Inform local authorities of developing conditions. No public action needed.',
    Moderate: 'Issue public advisory. Increase monitoring frequency to every 30 minutes. Alert district emergency teams to standby.',
    High: 'Restrict movement in vulnerable areas. Pre-position NDRF and state response teams. Prepare evacuation shelters. Alert all residents via SMS.',
    Critical: 'Immediate evacuation ordered. Activate state emergency operations centre. Deploy NDRF teams. Close all roads in affected zone. Continuous public broadcasting.',
  };
  return protocols[level];
}
