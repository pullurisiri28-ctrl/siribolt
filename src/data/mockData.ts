export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Critical';

export interface LocationData {
  id: string;
  name: string;
  state: string;
  district: string;
  riskLevel: RiskLevel;
  riskScore: number;
  rainfall: number;
  soilMoisture: number;
  slope: number;
  temperature: number;
  humidity: number;
  previousLandslides: number;
  lastIncident: string;
  population: number;
  coordinates: { x: number; y: number };
  prediction: {
    score: number;
    trend: 'rising' | 'stable' | 'falling';
    confidence: number;
    factors: {
      rainfall: number;
      soilMoisture: number;
      slope: number;
      temperature: number;
      history: number;
    };
  };
  warning: {
    level: RiskLevel | 'None';
    message: string;
    time: string;
    action: string;
  };
}

export interface AlertData {
  id: string;
  location: string;
  severity: RiskLevel;
  message: string;
  datetime: string;
  status: 'Active' | 'Acknowledged' | 'Resolved';
}

export const locations: LocationData[] = [
  {
    id: 'loc-1',
    name: 'Ukhimang',
    state: 'Uttarakhand',
    district: 'Uttarkashi',
    riskLevel: 'Critical',
    riskScore: 87,
    rainfall: 142.5,
    soilMoisture: 78,
    slope: 42,
    temperature: 18.3,
    humidity: 91,
    previousLandslides: 5,
    lastIncident: '2024-08-14',
    population: 12400,
    coordinates: { x: 30, y: 22 },
    prediction: {
      score: 91,
      trend: 'rising',
      confidence: 94,
      factors: { rainfall: 38, soilMoisture: 24, slope: 18, temperature: 8, history: 11 },
    },
    warning: {
      level: 'Critical',
      message: 'Immediate evacuation advised — saturated slope and heavy rainfall',
      time: '2025-09-05 06:42',
      action: 'Evacuate residents within 500m radius; deploy NDRF team',
    },
  },
  {
    id: 'loc-2',
    name: 'Itanagar Hills',
    state: 'Arunachal Pradesh',
    district: 'Papum Pare',
    riskLevel: 'High',
    riskScore: 74,
    rainfall: 98.2,
    soilMoisture: 65,
    slope: 35,
    temperature: 22.1,
    humidity: 84,
    previousLandslides: 3,
    lastIncident: '2024-07-02',
    population: 8900,
    coordinates: { x: 62, y: 30 },
    prediction: {
      score: 78,
      trend: 'rising',
      confidence: 88,
      factors: { rainfall: 30, soilMoisture: 20, slope: 16, temperature: 6, history: 6 },
    },
    warning: {
      level: 'High',
      message: 'High probability of slope failure in next 24-48 hours',
      time: '2025-09-05 05:10',
      action: 'Restrict movement on hill road; pre-position response teams',
    },
  },
  {
    id: 'loc-3',
    name: 'Cherrapunji',
    state: 'Meghalaya',
    district: 'East Khasi Hills',
    riskLevel: 'Critical',
    riskScore: 92,
    rainfall: 210.4,
    soilMoisture: 88,
    slope: 38,
    temperature: 19.8,
    humidity: 95,
    previousLandslides: 7,
    lastIncident: '2024-09-21',
    population: 15600,
    coordinates: { x: 48, y: 52 },
    prediction: {
      score: 95,
      trend: 'rising',
      confidence: 97,
      factors: { rainfall: 40, soilMoisture: 26, slope: 16, temperature: 7, history: 14 },
    },
    warning: {
      level: 'Critical',
      message: 'Extreme rainfall event — multiple slide points active',
      time: '2025-09-05 07:15',
      action: 'Full evacuation; activate state emergency operations centre',
    },
  },
  {
    id: 'loc-4',
    name: 'Mokokchung Ridge',
    state: 'Nagaland',
    district: 'Mokokchung',
    riskLevel: 'Moderate',
    riskScore: 54,
    rainfall: 62.0,
    soilMoisture: 52,
    slope: 28,
    temperature: 24.5,
    humidity: 76,
    previousLandslides: 2,
    lastIncident: '2023-06-18',
    population: 6700,
    coordinates: { x: 70, y: 44 },
    prediction: {
      score: 51,
      trend: 'stable',
      confidence: 82,
      factors: { rainfall: 22, soilMoisture: 16, slope: 14, temperature: 5, history: 4 },
    },
    warning: {
      level: 'Moderate',
      message: 'Monitor slope conditions; rainfall expected to intensify',
      time: '2025-09-05 03:30',
      action: 'Issue advisory to local authorities; increase monitoring frequency',
    },
  },
  {
    id: 'loc-5',
    name: 'Aizawl South',
    state: 'Mizoram',
    district: 'Aizawl',
    riskLevel: 'High',
    riskScore: 79,
    rainfall: 115.6,
    soilMoisture: 70,
    slope: 40,
    temperature: 21.4,
    humidity: 88,
    previousLandslides: 4,
    lastIncident: '2024-08-30',
    population: 10200,
    coordinates: { x: 52, y: 64 },
    prediction: {
      score: 82,
      trend: 'rising',
      confidence: 90,
      factors: { rainfall: 32, soilMoisture: 22, slope: 18, temperature: 6, history: 8 },
    },
    warning: {
      level: 'High',
      message: 'Saturated soil on steep slope — high failure probability',
      time: '2025-09-05 04:55',
      action: 'Evacuate vulnerable structures; close hillside roads',
    },
  },
  {
    id: 'loc-6',
    name: 'Imphal East Valley',
    state: 'Manipur',
    district: 'Imphal East',
    riskLevel: 'Low',
    riskScore: 28,
    rainfall: 34.2,
    soilMoisture: 41,
    slope: 18,
    temperature: 26.2,
    humidity: 68,
    previousLandslides: 1,
    lastIncident: '2022-07-09',
    population: 5300,
    coordinates: { x: 64, y: 50 },
    prediction: {
      score: 31,
      trend: 'falling',
      confidence: 79,
      factors: { rainfall: 14, soilMoisture: 12, slope: 8, temperature: 4, history: 2 },
    },
    warning: {
      level: 'None',
      message: 'Conditions stable — no action required',
      time: '—',
      action: 'Continue routine monitoring',
    },
  },
  {
    id: 'loc-7',
    name: 'Dima Hasao',
    state: 'Assam',
    district: 'Dima Hasao',
    riskLevel: 'High',
    riskScore: 71,
    rainfall: 104.3,
    soilMoisture: 67,
    slope: 33,
    temperature: 23.0,
    humidity: 85,
    previousLandslides: 4,
    lastIncident: '2024-07-19',
    population: 9100,
    coordinates: { x: 42, y: 46 },
    prediction: {
      score: 74,
      trend: 'rising',
      confidence: 86,
      factors: { rainfall: 28, soilMoisture: 20, slope: 16, temperature: 5, history: 8 },
    },
    warning: {
      level: 'High',
      message: 'Continuous rainfall weakening slope stability',
      time: '2025-09-05 02:20',
      action: 'Alert district administration; prepare shelter points',
    },
  },
  {
    id: 'loc-8',
    name: 'Gangtok Bypass',
    state: 'Sikkim',
    district: 'East Sikkim',
    riskLevel: 'Moderate',
    riskScore: 49,
    rainfall: 58.7,
    soilMoisture: 55,
    slope: 30,
    temperature: 20.1,
    humidity: 80,
    previousLandslides: 2,
    lastIncident: '2023-08-05',
    population: 4800,
    coordinates: { x: 22, y: 30 },
    prediction: {
      score: 47,
      trend: 'stable',
      confidence: 80,
      factors: { rainfall: 20, soilMoisture: 16, slope: 14, temperature: 5, history: 4 },
    },
    warning: {
      level: 'Moderate',
      message: 'Rain forecast may elevate risk — watch zone',
      time: '2025-09-05 01:05',
      action: 'Brief highway patrol; monitor rainfall gauges',
    },
  },
  {
    id: 'loc-9',
    name: 'Kohima Cliffs',
    state: 'Nagaland',
    district: 'Kohima',
    riskLevel: 'High',
    riskScore: 76,
    rainfall: 108.9,
    soilMoisture: 69,
    slope: 37,
    temperature: 21.7,
    humidity: 86,
    previousLandslides: 3,
    lastIncident: '2024-06-25',
    population: 7600,
    coordinates: { x: 66, y: 42 },
    prediction: {
      score: 80,
      trend: 'rising',
      confidence: 89,
      factors: { rainfall: 30, soilMoisture: 22, slope: 17, temperature: 6, history: 7 },
    },
    warning: {
      level: 'High',
      message: 'Steep cliff face saturated — rockfall and slide risk',
      time: '2025-09-05 05:40',
      action: 'Close cliff-edge road; relocate at-risk households',
    },
  },
  {
    id: 'loc-10',
    name: 'Tawang Pass',
    state: 'Arunachal Pradesh',
    district: 'Tawang',
    riskLevel: 'Moderate',
    riskScore: 58,
    rainfall: 71.4,
    soilMoisture: 58,
    slope: 31,
    temperature: 15.2,
    humidity: 82,
    previousLandslides: 2,
    lastIncident: '2023-09-12',
    population: 4100,
    coordinates: { x: 18, y: 18 },
    prediction: {
      score: 55,
      trend: 'stable',
      confidence: 81,
      factors: { rainfall: 24, soilMoisture: 16, slope: 14, temperature: 5, history: 4 },
    },
    warning: {
      level: 'Moderate',
      message: 'Snowmelt adding to soil moisture — watch slope',
      time: '2025-09-04 23:50',
      action: 'Monitor high-altitude gauges; alert BRO road teams',
    },
  },
  {
    id: 'loc-11',
    name: 'Shillong Peak',
    state: 'Meghalaya',
    district: 'East Khasi Hills',
    riskLevel: 'Low',
    riskScore: 33,
    rainfall: 41.0,
    soilMoisture: 44,
    slope: 22,
    temperature: 22.8,
    humidity: 72,
    previousLandslides: 1,
    lastIncident: '2022-08-22',
    population: 6200,
    coordinates: { x: 50, y: 50 },
    prediction: {
      score: 35,
      trend: 'falling',
      confidence: 77,
      factors: { rainfall: 16, soilMoisture: 12, slope: 10, temperature: 4, history: 2 },
    },
    warning: {
      level: 'None',
      message: 'Stable conditions — routine monitoring',
      time: '—',
      action: 'No action required',
    },
  },
  {
    id: 'loc-12',
    name: 'Tezpur Foothills',
    state: 'Assam',
    district: 'Sonitpur',
    riskLevel: 'Moderate',
    riskScore: 52,
    rainfall: 66.8,
    soilMoisture: 54,
    slope: 26,
    temperature: 25.6,
    humidity: 78,
    previousLandslides: 2,
    lastIncident: '2023-07-30',
    population: 5800,
    coordinates: { x: 40, y: 34 },
    prediction: {
      score: 50,
      trend: 'stable',
      confidence: 83,
      factors: { rainfall: 22, soilMoisture: 16, slope: 12, temperature: 5, history: 4 },
    },
    warning: {
      level: 'Moderate',
      message: 'Rainfall building — moderate slide risk developing',
      time: '2025-09-05 02:45',
      action: 'Issue public advisory; check drainage channels',
    },
  },
];

export const alerts: AlertData[] = [
  { id: 'a-1', location: 'Cherrapunji', severity: 'Critical', message: 'Extreme rainfall — multiple active slide points', datetime: '2025-09-05 07:15', status: 'Active' },
  { id: 'a-2', location: 'Ukhimang', severity: 'Critical', message: 'Saturated slope, evacuation advised', datetime: '2025-09-05 06:42', status: 'Active' },
  { id: 'a-3', location: 'Aizawl South', severity: 'High', message: 'Saturated soil on steep slope', datetime: '2025-09-05 04:55', status: 'Active' },
  { id: 'a-4', location: 'Kohima Cliffs', severity: 'High', message: 'Cliff-face rockfall risk', datetime: '2025-09-05 05:40', status: 'Acknowledged' },
  { id: 'a-5', location: 'Itanagar Hills', severity: 'High', message: 'High slope failure probability', datetime: '2025-09-05 05:10', status: 'Active' },
  { id: 'a-6', location: 'Dima Hasao', severity: 'High', message: 'Continuous rainfall weakening slope', datetime: '2025-09-05 02:20', status: 'Acknowledged' },
  { id: 'a-7', location: 'Mokokchung Ridge', severity: 'Moderate', message: 'Rainfall expected to intensify', datetime: '2025-09-05 03:30', status: 'Active' },
  { id: 'a-8', location: 'Tezpur Foothills', severity: 'Moderate', message: 'Moderate slide risk developing', datetime: '2025-09-05 02:45', status: 'Active' },
  { id: 'a-9', location: 'Tawang Pass', severity: 'Moderate', message: 'Snowmelt increasing soil moisture', datetime: '2025-09-04 23:50', status: 'Acknowledged' },
  { id: 'a-10', location: 'Gangtok Bypass', severity: 'Moderate', message: 'Rain forecast may elevate risk', datetime: '2025-09-05 01:05', status: 'Resolved' },
  { id: 'a-11', location: 'Imphal East Valley', severity: 'Low', message: 'Conditions stable', datetime: '2025-09-04 20:00', status: 'Resolved' },
  { id: 'a-12', location: 'Shillong Peak', severity: 'Low', message: 'Routine monitoring — no risk', datetime: '2025-09-04 18:30', status: 'Resolved' },
];

export const rainfallTrend = [
  { day: 'Mon', rainfall: 45, forecast: 52 },
  { day: 'Tue', rainfall: 62, forecast: 70 },
  { day: 'Wed', rainfall: 88, forecast: 95 },
  { day: 'Thu', rainfall: 120, forecast: 130 },
  { day: 'Fri', rainfall: 142, forecast: 155 },
  { day: 'Sat', rainfall: 98, forecast: 110 },
  { day: 'Sun', rainfall: 71, forecast: 85 },
];

export const weeklyRisk = [
  { day: 'Mon', risk: 42 },
  { day: 'Tue', risk: 51 },
  { day: 'Wed', risk: 63 },
  { day: 'Thu', risk: 71 },
  { day: 'Fri', risk: 82 },
  { day: 'Sat', risk: 76 },
  { day: 'Sun', risk: 68 },
];

export const predictionComparison = [
  { location: 'Cherrapunji', current: 92, predicted: 95 },
  { location: 'Ukhimang', current: 87, predicted: 91 },
  { location: 'Aizawl', current: 79, predicted: 82 },
  { location: 'Kohima', current: 76, predicted: 80 },
  { location: 'Dima Hasao', current: 71, predicted: 74 },
  { location: 'Tawang', current: 58, predicted: 55 },
  { location: 'Mokokchung', current: 54, predicted: 51 },
  { location: 'Tezpur', current: 52, predicted: 50 },
];

export const emergencyContacts = [
  { name: 'NDRF Command Centre', role: 'National Disaster Response Force', phone: '011-2618-8800', region: 'National', available: '24x7' },
  { name: 'SDMA Meghalaya', role: 'State Disaster Management Authority', phone: '0364-222-6100', region: 'Meghalaya', available: '24x7' },
  { name: 'SDMA Sikkim', role: 'State Disaster Management Authority', phone: '03592-202-333', region: 'Sikkim', available: '24x7' },
  { name: 'SDMA Assam', role: 'State Disaster Management Authority', phone: '0361-223-7212', region: 'Assam', available: '24x7' },
  { name: 'SDMA Arunachal', role: 'State Disaster Management Authority', phone: '0360-229-2112', region: 'Arunachal Pradesh', available: '24x7' },
  { name: 'IMD Weather Hotline', role: 'India Meteorological Department', phone: '1800-180-1717', region: 'National', available: '06:00–22:00' },
  { name: 'GREF / BRO Road Rescue', role: 'Border Roads Organisation', phone: '011-2569-0001', region: 'Hill routes', available: '24x7' },
  { name: 'District EOC Uttarkashi', role: 'Emergency Operations Centre', phone: '01374-222-136', region: 'Uttarakhand', available: '24x7' },
  { name: 'Local Response Team — Cherrapunji', role: 'Community First Responders', phone: '0364-222-7000', region: 'Meghalaya', available: '24x7' },
  { name: 'Local Response Team — Aizawl', role: 'Community First Responders', phone: '0389-232-5005', region: 'Mizoram', available: '24x7' },
];

export const safetySteps = {
  before: [
    'Know your area\'s landslide risk — check the risk map regularly.',
    'Identify safe evacuation routes and the nearest shelter.',
    'Keep an emergency kit with water, food, medicines and documents.',
    'Watch for warning signs: cracks in ground, tilting trees, muddy water.',
    'Register your number with the local early-warning SMS service.',
    'Reinforce vulnerable slopes with retaining walls or vegetation.',
  ],
  during: [
    'Stay calm and act quickly — do not delay evacuation.',
    'Move uphill and away from the slide path immediately.',
    'Avoid river valleys and steep gullies — debris flows follow them.',
    'Do not drive or walk through moving water or mud.',
    'If trapped, curl into a ball and protect your head.',
    'Listen to official alerts on radio or phone for updates.',
  ],
  after: [
    'Stay away until authorities confirm the area is safe.',
    'Check for injured people and give first aid if trained.',
    'Report broken gas lines, power lines and water mains.',
    'Watch for secondary slides — aftershocks or rain can trigger more.',
    'Photograph damage for insurance and relief claims.',
    'Help neighbours, especially elderly and disabled residents.',
  ],
};

export const riskLevelConfig: Record<RiskLevel, { color: string; bg: string; text: string; border: string; dot: string; ring: string }> = {
  Low: { color: '#22c55e', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500', ring: 'ring-green-500' },
  Moderate: { color: '#f59e0b', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500', ring: 'ring-amber-500' },
  High: { color: '#f97316', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', dot: 'bg-orange-500', ring: 'ring-orange-500' },
  Critical: { color: '#ef4444', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500', ring: 'ring-red-500' },
};

export function getRiskConfig(level: RiskLevel) {
  return riskLevelConfig[level];
}

export function riskFromScore(score: number): RiskLevel {
  if (score >= 75) return 'Critical';
  if (score >= 60) return 'High';
  if (score >= 40) return 'Moderate';
  return 'Low';
}
