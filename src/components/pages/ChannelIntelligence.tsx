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
  PieChart,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Globe, 
  Smartphone, 
  Instagram, 
  MessageCircle, 
  Search, 
  MousePointer2,
  Monitor,
  Tablet
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const ChannelIntelligence: React.FC = () => {
  const { state } = useDemo();

  const getChannelIcon = (name: string) => {
    switch (name) {
      case 'Paid Ads': return MousePointer2;
      case 'Organic': return Search;
      case 'Direct': return Globe;
      case 'WhatsApp': return MessageCircle;
      case 'Instagram': return Instagram;
      default: return Globe;
    }
  };

  const radarData = [
    { subject: 'Conversion', A: 120, B: 110, fullMark: 150 },
    { subject: 'AOV', A: 98, B: 130, fullMark: 150 },
    { subject: 'Retention', A: 86, B: 130, fullMark: 150 },
    { subject: 'LTV', A: 99, B: 100, fullMark: 150 },
    { subject: 'CAC', A: 85, B: 90, fullMark: 150 },
    { subject: 'Speed', A: 65, B: 85, fullMark: 150 },
  ];

  return (
    <div className="space-y-8">
      {/* Channel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {state.channels.map((channel) => {
          const Icon = getChannelIcon(channel.name);
          return (
            <Card key={channel.name} className="premium-shadow border-border/50 overflow-hidden group">
              <div className="h-1 w-full" style={{ backgroundColor: channel.color }} />
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold">{channel.name}</h3>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Revenue</p>
                  <p className="text-xl font-bold font-heading">₹{(channel.revenue / 1000).toFixed(1)}k</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-[8px] text-muted-foreground uppercase font-bold">Conv.</p>
                    <p className="text-xs font-bold">{channel.conversion}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[8px] text-muted-foreground uppercase font-bold">Sessions</p>
                    <p className="text-xs font-bold">{(channel.sessions / 1000).toFixed(1)}k</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Contribution */}
        <ChartContainer 
          title="Revenue Contribution" 
          description="Total GMV split by acquisition channel"
        >
          <div className="flex h-full items-center">
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie
                  data={state.channels}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="revenue"
                >
                  {state.channels.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `₹${(value / 1000).toFixed(1)}k`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {state.channels.map((channel) => (
                <div key={channel.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: channel.color }} />
                    <span className="text-xs font-medium">{channel.name}</span>
                  </div>
                  <span className="text-xs font-bold">{((channel.revenue / state.channels.reduce((acc, c) => acc + c.revenue, 0)) * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartContainer>

        {/* Channel Performance Radar */}
        <ChartContainer 
          title="Channel Quality Matrix" 
          description="Comparing Web (A) vs App (B) performance metrics"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
              <Radar
                name="Web"
                dataKey="A"
                stroke="var(--chart-1)"
                fill="var(--chart-1)"
                fillOpacity={0.5}
              />
              <Radar
                name="App"
                dataKey="B"
                stroke="var(--chart-2)"
                fill="var(--chart-2)"
                fillOpacity={0.5}
              />
              <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Device & Browser Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="premium-shadow border-border/50">
          <CardHeader>
            <CardTitle className="text-sm font-bold font-heading">Device Mix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: 'iPhone 15 Pro', value: 42, icon: Smartphone },
              { name: 'Samsung S24', value: 24, icon: Smartphone },
              { name: 'MacBook Pro', value: 18, icon: Monitor },
              { name: 'iPad Air', value: 8, icon: Tablet },
              { name: 'Other', value: 8, icon: Globe },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <item.icon className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium">{item.name}</span>
                </div>
                <span className="text-xs font-bold">{item.value}%</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="premium-shadow border-border/50">
          <CardHeader>
            <CardTitle className="text-sm font-bold font-heading">Browser Mix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: 'Chrome', value: 58, color: 'bg-blue-500' },
              { name: 'Safari', value: 32, color: 'bg-sky-400' },
              { name: 'Firefox', value: 4, color: 'bg-orange-500' },
              { name: 'Edge', value: 4, color: 'bg-blue-600' },
              { name: 'Other', value: 2, color: 'bg-slate-400' },
            ].map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{item.name}</span>
                  <span className="text-xs font-bold">{item.value}%</span>
                </div>
                <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="premium-shadow border-border/50 bg-secondary/20">
          <CardHeader>
            <CardTitle className="text-sm font-bold font-heading">Mobile Friction Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg bg-background border border-border/50">
              <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Top Friction Point</p>
              <p className="text-xs font-bold">Image Load Time (PDP)</p>
              <p className="text-[10px] text-destructive font-bold mt-1">4.2s Avg on 4G</p>
            </div>
            <div className="p-3 rounded-lg bg-background border border-border/50">
              <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Checkout Speed</p>
              <p className="text-xs font-bold">Apple Pay vs Manual</p>
              <p className="text-[10px] text-green-500 font-bold mt-1">Apple Pay is 4.5x faster</p>
            </div>
            <div className="p-3 rounded-lg bg-background border border-border/50">
              <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Search Accuracy</p>
              <p className="text-xs font-bold">Zero Results Rate</p>
              <p className="text-[10px] text-amber-500 font-bold mt-1">8.2% on Mobile Search</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
