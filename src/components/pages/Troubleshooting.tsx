import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  Smartphone, 
  Monitor, 
  Globe,
  ChevronRight,
  User,
  ShoppingBag,
  Activity,
  AlertCircle
} from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '../ui/sheet';
import { cn } from '../../lib/utils';
import { Separator } from '../ui/separator';

export const Troubleshooting: React.FC = () => {
  const { state } = useDemo();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIncident, setSelectedIncident] = useState<any>(null);

  const filteredIncidents = state.incidents.filter(i => 
    i.sessionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.errorMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by Session, User, or Error..." 
            className="pl-10 h-10 bg-secondary/30 border-border/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 text-xs font-bold">
            <Filter className="w-3.5 h-3.5" /> Filters
          </Button>
          <Button variant="outline" className="gap-2 text-xs font-bold">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </Button>
        </div>
      </div>

      <Card className="premium-shadow border-border/50 overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary/30">
            <TableRow>
              <TableHead className="text-[10px] uppercase font-bold tracking-wider">Session / User</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-wider">Failed Step</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-wider">API / Service</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-wider">Error Code</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-wider">Device / Channel</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-wider">Timestamp</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIncidents.map((incident) => (
              <TableRow key={incident.id} className="group hover:bg-secondary/20 transition-colors cursor-pointer" onClick={() => setSelectedIncident(incident)}>
                <TableCell>
                  <div className="space-y-1">
                    <p className="text-xs font-bold font-mono">{incident.sessionId}</p>
                    <p className="text-[10px] text-muted-foreground">{incident.userId}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[10px] font-bold border-destructive/20 text-destructive bg-destructive/5">
                    {incident.failedStep}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Activity className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs font-medium">{incident.failedApi || 'N/A'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <code className="text-[10px] bg-secondary px-1.5 py-0.5 rounded font-mono text-foreground">
                    {incident.errorCode}
                  </code>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {incident.device.includes('iPhone') ? <Smartphone className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
                    <span className="text-[10px] font-medium">{incident.device}</span>
                    <Separator orientation="vertical" className="h-3" />
                    <span className="text-[10px] font-medium">{incident.channel}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-[10px] text-muted-foreground font-medium">{incident.timestamp}</span>
                </TableCell>
                <TableCell className="text-right">
                  <Sheet>
                    <SheetTrigger
                      render={
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      }
                    >
                      <ChevronRight className="w-4 h-4" />
                    </SheetTrigger>
                    <SheetContent className="w-[400px] sm:w-[540px]">
                      <SheetHeader className="mb-8">
                        <SheetTitle className="text-xl font-bold font-heading">Incident Details</SheetTitle>
                        <SheetDescription className="text-xs">
                          Deep dive into session <span className="font-mono font-bold text-foreground">{incident.sessionId}</span>
                        </SheetDescription>
                      </SheetHeader>
                      
                      <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">User ID</p>
                            <p className="text-sm font-bold flex items-center gap-2"><User className="w-3.5 h-3.5" /> {incident.userId}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Order ID</p>
                            <p className="text-sm font-bold flex items-center gap-2"><ShoppingBag className="w-3.5 h-3.5" /> {incident.orderId || 'N/A'}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Error Context</h4>
                          <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/10 space-y-3">
                            <div className="flex items-center gap-2 text-destructive">
                              <AlertCircle className="w-4 h-4" />
                              <span className="text-sm font-bold">{incident.errorMessage}</span>
                            </div>
                            <Separator className="bg-destructive/10" />
                            <div className="grid grid-cols-2 gap-4 text-[10px]">
                              <div>
                                <p className="text-muted-foreground font-bold uppercase mb-1">Error Code</p>
                                <p className="font-mono font-bold">{incident.errorCode}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground font-bold uppercase mb-1">Failed API</p>
                                <p className="font-bold">{incident.failedApi}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Journey Timeline</h4>
                          <div className="space-y-0 border-l-2 border-secondary ml-2 pl-6">
                            {[
                              { time: '14:22:01', event: 'Session Started', status: 'success' },
                              { time: '14:23:45', event: 'Added SKU: LINEN-SHIRT-WHT to Cart', status: 'success' },
                              { time: '14:24:10', event: 'Size Guide Viewed (L)', status: 'success' },
                              { time: '14:25:12', event: 'Entered Checkout', status: 'success' },
                              { time: '14:26:10', event: 'Payment Attempt Initiated', status: 'success' },
                              { time: '14:26:12', event: 'Payment Failed (UPI Timeout)', status: 'error' },
                            ].map((step, idx) => (
                              <div key={idx} className="relative pb-6 last:pb-0">
                                <div className={cn(
                                  "absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full border-2 border-background",
                                  step.status === 'success' ? "bg-green-500" : "bg-destructive"
                                )} />
                                <div className="flex items-center justify-between">
                                  <p className="text-xs font-bold">{step.event}</p>
                                  <span className="text-[10px] text-muted-foreground font-mono">{step.time}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <Button className="flex-1 gap-2 font-bold"><ExternalLink className="w-4 h-4" /> View Full Logs</Button>
                          <Button variant="outline" className="flex-1 gap-2 font-bold">Replay Session</Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
