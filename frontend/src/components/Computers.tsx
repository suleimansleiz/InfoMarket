import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import ExpandedItemCard from "../modals/ExpandedItemCard";
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserProfileDropdown from "./mini-components/UserProfileDropdown";
import LoadingSpinner from "./mini-components/LoadingSpinner";
import { Pagination } from "react-bootstrap";
import PurchaseModal from "../modals/PurchaseModal";

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
  const itemsPerPage = 15;

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
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
  
    const renderPaginationItems = () => {
      const paginationItems = [];
  
  
      if (currentPage > 3) {
        paginationItems.push(<Pagination.Item key={1} onClick={() => handlePageChange(1)}>1</Pagination.Item>);
        paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
      }
  
      for (
        let number = Math.max(1, currentPage - 1);
        number <= Math.min(currentPage + 1, totalPages);
        number++
      ) {
        paginationItems.push(
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        );
      }
  
      if (currentPage < totalPages - 2) {
        paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
        paginationItems.push(
          <Pagination.Item key={totalPages} onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </Pagination.Item>
        );
      }
  
      return paginationItems;
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
    <div className="pages-container">
      <div className="topbar d-flex align-items-center p-3">
        <div className="topbar-middle d-flex align-items-center">
          <div className="searchBox">
            <img className="searchIcon" src="../assets/search.png" alt="icon" />
            <input className="searchBar" type="search" placeholder="Search here!" />
            <button className="searchButton" type="button">Search</button>
          </div>
        </div>
        <div className="topbar-right d-flex align-items-center">
          {user ? (
            <span className="username-display">
              <h5 className="seller-name mb-0">{user}</h5>
              <UserProfileDropdown imageUrl="../../assets/blank-profile-pic.png" />
              </span>
          ) : (
            <>
              <button className="login-btn" onClick={() => setShowLoginModal(true)}>Log in</button>
              <button className="signup-btn" onClick={() => setShowSignupModal(true)}>Sign up</button>
            </>
          )}
        </div>
      </div>

      <h1 className="welcome-header text-center">Computers</h1>

      <div className="button-group">
        {["All", "Recents", "Favorites"].map((type) => (
          <button
            key={type}
            className={`filter-button ${selected === type ? "active" : ""}`}
            onClick={() => handleFilterChange(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="items-container">
        {currentItems.length === 0 ? (
          <div className="items-container-loading" style={{ gridColumn: "1 / -1" }}>
            <LoadingSpinner />
          </div>
        ) : (
          currentItems.map((item) => (
            <div className="item-card" key={item.itemId}>
              <div
                className="item-image"
                style={{ backgroundImage: `url(${item.item_photo})` }}
              />
              <div className="item-details">
                <div>
                  <h5>{item.itemName}</h5>
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

      <div className="pagination-container">
        <Pagination>
          <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {renderPaginationItems()}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>

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
    </div>
  );
};

export default Computers;
