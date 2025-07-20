import React from 'react';
import { Button } from './button';
import { Plus, Zap, Bot, MessageSquare } from 'lucide-react';

interface FloatingCTAProps {
  variant?: 'primary' | 'secondary' | 'ai' | 'chat';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  label?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const variantStyles = {
  primary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
  secondary: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground',
  ai: 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white',
  chat: 'bg-accent hover:bg-accent/90 text-accent-foreground'
};

const sizeStyles = {
  sm: 'w-12 h-12',
  md: 'w-14 h-14',
  lg: 'w-16 h-16'
};

const positionStyles = {
  'bottom-right': 'fixed bottom-6 right-6',
  'bottom-left': 'fixed bottom-6 left-6',
  'top-right': 'fixed top-6 right-6',
  'top-left': 'fixed top-6 left-6'
};

const getDefaultIcon = (variant: string) => {
  switch (variant) {
    case 'primary': return <Plus className="h-5 w-5" />;
    case 'secondary': return <Zap className="h-5 w-5" />;
    case 'ai': return <Bot className="h-5 w-5" />;
    case 'chat': return <MessageSquare className="h-5 w-5" />;
    default: return <Plus className="h-5 w-5" />;
  }
};

export function FloatingCTA({ 
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  children,
  icon,
  label,
  position = 'bottom-right'
}: FloatingCTAProps) {
  const glowStyle = {
    boxShadow: variant === 'ai' 
      ? '0 0 30px rgba(0, 212, 255, 0.6), 0 0 60px rgba(168, 85, 247, 0.4)'
      : '0 0 20px rgba(0, 212, 255, 0.4)'
  };

  return (
    <div className={`${positionStyles[position]} z-50 group`}>
      <Button
        onClick={onClick}
        className={`
          ${sizeStyles[size]} ${variantStyles[variant]} ${className}
          rounded-full shadow-2xl transition-all duration-300 
          hover:scale-110 active:scale-95 
          border border-white/20
        `}
        style={{
          background: variant === 'ai' 
            ? 'linear-gradient(145deg, rgba(0, 212, 255, 0.9), rgba(168, 85, 247, 0.9))'
            : undefined,
          ...glowStyle
        }}
      >
        {children || icon || getDefaultIcon(variant)}
      </Button>
      
      {label && (
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
          <div 
            className="px-3 py-2 rounded-lg border border-border/50 whitespace-nowrap text-sm font-medium"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)'
            }}
          >
            {label}
          </div>
        </div>
      )}
    </div>
  );
}