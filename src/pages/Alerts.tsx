import { useState } from 'react';
import { Bell, Search, Filter, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { RiskBadge, StatusBadge } from '@/components/ui/Badge';
import { alerts, type RiskLevel } from '@/data/mockData';

export function Alerts() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Acknowledged' | 'Resolved'>('All');
  const [severityFilter, setSeverityFilter] = useState<'All' | RiskLevel>('All');

  const filtered = alerts.filter((a) => {
    const matchSearch = a.location.toLowerCase().includes(search.toLowerCase()) || a.message.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || a.status === statusFilter;
    const matchSeverity = severityFilter === 'All' || a.severity === severityFilter;
    return matchSearch && matchStatus && matchSeverity;
  });

  const stats = {
    total: alerts.length,
    active: alerts.filter((a) => a.status === 'Active').length,
    acknowledged: alerts.filter((a) => a.status === 'Acknowledged').length,
    resolved: alerts.filter((a) => a.status === 'Resolved').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider">Alert Log</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 mt-1">Alert Management</h1>
        <p className="text-sm text-ink-500 mt-1">Track and manage all landslide alerts across monitored zones</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Alerts', value: stats.total, icon: Bell, color: 'text-ink-600', bg: 'bg-ink-50' },
          { label: 'Active', value: stats.active, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Acknowledged', value: stats.acknowledged, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Resolved', value: stats.resolved, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="p-5">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg}`}>
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-ink-900">{s.value}</p>
                  <p className="text-xs text-ink-500">{s.label}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
            <input
              type="text"
              placeholder="Search by location or message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-ink-200 text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-ink-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'All' | 'Active' | 'Acknowledged' | 'Resolved')}
                className="px-3 py-2.5 rounded-xl border border-ink-200 text-sm text-ink-700 focus:outline-none focus:border-brand-400 bg-white"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Acknowledged">Acknowledged</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as 'All' | RiskLevel)}
              className="px-3 py-2.5 rounded-xl border border-ink-200 text-sm text-ink-700 focus:outline-none focus:border-brand-400 bg-white"
            >
              <option value="All">All Severity</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Moderate">Moderate</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Alert list */}
      <Card>
        <CardBody className="p-0">
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <Bell className="w-8 h-8 text-ink-300 mx-auto mb-3" />
              <p className="text-sm text-ink-400">No alerts match your filters</p>
            </div>
          ) : (
            <div className="divide-y divide-ink-50">
              {filtered.map((alert) => (
                <div key={alert.id} className="flex items-start gap-4 p-4 hover:bg-ink-50 transition-colors">
                  <div className="flex-shrink-0 mt-0.5">
                    <RiskBadge level={alert.severity} size="sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-ink-900">{alert.location}</p>
                      <span className="text-xs text-ink-400">·</span>
                      <span className="text-xs text-ink-400">{alert.datetime}</span>
                    </div>
                    <p className="text-sm text-ink-600">{alert.message}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <StatusBadge status={alert.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
