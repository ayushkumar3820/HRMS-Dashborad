import React from 'react';

const Button = ({ children, className = '', variant = 'solid', size = 'md', ...props }) => {
  const baseClasses = 'inline-flex items-center px-4 py-2 border border-transparent rounded-md';
  const variantClasses = {
    solid: 'bg-purple-600 text-white hover:bg-purple-700',
    outline: 'bg-white text-purple-600 border-purple-600 hover:bg-purple-50',
    ghost: 'bg-transparent text-purple-600 hover:bg-purple-50',
  };
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export { Button };
