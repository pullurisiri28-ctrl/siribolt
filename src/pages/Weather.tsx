import { CloudRain, Thermometer, Droplets, Wind, Sun, Eye, Gauge, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { locations, rainfallTrend } from '@/data/mockData';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, ComposedChart, Bar, Line as ComposedLine } from 'recharts';

export function Weather() {
  const avgRain = Math.round(locations.reduce((s, l) => s + l.rainfall, 0) / locations.length);
  const avgTemp = (locations.reduce((s, l) => s + l.temperature, 0) / locations.length).toFixed(1);
  const avgHumidity = Math.round(locations.reduce((s, l) => s + l.humidity, 0) / locations.length);
  const avgSoil = Math.round(locations.reduce((s, l) => s + l.soilMoisture, 0) / locations.length);

  const conditions = [
    { icon: CloudRain, label: 'Rainfall', value: `${avgRain} mm`, sub: 'Heavy', color: 'text-blue-600', bg: 'bg-blue-50', trend: '+18%' },
    { icon: Thermometer, label: 'Temperature', value: `${avgTemp}°C`, sub: 'Normal', color: 'text-orange-600', bg: 'bg-orange-50', trend: '-1°' },
    { icon: Droplets, label: 'Humidity', value: `${avgHumidity}%`, sub: 'High', color: 'text-cyan-600', bg: 'bg-cyan-50', trend: '+5%' },
    { icon: Wind, label: 'Wind Speed', value: '18 km/h', sub: 'Moderate', color: 'text-teal-600', bg: 'bg-teal-50', trend: 'Stable' },
    { icon: Gauge, label: 'Soil Moisture', value: `${avgSoil}%`, sub: 'Elevated', color: 'text-amber-600', bg: 'bg-amber-50', trend: '+12%' },
    { icon: Eye, label: 'Visibility', value: '2.1 km', sub: 'Reduced', color: 'text-ink-600', bg: 'bg-ink-50', trend: '-30%' },
  ];

  const forecast = [
    { time: '09:00', rain: 12, temp: 21 },
    { time: '12:00', rain: 25, temp: 23 },
    { time: '15:00', rain: 45, temp: 22 },
    { time: '18:00', rain: 38, temp: 20 },
    { time: '21:00', rain: 20, temp: 19 },
    { time: '00:00', rain: 15, temp: 18 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider">Environmental Monitoring</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 mt-1">Weather & Rainfall</h1>
        <p className="text-sm text-ink-500 mt-1">Current conditions and forecasts across monitored zones</p>
      </div>

      {/* Current conditions grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {conditions.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.label} className="p-4 hover:shadow-card-hover transition-shadow">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.bg} mb-3`}>
                <Icon className={`w-5 h-5 ${c.color}`} />
              </div>
              <p className="text-2xl font-bold text-ink-900">{c.value}</p>
              <p className="text-xs text-ink-500 mt-0.5">{c.label}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-ink-400">{c.sub}</span>
                <span className="text-[10px] font-semibold text-ink-500">{c.trend}</span>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rainfall trend */}
        <Card className="lg:col-span-2">
          <CardHeader title="Rainfall Trend" subtitle="7-day observed vs forecast (mm)" icon={<CloudRain className="w-4 h-4" />} />
          <CardBody>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={rainfallTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="rainGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#347aff" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#347aff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="forecastGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8ec0ff" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#8ec0ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eceef2" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} unit="mm" />
                <Tooltip />
                <Area type="monotone" dataKey="rainfall" stroke="#347aff" strokeWidth={2.5} fill="url(#rainGrad2)" name="Observed" />
                <Area type="monotone" dataKey="forecast" stroke="#8ec0ff" strokeWidth={2} strokeDasharray="5 4" fill="url(#forecastGrad2)" name="Forecast" />
              </AreaChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* 24h forecast */}
        <Card>
          <CardHeader title="24-Hour Forecast" subtitle="Rain & temperature" icon={<Sun className="w-4 h-4" />} />
          <CardBody>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={forecast} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eceef2" vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} />
                <YAxis yAxisId="rain" axisLine={false} tickLine={false} />
                <YAxis yAxisId="temp" orientation="right" axisLine={false} tickLine={false} />
                <Tooltip />
                <Line yAxisId="rain" type="monotone" dataKey="rain" stroke="#347aff" strokeWidth={2.5} dot={{ r: 4 }} name="Rain (mm)" />
                <Line yAxisId="temp" type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={2.5} dot={{ r: 4 }} name="Temp (°C)" />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Soil moisture per location */}
        <Card>
          <CardHeader title="Soil Moisture by Location" subtitle="Current readings (%)" icon={<Droplets className="w-4 h-4" />} />
          <CardBody>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={[...locations].sort((a, b) => b.soilMoisture - a.soilMoisture)} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eceef2" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={80} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line dataKey="soilMoisture" stroke="#06b6d4" strokeWidth={2.5} dot={{ r: 4, fill: '#06b6d4' }} name="Soil Moisture" />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Rainfall vs risk */}
        <Card>
          <CardHeader title="Rainfall vs Risk Score" subtitle="Correlation analysis" icon={<TrendingUp className="w-4 h-4" />} />
          <CardBody>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={locations} margin={{ top: 10, right: 10, left: -20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eceef2" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} angle={-30} textAnchor="end" interval={0} tick={{ fontSize: 10 }} height={60} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="rainfall" fill="#347aff" radius={[4, 4, 0, 0]} name="Rainfall (mm)" opacity={0.7} />
                <ComposedLine dataKey="riskScore" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} name="Risk Score" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      {/* Location weather table */}
      <Card>
        <CardHeader title="Per-Location Conditions" subtitle="Detailed readings for all monitored zones" icon={<CloudRain className="w-4 h-4" />} />
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ink-100">
                  <th className="text-left text-xs font-semibold text-ink-500 px-5 py-3">Location</th>
                  <th className="text-right text-xs font-semibold text-ink-500 px-5 py-3">Rainfall</th>
                  <th className="text-right text-xs font-semibold text-ink-500 px-5 py-3 hidden sm:table-cell">Temp</th>
                  <th className="text-right text-xs font-semibold text-ink-500 px-5 py-3">Humidity</th>
                  <th className="text-right text-xs font-semibold text-ink-500 px-5 py-3 hidden sm:table-cell">Soil Moisture</th>
                  <th className="text-right text-xs font-semibold text-ink-500 px-5 py-3 hidden md:table-cell">Slope</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((loc) => (
                  <tr key={loc.id} className="border-b border-ink-50 hover:bg-ink-50 transition-colors">
                    <td className="px-5 py-3 text-sm font-semibold text-ink-900">{loc.name}</td>
                    <td className="px-5 py-3 text-sm text-right font-semibold text-blue-600">{loc.rainfall}mm</td>
                    <td className="px-5 py-3 text-sm text-right text-ink-700 hidden sm:table-cell">{loc.temperature}°C</td>
                    <td className="px-5 py-3 text-sm text-right text-ink-700">{loc.humidity}%</td>
                    <td className="px-5 py-3 text-sm text-right text-ink-700 hidden sm:table-cell">{loc.soilMoisture}%</td>
                    <td className="px-5 py-3 text-sm text-right text-ink-700 hidden md:table-cell">{loc.slope}°</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
