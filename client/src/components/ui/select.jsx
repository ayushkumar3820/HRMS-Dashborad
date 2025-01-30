import React from 'react';

const Select = ({ children, className = '', ...props }) => {
  return (
    <select className={`p-2 border rounded-md ${className}`} {...props}>
      {children}
    </select>
  );
};

const SelectTrigger = ({ children, className = '' }) => {
  return (
    <div className={`p-2 border rounded-md ${className}`}>
      {children}
    </div>
  );
};

const SelectContent = ({ children, className = '' }) => {
  return (
    <div className={`p-2 border rounded-md ${className}`}>
      {children}
    </div>
  );
};

const SelectItem = ({ children, className = '' }) => {
  return (
    <div className={`p-2 hover:bg-purple-50 ${className}`}>
      {children}
    </div>
  );
};

const SelectValue = ({ children, className = '' }) => {
  return (
    <div className={`p-2 ${className}`}>
      {children}
    </div>
  );
};

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue };
