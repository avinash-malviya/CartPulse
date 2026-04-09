import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Scenario } from '../../types';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Zap, 
  CreditCard, 
  Package, 
  Search, 
  Ticket, 
  Truck, 
  Flame,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const DemoControl: React.FC = () => {
  const { scenario, setScenario } = useDemo();

  const scenarios: { id: Scenario; title: string; description: string; icon: any; color: string }[] = [
    { 
      id: 'normal', 
      title: 'Baseline Operations', 
      description: 'Standard ecommerce traffic with healthy API responses and normal conversion rates.', 
      icon: CheckCircle2, 
      color: 'bg-green-500' 
    },
    { 
      id: 'payment-outage', 
      title: 'Razorpay Gateway Outage', 
      description: 'Simulates a major failure in the Razorpay/UPI gateway. Payment success drops to <20%.', 
      icon: CreditCard, 
      color: 'bg-red-500' 
    },
    { 
      id: 'inventory-sync', 
      title: 'Inventory Sync Issue', 
      description: 'WMS and Storefront inventory mismatch for Linen Shirts. Causes "Out of Stock" errors after Add to Cart.', 
      icon: Package, 
      color: 'bg-amber-500' 
    },
    { 
      id: 'search-degradation', 
      title: 'Search Degradation', 
      description: 'ElasticSearch latency spike on "Oversized Tee" queries. Drastic drop-off at the discovery stage.', 
      icon: Search, 
      color: 'bg-orange-500' 
    },
    { 
      id: 'coupon-latency', 
      title: 'Coupon Engine Latency', 
      description: 'High processing time for discount codes. Affects checkout conversion and AOV.', 
      icon: Ticket, 
      color: 'bg-yellow-500' 
    },
    { 
      id: 'sla-breach', 
      title: 'Delivery SLA Breach', 
      description: 'Logistics partner delays in the South India region. Affects post-purchase satisfaction.', 
      icon: Truck, 
      color: 'bg-purple-500' 
    },
    { 
      id: 'flash-sale', 
      title: 'Flash Sale Spike', 
      description: '10x traffic surge. High load on all services, increased AOV, and high abandonment.', 
      icon: Flame, 
      color: 'bg-blue-600' 
    },
  ];

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-primary text-primary-foreground premium-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading">Demo Simulation Center</h2>
              <p className="text-sm text-primary-foreground/70">Control the state of CartPulse Intelligence for live presentations.</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-white text-primary font-bold px-3 py-1">
            Current: {scenario.replace('-', ' ').toUpperCase()}
          </Badge>
        </div>
        <p className="text-xs text-primary-foreground/60 max-w-2xl">
          Triggering a scenario will instantly update all metrics, charts, and alerts across the entire platform. 
          Use these to demonstrate how CartPulse detects and quantifies operational risks in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenarios.map((s) => {
          const isActive = scenario === s.id;
          const Icon = s.icon;
          return (
            <Card 
              key={s.id} 
              className={cn(
                "premium-shadow border-border/50 transition-all duration-300 group cursor-pointer",
                isActive ? "ring-2 ring-primary border-transparent" : "hover:border-primary/30"
              )}
              onClick={() => setScenario(s.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className={cn("p-2 rounded-lg text-white", s.color)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {isActive && (
                    <Badge className="bg-primary text-primary-foreground text-[10px] font-bold">ACTIVE</Badge>
                  )}
                </div>
                <CardTitle className="text-base font-bold font-heading">{s.title}</CardTitle>
                <CardDescription className="text-xs line-clamp-2">{s.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant={isActive ? "secondary" : "outline"} 
                  className={cn("w-full text-xs font-bold", isActive && "bg-secondary text-foreground")}
                  onClick={(e) => {
                    e.stopPropagation();
                    setScenario(s.id);
                  }}
                >
                  {isActive ? "Currently Active" : "Activate Scenario"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="premium-shadow border-border/50 bg-secondary/20">
        <CardContent className="p-8 flex flex-col items-center text-center max-w-2xl mx-auto">
          <AlertCircle className="w-10 h-10 text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-bold font-heading mb-2">Interview Tip</h3>
          <p className="text-sm text-muted-foreground">
            When demonstrating the <strong>Payment Gateway Outage</strong>, navigate to the <strong>Overview</strong> page first to show the GMV at Risk spike, 
            then jump to <strong>API Health</strong> to identify the root cause, and finally use <strong>Troubleshooting</strong> to show individual failed sessions. 
            This demonstrates a complete operational workflow.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
