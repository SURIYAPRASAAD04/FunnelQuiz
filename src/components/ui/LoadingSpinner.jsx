import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'indigo' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const colorClasses = {
    indigo: 'text-indigo-600',
    white: 'text-white',
    gray: 'text-gray-400'
  };

  return (
    <div className={`animate-spin rounded-full border-4 border-solid border-current border-r-transparent ${sizeClasses[size]} ${colorClasses[color]}`} 
         style={{ animation: 'spin 1s linear infinite' }}
         role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;