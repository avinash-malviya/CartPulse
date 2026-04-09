export type Page = 
  | 'overview' 
  | 'funnel' 
  | 'journey' 
  | 'api-health' 
  | 'channels' 
  | 'alerts' 
  | 'troubleshooting' 
  | 'demo-control';

export type Scenario = 
  | 'normal' 
  | 'payment-outage' 
  | 'inventory-sync' 
  | 'search-degradation' 
  | 'coupon-latency' 
  | 'sla-breach' 
  | 'flash-sale';

export interface KpiData {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  status: 'success' | 'warning' | 'critical' | 'neutral';
  prefix?: string;
  suffix?: string;
}

export interface FunnelStep {
  stage: string;
  count: number;
  dropoff: number;
  conversion: number;
}

export interface OrderStep {
  stage: string;
  count: number;
  status: 'completed' | 'current' | 'pending' | 'failed';
  slaBreach?: boolean;
}

export interface ApiService {
  id: string;
  name: string;
  latency: number;
  successRate: number;
  errorRate: number;
  status: 'healthy' | 'degraded' | 'down';
  category: string;
  lastFailure?: string;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  timestamp: string;
  status: 'active' | 'resolved' | 'acknowledged';
  source: string;
}

export interface Incident {
  id: string;
  sessionId: string;
  userId: string;
  orderId?: string;
  device: string;
  browser: string;
  channel: string;
  failedStep: string;
  failedApi?: string;
  errorCode: string;
  errorMessage: string;
  timestamp: string;
}

export interface ChannelData {
  name: string;
  revenue: number;
  conversion: number;
  sessions: number;
  color: string;
}

export interface DeviceData {
  name: string;
  value: number;
}

export interface DemoState {
  scenario: Scenario;
  lastUpdated: string;
  kpis: KpiData[];
  funnel: FunnelStep[];
  orderJourney: OrderStep[];
  apiHealth: ApiService[];
  alerts: Alert[];
  incidents: Incident[];
  channels: ChannelData[];
  devices: DeviceData[];
  revenueTrend: { time: string; value: number; risk: number }[];
}
