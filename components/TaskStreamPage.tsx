import React, { useState } from 'react';
import { 
  MessageSquare, 
  Filter, 
  Search, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Bot,
  Send,
  Tag,
  Calendar,
  Priority,
  Zap,
  ArrowUpRight,
  Sparkles,
  MoreVertical,
  Pin
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { FloatingCTA } from './ui/floating-cta';
import { EnhancedTooltip } from './ui/enhanced-tooltip';
import { ModernDropdown } from './ui/modern-dropdown';
import { StatusBadge, TaskStatus, NotificationBadge } from './ui/status-indicators';
import { LoadingButton } from './ui/loading-states';

export function TaskStreamPage() {
  const [chatMessage, setChatMessage] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [pinnedEvents, setPinnedEvents] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState('all');

  const taskEvents = [
    {
      id: 1,
      type: 'task_created',
      title: 'New task: Update API documentation',
      user: 'Sarah Chen',
      time: '2 minutes ago',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      status: 'pending',
      tags: ['documentation', 'api', 'high-priority'],
      description: 'Comprehensive update needed for v2.0 API endpoints',
      priority: 'high',
      estimated: '4 hours'
    },
    {
      id: 2,
      type: 'task_completed',
      title: 'Design review completed',
      user: 'Mike Rodriguez',
      time: '5 minutes ago',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: 'completed',
      tags: ['design', 'review', 'ui/ux'],
      description: 'All mockups approved by stakeholders',
      priority: 'medium',
      estimated: '2 hours'
    },
    {
      id: 3,
      type: 'task_updated',
      title: 'Database migration progress',
      user: 'AI Assistant',
      time: '8 minutes ago',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      status: 'in-progress',
      tags: ['database', 'migration', 'automated'],
      description: 'Progress: 67% complete, ETA: 15 minutes',
      priority: 'high',
      estimated: '1 hour',
      progress: 67
    },
    {
      id: 4,
      type: 'task_assigned',
      title: 'Security audit assigned to team',
      user: 'Alex Thompson',
      time: '12 minutes ago',
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      status: 'pending',
      tags: ['security', 'audit', 'compliance'],
      description: 'Quarterly security review scheduled',
      priority: 'high',
      estimated: '8 hours'
    }
  ];

  const chatHistory = [
    {
      id: 1,
      type: 'user',
      message: 'What tasks are overdue?',
      time: '10:30 AM',
      timestamp: new Date()
    },
    {
      id: 2,
      type: 'ai',
      message: 'I found 2 overdue tasks: "Client onboarding workflow" (due yesterday) and "Security patch deployment" (due 2 days ago). Would you like me to prioritize these or reassign them?',
      time: '10:30 AM',
      timestamp: new Date(),
      suggestions: ['Prioritize tasks', 'Reassign tasks', 'Show details']
    },
    {
      id: 3,
      type: 'user',
      message: 'Please create a high-priority task for the security patch',
      time: '10:32 AM',
      timestamp: new Date()
    },
    {
      id: 4,
      type: 'ai',
      message: 'Task created: "Emergency Security Patch Deployment" with high priority. I\'ve assigned it to the DevOps team and set the deadline for today at 6 PM. I\'ve also created a workflow to automate the deployment process.',
      time: '10:32 AM',
      timestamp: new Date(),
      actions: [
        { label: 'View Task', action: 'view_task' },
        { label: 'Edit Workflow', action: 'edit_workflow' }
      ]
    }
  ];

  const availableTags = [
    'high-priority', 'documentation', 'api', 'design', 'review', 'ui/ux', 
    'database', 'migration', 'automated', 'security', 'audit', 'compliance',
    'deployment', 'automation', 'ci/cd', 'frontend', 'backend', 'testing'
  ];

  const filterOptions = [
    { value: 'all', label: 'All Events', icon: <Calendar className="w-4 h-4" /> },
    { value: 'today', label: 'Today', icon: <Clock className="w-4 h-4" /> },
    { value: 'assigned', label: 'Assigned to Me', icon: <User className="w-4 h-4" /> },
    { value: 'high-priority', label: 'High Priority', icon: <AlertCircle className="w-4 h-4" /> }
  ];

  const getEventIcon = (type: string, isAi?: boolean) => {
    const iconClass = "h-4 w-4";
    switch (type) {
      case 'task_created': return <AlertCircle className={`${iconClass} text-yellow-400`} />;
      case 'task_completed': return <CheckCircle className={`${iconClass} text-green-400`} />;
      case 'task_updated': return <Clock className={`${iconClass} text-primary`} />;
      case 'task_assigned': return <User className={`${iconClass} text-secondary`} />;
      case 'task_automated': return <Bot className={`${iconClass} text-purple-400`} />;
      default: return <AlertCircle className={`${iconClass} text-muted-foreground`} />;
    }
  };

  const togglePin = (eventId: number) => {
    setPinnedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;
    
    setIsAiTyping(true);
    // Simulate AI response delay
    setTimeout(() => {
      setIsAiTyping(false);
    }, 2000);
    
    setChatMessage('');
  };

  const filteredEvents = taskEvents.filter(event => {
    const matchesView = viewMode === 'all' || 
      (viewMode === 'today' && event.timestamp > new Date(Date.now() - 24 * 60 * 60 * 1000)) ||
      (viewMode === 'high-priority' && event.priority === 'high');
    
    const matchesTags = selectedTags.length === 0 || 
      event.tags.some(tag => selectedTags.includes(tag));
    
    return matchesView && matchesTags;
  });

  const glassCardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)'
  };

  return (
    <div className="h-full flex gap-6">
      {/* Enhanced Task Stream */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-3xl" style={{ textShadow: '0 0 10px currentColor' }}>Task Stream</h1>
              <p className="text-muted-foreground mt-1">Real-time task events and updates</p>
            </div>
            <div className="relative">
              <StatusBadge status="active" showLabel />
              <NotificationBadge count={filteredEvents.length} />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input placeholder="Search events..." className="pl-10 w-64 bg-input/50" />
            </div>
            <ModernDropdown
              options={filterOptions}
              placeholder="Filter events"
              onSelect={setViewMode}
              value={viewMode}
              variant="glass"
            />
          </div>
        </div>

        {/* Enhanced Tag Filters */}
        <Card className="p-4 border-border/50" style={glassCardStyle}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4 text-primary" />
              <span className="font-medium">Filter by Tags</span>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/50">
              {selectedTags.length} selected
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                  selectedTags.includes(tag)
                    ? 'bg-primary/20 text-primary border-primary/50 shadow-primary/20 shadow-md'
                    : 'hover:bg-accent/10 hover:border-accent/50'
                }`}
                onClick={() => {
                  setSelectedTags(prev => 
                    prev.includes(tag) 
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  );
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedTags([])}
              className="mt-3 text-muted-foreground hover:text-primary"
            >
              Clear all filters ({selectedTags.length})
            </Button>
          )}
        </Card>

        {/* Enhanced Event Stream */}
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <Card 
              key={event.id} 
              className={`p-6 border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-[1.01] group ${
                pinnedEvents.includes(event.id) ? 'ring-2 ring-primary/50' : ''
              }`} 
              style={glassCardStyle}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-colors">
                  {getEventIcon(event.type, event.user === 'AI Assistant')}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{event.title}</h3>
                        {event.priority === 'high' && (
                          <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/50 animate-pulse">
                            urgent
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <EnhancedTooltip content={pinnedEvents.includes(event.id) ? "Unpin event" : "Pin event"}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePin(event.id)}
                          className={pinnedEvents.includes(event.id) ? 'text-primary' : 'text-muted-foreground'}
                        >
                          <Pin className="h-4 w-4" />
                        </Button>
                      </EnhancedTooltip>
                      <TaskStatus status={event.status} size="sm" />
                      <span className="text-xs text-muted-foreground">{event.time}</span>
                    </div>
                  </div>
                  
                  {event.progress && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{event.progress}%</span>
                      </div>
                      <div className="w-full bg-muted/20 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${event.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{event.user}</span>
                      </div>
                      {event.estimated && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{event.estimated}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {event.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          
          {filteredEvents.length === 0 && (
            <Card className="p-12 border-border/50 text-center" style={glassCardStyle}>
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-muted/20 flex items-center justify-center">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">No events found</h3>
                  <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Enhanced AI Chat Assistant */}
      <div className="w-96">
        <Card className="h-full border-border/50 flex flex-col" style={glassCardStyle}>
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bot className="h-6 w-6 text-secondary" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h2 className="font-semibold">AI Assistant</h2>
                  <p className="text-xs text-muted-foreground">
                    {isAiTyping ? 'Thinking...' : 'Always ready to help'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <StatusBadge status="online" size="sm" />
                <EnhancedTooltip content="AI settings">
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </EnhancedTooltip>
              </div>
            </div>
          </div>

          {/* Enhanced Chat History */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {chatHistory.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[85%] p-3 rounded-lg transition-all duration-200 hover:scale-[1.02]
                  ${message.type === 'user' 
                    ? 'bg-primary text-primary-foreground shadow-primary/20 shadow-md' 
                    : 'border border-border/50'
                  }
                `}
                style={message.type === 'ai' ? {
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)'
                } : {}}>
                  <p className="text-sm leading-relaxed">{message.message}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs opacity-70">{message.time}</p>
                    {message.type === 'ai' && (
                      <Sparkles className="h-3 w-3 opacity-60" />
                    )}
                  </div>
                  
                  {message.suggestions && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs text-muted-foreground hover:text-primary border border-border/50 hover:border-primary/50"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  {message.actions && (
                    <div className="flex space-x-2 mt-3">
                      {message.actions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="h-7 px-3 text-xs"
                        >
                          {action.label}
                          <ArrowUpRight className="h-3 w-3 ml-1" />
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isAiTyping && (
              <div className="flex justify-start">
                <div 
                  className="p-3 rounded-lg border border-border/50"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)'
                  }}
                >
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Chat Input */}
          <div className="p-4 border-t border-border/50">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Ask me anything..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 bg-input/50"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <LoadingButton
                isLoading={isAiTyping}
                onClick={handleSendMessage}
                variant="primary"
                size="sm"
                className="px-4"
              >
                <Send className="h-4 w-4" />
              </LoadingButton>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-3">
              {['Show overdue tasks', 'Create workflow', 'Team performance', 'Analyze trends'].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="ghost"
                  size="sm"
                  className="text-xs h-6 px-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
                  onClick={() => setChatMessage(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Floating CTAs */}
      <FloatingCTA 
        variant="primary"
        label="New Task"
        position="bottom-right"
        onClick={() => {/* Handle new task */}}
      />
      <FloatingCTA 
        variant="chat"
        label="Quick Chat"
        position="bottom-left"
        onClick={() => {/* Handle quick chat */}}
      />
    </div>
  );
}