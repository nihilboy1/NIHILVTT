import React from 'react';
import './Spinner.css'; // Assuming a CSS file for styling the spinner

const Spinner: React.FC = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
