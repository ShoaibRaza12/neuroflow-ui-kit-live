import React, { useState } from 'react';
import { 
  Settings, 
  CreditCard, 
  Zap, 
  Crown, 
  Rocket, 
  Shield, 
  Bell, 
  Moon, 
  Globe, 
  Lock,
  Check,
  Star
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

export function SettingsBillingPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);

  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: 'per month',
      description: 'Perfect for small teams getting started',
      icon: Zap,
      color: 'text-green-400',
      borderColor: 'border-green-500/50',
      bgColor: 'bg-green-500/10',
      current: false,
      features: [
        '5 team members',
        '50 workflows per month',
        'Basic AI automation',
        'Email support',
        '10GB storage'
      ]
    },
    {
      name: 'Professional',
      price: '$79',
      period: 'per month',
      description: 'Advanced features for growing teams',
      icon: Crown,
      color: 'text-primary',
      borderColor: 'border-primary/50',
      bgColor: 'bg-primary/10',
      current: true,
      features: [
        '25 team members',
        'Unlimited workflows',
        'Advanced AI automation',
        'Priority support',
        '100GB storage',
        'Custom integrations',
        'Analytics dashboard'
      ]
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: 'per month',
      description: 'Full power for large organizations',
      icon: Rocket,
      color: 'text-secondary',
      borderColor: 'border-secondary/50',
      bgColor: 'bg-secondary/10',
      current: false,
      features: [
        'Unlimited team members',
        'Unlimited workflows',
        'Enterprise AI features',
        '24/7 dedicated support',
        '1TB storage',
        'Custom integrations',
        'Advanced analytics',
        'SSO & compliance',
        'Custom branding'
      ]
    }
  ];

  const settings = [
    {
      category: 'General',
      icon: Settings,
      items: [
        { 
          label: 'Dark Mode', 
          description: 'Use dark theme across the application',
          state: darkMode,
          setState: setDarkMode
        },
        { 
          label: 'Auto-save', 
          description: 'Automatically save your work every 30 seconds',
          state: autoSave,
          setState: setAutoSave
        }
      ]
    },
    {
      category: 'Notifications',
      icon: Bell,
      items: [
        { 
          label: 'Push Notifications', 
          description: 'Receive notifications about task updates',
          state: notifications,
          setState: setNotifications
        }
      ]
    },
    {
      category: 'AI & Automation',
      icon: Zap,
      items: [
        { 
          label: 'AI Suggestions', 
          description: 'Get smart recommendations for workflow optimization',
          state: aiSuggestions,
          setState: setAiSuggestions
        }
      ]
    }
  ];

  const usage = {
    workflows: { used: 847, limit: 1000, label: 'Workflows this month' },
    storage: { used: 67, limit: 100, label: 'Storage (GB)' },
    teamMembers: { used: 18, limit: 25, label: 'Team members' }
  };

  const glassCardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)'
  };

  const neuroButtonStyle = {
    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.2))',
    boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl" style={{ textShadow: '0 0 10px currentColor' }}>Settings & Billing</h1>
          <p className="text-muted-foreground mt-1">Manage your account and subscription</p>
        </div>
        <Badge variant="outline" className="text-primary border-primary/50 bg-primary/10">
          Professional Plan
        </Badge>
      </div>

      {/* Usage Overview */}
      <Card className="p-6 border-border/50" style={glassCardStyle}>
        <div className="flex items-center space-x-2 mb-6">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="text-xl">Current Usage</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(usage).map(([key, data]) => (
            <div key={key} className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{data.label}</span>
                <span className="text-sm text-muted-foreground">
                  {data.used} / {data.limit}
                </span>
              </div>
              <Progress 
                value={(data.used / data.limit) * 100} 
                className="h-3"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{((data.used / data.limit) * 100).toFixed(1)}% used</span>
                <span>{data.limit - data.used} remaining</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Settings Panel */}
        <div className="space-y-6">
          <Card className="p-6 border-border/50" style={glassCardStyle}>
            <div className="flex items-center space-x-2 mb-6">
              <Settings className="h-5 w-5 text-secondary" />
              <h2 className="text-xl">Application Settings</h2>
            </div>
            
            <div className="space-y-6">
              {settings.map((category) => {
                const IconComponent = category.icon;
                return (
                  <div key={category.category}>
                    <div className="flex items-center space-x-2 mb-4">
                      <IconComponent className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-semibold">{category.category}</h3>
                    </div>
                    
                    <div className="space-y-4 ml-6">
                      {category.items.map((item) => (
                        <div key={item.label} className="flex items-center justify-between p-4 rounded-lg bg-accent/5 border border-accent/10">
                          <div className="flex-1">
                            <p className="font-medium">{item.label}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                          <Switch
                            checked={item.state}
                            onCheckedChange={item.setState}
                            className="data-[state=checked]:bg-primary"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Billing Panel */}
        <div className="space-y-6">
          <Card className="p-6 border-border/50" style={glassCardStyle}>
            <div className="flex items-center space-x-2 mb-6">
              <CreditCard className="h-5 w-5 text-green-400" />
              <h2 className="text-xl">Billing Information</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 rounded-lg bg-accent/5 border border-accent/10">
                <div>
                  <p className="font-medium">Next billing date</p>
                  <p className="text-sm text-muted-foreground">February 15, 2024</p>
                </div>
                <p className="text-xl font-bold text-primary">$79.00</p>
              </div>
              
              <div className="flex justify-between items-center p-4 rounded-lg bg-accent/5 border border-accent/10">
                <div>
                  <p className="font-medium">Payment method</p>
                  <p className="text-sm text-muted-foreground">•••• •••• •••• 4532</p>
                </div>
                <Button variant="outline" size="sm" style={neuroButtonStyle}>
                  Update
                </Button>
              </div>
              
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <CreditCard className="h-4 w-4 mr-2" />
                Manage Billing
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Subscription Plans */}
      <Card className="p-6 border-border/50" style={glassCardStyle}>
        <div className="flex items-center space-x-2 mb-6">
          <Star className="h-5 w-5 text-yellow-400" />
          <h2 className="text-xl">Subscription Plans</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={plan.name} 
                className={`
                  relative p-6 transition-all duration-300 hover:scale-105
                  ${plan.current 
                    ? `${plan.borderColor} ${plan.bgColor} ring-2 ring-primary/20` 
                    : 'border-border/50 hover:border-primary/30'
                  }
                `}
                style={glassCardStyle}
              >
                {plan.current && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1">
                      Current Plan
                    </Badge>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className={`inline-flex p-3 rounded-full ${plan.bgColor} border ${plan.borderColor} mb-4`}>
                    <IconComponent className={`h-6 w-6 ${plan.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold" style={{ textShadow: '0 0 10px currentColor' }}>{plan.price}</p>
                    <p className="text-sm text-muted-foreground">{plan.period}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full ${
                    plan.current 
                      ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                      : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  }`}
                  disabled={plan.current}
                >
                  {plan.current ? 'Current Plan' : 'Upgrade'}
                </Button>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
}