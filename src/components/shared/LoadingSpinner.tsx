import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Loading...' 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div 
        className={`animate-spin rounded-full border-b-2 ${sizeClasses[size]}`}
        style={{ borderColor: 'var(--tu-gold)' }}
      />
      {text && (
        <p className="mt-4 text-lg" style={{ color: 'var(--tu-navy)' }}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;

