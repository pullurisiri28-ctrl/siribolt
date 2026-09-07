import { useState } from 'react';
import { MapPin, Layers, AlertTriangle, Info } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { RiskBadge } from '@/components/ui/Badge';
import { locations, getRiskConfig, type RiskLevel } from '@/data/mockData';

interface RiskMapProps {
  onSelectLocation: (id: string) => void;
}

const legendItems: { level: RiskLevel; color: string; label: string; range: string }[] = [
  { level: 'Low', color: '#22c55e', label: 'Low Risk', range: '0–39' },
  { level: 'Moderate', color: '#f59e0b', label: 'Moderate', range: '40–59' },
  { level: 'High', color: '#f97316', label: 'High', range: '60–74' },
  { level: 'Critical', color: '#ef4444', label: 'Critical', range: '75–100' },
];

export function RiskMap({ onSelectLocation }: RiskMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [filter, setFilter] = useState<RiskLevel | 'All'>('All');

  const filtered = filter === 'All' ? locations : locations.filter((l) => l.riskLevel === filter);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider">Interactive Map</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 mt-1">Risk Monitoring Map</h1>
        <p className="text-sm text-ink-500 mt-1">Landslide-prone locations across the North Eastern Region of India</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <Card className="lg:col-span-2 overflow-hidden">
          <div className="relative">
            {/* Map background — stylized terrain */}
            <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-ink-100 via-ink-50 to-brand-50 overflow-hidden">
              {/* Terrain SVG */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 75" preserveAspectRatio="none">
                <defs>
                  <pattern id="terrain" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
                    <circle cx="0.5" cy="0.5" r="0.3" fill="#b0b8c9" opacity="0.3" />
                  </pattern>
                  <linearGradient id="landGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d5d9e2" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#8ec0ff" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                {/* NER region outline (simplified) */}
                <path d="M 8,12 Q 15,8 25,10 L 35,8 Q 45,6 55,10 L 65,8 Q 75,10 80,16 L 78,28 Q 72,35 68,42 L 72,50 Q 68,58 60,62 L 52,66 Q 45,68 40,64 L 35,58 Q 30,52 28,46 L 22,42 Q 15,38 12,32 L 8,24 Z" fill="url(#landGrad)" stroke="#67738d" strokeWidth="0.4" strokeDasharray="1 0.5" opacity="0.7" />
                <path d="M 8,12 Q 15,8 25,10 L 35,8 Q 45,6 55,10 L 65,8 Q 75,10 80,16 L 78,28 Q 72,35 68,42 L 72,50 Q 68,58 60,62 L 52,66 Q 45,68 40,64 L 35,58 Q 30,52 28,46 L 22,42 Q 15,38 12,32 L 8,24 Z" fill="url(#terrain)" />
                {/* River lines */}
                <path d="M 20,15 Q 30,25 28,40 Q 32,50 45,55" fill="none" stroke="#599dff" strokeWidth="0.5" opacity="0.4" strokeDasharray="2 1" />
                <path d="M 60,12 Q 55,25 50,35 Q 48,48 52,60" fill="none" stroke="#599dff" strokeWidth="0.5" opacity="0.4" strokeDasharray="2 1" />
                {/* Contour lines */}
                <path d="M 15,20 Q 25,18 35,22" fill="none" stroke="#b0b8c9" strokeWidth="0.2" opacity="0.5" />
                <path d="M 40,30 Q 50,28 60,32" fill="none" stroke="#b0b8c9" strokeWidth="0.2" opacity="0.5" />
                <path d="M 30,45 Q 40,43 50,47" fill="none" stroke="#b0b8c9" strokeWidth="0.2" opacity="0.5" />
                <path d="M 55,50 Q 62,48 68,52" fill="none" stroke="#b0b8c9" strokeWidth="0.2" opacity="0.5" />
              </svg>

              {/* State labels */}
              <span className="absolute text-[10px] font-medium text-ink-400" style={{ left: '14%', top: '16%' }}>Uttarakhand</span>
              <span className="absolute text-[10px] font-medium text-ink-400" style={{ left: '18%', top: '28%' }}>Sikkim</span>
              <span className="absolute text-[10px] font-medium text-ink-400" style={{ left: '58%', top: '22%' }}>Arunachal</span>
              <span className="absolute text-[10px] font-medium text-ink-400" style={{ left: '36%', top: '38%' }}>Assam</span>
              <span className="absolute text-[10px] font-medium text-ink-400" style={{ left: '64%', top: '40%' }}>Nagaland</span>
              <span className="absolute text-[10px] font-medium text-ink-400" style={{ left: '66%', top: '48%' }}>Manipur</span>
              <span className="absolute text-[10px] font-medium text-ink-400" style={{ left: '48%', top: '52%' }}>Meghalaya</span>
              <span className="absolute text-[10px] font-medium text-ink-400" style={{ left: '50%', top: '66%' }}>Mizoram</span>

              {/* Markers */}
              {filtered.map((loc) => {
                const cfg = getRiskConfig(loc.riskLevel);
                const isHovered = hovered === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => onSelectLocation(loc.id)}
                    onMouseEnter={() => setHovered(loc.id)}
                    onMouseLeave={() => setHovered(null)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
                  >
                    {loc.riskLevel === 'Critical' && (
                      <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ backgroundColor: cfg.color, width: 16, height: 16 }} />
                    )}
                    <span
                      className="relative block rounded-full border-2 border-white shadow-lg transition-transform duration-200 group-hover:scale-150"
                      style={{ backgroundColor: cfg.color, width: loc.riskLevel === 'Critical' ? 16 : 12, height: loc.riskLevel === 'Critical' ? 16 : 12 }}
                    />
                    {isHovered && (
                      <div className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full z-10 w-48 bg-white rounded-xl shadow-2xl border border-ink-100 p-3 text-left animate-scale-in">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-bold text-ink-900 truncate">{loc.name}</p>
                          <RiskBadge level={loc.riskLevel} size="sm" />
                        </div>
                        <p className="text-xs text-ink-400 mb-2">{loc.district}, {loc.state}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-ink-400">Risk Score</span>
                          <span className="font-bold" style={{ color: cfg.color }}>{loc.riskScore}%</span>
                        </div>
                        <div className="flex items-center justify-between text-xs mt-1">
                          <span className="text-ink-400">Rainfall</span>
                          <span className="font-semibold text-ink-700">{loc.rainfall}mm</span>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend overlay */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-xl shadow-lg border border-ink-100 p-3">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-3.5 h-3.5 text-ink-500" />
                <p className="text-xs font-semibold text-ink-700">Risk Levels</p>
              </div>
              <div className="space-y-1.5">
                {legendItems.map((item) => (
                  <div key={item.level} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-medium text-ink-700">{item.label}</span>
                    <span className="text-[10px] text-ink-400">{item.range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Location list */}
        <Card>
          <div className="px-5 pt-5 pb-3">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-ink-500" />
              <h3 className="text-sm font-semibold text-ink-900">All Locations</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button onClick={() => setFilter('All')} className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${filter === 'All' ? 'bg-ink-900 text-white' : 'bg-ink-50 text-ink-500 hover:bg-ink-100'}`}>All</button>
              {legendItems.map((item) => (
                <button key={item.level} onClick={() => setFilter(item.level)} className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${filter === item.level ? 'text-white' : 'bg-ink-50 text-ink-500 hover:bg-ink-100'}`} style={filter === item.level ? { backgroundColor: item.color } : {}}>{item.label}</button>
              ))}
            </div>
          </div>
          <CardBody className="space-y-2 max-h-[500px] overflow-y-auto scrollbar-thin">
            {filtered.map((loc) => {
              const cfg = getRiskConfig(loc.riskLevel);
              return (
                <div key={loc.id} onClick={() => onSelectLocation(loc.id)} className="flex items-center gap-3 p-3 rounded-xl border border-ink-100 hover:border-ink-200 hover:shadow-card-hover transition-all cursor-pointer">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cfg.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ink-900 truncate">{loc.name}</p>
                    <p className="text-xs text-ink-400 truncate">{loc.district}, {loc.state}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold" style={{ color: cfg.color }}>{loc.riskScore}%</p>
                    <RiskBadge level={loc.riskLevel} size="sm" />
                  </div>
                </div>
              );
            })}
          </CardBody>
        </Card>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-50 border border-brand-100">
        <Info className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-ink-900">About this map</p>
          <p className="text-xs text-ink-500 mt-1">Markers show landslide-prone locations monitored by the AI-based system. Click any marker or location to view detailed risk data, weather conditions, and AI predictions. Critical zones pulse to indicate active monitoring.</p>
        </div>
      </div>
    </div>
  );
}
