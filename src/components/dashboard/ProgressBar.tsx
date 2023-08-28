import React from 'react';

const ProgressBar = ({ progress } : { progress: number }) => {
  return (
    <div className="w-full bg-gray-200">
      <div
        className="h-2 bg-blue-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;