import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  GitBranch, 
  Activity, 
  Users, 
  Settings,
  Menu,
  X,
  Bot,
  Zap
} from 'lucide-react';
import { Button } from './ui/button';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navigationItems = [
  { id: 'overview', label: 'Smart Overview', icon: LayoutDashboard },
  { id: 'workflow', label: 'Workflow Builder', icon: GitBranch },
  { id: 'tasks', label: 'Task Stream', icon: Activity },
  { id: 'analytics', label: 'Team Analytics', icon: Users },
  { id: 'settings', label: 'Settings & Billing', icon: Settings },
];

export function DashboardLayout({ children, currentPage, onPageChange }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-300"
          style={{
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.2))',
            boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.05)'
          }}
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 border-r border-border/50
        transform transition-transform duration-300 ease-in-out
        md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)'
      }}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="h-8 w-8 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full animate-pulse" 
                     style={{ animation: 'pulseGlow 2s ease-in-out infinite alternate' }}></div>
              </div>
              <div>
                <h1 className="text-lg text-primary" style={{ textShadow: '0 0 10px currentColor' }}>NeuroFlow</h1>
                <p className="text-xs text-muted-foreground">AI Automation Platform</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                    transition-all duration-200 group
                    ${isActive 
                      ? 'bg-primary/20 text-primary border border-primary shadow-lg' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/10'
                    }
                  `}
                  style={isActive ? {
                    boxShadow: '0 0 10px rgba(0, 212, 255, 0.3)'
                  } : {}}
                >
                  <IconComponent className={`h-5 w-5 ${isActive ? 'text-primary' : 'group-hover:text-accent'}`} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* AI Status */}
          <div className="p-4 border-t border-border/50">
            <div className="p-4 rounded-lg border border-border/50"
                 style={{
                   background: 'rgba(255, 255, 255, 0.05)',
                   backdropFilter: 'blur(16px)',
                   WebkitBackdropFilter: 'blur(16px)'
                 }}>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Zap className="h-5 w-5 text-secondary" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">AI Agent Active</p>
                  <p className="text-xs text-muted-foreground">Processing 24 workflows</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-64">
        <main className="min-h-screen p-4 md:p-6">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}