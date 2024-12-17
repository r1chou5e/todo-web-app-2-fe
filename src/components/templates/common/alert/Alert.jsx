import React from 'react';
import { FiAlertTriangle, FiAlertCircle } from 'react-icons/fi';

import './Alert.css';

const typeIcons = {
  info: <FiAlertCircle />,
  error: <FiAlertTriangle />,
};

const Alert = ({ message, type, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className={`alert alert-${type}`}>
      <span className="alert-icon">{typeIcons[type]}</span>
      <span>{message}</span>
    </div>
  );
};

export default Alert;
