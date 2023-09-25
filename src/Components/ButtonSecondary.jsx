// LIBRARY IMPORT
import React from "react"

import { useState } from "react"

// ASSETS IMPORT
import "../Style/index.css"

// ====================== MAIN CODE ========================
const ButtonSecondary = (props) => {
    const [isHovered, setIsHovered] = useState(false);
  
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  
    return (
      <button
        className={`ButtonCustom2 ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {props.text}
      </button>
    );
  };
  
  export default ButtonSecondary;
  
// ====================== END CODE ========================