import { ShieldCheck, AlertTriangle, ArrowRight, Phone, MapPin, Package, Footprints, type LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { safetySteps } from '@/data/mockData';

const phases: { key: 'before' | 'during' | 'after'; title: string; subtitle: string; icon: LucideIcon; color: string; bg: string; border: string }[] = [
  { key: 'before', title: 'Before a Landslide', subtitle: 'Preparation & awareness', icon: Package, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
  { key: 'during', title: 'During a Landslide', subtitle: 'Immediate action', icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
  { key: 'after', title: 'After a Landslide', subtitle: 'Recovery & safety', icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
];

export function Safety() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider">Community Guidelines</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 mt-1">Public Safety Guide</h1>
        <p className="text-sm text-ink-500 mt-1">What to do before, during, and after a landslide to stay safe</p>
      </div>

      {/* Emergency reminder banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
          <Phone className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-100">In an emergency</p>
          <p className="text-lg font-bold mt-1">Call 112 immediately — National Emergency Number</p>
          <p className="text-sm text-red-100 mt-1">If you see signs of a landslide, do not wait. Evacuate uphill and call for help.</p>
        </div>
        <a href="tel:112" className="px-6 py-3 rounded-xl bg-white text-red-600 font-bold text-sm hover:bg-red-50 transition-colors flex-shrink-0">
          Call 112
        </a>
      </div>

      {/* Warning signs */}
      <Card className="p-5 bg-amber-50 border-amber-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-ink-900">Watch for these warning signs</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-3">
              {[
                'Cracks appearing in the ground',
                'Doors or windows sticking suddenly',
                'Water breaking through the ground surface',
                'Tilting trees or fences on slopes',
                'Muddy or muddy water in streams',
                'Unusual sounds like rumbling or cracking',
              ].map((sign) => (
                <div key={sign} className="flex items-center gap-2 text-sm text-ink-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                  {sign}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Three phases */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {phases.map((phase) => {
          const Icon = phase.icon;
          const steps = safetySteps[phase.key];
          return (
            <Card key={phase.key} className={`border-2 ${phase.border} overflow-hidden`}>
              <div className={`px-5 py-4 ${phase.bg}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${phase.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink-900">{phase.title}</p>
                    <p className="text-xs text-ink-500">{phase.subtitle}</p>
                  </div>
                </div>
              </div>
              <CardBody className="space-y-3 pt-4">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-lg ${phase.bg} flex items-center justify-center text-xs font-bold ${phase.color}`}>{i + 1}</span>
                    <p className="text-sm text-ink-700 leading-relaxed pt-0.5">{step}</p>
                  </div>
                ))}
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Evacuation steps */}
      <Card>
        <CardHeader title="Evacuation Procedure" subtitle="Step-by-step evacuation guide" icon={<Footprints className="w-4 h-4" />} />
        <CardBody>
          <div className="flex flex-col lg:flex-row gap-4">
            {[
              { step: '1', title: 'Stay Alert', desc: 'Listen for alerts via SMS, radio, or local officials', icon: AlertTriangle },
              { step: '2', title: 'Move Uphill', desc: 'Evacuate immediately uphill and away from the slide path', icon: MapPin },
              { step: '3', title: 'Avoid Valleys', desc: 'Do not follow river valleys or gullies — debris flows there', icon: ArrowRight },
              { step: '4', title: 'Stay Away', desc: 'Do not return until authorities confirm the area is safe', icon: ShieldCheck },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="flex-1 flex items-start gap-3 p-4 rounded-xl border border-ink-100">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-brand-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink-900">{s.step}. {s.title}</p>
                    <p className="text-xs text-ink-500 mt-0.5">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
