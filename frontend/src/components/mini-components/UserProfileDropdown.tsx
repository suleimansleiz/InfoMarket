import React from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";

const UserProfileDropdown: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
    // navigate("/", { replace: true });
  };

  const handleEditProfile = () => {
    navigate("");
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle as="div" style={{ cursor: "pointer" }}>
        <Image
          src={imageUrl}
          roundedCircle
          width={40}
          height={40}
          style={{ objectFit: "cover" }}
          alt="Profile"
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleEditProfile}>Edit Profile</Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserProfileDropdown;