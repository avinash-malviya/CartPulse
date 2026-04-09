import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Bell, 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  Slack, 
  Mail, 
  Smartphone,
  MoreHorizontal,
  History,
  Settings,
  Filter
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Separator } from '../ui/separator';

export const AlertCenter: React.FC = () => {
  const { state } = useDemo();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-amber-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return AlertCircle;
      case 'high': return AlertTriangle;
      case 'medium': return AlertTriangle;
      case 'low': return Info;
      default: return Info;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full border border-border">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-bold">{state.alerts.length} Active Alerts</span>
          </div>
          <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full border border-border">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
            <span className="text-xs font-bold">12 Resolved Today</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 text-xs font-bold">
            <Filter className="w-3.5 h-3.5" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2 text-xs font-bold">
            <Settings className="w-3.5 h-3.5" /> Config
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alert Feed */}
        <div className="lg:col-span-2 space-y-4">
          {state.alerts.map((alert) => {
            const Icon = getSeverityIcon(alert.severity);
            return (
              <Card key={alert.id} className="premium-shadow border-border/50 hover:border-primary/20 transition-all group overflow-hidden">
                <div className={cn("h-1 w-full", getSeverityColor(alert.severity).split(' ')[0])} />
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={cn("p-2 rounded-lg", getSeverityColor(alert.severity).replace('bg-', 'bg-').replace('text-', 'text-'))}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-bold">{alert.title}</h3>
                          <Badge className={cn("text-[8px] font-bold uppercase h-4", getSeverityColor(alert.severity))}>
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-4">{alert.description}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <History className="w-3 h-3 text-muted-foreground" />
                            <span className="text-[10px] text-muted-foreground font-medium">{alert.timestamp}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Badge variant="secondary" className="text-[8px] h-4">{alert.source}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" className="text-[10px] font-bold h-8">Acknowledge</Button>
                      <Button variant="outline" size="sm" className="text-[10px] font-bold h-8">View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {state.alerts.length === 0 && (
            <div className="py-20 text-center bg-secondary/20 rounded-2xl border border-dashed border-border">
              <Bell className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
              <h3 className="text-sm font-bold text-muted-foreground">No active alerts</h3>
              <p className="text-xs text-muted-foreground/60">System is running within normal parameters</p>
            </div>
          )}
        </div>

        {/* Notification Targets & Config */}
        <div className="space-y-8">
          <Card className="premium-shadow border-border/50">
            <CardHeader>
              <CardTitle className="text-sm font-bold font-heading">Notification Targets</CardTitle>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Active Channels</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#4A154B] text-white">
                    <Slack className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">#ops-alerts</p>
                    <p className="text-[10px] text-muted-foreground">Critical & High only</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500 text-white">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">Engineering Lead</p>
                    <p className="text-[10px] text-muted-foreground">All severities</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-white">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">PagerDuty</p>
                    <p className="text-[10px] text-muted-foreground">Critical only</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>

              <Button variant="outline" className="w-full text-xs font-bold border-dashed">
                + Add Target
              </Button>
            </CardContent>
          </Card>

          <Card className="premium-shadow border-border/50">
            <CardHeader>
              <CardTitle className="text-sm font-bold font-heading">Threshold Logic</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">API Latency</span>
                  <span className="text-xs font-bold text-amber-500">{">"} 500ms</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-3/4" />
                </div>
                <p className="text-[10px] text-muted-foreground">Triggered after 5 consecutive failures</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">Success Rate</span>
                  <span className="text-xs font-bold text-red-500">{"<"} 95%</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-1/2" />
                </div>
                <p className="text-[10px] text-muted-foreground">Immediate trigger for critical services</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">Cart Abandonment</span>
                  <span className="text-xs font-bold text-blue-500">{">"} 80%</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-1/4" />
                </div>
                <p className="text-[10px] text-muted-foreground">Anomalous spike detection enabled</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
