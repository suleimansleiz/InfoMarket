import { CameraIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState, type ChangeEvent } from "react";
import axios from "../api/axiosConfig";

interface Seller {
  name: string;
  email: string;
  phone: string;
  profilePic: string;
}

const SellerProfile: React.FC = () => {
  const sellerEmail = "johnseller@example.com"; // replace with logged-in seller email
  const [seller, setSeller] = useState<Seller | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch seller details on mount
  useEffect(() => {
    axios
      .get(`/api/infomarket/v1/sellers/${sellerEmail}`)
      .then((res) => setSeller(res.data))
      .catch((err) => console.error("Failed to fetch seller:", err));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!seller) return;
    const { name, value } = e.target;
    setSeller({ ...seller, [name]: value });
  };

  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!seller) return;
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setSeller({ ...seller, profilePic: fileUrl });
    }
  };

  const handleSave = () => {
    if (!seller) return;
    axios
      .put(`/api/infomarket/v1/sellers/${seller.email}`, seller)
      .then((res) => {
        setSeller(res.data);
        setIsEditing(false);
        console.log("Profile updated successfully");
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  if (!seller) return <p className="text-center mt-8">Loading profile...</p>;

  return (
    <div className="w-full max-h-screen p-4 md:p-8 lg:p-12 items-center text-center bg-gray-50 justify-center lg:overflow-y-auto hide-scrollbar">
      <div className="flex justify-center items-center mb-5 bg-gray-50">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-pink-500 to-blue-900 bg-clip-text text-transparent">
          My Profile
        </h1>
      </div>

      <div className="w-full flex flex-col px-6 gap-4 md:gap-6 lg:gap-8 bg-white rounded-lg shadow-sm py-4 lg:mb-10">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={seller.profilePic || "../../assets/blank-profile-pic.png"}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-gray-200"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-gray-100 text-white p-2 rounded-full cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePicChange}
                />
                <CameraIcon className="size-4 text-blue-500" />
              </label>
            )}
          </div>
        </div>

        {/* Profile details */}
        <div className="mt-6 space-y-2 text-left">
          {["name", "email", "phone"].map((field) => (
            <div key={field} className="border border-gray-100 rounded-md p-2">
              <label className="block text-sm font-medium text-gray-600 capitalize">
                {field}
              </label>
              {isEditing && field !== "email" ? (
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={seller[field as keyof Seller] as string}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-gray-600 focus:ring focus:ring-blue-300 outline-none"
                />
              ) : (
                <p className="text-lg text-gray-600 font-semibold">
                  {seller[field as keyof Seller]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg text-gray-600 hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 border border-blue-400 text-blue-600 hover:text-white rounded-lg hover:bg-blue-600 cursor-pointer"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-2 py-2 border text-white rounded hover:border-blue-500"
            >
              <PencilSquareIcon className="size-6 text-blue-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
