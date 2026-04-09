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
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Activity, 
  Zap, 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  Server,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const ApiHealth: React.FC = () => {
  const { state } = useDemo();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'degraded': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'down': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  return (
    <div className="space-y-8">
      {/* Service Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {state.apiHealth.map((service) => (
          <Card key={service.id} className="premium-shadow border-border/50 hover:border-primary/20 transition-all group">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Server className="w-4 h-4" />
                </div>
                <Badge className={cn("text-[8px] font-bold uppercase", getStatusColor(service.status))}>
                  {service.status}
                </Badge>
              </div>
              <h3 className="text-sm font-bold truncate mb-1">{service.name}</h3>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-4">{service.category}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground font-medium">Latency</span>
                  <span className={cn("text-xs font-bold", service.latency > 500 ? "text-amber-500" : "text-foreground")}>
                    {service.latency}ms
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground font-medium">Success</span>
                  <span className="text-xs font-bold text-green-500">{service.successRate}%</span>
                </div>
                <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full", service.status === 'healthy' ? "bg-green-500" : service.status === 'degraded' ? "bg-amber-500" : "bg-red-500")} 
                    style={{ width: `${service.successRate}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Latency Comparison */}
        <ChartContainer 
          title="Latency Comparison" 
          description="Response times across critical ecommerce services"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={state.apiHealth} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} />
              <YAxis 
                dataKey="name" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: 'var(--foreground)', fontWeight: 'bold' }}
                width={120}
              />
              <Tooltip 
                cursor={{ fill: 'var(--secondary)', opacity: 0.4 }}
                contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px', fontSize: '12px' }}
              />
              <Bar dataKey="latency" radius={[0, 4, 4, 0]} barSize={15}>
                {state.apiHealth.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.latency > 500 ? 'var(--destructive)' : entry.latency > 300 ? 'var(--chart-3)' : 'var(--chart-1)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Stability Matrix */}
        <ChartContainer 
          title="Stability Matrix" 
          description="Success Rate vs Latency correlation"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis 
                type="number" 
                dataKey="latency" 
                name="Latency" 
                unit="ms" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
              />
              <YAxis 
                type="number" 
                dataKey="successRate" 
                name="Success" 
                unit="%" 
                domain={[90, 100]}
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
              />
              <ZAxis type="number" range={[100, 400]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Services" data={state.apiHealth} fill="var(--chart-1)">
                {state.apiHealth.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.status === 'healthy' ? 'var(--chart-2)' : entry.status === 'degraded' ? 'var(--chart-3)' : 'var(--destructive)'} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Latest Failures */}
      <Card className="premium-shadow border-border/50">
        <CardHeader>
          <CardTitle className="text-base font-bold font-heading">Latest Service Failures</CardTitle>
          <p className="text-xs text-muted-foreground">Recent error logs and gateway timeouts</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-0 border rounded-xl overflow-hidden">
            {[
              { service: 'Payment Gateway', error: '504 Gateway Timeout', count: 124, trend: 'up', time: '2 mins ago' },
              { service: 'Shipping Aggregator', error: '401 Unauthorized', count: 12, trend: 'down', time: '15 mins ago' },
              { service: 'Inventory Sync', error: 'Socket Hang Up', count: 45, trend: 'up', time: '24 mins ago' },
              { service: 'Coupon Engine', error: 'Database Connection Error', count: 8, trend: 'neutral', time: '1 hour ago' },
            ].map((failure, index) => (
              <div key={failure.service} className={cn(
                "flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors",
                index !== 3 && "border-b"
              )}>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{failure.service}</h4>
                    <p className="text-xs text-muted-foreground font-mono">{failure.error}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-xs font-bold">{failure.count} Errors</p>
                    <div className="flex items-center gap-1 justify-end">
                      {failure.trend === 'up' ? <ArrowUpRight className="w-3 h-3 text-destructive" /> : <ArrowDownRight className="w-3 h-3 text-green-500" />}
                      <span className={cn("text-[10px] font-bold", failure.trend === 'up' ? "text-destructive" : "text-green-500")}>
                        {failure.trend === 'up' ? '+12%' : '-5%'}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-medium w-20 text-right">{failure.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
