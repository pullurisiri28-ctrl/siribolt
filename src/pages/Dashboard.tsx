import { MapPin, AlertTriangle, CloudRain, Activity, TrendingUp, Thermometer, Droplets, Wind, Bell, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { RiskBadge, StatusBadge } from '@/components/ui/Badge';
import { locations, alerts, rainfallTrend, weeklyRisk } from '@/data/mockData';
import { type PageId } from '@/config/navigation';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Cell } from 'recharts';

interface DashboardProps {
  onNavigate: (page: PageId) => void;
  onSelectLocation: (id: string) => void;
}

export function Dashboard({ onNavigate, onSelectLocation }: DashboardProps) {
  const monitored = locations.length;
  const highRisk = locations.filter((l) => l.riskLevel === 'High' || l.riskLevel === 'Critical').length;
  const critical = locations.filter((l) => l.riskLevel === 'Critical').length;
  const activeAlerts = alerts.filter((a) => a.status === 'Active');
  const avgRisk = Math.round(locations.reduce((s, l) => s + l.riskScore, 0) / locations.length);
  const recentAlerts = alerts.slice(0, 5);

  const stats = [
    { label: 'Monitored Locations', value: monitored, icon: MapPin, color: 'text-brand-600', bg: 'bg-brand-50', change: '+2 this week' },
    { label: 'High-Risk Zones', value: highRisk, icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50', change: `${critical} critical` },
    { label: 'Active Warnings', value: activeAlerts.length, icon: Bell, color: 'text-red-600', bg: 'bg-red-50', change: 'Live monitoring' },
    { label: 'Avg. Risk Score', value: `${avgRisk}%`, icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50', change: '+8% vs yesterday' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider">Live Dashboard</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 mt-1">Landslide Risk Overview</h1>
          <p className="text-sm text-ink-500 mt-1">North Eastern Region of India — updated 5 Sep 2025, 07:30 IST</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-ink-100 shadow-card">
          <span className="relative flex w-2.5 h-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 animate-ping opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
          </span>
          <span className="text-sm font-semibold text-ink-700">{critical} Critical Alerts Active</span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="p-5 hover:shadow-card-hover transition-shadow">
              <div className="flex items-start justify-between">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.bg}`}>
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-ink-300" />
              </div>
              <p className="text-3xl font-bold text-ink-900 mt-4">{s.value}</p>
              <p className="text-sm text-ink-500 mt-1">{s.label}</p>
              <p className="text-[11px] text-ink-400 mt-2 font-medium">{s.change}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rainfall trend */}
        <Card className="lg:col-span-2">
          <CardHeader title="Rainfall Trend" subtitle="7-day observed vs forecast (mm)" icon={<CloudRain className="w-4 h-4" />} action={<button onClick={() => onNavigate('weather')} className="text-xs font-semibold text-brand-600 hover:text-brand-700">View all</button>} />
          <CardBody>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={rainfallTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#347aff" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#347aff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8ec0ff" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#8ec0ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eceef2" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="rainfall" stroke="#347aff" strokeWidth={2} fill="url(#rainGrad)" name="Observed" />
                <Area type="monotone" dataKey="forecast" stroke="#8ec0ff" strokeWidth={2} strokeDasharray="5 4" fill="url(#forecastGrad)" name="Forecast" />
              </AreaChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Weather conditions */}
        <Card>
          <CardHeader title="Weather Conditions" subtitle="Regional average" icon={<Thermometer className="w-4 h-4" />} />
          <CardBody className="space-y-4">
            {[
              { icon: CloudRain, label: 'Rainfall', value: '142 mm', sub: 'Heavy', color: 'text-blue-600', bg: 'bg-blue-50' },
              { icon: Thermometer, label: 'Temperature', value: '21.4°C', sub: 'Normal', color: 'text-orange-600', bg: 'bg-orange-50' },
              { icon: Droplets, label: 'Humidity', value: '84%', sub: 'High', color: 'text-cyan-600', bg: 'bg-cyan-50' },
              { icon: Wind, label: 'Wind Speed', value: '18 km/h', sub: 'Moderate', color: 'text-teal-600', bg: 'bg-teal-50' },
            ].map((w) => {
              const Icon = w.icon;
              return (
                <div key={w.label} className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${w.bg}`}>
                    <Icon className={`w-4 h-4 ${w.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-ink-400">{w.label}</p>
                    <p className="text-sm font-semibold text-ink-900">{w.value}</p>
                  </div>
                  <span className="text-xs font-medium text-ink-400">{w.sub}</span>
                </div>
              );
            })}
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent alerts */}
        <Card className="lg:col-span-2">
          <CardHeader title="Recent Alerts" subtitle="Latest warnings across all zones" icon={<Bell className="w-4 h-4" />} action={<button onClick={() => onNavigate('alerts')} className="text-xs font-semibold text-brand-600 hover:text-brand-700">View all</button>} />
          <CardBody className="space-y-2">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-ink-50 transition-colors cursor-pointer" onClick={() => onNavigate('alerts')}>
                <RiskBadge level={alert.severity} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-ink-900 truncate">{alert.location}</p>
                  <p className="text-xs text-ink-400 truncate">{alert.message}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-ink-500">{alert.datetime.split(' ')[1]}</p>
                  <StatusBadge status={alert.status} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Weekly risk trend */}
        <Card>
          <CardHeader title="Weekly Risk Trend" subtitle="Average risk score" icon={<TrendingUp className="w-4 h-4" />} />
          <CardBody>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyRisk} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eceef2" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="risk" radius={[6, 6, 0, 0]} name="Risk Score">
                  {weeklyRisk.map((entry, i) => (
                    <Cell key={i} fill={entry.risk >= 75 ? '#ef4444' : entry.risk >= 60 ? '#f97316' : entry.risk >= 40 ? '#f59e0b' : '#22c55e'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      {/* High-risk locations quick view */}
      <Card>
        <CardHeader title="High-Risk Locations" subtitle="Locations requiring immediate attention" icon={<AlertTriangle className="w-4 h-4" />} action={<button onClick={() => onNavigate('map')} className="text-xs font-semibold text-brand-600 hover:text-brand-700">Open map</button>} />
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {locations.filter((l) => l.riskLevel === 'Critical' || l.riskLevel === 'High').map((loc) => (
              <div key={loc.id} onClick={() => onSelectLocation(loc.id)} className="p-4 rounded-xl border border-ink-100 hover:border-ink-200 hover:shadow-card-hover transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <MapPin className="w-4 h-4 text-ink-400 flex-shrink-0" />
                    <p className="text-sm font-semibold text-ink-900 truncate">{loc.name}</p>
                  </div>
                  <RiskBadge level={loc.riskLevel} size="sm" pulse={loc.riskLevel === 'Critical'} />
                </div>
                <p className="text-xs text-ink-400 mb-3">{loc.district}, {loc.state}</p>
                <div className="flex items-center gap-4 text-xs">
                  <div>
                    <span className="text-ink-400">Risk</span>
                    <p className="font-bold text-ink-900">{loc.riskScore}%</p>
                  </div>
                  <div>
                    <span className="text-ink-400">Rain</span>
                    <p className="font-bold text-ink-900">{loc.rainfall}mm</p>
                  </div>
                  <div>
                    <span className="text-ink-400">Moisture</span>
                    <p className="font-bold text-ink-900">{loc.soilMoisture}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
