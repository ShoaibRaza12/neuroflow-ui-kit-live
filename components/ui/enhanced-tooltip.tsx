import React, { useState } from 'react';

interface EnhancedTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
  showArrow?: boolean;
  delay?: number;
}

const variantStyles = {
  default: 'bg-card/90 text-card-foreground border-border/50',
  info: 'bg-primary/20 text-primary border-primary/50',
  success: 'bg-green-500/20 text-green-400 border-green-500/50',
  warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  error: 'bg-red-500/20 text-red-400 border-red-500/50'
};

const positionStyles = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2'
};

const arrowStyles = {
  top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
  right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent'
};

export function EnhancedTooltip({
  content,
  children,
  side = 'top',
  variant = 'default',
  showArrow = true,
  delay = 300
}: EnhancedTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)'
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      
      {isVisible && (
        <div 
          className={`
            absolute ${positionStyles[side]} ${variantStyles[variant]}
            px-3 py-2 rounded-lg border text-sm font-medium
            animate-in fade-in-0 zoom-in-95 duration-200
            z-50 max-w-xs whitespace-nowrap
          `}
          style={glassStyle}
        >
          {content}
          
          {showArrow && (
            <div 
              className={`absolute w-0 h-0 ${arrowStyles[side]}`}
              style={{
                borderWidth: '4px',
                borderTopColor: variant === 'default' ? 'rgba(255, 255, 255, 0.1)' : 'currentColor'
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}