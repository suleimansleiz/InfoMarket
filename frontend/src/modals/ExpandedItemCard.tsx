import React, {  } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


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

interface Props {
  show: boolean;
  onHide: () => void;
  item: Item | null;
  onPurchase: () => void;
}

const ExpandedItemCard: React.FC<Props> = ({ show, onHide, item, onPurchase }) => {
  if (!item) return null;

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
          <Modal.Title className="modal-title">{item.itemName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <img
            src={item.item_photo}
            alt="item"
            className="img-fluid rounded mb-3"
          />
          <p><strong>Price:</strong> Tsh {Number(item.item_price).toLocaleString()}</p>
          <p><strong>Category:</strong> {item.itemCategory}</p>
          <p><strong>Description:</strong> {item.item_description}</p>
          <p><strong>Seller:</strong> {item.seller_name} - {item.sellerPhone}</p>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="secondary" onClick={onHide}>Close</Button>
          <Button variant="primary" onClick={onPurchase}>Purchase</Button>
        </Modal.Footer>
      </Modal>

      
    </>
  );
};

export default ExpandedItemCard;


