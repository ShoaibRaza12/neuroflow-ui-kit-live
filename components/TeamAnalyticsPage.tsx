import React from 'react';
import { 
  Users, 
  TrendingUp, 
  Heart, 
  Battery, 
  Clock, 
  Target,
  AlertTriangle,
  Smile,
  Meh,
  Frown
} from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export function TeamAnalyticsPage() {
  const performanceData = [
    { month: 'Jan', efficiency: 78, satisfaction: 82, burnout: 15 },
    { month: 'Feb', efficiency: 82, satisfaction: 85, burnout: 12 },
    { month: 'Mar', efficiency: 85, satisfaction: 88, burnout: 10 },
    { month: 'Apr', efficiency: 88, satisfaction: 87, burnout: 8 },
    { month: 'May', efficiency: 91, satisfaction: 90, burnout: 6 },
    { month: 'Jun', efficiency: 94, satisfaction: 92, burnout: 5 },
  ];

  const teamMembers = [
    {
      name: 'Sarah Chen',
      role: 'Frontend Developer',
      efficiency: 94,
      burnoutRisk: 'low',
      mood: 'happy',
      tasksCompleted: 23,
      hoursWorked: 42,
      avatar: 'SC'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Backend Engineer',
      efficiency: 87,
      burnoutRisk: 'medium',
      mood: 'neutral',
      tasksCompleted: 19,
      hoursWorked: 45,
      avatar: 'MR'
    },
    {
      name: 'Alex Thompson',
      role: 'DevOps Engineer',
      efficiency: 91,
      burnoutRisk: 'low',
      mood: 'happy',
      tasksCompleted: 15,
      hoursWorked: 38,
      avatar: 'AT'
    },
    {
      name: 'Emma Davis',
      role: 'UI/UX Designer',
      efficiency: 96,
      burnoutRisk: 'low',
      mood: 'happy',
      tasksCompleted: 21,
      hoursWorked: 40,
      avatar: 'ED'
    },
    {
      name: 'James Wilson',
      role: 'Product Manager',
      efficiency: 83,
      burnoutRisk: 'high',
      mood: 'stressed',
      tasksCompleted: 17,
      hoursWorked: 52,
      avatar: 'JW'
    }
  ];

  const moodDistribution = [
    { name: 'Happy', value: 3, color: '#10b981' },
    { name: 'Neutral', value: 1, color: '#f59e0b' },
    { name: 'Stressed', value: 1, color: '#ef4444' }
  ];

  const getBurnoutColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-muted/20 text-muted-foreground border-muted/50';
    }
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return <Smile className="h-4 w-4 text-green-400" />;
      case 'neutral': return <Meh className="h-4 w-4 text-yellow-400" />;
      case 'stressed': return <Frown className="h-4 w-4 text-red-400" />;
      default: return <Meh className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const glassCardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl" style={{ textShadow: '0 0 10px currentColor' }}>Team Analytics</h1>
          <p className="text-muted-foreground mt-1">Performance insights and wellness monitoring</p>
        </div>
        <div className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-red-400" />
          <span className="text-sm text-muted-foreground">Wellness Score: 87%</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Team Efficiency", value: "91%", change: "+3%", icon: TrendingUp, color: "text-green-400" },
          { label: "Average Satisfaction", value: "4.6/5", change: "+0.2", icon: Smile, color: "text-primary" },
          { label: "Burnout Risk", value: "Low", change: "-15%", icon: Battery, color: "text-green-400" },
          { label: "Active Members", value: "5", change: "0", icon: Users, color: "text-secondary" }
        ].map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="p-6 border-border/50" style={glassCardStyle}>
              <div className="flex items-center justify-between mb-4">
                <IconComponent className={`h-6 w-6 ${metric.color}`} />
                <Badge variant="outline" className="text-green-400 border-green-500/50 bg-green-500/10">
                  {metric.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold text-primary" style={{ textShadow: '0 0 10px currentColor' }}>{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Efficiency Trend */}
        <Card className="p-6 border-border/50" style={glassCardStyle}>
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-xl">Team Performance Trend</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(26, 27, 46, 0.9)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="efficiency" stroke="#00d4ff" strokeWidth={3} dot={{ fill: '#00d4ff', strokeWidth: 2 }} />
              <Line type="monotone" dataKey="satisfaction" stroke="#a855f7" strokeWidth={3} dot={{ fill: '#a855f7', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Mood Distribution */}
        <Card className="p-6 border-border/50" style={glassCardStyle}>
          <div className="flex items-center space-x-2 mb-6">
            <Heart className="h-5 w-5 text-red-400" />
            <h2 className="text-xl">Team Mood Distribution</h2>
          </div>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={moodDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {moodDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {moodDistribution.map((mood) => (
              <div key={mood.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: mood.color }} />
                <span className="text-sm">{mood.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Team Members */}
      <Card className="p-6 border-border/50" style={glassCardStyle}>
        <div className="flex items-center space-x-2 mb-6">
          <Users className="h-5 w-5 text-secondary" />
          <h2 className="text-xl">Individual Performance</h2>
        </div>
        
        <div className="space-y-4">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex items-center justify-between p-4 rounded-lg bg-accent/5 border border-accent/10 hover:bg-accent/10 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  {member.avatar}
                </div>
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                {/* Efficiency */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Efficiency</p>
                  <p className="font-semibold text-primary">{member.efficiency}%</p>
                </div>
                
                {/* Tasks */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Tasks</p>
                  <p className="font-semibold">{member.tasksCompleted}</p>
                </div>
                
                {/* Hours */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Hours</p>
                  <p className="font-semibold">{member.hoursWorked}h</p>
                </div>
                
                {/* Mood */}
                <div className="flex items-center space-x-2">
                  {getMoodIcon(member.mood)}
                  <span className="text-sm capitalize">{member.mood}</span>
                </div>
                
                {/* Burnout Risk */}
                <Badge variant="outline" className={getBurnoutColor(member.burnoutRisk)}>
                  {member.burnoutRisk} risk
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Burnout Detection */}
      <Card className="p-6 border-border/50" style={glassCardStyle}>
        <div className="flex items-center space-x-2 mb-6">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
          <h2 className="text-xl">Burnout Detection & Recommendations</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-red-400">High Risk Alert</h3>
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-semibold text-sm">
                  JW
                </div>
                <div>
                  <p className="font-medium">James Wilson</p>
                  <p className="text-sm text-muted-foreground">52 hours this week (+30% above average)</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Workload</span>
                  <span className="text-red-400">130%</span>
                </div>
                <Progress value={130} className="h-2" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-primary">AI Recommendations</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-border/50" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}>
                <p className="text-sm font-medium mb-1">Redistribute Tasks</p>
                <p className="text-xs text-muted-foreground">Move 3 non-critical tasks to other team members</p>
              </div>
              <div className="p-3 rounded-lg border border-border/50" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}>
                <p className="text-sm font-medium mb-1">Schedule Break</p>
                <p className="text-xs text-muted-foreground">Suggest 2-day wellness break next week</p>
              </div>
              <div className="p-3 rounded-lg border border-border/50" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}>
                <p className="text-sm font-medium mb-1">Automate Workflows</p>
                <p className="text-xs text-muted-foreground">Identify 5 repetitive tasks for automation</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}