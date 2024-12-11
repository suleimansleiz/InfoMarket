import React from "react";

const UploadItem: React.FC = () => {
  return (
    <div className="upload-item-container">
      <div className="card upload-item-card">
        <h3 className="text-center">Upload Item</h3>
        <form>
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
              <select name="category" className="form-select">
                <option value="" disabled selected>
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

