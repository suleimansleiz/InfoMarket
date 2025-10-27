import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import SellYourItemModal from "../modals/SellYourItemModal";
import UserProfileDropdown from "../pages/mini-components/UserProfileDropdown";
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showSellYourItemModal, setShowSellYourItemModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
  const location = useLocation();

  const linkBase =
    "text-gray-600 hover:text-black transition-colors duration-200";
  const activeRoute = (path: string) =>
    location.pathname === path ? "text-black font-semibold" : "";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLoginSuccess = () => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
      window.location.reload();
    }
  };

  const handleSignupSuccess = () => {
    setShowLoginModal(true);
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

            {/* Buttons/User */}
            {user ? (
              <span className="flex items-center gap-2">
                <h5 className="seller-name mb-0">{user}</h5>
                <UserProfileDropdown imageUrl="../../assets/blank-profile-pic.png" />
              </span>
            ) : (
              <>
                <button
                  className="px-3 py-2 text-sm border border-gray-300 text-blue-600 rounded-md hover:border-blue-600 transition cursor-pointer"
                  onClick={() => setShowLoginModal(true)}
                >
                  Sign in
                </button>
                <button
                  className="px-3 py-2 text-sm text-blue-600 border border-gray-300 rounded-md hover:border-blue-600 transition cursor-pointer"
                  onClick={() => setShowSignupModal(true)}
                >
                  Sign up
                </button>
              </>
            )}
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
        className={`fixed top-0 right-0 h-screen w-full overflow-y-auto hide-scrollbar bg-white shadow-lg transform transition-transform duration-500 ease-in-out lg:hidden z-40 py-4 px-2 ${
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
            <div className="flex flex-col items-start gap-4 flex-grow text-xl font-medium">
            <Link
                to="/"
                className={`text-gray-300 ${linkBase} ${activeRoute("/")}`}
                onClick={() => setIsOpen(false)}
            >
                Home
            </Link>
            <Link
                to="/notifications"
                className={`${linkBase} ${activeRoute("/notifications")}`}
                onClick={() => setIsOpen(false)}
            >
                Notifications
            </Link>
            <Link
                to="/settings"
                className={`${linkBase} ${activeRoute("/settings")}`}
                onClick={() => setIsOpen(false)}
            >
                Settings
            </Link>
            <Link
                to="/help"
                className={`${linkBase} ${activeRoute("/help")}`}
                onClick={() => setIsOpen(false)}
            >
                Support
            </Link>
            <Link
                to="#"
                className={`${linkBase} ${activeRoute("#")}`}
                onClick={(e) => {
                e.preventDefault();
                setShowSellYourItemModal(true);
                setIsOpen(false);
                }}
            >
                Post
            </Link>
            </div>

            {/* Buttons at bottom in a row */}
            <div className="flex flex-row gap-2 justify-left border-t border-gray-200 pt-4">
            {user ? (
                <span className="flex items-center gap-2">
                  <UserProfileDropdown imageUrl="../../assets/blank-profile-pic.png" />
                <h5 className="seller-name mb-0">{user}</h5>
                </span>
            ) : (
                <>
                <button
                    className="flex-1 px-3 py-2 border border-gray-300 text-sm text-blue-600 rounded-md hover:border-blue-600 transition cursor-pointer"
                    onClick={() => {setShowLoginModal(true);
                      setIsOpen(false);
                    }}
                >
                    Sign in
                </button>
                <button
                    className="flex-1 px-3 py-2 border border-gray-300 text-sm text-blue-600 rounded-md hover:border-blue-600 transition cursor-pointer"
                    onClick={() => {
                      setShowSignupModal(true);
                      setIsOpen(false);
                    }}
                >
                    Sign up
                </button>
                </>
            )}
            </div>
        </div>
        </div>

      <SellYourItemModal
        show={showSellYourItemModal}
        onHide={() => {
        setShowSellYourItemModal(false);
        }}
      />

      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <SignupModal
        show={showSignupModal}
        onHide={() => setShowSignupModal(false)}
        onSignupSuccess={handleSignupSuccess}
      />
    </nav>
  );
};

export default Navbar;
