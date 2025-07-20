import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Button } from './button';

interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  disabled?: boolean;
}

interface ModernDropdownProps {
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  onSelect: (value: string) => void;
  variant?: 'default' | 'glass' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  searchable?: boolean;
  multiSelect?: boolean;
  className?: string;
}

const variantStyles = {
  default: 'bg-card border-border/50',
  glass: 'backdrop-blur-16',
  minimal: 'bg-transparent border-transparent'
};

const sizeStyles = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3',
  lg: 'px-6 py-4 text-lg'
};

export function ModernDropdown({
  options,
  value,
  placeholder = 'Select option...',
  onSelect,
  variant = 'glass',
  size = 'md',
  searchable = false,
  multiSelect = false,
  className = ''
}: ModernDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>(
    multiSelect ? (value ? [value] : []) : (value ? [value] : [])
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (optionValue: string) => {
    if (multiSelect) {
      const newSelected = selectedValues.includes(optionValue)
        ? selectedValues.filter(v => v !== optionValue)
        : [...selectedValues, optionValue];
      setSelectedValues(newSelected);
      onSelect(newSelected.join(','));
    } else {
      onSelect(optionValue);
      setIsOpen(false);
    }
  };

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)'
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full justify-between ${sizeStyles[size]} ${variantStyles[variant]}
          hover:border-primary/50 transition-all duration-200
        `}
        style={variant === 'glass' ? glassStyle : {}}
      >
        <span className={selectedOption ? 'text-foreground' : 'text-muted-foreground'}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown 
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className={`
            absolute top-full left-0 right-0 mt-2 rounded-lg border border-border/50
            max-h-64 overflow-auto z-50
            animate-in fade-in-0 zoom-in-95 duration-200
          `}
          style={glassStyle}
        >
          {/* Search Input */}
          {searchable && (
            <div className="p-2 border-b border-border/50">
              <input
                type="text"
                placeholder="Search options..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 bg-transparent border border-border/50 rounded-md focus:border-primary/50 outline-none"
              />
            </div>
          )}

          {/* Options */}
          <div className="py-1">
            {filteredOptions.map((option) => {
              const isSelected = multiSelect 
                ? selectedValues.includes(option.value)
                : value === option.value;
                
              return (
                <div
                  key={option.value}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  className={`
                    flex items-center px-4 py-3 cursor-pointer transition-colors duration-150
                    ${option.disabled 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-accent/10'
                    }
                    ${isSelected ? 'bg-primary/20 text-primary' : ''}
                  `}
                >
                  {option.icon && (
                    <span className="mr-3 flex-shrink-0">
                      {option.icon}
                    </span>
                  )}
                  
                  <div className="flex-1">
                    <div className="font-medium">{option.label}</div>
                    {option.description && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {option.description}
                      </div>
                    )}
                  </div>
                  
                  {isSelected && (
                    <Check className="h-4 w-4 text-primary ml-2" />
                  )}
                </div>
              );
            })}
            
            {filteredOptions.length === 0 && (
              <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}