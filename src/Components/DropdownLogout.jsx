import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

const DropdownLogout = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    // Handle logout logic here
  };

  return (
    <div>
      <Row className="mt-4 mb-5">
        <Dropdown show={showDropdown} onToggle={toggleDropdown}>
          <Dropdown.Toggle variant="link" id="dropdown-basic">
            <img src={Profile} className="icons" alt="icon-dashboard" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleLogout}>Keluar</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Row>
    </div>
  );
};

export default DropdownLogout;
