import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import api from "../api/axiosConfig";
import ProfileDropdown from "./ProfileDropdown";
import LoadingSpinner from "./LoadingSpinner";

type Post = {
  id: string;
  item_photo?: string;
  item_name: string;
  item_price: string;
  item_category: string;
  item_description: string;
  seller_name: string;
  seller_phone: string;
};

const UploadItem: React.FC = () => {
  const [formData, setFormData] = useState<{
    item_photo: File | null;
    item_name: string;
    item_price: string;
    item_category: string;
    item_description: string;
    seller_name: string;
    seller_phone: string;
  }>({
    item_photo: null,
    item_name: "",
    item_price: "",
    item_category: "",
    item_description: "",
    seller_name: "",
    seller_phone: "",
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [formAlertMsg, setFormAlertMsg] = useState<string | null>(null);
  const [formAlertVariant, setFormAlertVariant] = useState<'success' | 'danger' | 'warning' | 'info'>();
  const [postAlertMsg, setPostAlertMsg] = useState<string | null>(null);
  const [postAlertVariant, setPostAlertVariant] = useState<'success' | 'danger' | 'warning' | 'info'>();

  useEffect(() => {
    const phone = localStorage.getItem("seller_phone");
    const name = localStorage.getItem("seller_name");

    if (phone) {
      setFormData(prev => ({
        ...prev,
        seller_phone: phone,
        seller_name: name || "",
      }));
      fetchPosts(phone);
    }
  }, []);


  useEffect(() => {
    if (formAlertMsg) {
      const timer = setTimeout(() => setFormAlertMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [formAlertMsg]);

  useEffect(() => {
    if (postAlertMsg) {
      const timer = setTimeout(() => setPostAlertMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [postAlertMsg]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement & { files: FileList };
    if (name === "item_photo" && files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = (): boolean => {
    const { item_photo, item_name, item_price, item_category, item_description, seller_name, seller_phone } = formData;
    if (!item_photo || !item_name || !item_price || !item_category || !item_description || !seller_name || !seller_phone) {
      setFormAlertVariant('warning');
      setFormAlertMsg("Please fill out all fields before submitting.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      setLoading(true);
  
      const formDataImage = new FormData();
      formDataImage.append("item_photo", formData.item_photo!); // Image
      formDataImage.append("item_name", formData.item_name);
      formDataImage.append("item_price", formData.item_price);
      formDataImage.append("item_category", formData.item_category);
      formDataImage.append("item_description", formData.item_description);
      formDataImage.append("seller_name", formData.seller_name);
      formDataImage.append("seller_phone", formData.seller_phone);
  
      const uploadResponse = await api.post(
        "/api/infomarket/v1/items/upload",
        formDataImage
      );
  
      // Reset form
      setFormData({
      item_photo: null,
      item_name: "",
      item_price: "",
      item_category: "",
      item_description: "",
      seller_name: "",
      seller_phone: "",
      });

      fetchPosts(formData.seller_phone);
      setFormAlertVariant('success');
      setFormAlertMsg(uploadResponse.data);
    } catch (error) {
      console.error("Error posting item:", error);
      setFormAlertVariant('danger');
      setFormAlertMsg("Failed to post the item. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  const fetchPosts = async (phone: string) => {
    try {
      const response = await api.get<Post[]>(`/api/infomarket/v1/items/${phone}`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPostAlertVariant('warning');
      setPostAlertMsg("Failed to fetch your posts.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/api/infomarket/v1/items/${id}`);
      fetchPosts(formData.seller_phone);
      setPostAlertVariant('success');
      setPostAlertMsg("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      setPostAlertVariant('danger');
      setPostAlertMsg("Failed to delete post. Please try again.");
    }
  };

  if (loading) {
      return (
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            zIndex: 9999
          }}
        >
          <LoadingSpinner />
        </div>
      );
    }

  return (
    <div className="upload-item-container">
      <div className="topbar d-flex align-items-center p-3">
        <div className="topbar-alert"></div>
      <div className="topbar-seller-name">
      <h5 className="seller-name mb-0">{localStorage.getItem("seller_name")}</h5>
      <ProfileDropdown imageUrl="../../assets/blank-profile-pic.png" />
      </div>
      </div>
      <div className="card upload-item-card">
        <h3 className="upload-item-heading text-center">Upload Item</h3>
        {formAlertMsg && (
    <Alert
      variant={formAlertVariant}
      onClose={() => setFormAlertMsg(null)}
      className="mt-3"
    >
      {formAlertMsg}
    </Alert>
  )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="file"
              name="item_photo"
              className="form-control"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                name="item_name"
                placeholder="Item Name"
                className="form-control"
                value={formData.item_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                name="item_price"
                placeholder="Price"
                className="form-control"
                value={formData.item_price}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <select
                name="item_category"
                className="form-select"
                value={formData.item_category}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="Accessories">Accessories</option>
                <option value="Bags">Bags</option>
                <option value="Curteins">Curteins</option>
                <option value="Computers">Computers</option>
                <option value="Phones">Phones</option>
              </select>
            </div>
            <div className="col">
              <textarea
                name="item_description"
                placeholder="Describe your item"
                className="form-control"
                value={formData.item_description}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                name="seller_name"
                placeholder="Your Name"
                className="form-control"
                value={formData.seller_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                name="seller_phone"
                placeholder="Your Phone No."
                className="form-control"
                value={formData.seller_phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn submit-btn" disabled={loading}>
            Post Your Item
            </button>
          </div>
        </form>
      </div>

      <div className="my-posts-container">
        <h3 className="my-posts-heading">My Posts</h3>
          {postAlertMsg && (
            <Alert
              variant={postAlertVariant}
              onClose={() => setPostAlertMsg(null)}

              className="mt-3"
            >
              {postAlertMsg}
            </Alert>
          )}
        <div className="my-posts-container-btm">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div className="card-post" key={post.id}>
                <img src={post.item_photo} alt={post.item_name} className="post-image" />
                <div className="post-item">
                  <p><b>{post.item_name}</b></p>
                  <p>Price: {post.item_price}</p>
                  <button onClick={() => handleDelete(post.id)} className="delete-btn">
                    🗑️
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="noPost">No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadItem;