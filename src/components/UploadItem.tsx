import React, { useState, useEffect } from "react";
import { auth } from "../database/firebaseConfig";
import { getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

const db = getFirestore();

type Post = {
  id: string;
  imageURL?: string;
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

  useEffect(() => {
    fetchPosts();
  }, []);

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
      alert("You must be logged in to post an item.");
      return;
    }

    try {
      const { itemImage, ...data } = formData;
      const imageURL = itemImage ? URL.createObjectURL(itemImage) : "";

      const itemData = {
        ...data,
        imageURL,
        userId: currentUser.uid,
        postedAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "items"), itemData);
      setFormData({
        itemImage: null,
        itemName: "",
        price: "",
        category: "",
        description: "",
        sellerName: "",
        sellerPhoneNo: "",
      });

      fetchPosts();
      alert("Item posted successfully!");
    } catch (error) {
      console.error("Error posting item:", error);
      alert("Failed to post the item. Please try again.");
    }
  };

  const fetchPosts = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      alert("You must be logged in to view your posts.");
      return;
    }

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
      alert("Failed to fetch posts. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "items", id));
      fetchPosts();
      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  return (
    <div className="upload-item-container">
      <div className="card upload-item-card">
        <h3 className="upload-item-heading text-center">Upload Item</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="file"
              name="itemImage"
              className="form-control"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
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
          <div className="mb-3 text-center">
            <button type="submit" className="btn submit-btn">
              Post Your Item
            </button>
          </div>
        </form>
      </div>

      <div className="my-posts-container">
        <div className="my-posts-container-top">
          <h3 className="my-posts-heading">My Posts</h3>
        </div>
        <hr className="post-separater" />
        <div className="my-posts-container-btm">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div className="card-post" key={post.id}>
                <img src={post.imageURL} alt={post.itemName} className="post-image" />
                <div className="post-item">
                  <p><b>{post.itemName}</b></p>
                  <p>Price: {post.price}</p>
                  <p>Category: {post.category}</p>
                  <p>{post.description}</p>
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

