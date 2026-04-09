import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { ChartContainer } from '../dashboard/ChartContainer';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie
} from 'recharts';
import { Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowDown, Users, MousePointer2, ShoppingCart, CreditCard, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export const PurchaseFunnel: React.FC = () => {
  const { state } = useDemo();

  const funnelIcons = [
    Users, Search, MousePointer2, ShoppingCart, ShoppingCart, CreditCard, CreditCard, CheckCircle2
  ];

  return (
    <div className="space-y-8">
      {/* Funnel Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {state.funnel.map((step, index) => {
          const Icon = funnelIcons[index] || Users;
          return (
            <div key={step.stage} className="relative group">
              <Card className="premium-shadow border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">{step.stage}</h3>
                  <p className="text-2xl font-bold font-heading">{step.count.toLocaleString()}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px] font-bold">
                      {step.conversion}% Conv.
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              {index < state.funnel.length - 1 && (
                <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 rounded-full bg-background border border-border items-center justify-center">
                  <ArrowDown className="w-2.5 h-2.5 text-muted-foreground rotate-[-90deg]" />
                </div>
              )}
              {index < state.funnel.length - 1 && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center lg:hidden">
                  <ArrowDown className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[10px] font-bold text-destructive">-{step.dropoff}%</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visit Trends */}
        <ChartContainer 
          title="Visit Trends & Conversion" 
          description="Daily traffic volume vs successful purchases"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={state.revenueTrend}>
              <defs>
                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
                interval={4}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px', fontSize: '12px' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="var(--chart-1)" 
                fillOpacity={1} 
                fill="url(#colorVisits)" 
                strokeWidth={2}
                name="Visits"
              />
              <Line 
                type="monotone" 
                dataKey="risk" 
                stroke="var(--chart-2)" 
                strokeWidth={2} 
                dot={false}
                name="Conversions"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Device Breakdown */}
        <ChartContainer 
          title="Conversion by Device" 
          description="Performance across mobile, desktop and tablet"
        >
          <div className="flex h-full items-center">
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie
                  data={state.devices}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {state.devices.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={[`var(--chart-1)`, `var(--chart-2)`, `var(--chart-3)`][index % 3]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-4">
              {state.devices.map((device, index) => (
                <div key={device.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: [`var(--chart-1)`, `var(--chart-2)`, `var(--chart-3)`][index % 3] }} />
                    <span className="text-xs font-medium">{device.name}</span>
                  </div>
                  <span className="text-xs font-bold">{device.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartContainer>
      </div>

      {/* Friction Hotspots */}
      <Card className="premium-shadow border-border/50">
        <CardHeader>
          <CardTitle className="text-base font-bold font-heading">Friction Hotspots</CardTitle>
          <p className="text-xs text-muted-foreground">Identifying where users are struggling most</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/10">
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-destructive text-destructive-foreground text-[10px]">Critical</Badge>
                <span className="text-[10px] font-bold text-muted-foreground">Payment Stage</span>
              </div>
              <h4 className="text-sm font-bold mb-1">UPI Intent Timeout</h4>
              <p className="text-xs text-muted-foreground">High drop-off for PhonePe/GPay users due to app switch latency.</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-destructive">24.2% Drop-off</span>
                <Button variant="link" className="h-auto p-0 text-xs font-bold">View Sessions</Button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-amber-500 text-white text-[10px]">Warning</Badge>
                <span className="text-[10px] font-bold text-muted-foreground">Checkout Stage</span>
              </div>
              <h4 className="text-sm font-bold mb-1">Pincode Serviceability</h4>
              <p className="text-xs text-muted-foreground">Users in Tier 3 cities exiting after "Not Serviceable" alert.</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-amber-500">18.5% Drop-off</span>
                <Button variant="link" className="h-auto p-0 text-xs font-bold">View Sessions</Button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-blue-500 text-white text-[10px]">Info</Badge>
                <span className="text-[10px] font-bold text-muted-foreground">PDP Stage</span>
              </div>
              <h4 className="text-sm font-bold mb-1">Size Guide Abandonment</h4>
              <p className="text-xs text-muted-foreground">Users viewing the size guide for "Oversized" fits are 30% more likely to exit.</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-blue-500">12.1% Drop-off</span>
                <Button variant="link" className="h-auto p-0 text-xs font-bold">View Sessions</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import { Button } from '../ui/button';
