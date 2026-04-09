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
  Line
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  CheckCircle2, 
  Clock, 
  Package, 
  Truck, 
  MapPin, 
  AlertTriangle, 
  Timer,
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const OrderJourney: React.FC = () => {
  const { state } = useDemo();

  const getStepIcon = (stage: string) => {
    switch (stage) {
      case 'Order Placed': return CheckCircle2;
      case 'Payment Confirmed': return CreditCard;
      case 'Packed': return Package;
      case 'Shipped': return Truck;
      case 'In Transit': return MapPin;
      case 'Out for Delivery': return Truck;
      case 'Delivered': return CheckCircle2;
      case 'Failed Delivery': return AlertTriangle;
      case 'Returned': return TrendingDown;
      default: return Package;
    }
  };

  return (
    <div className="space-y-8">
      {/* Journey Stepper */}
      <Card className="premium-shadow border-border/50 overflow-x-auto">
        <CardContent className="p-8 min-w-[1000px]">
          <div className="flex items-center justify-between relative">
            {/* Connection Lines */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />
            
            {state.orderJourney.map((step, index) => {
              const Icon = getStepIcon(step.stage);
              const isCompleted = step.status === 'completed';
              const isCurrent = step.status === 'current';
              const isFailed = step.status === 'failed';
              
              return (
                <div key={step.stage} className="relative z-10 flex flex-col items-center group">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    isCompleted ? "bg-primary border-primary text-primary-foreground" :
                    isCurrent ? "bg-background border-primary text-primary animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]" :
                    isFailed ? "bg-destructive border-destructive text-destructive-foreground" :
                    "bg-background border-border text-muted-foreground"
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="mt-4 text-center">
                    <p className={cn(
                      "text-[10px] font-bold uppercase tracking-wider mb-1",
                      isCurrent ? "text-primary" : isFailed ? "text-destructive" : "text-muted-foreground"
                    )}>
                      {step.stage}
                    </p>
                    <p className="text-sm font-bold">{step.count.toLocaleString()}</p>
                    {step.slaBreach && (
                      <Badge variant="destructive" className="mt-2 text-[8px] h-4 px-1">SLA BREACH</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Courier Performance */}
        <ChartContainer 
          title="Courier Performance" 
          description="Delivery success rate by partner"
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { name: 'FedEx', success: 98.2, delay: 1.2 },
              { name: 'UPS', success: 97.5, delay: 1.8 },
              { name: 'DHL', success: 99.1, delay: 0.5 },
              { name: 'USPS', success: 94.2, delay: 4.5 },
              { name: 'Local', success: 92.1, delay: 6.2 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px', fontSize: '12px' }}
              />
              <Bar dataKey="success" fill="var(--chart-2)" radius={[4, 4, 0, 0]} barSize={30} name="Success Rate %" />
              <Bar dataKey="delay" fill="var(--destructive)" radius={[4, 4, 0, 0]} barSize={30} name="Delay Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Operational Metrics */}
        <div className="space-y-4">
          <Card className="premium-shadow border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                  <Timer className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Avg. Fulfillment Time</p>
                  <p className="text-2xl font-bold font-heading">4.2 Hours</p>
                  <p className="text-[10px] text-green-500 font-bold mt-1">↓ 12% from last week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-shadow border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">First Attempt Success</p>
                  <p className="text-2xl font-bold font-heading">94.8%</p>
                  <p className="text-[10px] text-green-500 font-bold mt-1">↑ 0.5% from last week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-shadow border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-destructive/10 text-destructive">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Return Rate</p>
                  <p className="text-2xl font-bold font-heading">8.2%</p>
                  <p className="text-[10px] text-destructive font-bold mt-1">↑ 2.1% from last week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Warehouse Bottlenecks */}
      <Card className="premium-shadow border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold font-heading">Warehouse Bottlenecks</CardTitle>
            <p className="text-xs text-muted-foreground">Real-time processing delays by facility</p>
          </div>
          <Button variant="outline" size="sm" className="text-xs font-bold">
            View Map
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              { name: 'NJ-Central (Primary)', status: 'Healthy', load: 42, delay: '0.5h', color: 'bg-green-500' },
              { name: 'CA-West (Secondary)', status: 'Warning', load: 88, delay: '2.4h', color: 'bg-amber-500' },
              { name: 'TX-South', status: 'Healthy', load: 15, delay: '0.2h', color: 'bg-green-500' },
              { name: 'IL-Midwest', status: 'Critical', load: 96, delay: '5.8h', color: 'bg-red-500' },
            ].map((facility) => (
              <div key={facility.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", facility.color)} />
                    <span className="text-sm font-bold">{facility.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground font-medium">Delay: {facility.delay}</span>
                    <span className="text-xs font-bold">{facility.load}% Load</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${facility.load}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={cn("h-full rounded-full", facility.color)} 
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import { motion } from 'motion/react';
import { CreditCard } from 'lucide-react';
import { Button } from '../ui/button';
