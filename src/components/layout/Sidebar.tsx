import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Page } from '../../types';
import { 
  LayoutDashboard, 
  Filter, 
  Truck, 
  Activity, 
  BarChart3, 
  Bell, 
  Search, 
  Settings2,
  ChevronRight,
  Activity as ActivityIcon
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

const navItems: { id: Page; label: string; icon: any }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'funnel', label: 'Purchase Funnel', icon: Filter },
  { id: 'journey', label: 'Order Journey', icon: Truck },
  { id: 'api-health', label: 'API Health', icon: Activity },
  { id: 'channels', label: 'Channel Intel', icon: BarChart3 },
  { id: 'alerts', label: 'Alert Center', icon: Bell },
  { id: 'troubleshooting', label: 'Troubleshoot', icon: Search },
  { id: 'demo-control', label: 'Demo Control', icon: Settings2 },
];

export const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage } = useDemo();

  return (
    <aside className="w-64 border-right bg-card flex flex-col h-screen sticky top-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Activity className="text-primary-foreground w-5 h-5" />
        </div>
        <span className="font-heading font-bold text-lg tracking-tight">CartPulse</span>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
              {item.label}
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-4 bg-primary-foreground rounded-r-full"
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="bg-secondary/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">System Status</span>
          </div>
          <p className="text-xs text-foreground font-medium">All systems operational</p>
          <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
            <span>Uptime 99.98%</span>
            <span>v2.4.0</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
