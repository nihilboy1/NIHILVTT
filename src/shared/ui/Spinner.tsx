import React from "react";

export const Spinner: React.FC = () => {
  return (
    <div className="bg-surface-0 flex items-center justify-center h-[100vh] w-full">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-solid border-gray-200 border-l-gray-900"></div>
    </div>
  );
};
