import { LayoutDashboard, Map, Brain, AlertTriangle, CloudRain, MapPin, Bell, Phone, ShieldCheck, Mountain } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type PageId = 'dashboard' | 'map' | 'prediction' | 'warnings' | 'weather' | 'alerts' | 'contacts' | 'safety';

export interface NavItem {
  id: PageId;
  label: string;
  icon: LucideIcon;
  description: string;
}

export const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, description: 'Overview & status' },
  { id: 'map', label: 'Risk Map', icon: Map, description: 'Interactive monitoring' },
  { id: 'prediction', label: 'AI Prediction', icon: Brain, description: 'Risk score analysis' },
  { id: 'warnings', label: 'Early Warnings', icon: AlertTriangle, description: 'Active warning system' },
  { id: 'weather', label: 'Weather', icon: CloudRain, description: 'Rainfall & conditions' },
  { id: 'alerts', label: 'Alerts', icon: Bell, description: 'Alert management' },
  { id: 'contacts', label: 'Contacts', icon: Phone, description: 'Emergency directory' },
  { id: 'safety', label: 'Public Safety', icon: ShieldCheck, description: 'Safety guidelines' },
];
