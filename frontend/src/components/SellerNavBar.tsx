import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import ProfileDropdown from "../pages/mini-components/ProfileDropdown";
import { useAuth } from "../auth/AuthContext";

const SellerNavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const linkBase =
    "text-gray-600 hover:text-black transition-colors duration-200";
  const activeRoute = (path: string) =>
    location.pathname === path ? "text-black font-semibold" : "";

  const handleLogout = () => {
    localStorage.removeItem("seller_name");
    localStorage.e("seller_phone");
    logout();
    // Navigate to home and prevent back navigation
    navigate("/", { replace: true });
  };

  return (
    <nav className="fixed top-0 h-10 md:h-16 inset-x-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="w-full mx-auto px-4">
        <div className="flex items-center justify-between h-10 md:h-16">
          {/* Left side: Mobile menu button */}
          <div className="lg:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setIsOpen(!isOpen)}
              className="relative h-3 w-8 grid place-items-center cursor-pointer"
            >
              {/* Hamburger → X */}
              <span
                className={`block h-0.5 w-6 bg-gray-400 transition-all duration-300 ${
                  isOpen ? "translate-y-[7px] rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-gray-400 transition-all duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-gray-400 transition-all duration-300 ${
                  isOpen ? "-translate-y-[7px] -rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>

          {/* Logo */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="bg-blue-600 h-10 w-10 rounded-full overflow-hidden">
              <img src="../../assets/unimarket.png" alt="unimarket" className="h-full w-full object-cover" />
            </div>
          </div>

          {/* Right side: Desktop search + buttons */}
          <div className="hidden lg:flex items-center gap-3 ml-auto">
            {/* Search icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-400 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
            >
              <FaSearch size={18} />
            </button>

                {/* Profile pic */}
            <span className="flex items-center gap-2">
                <h5 className="seller-name mb-0">{localStorage.getItem("seller_name")}</h5>
                    <ProfileDropdown imageUrl="../../assets/blank-profile-pic.png" />
              </span>
          </div>

          {/* Mobile search icon (far right) */}
          <div className="lg:hidden ml-auto">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-400 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
            >
              <FaSearch size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Search dropdown */}
      <div
        className={`overflow-hidden transition-all duration-[1000ms] ease-in-out ${
          searchOpen ? "max-h-50 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-4 bg-white border-t border-gray-100">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-full px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-100"
          />
        </div>
      </div>

      {/* Mobile slide-in menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-screen bg-white shadow-lg transform transition-transform duration-500 ease-in-out lg:hidden z-40 py-4 px-2 ${
            isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        >
          <div className="flex justify-between items-center mb-4 px-4 border-b border-gray-200">
            <button onClick = {() => setIsOpen(false)} className="px-2 py-2 mb-3 text-gray-600 hover:text-gray-800 cursor-pointer">
            ✕
          </button>
          <div className="bg-blue-600 mb-3 h-8 w-8 rounded-full overflow-hidden">
            <img src="../../assets/unimarket.png" alt="unimarket" className="h-full w-full object-cover"/>
          </div>
          </div>
        <div className="flex flex-col h-full p-6">
            {/* Links */}
            <div className="flex flex-col h-[70%] items-start gap-4 text-xl font-medium">
            <Link
                to="/seller"
                className={`text-gray-300 ${linkBase} ${activeRoute("/seller")}`}
                onClick={() => setIsOpen(false)}
            >
                My Posts
            </Link>
            <Link
                to="/seller/upload-item"
                className={`${linkBase} ${activeRoute("/seller/post-items")}`}
                onClick={() => setIsOpen(false)}
            >
                Upload Item
            </Link>
            <Link
                to="/seller/seller-profile"
                className={`${linkBase} ${activeRoute("/settings")}`}
                onClick={() => setIsOpen(false)}
            >
                My Profile
            </Link>
            </div>

          <div className="flex mb-3 justify-center pt-4">
            <button
              className="flex-1 px-3 py-2 border border-gray-300 text-sm text-blue-600 rounded-lg hover:border-blue-600 transition cursor-pointer"
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
            >
              Sign Out
            </button>
          </div>
            {/* Buttons at bottom in a row */}
            <div className="flex flex-row gap-2 justify-left border-t border-gray-200 pt-4">
              <span className="flex w-full items-center gap-3">
                    <img src="../../assets/blank-profile-pic.png" alt="profile" className="w-12 h-12 objectFit-cover rounded-full" />
                    <div className="block items-center">
                      <h3 className="text-lg text-blue-600 font-semibold">{localStorage.getItem("seller_name")}Seller-01</h3>
                      <h5 className="text-sm text-gray-600 ">Seller</h5>
                    </div>
              </span>
            </div>
        </div>
        </div>
    </nav>
  );
};

export default SellerNavBar;