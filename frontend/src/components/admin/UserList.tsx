import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axiosConfig";
import { Button, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ToastMessage from "../mini-components/ToastMessage";
import AddUserModal from "../../modals/AddUserModal";

interface NewUser {
  username: string;
  email: string;
  phone: string;
  password: string;
  userClass: "Regular" | "VIP";
}

type Item = {
  userId: number;
  username: string;
  email: string;
  phone: string;
  password: string;
  userClass: string;
};

const UserList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selected, setSelected] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 15;

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [loadingAdd, setLoadingAdd] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [toastVrt, setToastVrt] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get<Item[]>("/api/infomarket/v1/user");
        setItems(response.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };
    fetchItems();
  }, []);

  // Filter and pagination logic...
  const filteredItems = items.filter(
    (item) => selected === "all" || item.userClass.toLowerCase() === selected
  );
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
    const pages = [];
    // same logic as before...
    for (
      let number = Math.max(1, currentPage - 1);
      number <= Math.min(currentPage + 1, totalPages);
      number++
    ) {
      pages.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return pages;
  };

  const handleAddUser = async (newUser: NewUser) => {
    setLoadingAdd(true);
    try {
      await api.post("/api/infomarket/v1/admin/user/create", newUser);
      setShowAddModal(false);
      setToastMsg("User added successfully");
      setToastVrt("success");
      setShowToast(true);
      const response = await api.get<Item[]>("/api/infomarket/v1/user");
      setItems(response.data);
    } catch (error) {
      setShowAddModal(false);
      setToastMsg("Failed to add user");
      setToastVrt("danger");
      setShowToast(true);
      console.error("Failed to add user", error);
    } finally {
      setLoadingAdd(false);
    }
  };
    return (
      <div className="admin-table-container">
        <div className="admin-table-header">
          <div className="pill-filters">
            {["all", "regular", "vip"].map((type) => (
              <button
                key={type}
                className={`pill-btn ${selected === type ? "active" : ""}`}
                onClick={() => {
                  setSelected(type);
                  setCurrentPage(1);
                }}
              >
                {type === "all" ? "All" : type === "regular" ? "Regular" : "VIP"}
              </button>
            ))}
          </div>
          <div>
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              Add User
            </Button>
          </div>
        </div>

        <div className="table-header d-flex justify-content-between">
          <div className="table-header-start">
            <h4>Sales</h4>
          </div>
          <div className="table-header-end d-flex">
            <div className="status-dot-container d-flex align-items-center">
              <span className="status-dot bg-success"></span>
              <p className="mb-0">Regular</p>
            </div>
            <div className="status-dot-container d-flex align-items-center">
              <span className="status-dot bg-danger"></span>
              <p className="mb-0">VIP</p>
            </div>
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Password</th>
              <th>Class</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.userId}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.password}</td>
                <td>
                  <span
                    className={`status-dot ${
                      item.userClass && item.userClass.toLocaleLowerCase() === "regular" ? "Regular" : "VIP"
                    }`}
                  ></span>{" "}
                  {item.userClass}
                </td>
                <td>
                  <Link className="text-decoration-none" to={`/admin/users/${item.userId}`}>View</Link>
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
        <AddUserModal
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          onCreateUser={handleAddUser}
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

export default UserList;
