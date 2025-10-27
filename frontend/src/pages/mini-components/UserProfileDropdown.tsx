import React from "react";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ArrowLeftEndOnRectangleIcon, UserIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../auth/AuthContext";

const UserProfileDropdown: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("user");
    logout();
    window.location.reload();
    // navigate("/", { replace: true });
  };

  const handleMyProfile = () => {
    navigate("/user-profile");
  };

  return (
    <Popover className="relative">
      <PopoverButton className="focus:outline-none">
        <img
          src={imageUrl}
          alt="Profile"
          className="w-10 h-10 object-cover cursor-pointer"
        />
      </PopoverButton>
      <PopoverPanel anchor="bottom" className="flex flex-col bg-white rounded shadow-lg p-2 mt-4 w-40">
        <a href="#" onClick={handleMyProfile}
          className="text-gray-600 hover:bg-blue-100 rounded px-3 py-2">
          <UserIcon className="inline size-6 text-blue-500" />
          My Profile</a>
        <a href="#" onClick={handleLogout}
          className="text-gray-600 hover:bg-blue-100 rounded px-3 py-2">
          <ArrowLeftEndOnRectangleIcon className="inline size-6 text-blue-500" />
          Sign out</a>
      </PopoverPanel>
    </Popover>
  );
};

export default UserProfileDropdown;