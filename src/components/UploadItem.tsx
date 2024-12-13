import React, { useState } from "react";
import { auth } from "../database/firebaseConfig";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";

const db = getFirestore();

type Post = {
  id: string;
  itemImage?: string;
  itemName: string;
  price: string;
  category: string;
  description: string;
  sellerName: string;
  sellerPhoneNo: string;
  userId: string;
  postedAt: string;
};

const UploadItem: React.FC = () => {
  const [formData, setFormData] = useState({
    itemImage: null as File | null,
    itemName: "",
    price: "",
    category: "",
    description: "",
    sellerName: "",
    sellerPhoneNo: "",
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [dialog, setDialog] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement & { files: FileList };
    if (name === "itemImage" && files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setDialog({ type: "error", message: "You must be logged in to post an item." });
      return;
    }

    try {
      const { itemImage, ...data } = formData;

      // Replace with actual image upload logic (e.g., Firebase Storage)
      const imageURL = itemImage ? URL.createObjectURL(itemImage) : "";

      const itemData = {
        ...data,
        imageURL,
        userId: currentUser.uid,
        postedAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "items"), itemData);

      // Reset form
      setFormData({
        itemImage: null,
        itemName: "",
        price: "",
        category: "",
        description: "",
        sellerName: "",
        sellerPhoneNo: "",
      });

      // Show success dialog
      setDialog({ type: "success", message: "Item posted successfully!" });
    } catch (error) {
      console.error("Error posting item:", error);
      setDialog({ type: "error", message: "Failed to post the item. Please try again." });
    }
  };

  const fetchPosts = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setDialog({ type: "error", message: "You must be logged in to view your posts." });
      return;
    }

    setIsLoadingPosts(true);

    try {
      const q = query(collection(db, "items"), where("userId", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Post, "id">),
      }));

      setPosts(items);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setDialog({ type: "error", message: "Failed to fetch posts. Please try again." });
    } finally {
      setIsLoadingPosts(false);
    }
  };

  return (
    <div className="upload-item-container">
      {/* Dialog Overlay */}
      {dialog && (
        <div className="dialog-overlay">
          <div className={`dialog-card ${dialog.type}`}>
            <div className="dialog-icon">
              {dialog.type === "success" ? "✔️" : "❌"}
            </div>
            <p>{dialog.message}</p>
            <button onClick={() => setDialog(null)} className="dialog-button">
              {dialog.type === "success" ? "OK" : "Cancel"}
            </button>
          </div>
        </div>
      )}

      <div className="my-posts-container">
        <div className="my-posts-container-top">
          <h3 className="my-posts-heading">View your Posts</h3>
          <button className="my-posts-btn" onClick={fetchPosts}>
            Posts
          </button>
        </div>
        <hr className="post-separater" />
        <div className="my-posts-container-btm">
          {isLoadingPosts ? (
            <p className="loading">Loading posts...</p>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="post-item">
                <img src={post.itemImage} alt={post.itemName} className="post-image" />
                <div>
                  <h5>{post.itemName}</h5>
                  <p>Price: {post.price}</p>
                  <p>Category: {post.category}</p>
                  <p>{post.description}</p>
                  <p>Seller: {post.sellerName}</p>
                  <p>Phone: {post.sellerPhoneNo}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="noPost">Click to view your posts</p>
          )}
        </div>
      </div>

      <div className="card upload-item-card">
        <h3 className="upload-item-heading text-center">Upload Item</h3>
        <form onSubmit={handleSubmit}>
          {/* Image Picker */}
          <div className="mb-3">
            <input
              type="file"
              name="itemImage"
              className="form-control"
              accept="image/*"
              onChange={handleInputChange}
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
                value={formData.itemName}
                onChange={handleInputChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                name="price"
                placeholder="Price"
                className="form-control"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Category Selector and Description */}
          <div className="row mb-3">
            <div className="col">
              <select
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleInputChange}
              >
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
                value={formData.description}
                onChange={handleInputChange}
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
                value={formData.sellerName}
                onChange={handleInputChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                name="sellerPhoneNo"
                placeholder="Your Phone No."
                className="form-control"
                value={formData.sellerPhoneNo}
                onChange={handleInputChange}
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


