import { DemoState, Scenario, KpiData, FunnelStep, OrderStep, ApiService, Alert, Incident, ChannelData, DeviceData } from '../types';
import { subHours, format, startOfHour } from 'date-fns';

const generateRevenueTrend = (scenario: Scenario) => {
  const data = [];
  const now = new Date();
  for (let i = 24; i >= 0; i--) {
    const time = subHours(now, i);
    let value = 50000 + Math.random() * 20000;
    let risk = Math.random() * 5000;

    if (scenario === 'flash-sale' && i < 12) {
      value *= 2.5;
    }
    if (scenario === 'payment-outage' && i < 4) {
      value *= 0.2;
      risk *= 10;
    }

    data.push({
      time: format(time, 'HH:00'),
      value: Math.round(value),
      risk: Math.round(risk),
    });
  }
  return data;
};

const getKpis = (scenario: Scenario): KpiData[] => {
  const baseKpis: KpiData[] = [
    { label: 'GMV at Risk', value: 1245000, change: -12, trend: 'down', status: 'warning', prefix: '₹' },
    { label: 'Cart Abandonment', value: 68.4, change: 2.1, trend: 'up', status: 'neutral', suffix: '%' },
    { label: 'Checkout Conv.', value: 3.2, change: 0.4, trend: 'up', status: 'success', suffix: '%' },
    { label: 'UPI Success Rate', value: 98.2, change: -0.5, trend: 'down', status: 'success', suffix: '%' },
    { label: 'API Incidents', value: 2, change: 0, trend: 'neutral', status: 'neutral' },
    { label: 'Avg Order Value', value: 8500, change: 5, trend: 'up', status: 'success', prefix: '₹' },
  ];

  if (scenario === 'payment-outage') {
    baseKpis[0].value = 85400;
    baseKpis[0].status = 'critical';
    baseKpis[3].value = 42.5;
    baseKpis[3].status = 'critical';
    baseKpis[4].value = 12;
    baseKpis[4].status = 'critical';
  } else if (scenario === 'flash-sale') {
    baseKpis[1].value = 82.1;
    baseKpis[1].status = 'warning';
    baseKpis[5].value = 185;
    baseKpis[5].status = 'success';
  }

  return baseKpis;
};

const getFunnel = (scenario: Scenario): FunnelStep[] => {
  const steps = [
    { stage: 'Homepage', count: 100000, dropoff: 0, conversion: 100 },
    { stage: 'Search', count: 75000, dropoff: 25, conversion: 75 },
    { stage: 'PDP', count: 45000, dropoff: 40, conversion: 45 },
    { stage: 'Add to Cart', count: 12000, dropoff: 73, conversion: 12 },
    { stage: 'Cart', count: 8000, dropoff: 33, conversion: 8 },
    { stage: 'Checkout', count: 5000, dropoff: 37, conversion: 5 },
    { stage: 'Payment', count: 4200, dropoff: 16, conversion: 4.2 },
    { stage: 'Success', count: 3200, dropoff: 23, conversion: 3.2 },
  ];

  if (scenario === 'payment-outage') {
    steps[7].count = 800;
    steps[7].dropoff = 81;
    steps[7].conversion = 0.8;
  }

  return steps;
};

const getOrderJourney = (scenario: Scenario): OrderStep[] => {
  return [
    { stage: 'Order Placed', count: 3200, status: 'completed' },
    { stage: 'Payment Confirmed', count: 3150, status: 'completed' },
    { stage: 'Packed', count: 2800, status: 'completed' },
    { stage: 'Shipped', count: 2400, status: 'completed' },
    { stage: 'In Transit', count: 1800, status: 'current' },
    { stage: 'Out for Delivery', count: 450, status: 'pending' },
    { stage: 'Delivered', count: 320, status: 'pending' },
    { stage: 'Failed Delivery', count: 12, status: 'failed', slaBreach: true },
    { stage: 'Returned', count: 45, status: 'pending' },
  ];
};

const getApiHealth = (scenario: Scenario): ApiService[] => {
  const services: ApiService[] = [
    { id: '1', name: 'Razorpay Gateway', latency: 142, successRate: 99.8, errorRate: 0.2, status: 'healthy', category: 'Checkout' },
    { id: '2', name: 'Inventory Service', latency: 85, successRate: 99.9, errorRate: 0.1, status: 'healthy', category: 'Core' },
    { id: '3', name: 'Search Service', latency: 210, successRate: 99.5, errorRate: 0.5, status: 'healthy', category: 'Discovery' },
    { id: '4', name: 'Recommendation Engine', latency: 350, successRate: 98.2, errorRate: 1.8, status: 'healthy', category: 'Discovery' },
    { id: '5', name: 'Coupon Service', latency: 120, successRate: 99.7, errorRate: 0.3, status: 'healthy', category: 'Checkout' },
    { id: '6', name: 'Address Validation', latency: 450, successRate: 99.1, errorRate: 0.9, status: 'healthy', category: 'Checkout' },
    { id: '7', name: 'Notification Service', latency: 65, successRate: 99.9, errorRate: 0.1, status: 'healthy', category: 'Ops' },
    { id: '8', name: 'Delhivery API', latency: 580, successRate: 97.5, errorRate: 2.5, status: 'healthy', category: 'Ops' },
    { id: '9', name: 'UPI / OTP', latency: 95, successRate: 99.8, errorRate: 0.2, status: 'healthy', category: 'Core' },
    { id: '10', name: 'Returns Service', latency: 180, successRate: 99.4, errorRate: 0.6, status: 'healthy', category: 'Ops' },
  ];

  if (scenario === 'payment-outage') {
    services[0].status = 'down';
    services[0].latency = 5200;
    services[0].successRate = 12.5;
    services[0].errorRate = 87.5;
    services[0].lastFailure = '504 Gateway Timeout';
  } else if (scenario === 'search-degradation') {
    services[2].status = 'degraded';
    services[2].latency = 2400;
    services[2].successRate = 85.2;
    services[2].errorRate = 14.8;
  } else if (scenario === 'coupon-latency') {
    services[4].status = 'degraded';
    services[4].latency = 4500;
  }

  return services;
};

const getAlerts = (scenario: Scenario): Alert[] => {
  const alerts: Alert[] = [
    { id: 'a1', title: 'High Latency: Delhivery API', description: 'Latency exceeded 500ms threshold for 5 consecutive minutes.', severity: 'medium', timestamp: '10 mins ago', status: 'active', source: 'Monitoring' },
    { id: 'a2', title: 'High Return Rate Alert', description: 'SKU: OVERSIZED-TEE-BLK showing 45% return rate in North India.', severity: 'high', timestamp: '25 mins ago', status: 'acknowledged', source: 'Returns' },
  ];

  if (scenario === 'payment-outage') {
    alerts.unshift({ id: 'a3', title: 'CRITICAL: Payment Gateway Down', description: 'Success rate dropped below 20%. Immediate action required.', severity: 'critical', timestamp: 'Just now', status: 'active', source: 'Gateway' });
  }

  return alerts;
};

const getIncidents = (scenario: Scenario): Incident[] => {
  return [
    { id: 'i1', sessionId: 'sess_9283', userId: 'user_482', orderId: 'ORD-9283', device: 'iPhone 15', browser: 'Safari', channel: 'Paid Ads', failedStep: 'Payment', failedApi: 'Razorpay', errorCode: 'payment_failed', errorMessage: 'UPI Transaction Timed Out', timestamp: '2 mins ago' },
    { id: 'i2', sessionId: 'sess_1120', userId: 'user_102', device: 'Samsung S24', browser: 'Chrome', channel: 'Organic', failedStep: 'Checkout', failedApi: 'Address Validation', errorCode: '404', errorMessage: 'Pincode not serviceable', timestamp: '15 mins ago' },
    { id: 'i3', sessionId: 'sess_4451', userId: 'user_991', device: 'Samsung S24', browser: 'Chrome', channel: 'Instagram', failedStep: 'Add to Cart', failedApi: 'Inventory', errorCode: 'OOS', errorMessage: 'SKU: LINEN-SHIRT-WHT out of stock', timestamp: '22 mins ago' },
  ];
};

const getChannels = (scenario: Scenario): ChannelData[] => {
  return [
    { name: 'Paid Ads', revenue: 450000, conversion: 2.8, sessions: 160000, color: '#3B82F6' },
    { name: 'Organic', revenue: 320000, conversion: 4.2, sessions: 76000, color: '#10B981' },
    { name: 'Direct', revenue: 280000, conversion: 5.1, sessions: 55000, color: '#6366F1' },
    { name: 'WhatsApp', revenue: 120000, conversion: 8.4, sessions: 14000, color: '#25D366' },
    { name: 'Instagram', revenue: 95000, conversion: 1.9, sessions: 50000, color: '#E1306C' },
  ];
};

const getDevices = (scenario: Scenario): DeviceData[] => {
  return [
    { name: 'Mobile', value: 65 },
    { name: 'Desktop', value: 28 },
    { name: 'Tablet', value: 7 },
  ];
};

export const generateMockData = (scenario: Scenario): DemoState => {
  return {
    scenario,
    lastUpdated: format(new Date(), 'HH:mm:ss'),
    kpis: getKpis(scenario),
    funnel: getFunnel(scenario),
    orderJourney: getOrderJourney(scenario),
    apiHealth: getApiHealth(scenario),
    alerts: getAlerts(scenario),
    incidents: getIncidents(scenario),
    channels: getChannels(scenario),
    devices: getDevices(scenario),
    revenueTrend: generateRevenueTrend(scenario),
  };
};
