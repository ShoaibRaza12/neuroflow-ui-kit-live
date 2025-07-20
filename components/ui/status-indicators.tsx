import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  XCircle, 
  Zap, 
  Wifi, 
  WifiOff,
  Battery,
  BatteryLow,
  Smile,
  Meh,
  Frown
} from 'lucide-react';

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'busy' | 'away' | 'active' | 'inactive';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

interface TaskStatusProps {
  status: 'pending' | 'in-progress' | 'completed' | 'failed' | 'cancelled';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

interface MoodIndicatorProps {
  mood: 'happy' | 'neutral' | 'sad' | 'stressed' | 'excited';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

interface SystemStatusProps {
  type: 'connection' | 'battery' | 'ai' | 'sync';
  status: 'good' | 'warning' | 'error';
  value?: number;
  label?: string;
}

const statusStyles = {
  online: 'bg-green-500 border-green-400 text-green-400',
  offline: 'bg-red-500 border-red-400 text-red-400',
  busy: 'bg-red-500 border-red-400 text-red-400',
  away: 'bg-yellow-500 border-yellow-400 text-yellow-400',
  active: 'bg-green-500 border-green-400 text-green-400',
  inactive: 'bg-gray-500 border-gray-400 text-gray-400'
};

const taskStatusStyles = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  completed: 'bg-green-500/20 text-green-400 border-green-500/50',
  failed: 'bg-red-500/20 text-red-400 border-red-500/50',
  cancelled: 'bg-gray-500/20 text-gray-400 border-gray-500/50'
};

const sizeStyles = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4'
};

const iconSizes = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5'
};

export function StatusBadge({ status, size = 'md', showLabel = false, className = '' }: StatusBadgeProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <div className={`${sizeStyles[size]} rounded-full ${statusStyles[status]} animate-pulse`} />
        <div className={`absolute inset-0 ${sizeStyles[size]} rounded-full ${statusStyles[status]} opacity-75 animate-ping`} />
      </div>
      {showLabel && (
        <span className={`text-sm capitalize ${statusStyles[status].split(' ')[2]}`}>
          {status}
        </span>
      )}
    </div>
  );
}

export function TaskStatus({ status, size = 'md', showLabel = true }: TaskStatusProps) {
  const getIcon = () => {
    switch (status) {
      case 'pending': return <Clock className={iconSizes[size]} />;
      case 'in-progress': return <Zap className={iconSizes[size]} />;
      case 'completed': return <CheckCircle className={iconSizes[size]} />;
      case 'failed': return <XCircle className={iconSizes[size]} />;
      case 'cancelled': return <XCircle className={iconSizes[size]} />;
    }
  };

  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${taskStatusStyles[status]}`}>
      {getIcon()}
      {showLabel && (
        <span className="text-xs font-medium capitalize">
          {status.replace('-', ' ')}
        </span>
      )}
    </div>
  );
}

export function MoodIndicator({ mood, size = 'md', animated = true }: MoodIndicatorProps) {
  const getMoodConfig = () => {
    switch (mood) {
      case 'happy': return { icon: Smile, color: 'text-green-400', bgColor: 'bg-green-500/20' };
      case 'neutral': return { icon: Meh, color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' };
      case 'sad': return { icon: Frown, color: 'text-blue-400', bgColor: 'bg-blue-500/20' };
      case 'stressed': return { icon: Frown, color: 'text-red-400', bgColor: 'bg-red-500/20' };
      case 'excited': return { icon: Smile, color: 'text-primary', bgColor: 'bg-primary/20' };
    }
  };

  const { icon: IconComponent, color, bgColor } = getMoodConfig();

  return (
    <div className={`inline-flex items-center justify-center p-2 rounded-full ${bgColor} ${animated ? 'hover:scale-110 transition-transform duration-200' : ''}`}>
      <IconComponent className={`${iconSizes[size]} ${color}`} />
    </div>
  );
}

export function SystemStatus({ type, status, value, label }: SystemStatusProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'good': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'connection':
        return status === 'error' ? 
          <WifiOff className="w-4 h-4" /> : 
          <Wifi className="w-4 h-4" />;
      case 'battery':
        return status === 'error' || (value && value < 20) ? 
          <BatteryLow className="w-4 h-4" /> : 
          <Battery className="w-4 h-4" />;
      case 'ai':
        return <Zap className="w-4 h-4" />;
      case 'sync':
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={getStatusColor()}>
        {getIcon()}
      </div>
      <div className="flex flex-col">
        {label && <span className="text-xs text-muted-foreground">{label}</span>}
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {status === 'good' ? 'Active' : status === 'warning' ? 'Warning' : 'Error'}
          </span>
          {value !== undefined && (
            <span className="text-xs text-muted-foreground">
              {value}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function NotificationBadge({ count, max = 99 }: { count: number; max?: number }) {
  const displayCount = count > max ? `${max}+` : count.toString();
  
  if (count === 0) return null;

  return (
    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[1.5rem] h-6 flex items-center justify-center px-1 animate-pulse">
      {displayCount}
    </div>
  );
}