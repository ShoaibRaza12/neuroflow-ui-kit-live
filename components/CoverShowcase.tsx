import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  TrendingUp, 
  Zap, 
  Target, 
  Users, 
  Bot, 
  Sparkles,
  ArrowUpRight,
  Activity,
  CheckCircle,
  Clock,
  Star,
  User
} from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { FloatingCTA } from './ui/floating-cta';
import { StatusBadge, TaskStatus } from './ui/status-indicators';

export function CoverShowcase() {
  const [animatedValues, setAnimatedValues] = useState({
    efficiency: 0,
    tasks: 0,
    time: 0,
    ai: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues({
        efficiency: 94,
        tasks: 156,
        time: 234,
        ai: 98
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const keyMetrics = [
    { 
      label: "Workflow Efficiency", 
      value: animatedValues.efficiency, 
      suffix: "%", 
      icon: TrendingUp, 
      color: "text-green-400",
      change: "+23%"
    },
    { 
      label: "Tasks Automated", 
      value: animatedValues.tasks, 
      suffix: "", 
      icon: Zap, 
      color: "text-primary",
      change: "+47"
    },
    { 
      label: "Hours Saved", 
      value: animatedValues.time, 
      suffix: "h", 
      icon: Clock, 
      color: "text-secondary",
      change: "+89h"
    },
    { 
      label: "AI Accuracy", 
      value: animatedValues.ai, 
      suffix: "%", 
      icon: Bot, 
      color: "text-primary",
      change: "+5%"
    }
  ];

  const heatmapData = [
    { day: 'Mon', dayShort: 'M', values: [3, 7, 9, 8, 6] },
    { day: 'Tue', dayShort: 'T', values: [4, 8, 9, 9, 7] },
    { day: 'Wed', dayShort: 'W', values: [5, 9, 9, 8, 6] },
    { day: 'Thu', dayShort: 'T', values: [3, 7, 8, 9, 8] },
    { day: 'Fri', dayShort: 'F', values: [2, 6, 7, 6, 4] }
  ];

  const getHeatmapColor = (value: number) => {
    if (value >= 8) return 'bg-primary shadow-primary/60';
    if (value >= 6) return 'bg-primary/70 shadow-primary/40';
    if (value >= 4) return 'bg-primary/40 shadow-primary/20';
    if (value >= 2) return 'bg-primary/20 shadow-primary/10';
    return 'bg-muted/10';
  };

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)'
  };

  const heroGlowStyle = {
    background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
    boxShadow: '0 0 60px rgba(0, 212, 255, 0.3), 0 0 120px rgba(168, 85, 247, 0.2)'
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-8 h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Brain className="h-8 w-8 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  NeuroFlow UI Kit
                </h1>
                <p className="text-muted-foreground">Premium AI-Powered Dashboard Components</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <StatusBadge status="active" showLabel />
            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/50 animate-pulse">
              Live Demo
            </Badge>
          </div>
        </div>

        {/* Main Showcase Grid */}
        <div className="flex-1 grid grid-cols-12 gap-6">
          {/* Left Column - Hero Metrics */}
          <div className="col-span-8 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-4">
              {keyMetrics.map((metric, index) => {
                const IconComponent = metric.icon;
                return (
                  <Card 
                    key={`metric-${index}`}
                    className="p-6 border-border/50 text-center hover:scale-105 transition-all duration-500"
                    style={{
                      ...glassStyle,
                      animation: `slideInUp 0.8s ease-out ${index * 0.2}s both`
                    }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-center">
                        <div className="p-3 rounded-full bg-accent/10 border border-accent/20">
                          <IconComponent className={`h-6 w-6 ${metric.color}`} />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center space-x-1">
                          <span 
                            className={`text-3xl font-bold ${metric.color}`}
                            style={{ 
                              textShadow: '0 0 20px currentColor',
                              animation: `countUp 2s ease-out ${index * 0.3}s both`
                            }}
                          >
                            {metric.value}{metric.suffix}
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-green-400" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
                        <Badge variant="outline" className="text-green-400 border-green-500/50 bg-green-500/10 text-xs">
                          {metric.change}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Featured Component Showcase */}
            <div className="grid grid-cols-2 gap-6 flex-1">
              {/* Activity Heatmap */}
              <Card 
                className="p-6 border-border/50"
                style={{
                  ...glassStyle,
                  animation: 'slideInLeft 1s ease-out 0.5s both'
                }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <Activity className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Team Activity Heatmap</h3>
                  <Sparkles className="h-4 w-4 text-secondary animate-pulse" />
                </div>
                
                <div className="space-y-3">
                  {heatmapData.map((dayData, dayIndex) => (
                    <div key={dayData.day} className="flex items-center space-x-2">
                      <span className="w-4 text-xs text-muted-foreground font-medium">{dayData.dayShort}</span>
                      <div className="flex space-x-1 flex-1">
                        {dayData.values.map((value, index) => (
                          <div
                            key={`${dayData.day}-${index}`}
                            className={`h-4 rounded flex-1 transition-all duration-300 hover:scale-110 ${getHeatmapColor(value)}`}
                            style={{ 
                              animationDelay: `${(dayIndex * 5 + index) * 100 + 1000}ms`,
                              animation: 'fadeInScale 0.5s ease-out forwards'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-4 pt-3 border-t border-border/50">
                    <span>Less</span>
                    <div className="flex space-x-1">
                      {[2, 4, 6, 8, 9].map((value, index) => (
                        <div key={`legend-${index}`} className={`w-2 h-2 rounded ${getHeatmapColor(value)}`} />
                      ))}
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </Card>

              {/* AI Insights Panel */}
              <Card 
                className="p-6 border-border/50"
                style={{
                  ...glassStyle,
                  animation: 'slideInRight 1s ease-out 0.7s both'
                }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <Bot className="h-5 w-5 text-secondary animate-pulse" />
                  <h3 className="font-semibold">AI Insights</h3>
                  <div className="ml-auto">
                    <StatusBadge status="active" size="sm" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="h-4 w-4 text-green-400 mt-1" />
                      <div>
                        <p className="text-sm font-medium">Efficiency Up 23%</p>
                        <p className="text-xs text-muted-foreground">AI optimizations active</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                    <div className="flex items-start space-x-3">
                      <Zap className="h-4 w-4 text-secondary mt-1" />
                      <div>
                        <p className="text-sm font-medium">3 Tasks Auto-Queued</p>
                        <p className="text-xs text-muted-foreground">Ready for automation</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                    <div className="flex items-start space-x-3">
                      <Target className="h-4 w-4 text-primary mt-1" />
                      <div>
                        <p className="text-sm font-medium">Peak Hours: 2-4 PM</p>
                        <p className="text-xs text-muted-foreground">40% better performance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column - Task List & Status */}
          <div className="col-span-4 space-y-6">
            {/* Priority Tasks */}
            <Card 
              className="p-6 border-border/50 h-full"
              style={{
                ...glassStyle,
                animation: 'slideInRight 1s ease-out 0.3s both'
              }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <Users className="h-5 w-5 text-secondary" />
                <h3 className="font-semibold">Priority Tasks</h3>
                <Badge variant="outline" className="ml-auto bg-red-500/20 text-red-400 border-red-500/50">
                  4 urgent
                </Badge>
              </div>
              
              <div className="space-y-4">
                {[
                  { id: 'task-1', task: "API Security Audit", status: "in-progress" as const, progress: 75, user: "Alex" },
                  { id: 'task-2', task: "UI Component Update", status: "pending" as const, progress: 0, user: "Sarah" },
                  { id: 'task-3', task: "Database Migration", status: "completed" as const, progress: 100, user: "Mike" },
                  { id: 'task-4', task: "AI Model Training", status: "in-progress" as const, progress: 45, user: "AI Bot" }
                ].map((task, index) => (
                  <div 
                    key={task.id}
                    className="p-4 rounded-lg bg-accent/5 border border-accent/10 hover:bg-accent/10 transition-all duration-300"
                    style={{ 
                      animation: `slideInUp 0.6s ease-out ${index * 0.2 + 1.5}s both`
                    }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{task.task}</p>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                            <User className="h-3 w-3" />
                            <span>{task.user}</span>
                          </div>
                        </div>
                        <TaskStatus status={task.status} size="sm" showLabel={false} />
                      </div>
                      
                      {task.progress > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-2" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Brand Bar */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/50">
              <Sparkles className="h-3 w-3 mr-1" />
              Glass Morphism
            </Badge>
            <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/50">
              <Zap className="h-3 w-3 mr-1" />
              Neumorphic Design
            </Badge>
            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/50">
              <Star className="h-3 w-3 mr-1" />
              Premium Components
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <span className="text-primary font-medium">React</span>
            <span>+</span>
            <span className="text-secondary font-medium">Tailwind</span>
            <span>+</span>
            <span className="text-primary font-medium">TypeScript</span>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <FloatingCTA 
        variant="ai"
        size="lg"
        position="bottom-right"
        label="Try NeuroFlow"
      />

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes countUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}