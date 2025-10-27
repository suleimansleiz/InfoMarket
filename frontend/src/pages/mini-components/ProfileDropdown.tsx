import React from "react";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";

const ProfileDropdown: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("seller_name");
    localStorage.removeItem("seller_phone");
    // Navigate to home and prevent back navigation
    navigate("/", { replace: true });
  };

  // const handleEditProfile = () => {
  //   navigate("/edit-profile");
  // };

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
        <a href="#" onClick={handleLogout}
          className="text-gray-600 hover:bg-blue-100 rounded px-3 py-2">
          <ArrowLeftEndOnRectangleIcon className="inline size-6 text-blue-500" />
          Sign out</a>
      </PopoverPanel>
    </Popover>
  );
};

export default ProfileDropdown;
