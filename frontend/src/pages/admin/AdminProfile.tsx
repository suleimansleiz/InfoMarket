import React from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";

const AdminProfile: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminName");
    localStorage.removeItem("role");
    // Navigate to home and prevent back navigation
    navigate("/", { replace: true });
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <Dropdown className="admin-dropdown" align="end">
      <Dropdown.Toggle className="admin-img-dropdown" as="div" style={{ cursor: "pointer" }}>
        <Image
          src={imageUrl}
          roundedCircle
          width={40}
          height={40}
          style={{ objectFit: "cover" }}
          alt="Profile"
          className="admin-img"
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleEditProfile}>Edit Profile</Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AdminProfile;