import React from 'react';
import { Loader2, Zap, Bot } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'ai';
  className?: string;
}

interface LoadingCardProps {
  className?: string;
  showPulse?: boolean;
}

interface LoadingButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
  variant?: 'default' | 'primary' | 'ai';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const spinnerSizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
};

const buttonSizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3',
  lg: 'px-6 py-4 text-lg'
};

export function LoadingSpinner({ size = 'md', variant = 'default', className = '' }: LoadingSpinnerProps) {
  const getSpinnerColor = () => {
    switch (variant) {
      case 'primary': return 'text-primary';
      case 'ai': return 'text-secondary';
      default: return 'text-muted-foreground';
    }
  };

  const getSpinnerIcon = () => {
    switch (variant) {
      case 'ai': return <Bot className={`${spinnerSizes[size]} animate-pulse`} />;
      default: return <Loader2 className={`${spinnerSizes[size]} animate-spin`} />;
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={getSpinnerColor()}>
        {getSpinnerIcon()}
      </div>
    </div>
  );
}

export function LoadingCard({ className = '', showPulse = true }: LoadingCardProps) {
  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)'
  };

  return (
    <div 
      className={`rounded-lg border border-border/50 p-6 ${className} ${showPulse ? 'animate-pulse' : ''}`}
      style={glassStyle}
    >
      <div className="space-y-4">
        <div className="h-4 bg-muted/30 rounded w-3/4"></div>
        <div className="h-3 bg-muted/20 rounded w-1/2"></div>
        <div className="h-3 bg-muted/20 rounded w-2/3"></div>
        <div className="flex space-x-2 mt-4">
          <div className="h-8 bg-muted/30 rounded w-16"></div>
          <div className="h-8 bg-muted/20 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
}

export function LoadingButton({ 
  children, 
  isLoading, 
  variant = 'default', 
  size = 'md',
  className = '',
  onClick 
}: LoadingButtonProps) {
  const getButtonStyles = () => {
    switch (variant) {
      case 'primary': return 'bg-primary hover:bg-primary/90 text-primary-foreground';
      case 'ai': return 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white';
      default: return 'bg-muted hover:bg-muted/80 text-muted-foreground';
    }
  };

  const glowStyle = variant === 'ai' ? {
    boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)'
  } : {};

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`
        ${buttonSizes[size]} ${getButtonStyles()} ${className}
        rounded-lg border border-white/20 font-medium
        transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center space-x-2
      `}
      style={glowStyle}
    >
      {isLoading && <LoadingSpinner size="sm" variant={variant} />}
      <span className={isLoading ? 'opacity-70' : ''}>{children}</span>
    </button>
  );
}

export function LoadingOverlay({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div 
        className="p-8 rounded-2xl border border-border/50"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)'
        }}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Bot className="w-12 h-12 text-primary animate-pulse" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full animate-ping"></div>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2">AI Processing</h3>
            <p className="text-sm text-muted-foreground">Analyzing your data...</p>
          </div>
        </div>
      </div>
    </div>
  );
}