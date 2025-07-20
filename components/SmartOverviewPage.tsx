import React, { useState } from 'react';
import { 
  Brain, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Zap,
  Users,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Sparkles
} from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { FloatingCTA } from './ui/floating-cta';
import { EnhancedTooltip } from './ui/enhanced-tooltip';
import { StatusBadge, TaskStatus, SystemStatus } from './ui/status-indicators';
import { LoadingCard } from './ui/loading-states';

export function SmartOverviewPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const insights = [
    {
      title: "Workflow Efficiency Up 23%",
      description: "AI optimizations reduced task completion time",
      icon: TrendingUp,
      color: "text-green-400",
      trend: "up",
      value: "23%",
      change: "+5% from last week"
    },
    {
      title: "Peak Productivity: 2-4 PM",
      description: "Team performs 40% better during this window",
      icon: Clock,
      color: "text-primary",
      trend: "up",
      value: "40%",
      change: "+12% improvement"
    },
    {
      title: "Automation Opportunity",
      description: "3 manual tasks can be automated this week",
      icon: Zap,
      color: "text-secondary",
      trend: "neutral",
      value: "3",
      change: "2 tasks queued"
    }
  ];

  const priorityMatrix = [
    { 
      task: "Client Onboarding Redesign", 
      priority: "high", 
      effort: "high", 
      status: "in-progress",
      assignee: "Sarah Chen",
      dueDate: "Today",
      progress: 65
    },
    { 
      task: "API Performance Optimization", 
      priority: "high", 
      effort: "medium", 
      status: "pending",
      assignee: "Mike Rodriguez",
      dueDate: "Tomorrow",
      progress: 0
    },
    { 
      task: "Documentation Update", 
      priority: "medium", 
      effort: "low", 
      status: "completed",
      assignee: "Emma Davis",
      dueDate: "Completed",
      progress: 100
    },
    { 
      task: "UI Component Library", 
      priority: "medium", 
      effort: "high", 
      status: "in-progress",
      assignee: "Alex Thompson",
      dueDate: "Next Week",
      progress: 30
    }
  ];

  const heatmapData = [
    { day: 'Mon', hours: [2, 4, 6, 8, 9, 8, 6, 4] },
    { day: 'Tue', hours: [3, 5, 7, 9, 8, 7, 5, 3] },
    { day: 'Wed', hours: [4, 6, 8, 9, 9, 8, 6, 4] },
    { day: 'Thu', hours: [3, 5, 7, 8, 9, 8, 6, 4] },
    { day: 'Fri', hours: [2, 4, 6, 7, 8, 6, 4, 2] },
  ];

  const systemMetrics = [
    { label: "AI Engine", type: "ai" as const, status: "good" as const, value: 98 },
    { label: "Database", type: "sync" as const, status: "good" as const, value: 95 },
    { label: "API Health", type: "connection" as const, status: "warning" as const, value: 87 },
  ];

  const getIntensityColor = (value: number) => {
    if (value >= 8) return 'bg-primary shadow-primary/50';
    if (value >= 6) return 'bg-primary/70 shadow-primary/30';
    if (value >= 4) return 'bg-primary/40 shadow-primary/20';
    if (value >= 2) return 'bg-primary/20 shadow-primary/10';
    return 'bg-muted/20';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/50';
      default: return 'bg-muted/20 text-muted-foreground border-muted/50';
    }
  };

  const glassCardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)'
  };

  const floatingAnimation = {
    animation: 'float 6s ease-in-out infinite'
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header with Real-time Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-3xl" style={{ textShadow: '0 0 10px currentColor' }}>
              Smart Overview
            </h1>
            <p className="text-muted-foreground mt-1">AI-powered insights for your workspace</p>
          </div>
          <StatusBadge status="active" showLabel />
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex space-x-3">
            {systemMetrics.map((metric, index) => (
              <EnhancedTooltip
                key={index}
                content={`${metric.label}: ${metric.value}% healthy`}
                variant={metric.status === 'good' ? 'success' : 'warning'}
              >
                <div>
                  <SystemStatus {...metric} />
                </div>
              </EnhancedTooltip>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-secondary animate-pulse" />
            <span className="text-sm text-secondary">Neural Engine Active</span>
          </div>
        </div>
      </div>

      {/* Enhanced AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => {
          const IconComponent = insight.icon;
          const TrendIcon = insight.trend === 'up' ? ArrowUpRight : ArrowDownRight;
          
          return (
            <Card 
              key={index} 
              className={`p-6 border-border/50 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 ${
                selectedMetric === insight.title ? 'ring-2 ring-primary/50' : ''
              }`}
              style={{ ...glassCardStyle, ...floatingAnimation }}
              onClick={() => setSelectedMetric(selectedMetric === insight.title ? null : insight.title)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                  <IconComponent className={`h-6 w-6 ${insight.color}`} />
                </div>
                <div className="flex items-center space-x-1">
                  <TrendIcon className={`h-4 w-4 ${insight.color}`} />
                  <span className={`text-lg font-bold ${insight.color}`}>{insight.value}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold">{insight.title}</h3>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs bg-green-500/10 text-green-400 border-green-500/50">
                    {insight.change}
                  </Badge>
                  <Sparkles className="h-3 w-3 text-secondary" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Activity Heatmap */}
        <Card className="lg:col-span-2 p-6 border-border/50" style={glassCardStyle}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <h2 className="text-xl">Team Activity Heatmap</h2>
            </div>
            <EnhancedTooltip content="Shows team activity levels throughout the day">
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </EnhancedTooltip>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>9 AM</span>
              <span>12 PM</span>
              <span>3 PM</span>
              <span>6 PM</span>
            </div>
            
            {heatmapData.map((day, dayIndex) => (
              <div key={day.day} className="flex items-center space-x-2">
                <span className="w-12 text-sm text-muted-foreground font-medium">{day.day}</span>
                <div className="flex space-x-1 flex-1">
                  {day.hours.map((value, index) => (
                    <EnhancedTooltip
                      key={index}
                      content={`${value}/10 activity level at ${9 + index * 2}:00`}
                      variant="info"
                    >
                      <div
                        className={`h-4 rounded flex-1 transition-all duration-200 hover:scale-110 cursor-pointer ${getIntensityColor(value)}`}
                        style={{ 
                          animationDelay: `${(dayIndex * 8 + index) * 50}ms`,
                          animation: 'fadeIn 0.5s ease-out forwards'
                        }}
                      />
                    </EnhancedTooltip>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-4 pt-4 border-t border-border/50">
              <span>Less Active</span>
              <div className="flex space-x-1">
                {[1, 3, 5, 7, 9].map((value) => (
                  <div key={value} className={`w-3 h-3 rounded ${getIntensityColor(value)}`} />
                ))}
              </div>
              <span>More Active</span>
            </div>
          </div>
        </Card>

        {/* Enhanced Task Priority Matrix */}
        <Card className="p-6 border-border/50" style={glassCardStyle}>
          <div className="flex items-center space-x-2 mb-6">
            <Users className="h-5 w-5 text-secondary" />
            <h2 className="text-xl">Priority Tasks</h2>
          </div>
          
          <div className="space-y-4">
            {priorityMatrix.map((task, index) => (
              <div key={index} className="p-4 rounded-lg bg-accent/5 border border-accent/10 hover:bg-accent/10 transition-all duration-200 hover:scale-[1.02]">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium mb-1">{task.task}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{task.assignee}</span>
                        <span>•</span>
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                    <TaskStatus status={task.status} size="sm" showLabel={false} />
                  </div>
                  
                  {task.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    <Badge variant="outline" className={getPriorityColor(task.priority)}>
                      {task.priority} priority
                    </Badge>
                    <Badge variant="outline" className="text-muted-foreground">
                      {task.effort} effort
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Enhanced Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Workflows Automated", value: "47", change: "+12%", trend: "up" },
          { label: "Time Saved", value: "23.4h", change: "+8%", trend: "up" },
          { label: "Team Efficiency", value: "94%", change: "+15%", trend: "up" },
          { label: "AI Suggestions", value: "156", change: "+23%", trend: "up" }
        ].map((metric, index) => (
          <Card 
            key={index} 
            className="p-6 border-border/50 hover:border-primary/50 transition-all duration-200 group cursor-pointer"
            style={glassCardStyle}
          >
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center space-x-2">
                <p className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform duration-200" 
                   style={{ textShadow: '0 0 10px currentColor' }}>
                  {metric.value}
                </p>
                <ArrowUpRight className="h-4 w-4 text-green-400" />
              </div>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <Badge variant="outline" className="text-green-400 border-green-500/50 bg-green-500/10">
                {metric.change}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Floating Action Button */}
      <FloatingCTA 
        variant="ai"
        label="AI Assistant"
        onClick={() => {/* Handle AI assistant */}}
      />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}