import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Sun, Moon, Calendar as CalendarIcon, User, Bell } from 'lucide-react';
import { Button } from '../ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';

export const Header: React.FC = () => {
  const { theme, toggleTheme, currentPage, state } = useDemo();

  const getPageTitle = () => {
    switch (currentPage) {
      case 'overview': return 'Executive Overview';
      case 'funnel': return 'Purchase Funnel Intelligence';
      case 'journey': return 'Order Journey Observability';
      case 'api-health': return 'API Health & Latency';
      case 'channels': return 'Channel Intelligence';
      case 'alerts': return 'Alert Center';
      case 'troubleshooting': return 'Incident Troubleshooting';
      case 'demo-control': return 'Demo Control Center';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="h-16 border-b bg-background/80 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold font-heading">{getPageTitle()}</h1>
        <p className="text-xs text-muted-foreground">Last updated: {state.lastUpdated}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full border border-border">
          <CalendarIcon className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-medium">Last 24 Hours</span>
        </div>

        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </Button>

        <div className="relative">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="w-4 h-4" />
          </Button>
          {state.alerts.length > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background" />
          )}
        </div>

        <Separator orientation="vertical" className="h-6" />

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" className="gap-2 px-2 hover:bg-secondary rounded-full" />
            }
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
              AM
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-bold leading-none">Avinash M.</p>
              <p className="text-[10px] text-muted-foreground leading-none mt-1">Admin</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

import { Separator } from '../ui/separator';
