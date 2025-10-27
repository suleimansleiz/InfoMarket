import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axiosConfig";
import { Button, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddItemModal from "../../modals/AddItemModal";
import ToastMessage from "../../components/DialogMessage";

type Item = {
  itemId: number;
  itemName: string;
  itemCategory: string;
  seller_name: string;
  item_price: string;
  postedDate: string;
  status: string;
};

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selected, setSelected] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [showAddModal, setShowAddModal] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVrt, setToastVrt] = useState("");
  const [showToast, setShowToast] = useState(false);


  useEffect(() => {
    const fetchItems = async () => {
      const response = await api.get("/api/infomarket/v1/admin/items");
      const sortedItems = response.data.sort(
        (a: Item, b: Item) =>
          new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      );
      setItems(sortedItems);
    };
    fetchItems();
  }, []);

  // Filter based on status
  const filteredItems = items.filter(
    (item) => selected === "all" || item.status.toLowerCase() === selected
  );

  // Pagination logic
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddItem = async (formData: any) => {
  setLoadingAdd(true);
  try {
    await api.post("/api/infomarket/v1/admin/items/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setShowAddModal(false);
    setToastMsg("Item added successfully");
    setToastVrt("success");
    setShowToast(true);
    const response = await api.get("/api/infomarket/v1/admin/items");
    const sortedItems = response.data.sort(
      (a: Item, b: Item) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
    );
    setItems(sortedItems);
  } catch (error) {
    setShowAddModal(false);
    setToastMsg("Failed to add item");
    setToastVrt("danger");
    setShowToast(true);
    console.error("Failed to add item", error);
  } finally {
    setLoadingAdd(false);
  }
};


  return (
    <div className="admin-table-container">
      <div className="admin-table-header">
        <div className="pill-filters">
          {["all", "available", "sold"].map((type) => (
            <button
              key={type}
              className={`pill-btn ${selected === type ? "active" : ""}`}
              onClick={() => {
                setSelected(type);
                setCurrentPage(1);
              }}
            >
              {type === "all" ? "All" : type === "available" ? "Available" : "Sold"}
            </button>
          ))}
        </div>
        <div>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Add Item
          </Button>
        </div>
      </div>

      <div className="table-header d-flex justify-content-between">
        <div className="table-header-start">
          <h4>Items List</h4>
        </div>
        <div className="table-header-end d-flex">
          <div className="status-dot-container d-flex align-items-center">
            <span className="status-dot bg-success"></span>
            <p className="mb-0">Available</p>
          </div>
          <div className="status-dot-container d-flex align-items-center">
            <span className="status-dot bg-danger"></span>
            <p className="mb-0">Sold</p>
          </div>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Category</th>
            <th>Seller</th>
            <th>Price</th>
            <th>Status</th>
            <th>Posted on</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item.itemId}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{item.itemName}</td>
              <td>{item.itemCategory}</td>
              <td>{item.seller_name}</td>
              <td>{"Tsh " + (item.item_price).toLocaleString()}</td>
              <td>
                <span
                  className={`status-dot ${
                    item.status.toLocaleLowerCase() === "available" ? "available" : "sold"
                  }`}
                ></span>{" "}
                {item.status}
              </td>
              <td>{item.postedDate}</td>
              <td>
                <Link className="text-decoration-none" to={`/admin/items/${item.itemId}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-wrapper mt-3">
        <Pagination>
          <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {renderPaginationItems()}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>
      <AddItemModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onAddItem={handleAddItem}
        loading={loadingAdd}
      />
      <ToastMessage
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMsg}
        variant={toastVrt}
      />
    </div>
  );
};

export default ItemList;
