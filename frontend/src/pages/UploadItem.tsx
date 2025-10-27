import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import toast, { Toaster } from 'react-hot-toast';

const UploadItem: React.FC = () => {
  const [formData, setFormData] = useState<{
    item_photo: File | null;
    item_name: string;
    item_price: string;
    item_category: string;
    item_description: string;
    seller_name: string;
    seller_phone: string;
  }>({
    item_photo: null,
    item_name: "",
    item_price: "",
    item_category: "",
    item_description: "",
    seller_name: "",
    seller_phone: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const phone = localStorage.getItem("seller_phone");
    const name = localStorage.getItem("seller_name");

    if (phone) {
      setFormData(prev => ({
        ...prev,
        seller_phone: phone,
        seller_name: name || "",
      }));
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement & { files: FileList };
    if (name === "item_photo" && files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = (): boolean => {
    const { item_photo, item_name, item_price, item_category, item_description, seller_name, seller_phone } = formData;
    if (!item_photo || !item_name || !item_price || !item_category || !item_description || !seller_name || !seller_phone) {
      toast.error("Please fill out all fields before submitting.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      setLoading(true);
  
      const formDataImage = new FormData();
      formDataImage.append("item_photo", formData.item_photo!);
      formDataImage.append("item_name", formData.item_name);
      formDataImage.append("item_price", formData.item_price);
      formDataImage.append("item_category", formData.item_category);
      formDataImage.append("item_description", formData.item_description);
      formDataImage.append("seller_name", formData.seller_name);
      formDataImage.append("seller_phone", formData.seller_phone);
  
      const uploadResponse = await api.post(
        "/api/infomarket/v1/items/upload",
        formDataImage
      );


      setFormData({
      item_photo: null,
      item_name: "",
      item_price: "",
      item_category: "",
      item_description: "",
      seller_name: "",
      seller_phone: "",
      });

      toast.success(uploadResponse.data);
    } catch (error) {
      console.error("Error posting item:", error);
      toast.error("Error uploading item");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
    <div className="w-full min-h-screen p-4 md:p-8 lg:p-12 items-center text-center bg-gray-50 justify-center">
      <div className="flex justify-center items-center mb-5 bg-gray-50">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-pink-500 to-blue-900 bg-clip-text text-transparent">
              Post new Products
          </h1>
      </div>
      <div className="w-full flex flex-col px-6 gap-4 md:gap-6 lg:gap-8 px-4 lg:px-15 bg-white rounded-lg shadow-sm py-4">
        <h3 className="text-lg lg:text-xl text-blue-600">Hi, upload a new product here</h3>

        <form className="block w-full" onSubmit={handleSubmit}>
          <div className="flex">
            <input
              type="file"
              name="item_photo"
              className="w-full px-3 py-2 mt-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300 outline-none"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
          <div className="block lg:flex gap-3">
            <div className="col">
              <input
                type="text"
                name="item_name"
                placeholder="Item Name"
                className="w-full px-3 py-2 mt-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300 outline-none"
                value={formData.item_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                name="item_price"
                placeholder="Price"
                className="w-full px-3 py-2 mt-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300 outline-none"
                value={formData.item_price}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="block lg:flex gap-3">
            <div className="col">
              <select
                name="item_category"
                className="w-full px-3 py-2 mt-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none appearance-none bg-white text-gray-700"
                value={formData.item_category}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="Accessories">Accessories</option>
                <option value="Bags">Bags</option>
                <option value="Curteins">Curteins</option>
                <option value="Computers">Computers</option>
                <option value="Phones">Phones</option>
              </select>
            </div>
            <div className="col">
              <textarea
                name="item_description"
                placeholder="Describe your item"
                className="w-full px-3 py-2 mt-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300 outline-none"
                value={formData.item_description}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="block lg:flex gap-3">
            <div className="col">
              <input
                type="text"
                name="seller_name"
                placeholder="Your Name"
                className="w-full px-3 py-2 mt-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300 outline-none"
                value={formData.seller_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                name="seller_phone"
                placeholder="Your Phone No."
                className="w-full px-3 py-2 mt-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300 outline-none"
                value={formData.seller_phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="w-full mt-4 mb-3 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
            disabled={loading}>
            {loading ? "Posting Item..." : "Post you Item"}
            </button>
          </div>
        </form>
      </div>

      <Toaster position="top-right"
        reverseOrder={false} />
    </div>
    </>
  );
};

export default UploadItem;
