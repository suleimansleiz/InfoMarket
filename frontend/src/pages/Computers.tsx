import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import ExpandedItemCard from "../modals/ExpandedItemCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PurchaseModal from "../modals/PurchaseModal";
import Pagination from "../components/Pagination";
import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Navbar from "../components/Navbar";

interface Item {
  itemId: number;
  item_photo?: string;
  itemName: string;
  item_price: string;
  itemCategory: string;
  item_description: string;
  seller_name: string;
  sellerPhone: string;
}

const Computers: React.FC = () => {
  const [selected, setSelected] = useState<string>("All");
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);


  // Filtered items (currently no search/filter logic, so just use items)
  const filteredItems = items;

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
      if (pageNumber > 0 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      }
    };

  const openModal = (item: Item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setShowModal(false);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get("/api/infomarket/v1/items/category/Computers", {});
        const data = response.data.items || response.data;
        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };
    fetchItems();
  }, []);

  const handleFilterChange = async (type: string) => {
    setSelected(type);
  
    try {
      let response;
  
      if (type === "All") {
        response = await api.get("/api/infomarket/v1/items/category/Computers");
      } else if (type === "Recents") {
        response = await api.get("/api/infomarket/v1/items/category/Computers/recent");
      } else {
        // Placeholder for future "Favorites"
        setItems([]);
        return;
      }
  
      const data = response.data.items || response.data;
      setItems(Array.isArray(data) ? data : []);
      setCurrentPage(1); // Reset to page 1 after filter change
    } catch (error) {
      console.error(`Failed to fetch ${type} items:`, error);
    }
  };

  return (
    <>
      <Navbar />
    <div className="w-full h-screen p-4 md:p-8 lg:p-12 items-center text-center bg-gray-50 justify-center overflow-y-auto hide-scrollbar">
      <div className="flex justify-center items-center  mb-5 bg-gray-50">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-pink-500 to-blue-900 bg-clip-text text-transparent">
        Computers
      </h1>
      </div>
      <div className="justify-center lg:max-w-66 mt-4 lg:bg-gray-300 p-1 rounded-full">
      {["All", "Recents", "Favorites"].map((type) => (
        <button
        key={type}
        className={`filter-button text-gray-600 lg:bg-gray-300 ${selected === type ? "active" : ""}`}
        onClick={() => handleFilterChange(type)}
        >
        {type}
        </button>
      ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2 p-4">
      {currentItems.length === 0 ? (
        <motion.div
          className="w-full flex flex-col justify-center items-center text-center"
          style={{ gridColumn: "1 / -1" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
      {/* Animated icon */}
      <DotLottieReact
      src="https://lottie.host/a61bff08-9037-4e31-9508-3373ccf9a085/8aVkTo3hgC.lottie"
      loop
      autoplay
      className="md:h-50"
    />
      <motion.div
        className="mb-4 text-gray-400"
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        <i className="fas fa-box-open text-6xl"></i>
      </motion.div>

      {/* Text with subtle pulse */}
      <motion.h2
        className="text-2xl font-semibold mb-2 text-gray-600"
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        No Computers available
      </motion.h2>

      <p className="text-gray-600">Please check back later.</p>
    </motion.div>
      ) : (
        currentItems.map((item: Item) => (
        <div className="flex flex-col min-h-130 lg:min-h-80 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          key={item.itemId}>
          <div
          className="bg-cover bg-center h-[70%] "
          style={{ backgroundImage: `url(${item.item_photo})` }}
          />
          <div className="px-4 flex justify-between h-[30%] items-center">
          <div className="text-left ml-2">
            <h5 className="text-md font-semibold mb-1 text-gray-700">
              {item.itemName}
            </h5>
            <p>Tsh {item.item_price.toLocaleString()}</p>
          </div>
          <div className="icon-btn">
          <button className="expand-button" onClick={() => openModal(item)}>
          <FontAwesomeIcon icon="arrow-down" />
          </button>
            <button className="favorite-button">
            <FontAwesomeIcon icon={["far", "heart"]} />
            </button>
          </div>
          </div>
        </div>
        ))
      )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <ExpandedItemCard
        show={showModal}
        onHide={closeModal}
        item={selectedItem}
        onPurchase={() => {
        setShowModal(false);
        setShowPurchaseModal(true);
        }}
      />

      {/* PurchaseModal */}
      {selectedItem && (
        <PurchaseModal
          show={showPurchaseModal}
          onHide={() => setShowPurchaseModal(false)}
          item={selectedItem}
        />
      )}

    </div>
    </>
  );
};

export default Computers;
