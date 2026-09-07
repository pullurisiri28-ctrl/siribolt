import { useState, type ReactNode } from 'react';
import { Mountain, Menu, X, Activity } from 'lucide-react';
import { navItems, type PageId } from '@/config/navigation';
import { locations, alerts } from '@/data/mockData';

interface LayoutProps {
  current: PageId;
  onNavigate: (page: PageId) => void;
  children: ReactNode;
}

export function Layout({ current, onNavigate, children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeAlerts = alerts.filter((a) => a.status === 'Active').length;
  const criticalCount = locations.filter((l) => l.riskLevel === 'Critical').length;

  const navContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow">
            <Mountain className="w-5 h-5 text-white" />
          </div>
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-red-500 ring-2 ring-ink-950 animate-pulse" />
        </div>
        <div className="min-w-0">
          <h1 className="text-sm font-bold text-white leading-tight truncate">NER Landslide</h1>
          <p className="text-[11px] text-ink-400 leading-tight">Early Warning System</p>
        </div>
      </div>

      <div className="px-3 mt-2 flex-1 overflow-y-auto scrollbar-thin">
        <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-ink-500">Monitoring</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${
                active
                  ? 'bg-brand-500/15 text-brand-300'
                  : 'text-ink-300 hover:bg-ink-800/60 hover:text-white'
              }`}
            >
              <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${active ? 'text-brand-400' : 'text-ink-400 group-hover:text-ink-200'}`} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-tight truncate">{item.label}</p>
                <p className={`text-[10px] leading-tight truncate ${active ? 'text-brand-400/70' : 'text-ink-500'}`}>{item.description}</p>
              </div>
              {item.id === 'warnings' && activeAlerts > 0 && (
                <span className="flex-shrink-0 text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full">{activeAlerts}</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-3 mx-3 mb-3 rounded-xl bg-ink-800/60 border border-ink-700">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-3.5 h-3.5 text-green-400" />
          <p className="text-[11px] font-semibold text-ink-200">System Status</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-ink-400">Sensors online</span>
          <span className="text-[10px] font-bold text-green-400">12 / 12</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[10px] text-ink-400">Critical zones</span>
          <span className="text-[10px] font-bold text-red-400">{criticalCount}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-ink-50 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-shrink-0 bg-ink-950 border-r border-ink-800/50 fixed inset-y-0 left-0 z-30">
        {navContent}
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-ink-950/50 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-ink-950 lg:hidden animate-slide-in">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-3 w-8 h-8 rounded-lg flex items-center justify-center text-ink-400 hover:bg-ink-800"
            >
              <X className="w-4 h-4" />
            </button>
            {navContent}
          </aside>
        </>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-20 bg-ink-950 border-b border-ink-800 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMobileOpen(true)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-ink-300 hover:bg-ink-800"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Mountain className="w-4 h-4 text-brand-400" />
            <span className="text-sm font-semibold text-white">NER Landslide</span>
          </div>
          <div className="w-9" />
        </div>

        <main className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">{children}</main>
      </div>
    </div>
  );
}
