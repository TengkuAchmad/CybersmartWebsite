// REACT IMPORT
import React from "react"

// LIBRARY IMPORT
import { useState, useEffect } from 'react';

// ASSETS IMPORT
import '../Style/index.css';


const FadeTransition = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fade-transition ${isVisible ? 'visible' : ''}`}>
     {children}
    </div>
  );
};

export default FadeTransition;
