import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PurchaseModal from "./PurchaseModal";

interface Item {
  item_id: string;
  item_photo?: string;
  item_name: string;
  item_price: string;
  item_category: string;
  item_description: string;
  seller_name: string;
  seller_phone: string;
}

interface Props {
  show: boolean;
  onHide: () => void;
  item: Item | null;
}

const ExpandedItemCard: React.FC<Props> = ({ show, onHide, item }) => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  if (!item) return null;

  const openPurchaseModal = () => setShowPurchaseModal(true);
  const closePurchaseModal = () => setShowPurchaseModal(false);

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        centered
        size="sm"
        className="modal-full"
        dialogClassName="modal-container"
      >
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title className="modal-title">{item.item_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <img
            src={item.item_photo}
            alt="item"
            className="img-fluid rounded mb-3"
          />
          <p><strong>Price:</strong> Tsh {Number(item.item_price).toLocaleString()}</p>
          <p><strong>Category:</strong> {item.item_category}</p>
          <p><strong>Description:</strong> {item.item_description}</p>
          <p><strong>Seller:</strong> {item.seller_name} - {item.seller_phone}</p>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="secondary" onClick={onHide}>Close</Button>
          <Button variant="primary" onClick={openPurchaseModal}>Purchase</Button>
        </Modal.Footer>
      </Modal>

      {/* Purchase Modal */}
      <PurchaseModal
        show={showPurchaseModal}
        onHide={closePurchaseModal}
        item={item}
      />
    </>
  );
};

export default ExpandedItemCard;


