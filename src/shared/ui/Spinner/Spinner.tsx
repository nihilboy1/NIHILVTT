import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-solid border-gray-200 border-l-gray-900"></div>
    </div>
  );
};

export default Spinner;
