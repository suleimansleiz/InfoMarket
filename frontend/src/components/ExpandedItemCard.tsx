import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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
  if (!item) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="sm"
      backdropClassName="custom-blur-backdrop"
    >
      <Modal.Header closeButton>
        <Modal.Title>{item.item_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={item.item_photo}
          alt="item"
          className="img-fluid rounded mb-3"
        />
        <p><strong>Price:</strong> Tsh {item.item_price}</p>
        <p><strong>Category:</strong> {item.item_category}</p>
        <p><strong>Description:</strong> {item.item_description}</p>
        <p><strong>Seller:</strong> {item.seller_name} - {item.seller_phone}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary">Purchase</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExpandedItemCard;

