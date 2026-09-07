import { Brain, TrendingUp, TrendingDown, Minus, CloudRain, Droplets, Mountain, Thermometer, History, Cpu } from 'lucide-react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { RiskBadge } from '@/components/ui/Badge';
import { locations, predictionComparison, getRiskConfig } from '@/data/mockData';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';

interface PredictionProps {
  onSelectLocation: (id: string) => void;
}

export function Prediction({ onSelectLocation }: PredictionProps) {
  const sorted = [...locations].sort((a, b) => b.prediction.score - a.prediction.score);
  const topRisk = sorted[0];
  const factors = [
    { key: 'rainfall', label: 'Rainfall', icon: CloudRain, color: '#347aff', value: topRisk.prediction.factors.rainfall, max: 40 },
    { key: 'soilMoisture', label: 'Soil Moisture', icon: Droplets, color: '#06b6d4', value: topRisk.prediction.factors.soilMoisture, max: 30 },
    { key: 'slope', label: 'Slope Angle', icon: Mountain, color: '#f97316', value: topRisk.prediction.factors.slope, max: 20 },
    { key: 'temperature', label: 'Temperature', icon: Thermometer, color: '#ef4444', value: topRisk.prediction.factors.temperature, max: 10 },
    { key: 'history', label: 'Landslide History', icon: History, color: '#8b5cf6', value: topRisk.prediction.factors.history, max: 15 },
  ];

  const trendIcon = topRisk.prediction.trend === 'rising' ? TrendingUp : topRisk.prediction.trend === 'falling' ? TrendingDown : Minus;
  const TrendIcon = trendIcon;
  const trendColor = topRisk.prediction.trend === 'rising' ? 'text-red-600' : topRisk.prediction.trend === 'falling' ? 'text-green-600' : 'text-ink-400';

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider">Machine Learning Model</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 mt-1">AI-Based Risk Prediction</h1>
        <p className="text-sm text-ink-500 mt-1">Predictive landslide risk analysis using multi-factor environmental data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top prediction spotlight */}
        <Card className="lg:col-span-2">
          <CardHeader title="Highest Risk Prediction" subtitle={topRisk.name} icon={<Brain className="w-4 h-4" />} action={<RiskBadge level={topRisk.riskLevel} pulse />} />
          <CardBody>
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              {/* Radial score */}
              <div className="relative w-48 h-48 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart innerRadius="72%" outerRadius="100%" data={[{ value: topRisk.prediction.score, fill: getRiskConfig(topRisk.riskLevel).color }]} startAngle={90} endAngle={-270}>
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar background={{ fill: '#eceef2' }} dataKey="value" cornerRadius={20} angleAxisId={0} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-4xl font-bold text-ink-900">{topRisk.prediction.score}<span className="text-lg text-ink-400">%</span></p>
                  <p className="text-xs text-ink-400 mt-1">Predicted Risk</p>
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 space-y-3 w-full">
                <div className="flex items-center justify-between p-3 rounded-xl bg-ink-50">
                  <span className="text-sm text-ink-500">Current Risk Score</span>
                  <span className="text-lg font-bold text-ink-900">{topRisk.riskScore}%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-ink-50">
                  <span className="text-sm text-ink-500">Prediction Trend</span>
                  <span className={`flex items-center gap-1.5 text-sm font-bold ${trendColor}`}>
                    <TrendIcon className="w-4 h-4" />
                    {topRisk.prediction.trend.charAt(0).toUpperCase() + topRisk.prediction.trend.slice(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-ink-50">
                  <span className="text-sm text-ink-500">Model Confidence</span>
                  <span className="text-lg font-bold text-brand-600">{topRisk.prediction.confidence}%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-ink-50">
                  <span className="text-sm text-ink-500">Location</span>
                  <span className="text-sm font-semibold text-ink-900">{topRisk.district}, {topRisk.state}</span>
                </div>
                <button onClick={() => onSelectLocation(topRisk.id)} className="w-full py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors">
                  View Full Details
                </button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Model info */}
        <Card>
          <CardHeader title="Model Information" subtitle="Prediction engine" icon={<Cpu className="w-4 h-4" />} />
          <CardBody className="space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-brand-50 to-ink-50 border border-brand-100">
              <p className="text-xs font-semibold text-brand-700 uppercase tracking-wider">Algorithm</p>
              <p className="text-sm font-bold text-ink-900 mt-1">Gradient Boosted Trees</p>
              <p className="text-xs text-ink-500 mt-1">Ensemble model trained on 15+ years of landslide incident data from NER</p>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Training Data', value: '12,400 incidents' },
                { label: 'Features', value: '5 environmental' },
                { label: 'Update Cycle', value: 'Every 15 min' },
                { label: 'Accuracy', value: '91.2%' },
              ].map((m) => (
                <div key={m.label} className="flex items-center justify-between text-sm">
                  <span className="text-ink-500">{m.label}</span>
                  <span className="font-semibold text-ink-900">{m.value}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Factor breakdown */}
      <Card>
        <CardHeader title="Risk Factor Analysis" subtitle={`Contribution breakdown for ${topRisk.name}`} icon={<Brain className="w-4 h-4" />} />
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {factors.map((f) => {
              const Icon = f.icon;
              const pct = Math.round((f.value / f.max) * 100);
              return (
                <div key={f.key} className="p-4 rounded-xl border border-ink-100">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${f.color}15` }}>
                      <Icon className="w-4 h-4" style={{ color: f.color }} />
                    </div>
                    <span className="text-xs font-semibold text-ink-700">{f.label}</span>
                  </div>
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-2xl font-bold text-ink-900">{f.value}</span>
                    <span className="text-xs text-ink-400">/ {f.max}</span>
                  </div>
                  <div className="h-2 rounded-full bg-ink-100 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: f.color }} />
                  </div>
                  <p className="text-[10px] text-ink-400 mt-1.5">{pct}% contribution</p>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {/* Comparison chart */}
      <Card>
        <CardHeader title="Prediction Comparison" subtitle="Current vs predicted risk across all locations" icon={<TrendingUp className="w-4 h-4" />} />
        <CardBody>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={predictionComparison} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eceef2" vertical={false} />
              <XAxis dataKey="location" axisLine={false} tickLine={false} angle={-20} textAnchor="end" height={60} interval={0} tick={{ fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip cursor={{ fill: '#f6f7f9' }} />
              <Bar dataKey="current" fill="#8ec0ff" radius={[4, 4, 0, 0]} name="Current Risk" />
              <Bar dataKey="predicted" radius={[4, 4, 0, 0]} name="Predicted Risk">
                {predictionComparison.map((entry, i) => (
                  <Cell key={i} fill={entry.predicted >= 75 ? '#ef4444' : entry.predicted >= 60 ? '#f97316' : entry.predicted >= 40 ? '#f59e0b' : '#22c55e'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      {/* All predictions table */}
      <Card>
        <CardHeader title="All Location Predictions" subtitle="Sorted by predicted risk" icon={<Brain className="w-4 h-4" />} />
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ink-100">
                  <th className="text-left text-xs font-semibold text-ink-500 px-5 py-3">Location</th>
                  <th className="text-left text-xs font-semibold text-ink-500 px-5 py-3 hidden sm:table-cell">State</th>
                  <th className="text-right text-xs font-semibold text-ink-500 px-5 py-3">Current</th>
                  <th className="text-right text-xs font-semibold text-ink-500 px-5 py-3">Predicted</th>
                  <th className="text-center text-xs font-semibold text-ink-500 px-5 py-3 hidden md:table-cell">Trend</th>
                  <th className="text-right text-xs font-semibold text-ink-500 px-5 py-3 hidden md:table-cell">Confidence</th>
                  <th className="text-center text-xs font-semibold text-ink-500 px-5 py-3">Level</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((loc) => {
                  const cfg = getRiskConfig(loc.riskLevel);
                  const TIcon = loc.prediction.trend === 'rising' ? TrendingUp : loc.prediction.trend === 'falling' ? TrendingDown : Minus;
                  const tColor = loc.prediction.trend === 'rising' ? 'text-red-600' : loc.prediction.trend === 'falling' ? 'text-green-600' : 'text-ink-400';
                  return (
                    <tr key={loc.id} onClick={() => onSelectLocation(loc.id)} className="border-b border-ink-50 hover:bg-ink-50 cursor-pointer transition-colors">
                      <td className="px-5 py-3 text-sm font-semibold text-ink-900">{loc.name}</td>
                      <td className="px-5 py-3 text-sm text-ink-500 hidden sm:table-cell">{loc.state}</td>
                      <td className="px-5 py-3 text-sm text-right font-medium text-ink-700">{loc.riskScore}%</td>
                      <td className="px-5 py-3 text-sm text-right">
                        <span className="font-bold" style={{ color: cfg.color }}>{loc.prediction.score}%</span>
                      </td>
                      <td className="px-5 py-3 text-center hidden md:table-cell">
                        <TIcon className={`w-4 h-4 inline ${tColor}`} />
                      </td>
                      <td className="px-5 py-3 text-sm text-right text-ink-500 hidden md:table-cell">{loc.prediction.confidence}%</td>
                      <td className="px-5 py-3 text-center"><RiskBadge level={loc.riskLevel} size="sm" /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
