import React from 'react';

export const AlertDialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <div className="alert-dialog">
      {children}
      <button onClick={() => onOpenChange(false)}>Close</button>
    </div>
  );
};

export const AlertDialogContent = ({ children }) => {
  return <div className="alert-dialog-content">{children}</div>;
};
