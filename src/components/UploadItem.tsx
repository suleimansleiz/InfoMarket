import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const UploadItem: React.FC = () => {
  const [alertType, setAlertType] = useState<"success" | "danger" | null>(null);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simulate a success or error condition
    const isSuccess = Math.random() > 0.5; // Replace with real success condition
    if (isSuccess) {
      setAlertType("success");
      setAlertMessage("Item posted successfully!");
    } else {
      setAlertType("danger");
      setAlertMessage("Failed to post the item. Please try again.");
    }

    // Optionally clear the form or perform additional actions
  };

  return (
    <div className="upload-item-container">
      <div
        className="alert upload-item-alert alert-primary alert-dismissible fade show"
        role="alert"
      >
        <b>Welcome User. Post your Items now.</b>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      {/* Conditional Alert for Submit */}
      {alertType && (
        <div
          className={`alert upload-item-alert alert-${alertType} alert-dismissible fade show`}
          role="alert"
        >
          {alertMessage}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setAlertType(null)} // Hide alert on close
          ></button>
        </div>
      )}

      {/* Upload Item Card */}
      <div className="card upload-item-card">
        <h3 className="text-center">Upload Item</h3>
        <form onSubmit={handleSubmit}>
          {/* Image Picker */}
          <div className="mb-3">
            <input
              type="file"
              name="itemImage"
              className="form-control"
              accept="image/*"
            />
          </div>

          {/* Item Name and Price */}
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                name="itemName"
                placeholder="Item Name"
                className="form-control"
              />
            </div>
            <div className="col">
              <input
                type="text"
                name="price"
                placeholder="Price"
                className="form-control"
              />
            </div>
          </div>

          {/* Category Selector and Description */}
          <div className="row mb-3">
            <div className="col">
              <select name="category" className="form-select" defaultValue="">
                <option value="" disabled>
                  Select Category
                </option>
                <option value="Accessories">Accessories</option>
                <option value="Bags">Bags</option>
                <option value="Carteins">Carteins</option>
                <option value="Computers">Computers</option>
                <option value="Phones">Phones</option>
              </select>
            </div>
            <div className="col">
              <input
                type="text"
                name="description"
                placeholder="Describe your Item"
                className="form-control"
              />
            </div>
          </div>

          <hr className="separater" />

          {/* Seller Name and Phone Number */}
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                name="sellerName"
                placeholder="Your Name"
                className="form-control"
              />
            </div>
            <div className="col">
              <input
                type="text"
                name="sellerPhoneNo"
                placeholder="Your Phone No."
                className="form-control"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mb-3 text-center">
            <button type="submit" className="btn submit-btn">
              Post Your Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadItem;


