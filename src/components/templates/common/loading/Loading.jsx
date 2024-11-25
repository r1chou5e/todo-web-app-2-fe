import React from 'react';
import './Loading.css'; // Tùy chỉnh CSS cho spinner nếu cần

const Loading = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;
