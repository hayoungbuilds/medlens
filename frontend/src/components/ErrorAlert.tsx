import React from 'react';

interface ErrorAlertProps {
  error: string | null;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="bg-red-50 border-b border-red-200 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-red-600 text-sm">❌ {error}</p>
      </div>
    </div>
  );
};
