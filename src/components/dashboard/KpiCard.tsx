import React from 'react';
import { Card, CardContent } from '../ui/card';
import { KpiData } from '../../types';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface KpiCardProps {
  data: KpiData;
}

export const KpiCard: React.FC<KpiCardProps> = ({ data }) => {
  const isPositive = data.trend === 'up';
  const isNegative = data.trend === 'down';

  const getStatusColor = () => {
    switch (data.status) {
      case 'success': return 'text-green-500';
      case 'warning': return 'text-amber-500';
      case 'critical': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className="premium-shadow border-border/50 overflow-hidden group hover:border-primary/20 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{data.label}</span>
          <div className={cn(
            "flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full",
            isPositive ? "bg-green-500/10 text-green-500" : 
            isNegative ? "bg-red-500/10 text-red-500" : 
            "bg-muted/50 text-muted-foreground"
          )}>
            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : 
             isNegative ? <ArrowDownRight className="w-3 h-3" /> : 
             <Minus className="w-3 h-3" />}
            {Math.abs(data.change)}%
          </div>
        </div>
        
        <div className="flex items-baseline gap-1">
          {data.prefix && <span className="text-xl font-medium text-muted-foreground">{data.prefix}</span>}
          <span className="text-3xl font-bold font-heading tracking-tight">
            {typeof data.value === 'number' ? data.value.toLocaleString() : data.value}
          </span>
          {data.suffix && <span className="text-sm font-medium text-muted-foreground ml-1">{data.suffix}</span>}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", 
            data.status === 'success' ? "bg-green-500" : 
            data.status === 'warning' ? "bg-amber-500" : 
            data.status === 'critical' ? "bg-red-500" : 
            "bg-muted-foreground"
          )} />
          <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
            {data.status === 'neutral' ? 'Stable' : data.status}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
