import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import { Button } from "react-bootstrap";
import { faEdit, faHeart, faMoneyBill, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminItemDeleteModal from "../../modals/AdminItemDeleteModal";
import ToastMessage from "../../components/DialogMessage";
import EditPersonelModal from "../../modals/EditPersonelModal";

type Item = {
  userId: string;
  username: string;
  email: number;
  phone: string;
  password: string;
  userClass: string;
  profilePicture: string;
  createdAt: string;
};

const UserDeatail: React.FC = () => {
  const { userId } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVrt, setToastVrt] = useState("");
  const [showToast, setShowToast] = useState(false);
  const title = "Confirm Delete";
  const message = "This user will be permanently deleted. Proceed?";


  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/api/infomarket/v1/users/user/${userId}`);
        setItem(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchItem();
  }, [userId]);

  const handleEditStatus = async (newClass: string, formData: unknown) => {
    if (!userId) return;
    setLoading(true);
    try {
      await api.put(`/api/infomarket/v1/admin/user/update/${userId}?userClass=${newClass}`, formData);
      setItem((prev) => prev ? { ...prev, userClass: newClass, formData } : prev);
      setToastMsg("User updated successfully");
      setToastVrt("success");
      setShowToast(true);
    } catch (error) {
      setToastMsg("Failed to update user");
      setToastVrt("danger");
      setShowToast(true);
      console.error("Failed to update status", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      await api.delete(`/api/infomarket/v1/admin/user/delete/${userId}`);
      setToastMsg("User deleted successfully");
      setToastVrt("success");
      navigate("/admin/users");
    } catch (error) {
      setToastMsg("Failed to delete user");
      setToastVrt("danger");
      console.error("Failed to delete user", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="people-container">
          <div className="people-header">
            <div className="people-profile">
                <img
                src={item ? item.profilePicture : "../../assets/blank-profile-pic.png"}
                width={70}
                height={70}
                style={{ objectFit: "cover", borderRadius: "50%" }}
                alt="Profile"
                className="admin-img"
                />
              <div className="people-details">
                <div className="people-info">
                    <h5>{item ? item.username : "User Name"}</h5>
                    <p>{item ? item.userClass : "Regular"}</p>
                </div>
                <div className="people-contact">
                    <p>{item ? item.email : "example@gmail.com"}</p>
                    <p>{item ? item.phone : "255784911656"}</p>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column justify-content-end">
              <Button variant="primary" className="item-edit-btn mb-2" onClick={() => setShowEditModal(true)}>
                <FontAwesomeIcon icon={faEdit} className="me-2" />
                Edit
              </Button>
              <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                <FontAwesomeIcon icon={faTrash} className="me-2" />
                Delete Item
              </Button>
            </div>
          </div>
          <div className="actions">
            <div className="people-actions">
                <p>Send Email</p>
                <p>Send SMS</p>
            </div>
            <hr />
          </div>
          <div className="people-overwiew">
            <div className="overview-header">
                <h4>Overview</h4>
                <p>Availbale Since: {item? item.createdAt : "2025-07-30"}</p>
            </div>
            <div className="overview-content">
                <div className="fav-items">
                    <h5><FontAwesomeIcon icon={faHeart} className="me-2" />Favorite Items</h5>
                    <div>
                        <p>No Favorite items selected</p>
                    </div>
                </div>
                <div className="purchased-items">
                    <h5><FontAwesomeIcon icon={faMoneyBill} className="me-2" />Purchased Items</h5>
                    <div>
                        <p>No Purchased items available</p>
                    </div>
                </div>
            </div>
          </div>
          <EditPersonelModal
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
            userClass={item ? item.userClass : ""}
            onSave={handleEditStatus}
            loading={loading}
            title="Edit User Details"
            formData={
              item
                ? {
                    username: item.username,
                    phone: item.phone,
                    password: item.password,
                    profilePicture: item.profilePicture,
                  }
                : { username: "", phone: "", password: "", profilePicture: "" }
            }
          />

          <AdminItemDeleteModal
            show={showDeleteModal}
            title={title}
            message={message}
            onHide={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteItem}
            loading={loading}
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

export default UserDeatail;
