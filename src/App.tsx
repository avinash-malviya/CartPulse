import { DemoProvider, useDemo } from './context/DemoContext';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster } from './components/ui/sonner';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { PageContainer } from './components/layout/PageContainer';

// Pages
import { Overview } from './components/pages/Overview';
import { PurchaseFunnel } from './components/pages/PurchaseFunnel';
import { OrderJourney } from './components/pages/OrderJourney';
import { ApiHealth } from './components/pages/ApiHealth';
import { ChannelIntelligence } from './components/pages/ChannelIntelligence';
import { AlertCenter } from './components/pages/AlertCenter';
import { Troubleshooting } from './components/pages/Troubleshooting';
import { DemoControl } from './components/pages/DemoControl';

function AppContent() {
  const { currentPage } = useDemo();

  const renderPage = () => {
    switch (currentPage) {
      case 'overview': return <Overview />;
      case 'funnel': return <PurchaseFunnel />;
      case 'journey': return <OrderJourney />;
      case 'api-health': return <ApiHealth />;
      case 'channels': return <ChannelIntelligence />;
      case 'alerts': return <AlertCenter />;
      case 'troubleshooting': return <Troubleshooting />;
      case 'demo-control': return <DemoControl />;
      default: return <Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <PageContainer>
          {renderPage()}
        </PageContainer>
      </div>
      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
}

export default function App() {
  return (
    <DemoProvider>
      <TooltipProvider>
        <AppContent />
      </TooltipProvider>
    </DemoProvider>
  );
}
