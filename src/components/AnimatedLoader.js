import React from 'react';

const AnimatedLoader = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="relative">
        {/* Spinning outer circle */}
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        
        {/* Inner circle with percentage icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center">
          <span className="text-blue-500 font-bold text-xs">%</span>
        </div>
        
        {/* Pulse animation around the loader */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-blue-300 animate-ping opacity-30"></div>
      </div>
    </div>
  );
};

export default AnimatedLoader;