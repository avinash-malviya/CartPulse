import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { KpiCard } from '../dashboard/KpiCard';
import { ChartContainer } from '../dashboard/ChartContainer';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { AlertCircle, TrendingUp, Zap, ArrowRight } from 'lucide-react';

export const Overview: React.FC = () => {
  const { state } = useDemo();

  return (
    <div className="space-y-8">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {state.kpis.map((kpi, index) => (
          <KpiCard key={index} data={kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Trend */}
        <ChartContainer 
          title="Revenue & Risk Exposure" 
          description="Real-time GMV tracking vs estimated risk leakage (₹)"
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={state.revenueTrend}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--destructive)" stopOpacity={0}/>
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
                tickFormatter={(value) => `₹${value / 1000}k`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="var(--chart-1)" 
                fillOpacity={1} 
                fill="url(#colorValue)" 
                strokeWidth={2}
                name="GMV"
              />
              <Area 
                type="monotone" 
                dataKey="risk" 
                stroke="var(--destructive)" 
                fillOpacity={1} 
                fill="url(#colorRisk)" 
                strokeWidth={2}
                name="Risk"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Funnel Snapshot */}
        <ChartContainer 
          title="Purchase Funnel" 
          description="Conversion drop-off across key stages"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={state.funnel.slice(3)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="stage" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: 'var(--foreground)', fontWeight: 'bold' }}
                width={80}
              />
              <Tooltip 
                cursor={{ fill: 'var(--secondary)', opacity: 0.4 }}
                contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px', fontSize: '12px' }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
                {state.funnel.slice(3).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 4 ? 'var(--chart-2)' : 'var(--chart-1)'} opacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Critical Incidents */}
        <Card className="lg:col-span-3 premium-shadow border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-base font-bold font-heading">Critical Incidents</CardTitle>
              <p className="text-xs text-muted-foreground">Active issues requiring immediate attention</p>
            </div>
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
              {state.alerts.filter(a => a.severity === 'critical').length} Critical
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {state.alerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/20 transition-all group">
                  <div className={cn(
                    "p-2 rounded-lg",
                    alert.severity === 'critical' ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500"
                  )}>
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold">{alert.title}</h4>
                      <span className="text-[10px] text-muted-foreground font-medium">{alert.timestamp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{alert.description}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {state.alerts.length === 0 && (
                <div className="py-12 text-center">
                  <Zap className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No critical incidents detected</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Insights Rail */}
        <Card className="premium-shadow border-border/50 bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-base font-bold font-heading flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Insights
            </CardTitle>
            <p className="text-[10px] text-primary-foreground/60 uppercase tracking-widest font-bold">Last 24 Hours</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-medium text-primary-foreground/80 italic">"UPI success rate in the Maharashtra region has dropped by 12% following the latest gateway update."</p>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-red-400 w-3/4" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">1</div>
                <div>
                   <p className="text-xs font-bold">Size Selection Friction</p>
                   <p className="text-[10px] text-primary-foreground/60">Users are exiting at the PDP stage due to missing size guides for new arrivals.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">2</div>
                <div>
                  <p className="text-xs font-bold">Return Rate Spike</p>
                  <p className="text-[10px] text-primary-foreground/60">"Oversized" fit category has a 40% higher return rate than standard fits.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">3</div>
                <div>
                  <p className="text-xs font-bold">UPI Intent Success</p>
                  <p className="text-[10px] text-primary-foreground/60">Direct UPI intent has 20% higher success than manual VPA entry.</p>
                </div>
              </div>
            </div>

            <Button variant="secondary" className="w-full text-xs font-bold h-9 bg-white text-primary hover:bg-white/90">
              View Full Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
