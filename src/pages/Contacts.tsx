import { Phone, MapPin, Clock, Search } from 'lucide-react';
import { useState } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { emergencyContacts } from '@/data/mockData';

export function Contacts() {
  const [search, setSearch] = useState('');

  const filtered = emergencyContacts.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.region.toLowerCase().includes(search.toLowerCase()) || c.role.toLowerCase().includes(search.toLowerCase()),
  );

  const national = filtered.filter((c) => c.region === 'National');
  const state = filtered.filter((c) => c.region !== 'National');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider">Emergency Directory</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 mt-1">Emergency Contacts</h1>
        <p className="text-sm text-ink-500 mt-1">Disaster management authorities, helplines, and local response teams</p>
      </div>

      {/* Emergency banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
          <Phone className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-100">Emergency Helpline</p>
          <p className="text-2xl font-bold mt-1">112 — National Emergency Number</p>
          <p className="text-sm text-red-100 mt-1">Call 112 for immediate disaster response, evacuation, or rescue</p>
        </div>
        <a href="tel:112" className="px-6 py-3 rounded-xl bg-white text-red-600 font-bold text-sm hover:bg-red-50 transition-colors flex-shrink-0">
          Call Now
        </a>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
        <input
          type="text"
          placeholder="Search by name, region, or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-ink-200 text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all bg-white"
        />
      </div>

      {/* National contacts */}
      {national.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-3">National Authorities</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {national.map((c) => (
              <ContactCard key={c.name} contact={c} />
            ))}
          </div>
        </div>
      )}

      {/* State contacts */}
      {state.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-3">State & Local Response</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.map((c) => (
              <ContactCard key={c.name} contact={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ContactCard({ contact }: { contact: { name: string; role: string; phone: string; region: string; available: string } }) {
  return (
    <Card hover className="p-5 group">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
          <Phone className="w-5 h-5 text-brand-600" />
        </div>
        <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">{contact.available}</span>
      </div>
      <p className="text-sm font-bold text-ink-900">{contact.name}</p>
      <p className="text-xs text-ink-400 mt-0.5">{contact.role}</p>
      <div className="flex items-center gap-1.5 mt-3 text-xs text-ink-500">
        <MapPin className="w-3 h-3" />
        <span>{contact.region}</span>
      </div>
      <a href={`tel:${contact.phone.replace(/-/g, '')}`} className="mt-4 flex items-center justify-between p-3 rounded-xl bg-ink-50 group-hover:bg-brand-50 transition-colors">
        <span className="text-sm font-semibold text-ink-900 font-mono">{contact.phone}</span>
        <Phone className="w-4 h-4 text-brand-600" />
      </a>
    </Card>
  );
}
