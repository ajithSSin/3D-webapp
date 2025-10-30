import React from 'react'

const FrontEnd = () => {
  return (
      
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-6xl h-5/6 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white">3D Model Viewer</h3>
          <button
            // onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* <div ref={containerRef} className="flex-1 relative" /> */}
        <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
          Drag to rotate • Scroll to zoom
        </div>
      </div>
    </div>
  );
};
  


export default FrontEnd