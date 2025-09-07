// src/components/Loader.js
import React from 'react';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="orbital-loader">
        <div className="orbital-loader__dot"></div>
        <div className="orbital-loader__dot"></div>
        <div className="orbital-loader__dot"></div>
      </div>
    </div>
  );
};

export default Loader;
