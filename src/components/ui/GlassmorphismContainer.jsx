import React from 'react';

const GlassmorphismContainer = ({ 
  children,
  variant = 'default', 
  size = 'default', 
  className = "",
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return 'glass-card shadow-elevation-2 border-2';
      case 'floating':
        return 'glass-card shadow-elevation-3 border-2 hover:shadow-glass-lg transition-shadow duration-300';
      case 'minimal':
        return 'bg-white/10 backdrop-blur-glass border border-white/10 rounded-lg';
      case 'default':
      default:
        return 'glass-card shadow-elevation-1';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'max-w-sm mx-auto p-4';
      case 'lg':
        return 'max-w-4xl mx-auto p-8';
      case 'xl':
        return 'max-w-6xl mx-auto p-8 lg:p-12';
      case 'full':
        return 'w-full p-6';
      case 'default':
      default:
        return 'max-w-2xl mx-auto p-6';
    }
  };

  return (
    <div 
      className={`
        ${getVariantStyles()} 
        ${getSizeStyles()} 
        animate-fade-in
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassmorphismContainer;