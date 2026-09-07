import { MapPin, CloudRain, Droplets, Mountain, Thermometer, History, Brain, AlertTriangle, Clock, Users, TrendingUp, TrendingDown, Minus, ArrowRight } from 'lucide-react';
import { RiskBadge } from '@/components/ui/Badge';
import { type LocationData, getRiskConfig, rainfallTrend } from '@/data/mockData';
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface LocationDetailsProps {
  location: LocationData;
}

export function LocationDetails({ location }: LocationDetailsProps) {
  const cfg = getRiskConfig(location.riskLevel);
  const TIcon = location.prediction.trend === 'rising' ? TrendingUp : location.prediction.trend === 'falling' ? TrendingDown : Minus;
  const trendColor = location.prediction.trend === 'rising' ? 'text-red-600' : location.prediction.trend === 'falling' ? 'text-green-600' : 'text-ink-400';

  const factors = [
    { label: 'Rainfall', icon: CloudRain, value: location.rainfall, unit: 'mm', max: 250, color: '#347aff' },
    { label: 'Soil Moisture', icon: Droplets, value: location.soilMoisture, unit: '%', max: 100, color: '#06b6d4' },
    { label: 'Slope Angle', icon: Mountain, value: location.slope, unit: '°', max: 50, color: '#f97316' },
    { label: 'Temperature', icon: Thermometer, value: location.temperature, unit: '°C', max: 40, color: '#ef4444' },
    { label: 'Humidity', icon: Droplets, value: location.humidity, unit: '%', max: 100, color: '#8b5cf6' },
  ];

  const rainfallData = rainfallTrend.map((d) => ({ ...d, [location.name]: Math.round(d.rainfall * (location.rainfall / 142)) }));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-ink-400" />
            <span className="text-xs text-ink-400">{location.district}, {location.state}</span>
          </div>
          <h2 className="text-xl font-bold text-ink-900">{location.name}</h2>
          <div className="flex items-center gap-3 mt-2">
            <RiskBadge level={location.riskLevel} pulse={location.riskLevel === 'Critical'} />
            <span className="text-sm font-bold" style={{ color: cfg.color }}>{location.riskScore}% risk score</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-ink-400">Population at risk</p>
          <p className="text-lg font-bold text-ink-900">{location.population.toLocaleString()}</p>
        </div>
      </div>

      {/* Risk score radial + prediction */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-ink-50">
          <div className="relative w-28 h-28 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ value: location.riskScore, fill: cfg.color }]} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar background={{ fill: '#d5d9e2' }} dataKey="value" cornerRadius={12} angleAxisId={0} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-ink-900">{location.riskScore}%</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider">Current Risk</p>
            <p className="text-lg font-bold mt-1" style={{ color: cfg.color }}>{location.riskLevel}</p>
            <p className="text-xs text-ink-400 mt-1">Updated 5 min ago</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-ink-50">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-4 h-4 text-brand-600" />
            <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider">AI Prediction</p>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-ink-500">Predicted Score</span>
            <span className="text-lg font-bold text-ink-900">{location.prediction.score}%</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-ink-500">Trend</span>
            <span className={`flex items-center gap-1 text-sm font-bold ${trendColor}`}>
              <TIcon className="w-4 h-4" />
              {location.prediction.trend.charAt(0).toUpperCase() + location.prediction.trend.slice(1)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-ink-500">Confidence</span>
            <span className="text-sm font-bold text-brand-600">{location.prediction.confidence}%</span>
          </div>
        </div>
      </div>

      {/* Environmental factors */}
      <div>
        <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-3">Environmental Factors</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {factors.map((f) => {
            const Icon = f.icon;
            const pct = Math.round((f.value / f.max) * 100);
            return (
              <div key={f.label} className="p-3 rounded-xl border border-ink-100">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-3.5 h-3.5" style={{ color: f.color }} />
                  <span className="text-[11px] font-medium text-ink-500">{f.label}</span>
                </div>
                <p className="text-lg font-bold text-ink-900">{f.value}<span className="text-xs text-ink-400 ml-0.5">{f.unit}</span></p>
                <div className="h-1.5 rounded-full bg-ink-100 overflow-hidden mt-2">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: f.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rainfall chart */}
      <div>
        <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-3">Rainfall Trend (7 days)</p>
        <div className="p-4 rounded-2xl border border-ink-100">
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={rainfallData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="locRain" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#347aff" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#347aff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eceef2" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey={location.name} stroke="#347aff" strokeWidth={2} fill="url(#locRain)" name="Rainfall" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* History + Warning */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl border border-ink-100">
          <div className="flex items-center gap-2 mb-3">
            <History className="w-4 h-4 text-ink-500" />
            <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider">Landslide History</p>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-ink-500">Previous incidents</span>
            <span className="text-2xl font-bold text-ink-900">{location.previousLandslides}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-ink-500">Last incident</span>
            <span className="text-sm font-semibold text-ink-700">{location.lastIncident}</span>
          </div>
        </div>

        <div className={`p-4 rounded-2xl border-2 ${cfg.border} ${cfg.bg}`}>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4" style={{ color: cfg.color }} />
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: cfg.color }}>Warning Status</p>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <RiskBadge level={location.warning.level === 'None' ? 'Low' : location.warning.level as 'Low'} size="sm" />
            <span className="text-sm text-ink-600">{location.warning.message}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-ink-500">
            <Clock className="w-3 h-3" />
            <span>{location.warning.time}</span>
          </div>
          <div className="flex items-start gap-1.5 mt-2 text-xs text-ink-600">
            <ArrowRight className="w-3 h-3 mt-0.5 flex-shrink-0" />
            <span>{location.warning.action}</span>
          </div>
        </div>
      </div>

      {/* Population info */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-brand-50 border border-brand-100">
        <Users className="w-5 h-5 text-brand-600 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-ink-900">{location.population.toLocaleString()} residents in monitored zone</p>
          <p className="text-xs text-ink-500 mt-0.5">Population density and proximity to slope determines evacuation priority</p>
        </div>
      </div>
    </div>
  );
}
