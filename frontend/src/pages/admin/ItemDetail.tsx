import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import { Button } from "react-bootstrap";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditStatusModal from "../../modals/EditStatusModal";
import AdminItemDeleteModal from "../../modals/AdminItemDeleteModal";

type Item = {
  itemId: number;
  item_photo: string;
  itemName: string;
  itemCategory: string;
  item_description: string;
  item_price: string;
  postedDate: string;
  status: string;
  seller_name: string;
  sellerPhone: string;
};

const ItemDetail: React.FC = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const title = "Confirm Delete";
  const message = "This item will be permanently deleted. Proceed?";

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/api/infomarket/v1/items/item/${itemId}`);
        setItem(res.data);
      } catch (err) {
        console.error("Error fetching item:", err);
      }
    };
    fetchItem();
  }, [itemId]);

  const handleEditStatus = async (newStatus: string) => {
    if (!itemId) return;
    setLoading(true);
    try {
      await api.put(`/api/infomarket/v1/admin/items/update/status/${itemId}?status=${newStatus}`);
      setItem((prev) => prev ? { ...prev, status: newStatus } : prev);
      console.error("updated status");
    } catch (error) {
      console.error("Failed to update status", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async () => {
    if (!itemId) return;
    setLoading(true);
    try {
      await api.delete(`/api/infomarket/v1/admin/items/delete/${itemId}`);
      console.error("updated status");
      navigate("/admin/items");
    } catch (error) {
      console.error("Failed to delete item", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-table-container">
      {item ? (
        <>
          <div className="admin-table-header">
            <div>
              <h3>{item.itemName}</h3>
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
          <div className="admin-item-detail">
            <div className="admin-item-image">
              <img src={item.item_photo} alt="Item" className="admin-item-img" />
            </div>
            <div className="admin-item-info">
              <p><strong>Category:</strong> {item.itemCategory}</p>
              <p><strong>Description:</strong> {item.item_description}</p>
              <p><strong>Price:</strong> Tsh {Number(item.item_price).toLocaleString()}</p>
              <p><strong>Posted on:</strong> {item.postedDate}</p>
              <p><strong>Status:</strong> {item.status}</p>
              <p><strong>Seller Details:</strong> {item.seller_name} ({item.sellerPhone})</p>
            </div>
          </div>

          <EditStatusModal
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
            status={item.status}
            onSave={handleEditStatus}
            loading={loading}
          />

          <AdminItemDeleteModal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteItem}
            loading={loading}
            message={message}
            title={title}
          />
        </>
      ) : (
        <div className="spinner-container">
          {/* <LoadingSpinner /> */}
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
