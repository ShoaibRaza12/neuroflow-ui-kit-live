import React, { useState } from 'react';
import { 
  Plus, 
  Play, 
  Save, 
  GitBranch, 
  Zap, 
  Database, 
  Mail, 
  Webhook,
  MessageSquare,
  Clock,
  Filter,
  Sparkles
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function WorkflowBuilderPage() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const workflowNodes = [
    { id: 'trigger', type: 'trigger', x: 100, y: 200, title: 'Form Submitted', icon: Webhook },
    { id: 'condition', type: 'condition', x: 300, y: 200, title: 'Priority Check', icon: Filter },
    { id: 'action1', type: 'action', x: 500, y: 150, title: 'Send Email', icon: Mail },
    { id: 'action2', type: 'action', x: 500, y: 250, title: 'Create Task', icon: Plus },
  ];

  const nodeTypes = [
    { type: 'trigger', label: 'Triggers', icon: Zap, color: 'text-green-400', items: [
      'Form Submission', 'Schedule', 'Webhook', 'File Upload'
    ]},
    { type: 'condition', label: 'Conditions', icon: Filter, color: 'text-yellow-400', items: [
      'If/Then', 'Data Filter', 'Time Check', 'User Role'
    ]},
    { type: 'action', label: 'Actions', icon: Play, color: 'text-primary', items: [
      'Send Email', 'Create Record', 'API Call', 'Notification'
    ]},
    { type: 'integration', label: 'Integrations', icon: Database, color: 'text-secondary', items: [
      'Slack', 'Gmail', 'Salesforce', 'Notion'
    ]}
  ];

  const aiSuggestions = [
    {
      title: "Add Error Handling",
      description: "Consider adding a fallback path for failed email sends",
      confidence: 92,
      type: "optimization"
    },
    {
      title: "Parallel Processing",
      description: "Email and task creation can run simultaneously",
      confidence: 87,
      type: "performance"
    },
    {
      title: "Add Delay Node",
      description: "5-minute delay before sending follow-up notifications",
      confidence: 79,
      type: "enhancement"
    }
  ];

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'trigger': return 'border-green-500/50 bg-green-500/10';
      case 'condition': return 'border-yellow-500/50 bg-yellow-500/10';
      case 'action': return 'border-primary/50 bg-primary/10';
      default: return 'border-muted/50 bg-muted/10';
    }
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
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease'
  };

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-80 border-r border-border/50 p-6 space-y-6" style={glassCardStyle}>
        <div>
          <h2 className="text-xl mb-4" style={{ textShadow: '0 0 10px currentColor' }}>Workflow Builder</h2>
          <p className="text-sm text-muted-foreground">Drag components to create automated workflows</p>
        </div>

        {/* Node Types */}
        <div className="space-y-4">
          {nodeTypes.map((nodeType) => {
            const IconComponent = nodeType.icon;
            return (
              <div key={nodeType.type} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <IconComponent className={`h-4 w-4 ${nodeType.color}`} />
                  <span className="font-medium">{nodeType.label}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {nodeType.items.map((item) => (
                    <div
                      key={item}
                      className="p-3 rounded-lg border border-border/50 cursor-grab hover:border-primary/50 transition-colors text-sm"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)'
                      }}
                      draggable
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Suggestions */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="font-medium">AI Suggestions</span>
          </div>
          
          {aiSuggestions.map((suggestion, index) => (
            <Card key={index} className="p-4 border-border/50 hover:border-secondary/50 transition-colors cursor-pointer" style={glassCardStyle}>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{suggestion.title}</h4>
                  <Badge variant="outline" className="text-xs text-secondary border-secondary/50">
                    {suggestion.confidence}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                <Badge variant="outline" className="text-xs">
                  {suggestion.type}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative">
        {/* Toolbar */}
        <div className="absolute top-6 left-6 z-10 flex space-x-2">
          <Button variant="outline" className="bg-card/80 backdrop-blur-sm" style={neuroButtonStyle}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Play className="h-4 w-4 mr-2" />
            Test Run
          </Button>
        </div>

        {/* Canvas */}
        <div className="h-full bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }} />
          </div>

          {/* Workflow Nodes */}
          {workflowNodes.map((node) => {
            const IconComponent = node.icon;
            const isSelected = selectedNode === node.id;
            
            return (
              <div
                key={node.id}
                className={`
                  absolute p-4 rounded-lg border cursor-pointer transition-all duration-200
                  ${getNodeColor(node.type)}
                  ${isSelected ? 'ring-2 ring-primary scale-105' : 'hover:scale-105'}
                `}
                style={{ left: node.x, top: node.y }}
                onClick={() => setSelectedNode(node.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded bg-background/50">
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{node.title}</p>
                    <p className="text-xs text-muted-foreground capitalize">{node.type}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Connection Lines */}
          <svg className="absolute inset-0 pointer-events-none">
            {/* Line from trigger to condition */}
            <path
              d="M 180 220 Q 240 220 280 220"
              stroke="rgba(0, 212, 255, 0.5)"
              strokeWidth="2"
              fill="none"
              className="drop-shadow-glow"
            />
            {/* Line from condition to action1 */}
            <path
              d="M 380 210 Q 440 180 480 170"
              stroke="rgba(0, 212, 255, 0.5)"
              strokeWidth="2"
              fill="none"
              className="drop-shadow-glow"
            />
            {/* Line from condition to action2 */}
            <path
              d="M 380 230 Q 440 240 480 260"
              stroke="rgba(0, 212, 255, 0.5)"
              strokeWidth="2"
              fill="none"
              className="drop-shadow-glow"
            />
          </svg>

          {/* Node Details Panel */}
          {selectedNode && (
            <Card className="absolute top-6 right-6 w-80 p-6 border-border/50" style={glassCardStyle}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Node Configuration</h3>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedNode(null)}>
                    ×
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <input 
                      className="w-full mt-1 p-2 rounded-lg bg-input border border-border/50 focus:border-primary/50 outline-none"
                      defaultValue={workflowNodes.find(n => n.id === selectedNode)?.title}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Settings</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Enabled</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Retry on failure</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Apply Changes
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}