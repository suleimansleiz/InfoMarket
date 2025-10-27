import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import toast, { Toaster } from 'react-hot-toast';
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type Post = {
  item_id: number;
  item_photo?: string;
  item_name: string;
  item_price: string;
  item_category: string;
  item_description: string;
  seller_name: string;
  seller_phone: string;
};

const SellerItems: React.FC = () => {
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
        const [formAlertMsg, setFormAlertMsg] = useState<string | null>(null);
        const [postAlertMsg, setPostAlertMsg] = useState<string | null>(null);
        const [showDeleteModal, setShowDeleteModal] = useState(false);
        const [itemToDelete, setItemToDelete] = useState<Post | null>(null);
        const [deleting, setDeleting] = useState(false);

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

          const fetchPosts = async (phone: string) => {
            try {
              const response = await api.get<Post[]>(`/api/infomarket/v1/items/phone/${phone}`);
              setPosts(response.data);
            } catch (error) {
              console.error("Error fetching posts:", error);
              toast.error("Failed to fetch your posts");
            }
          };
        
          const openDeleteModal = (post: Post) => {
            setItemToDelete(post);
            setShowDeleteModal(true);
          };
        
          const handleDelete = async () => {
            if (!itemToDelete) return;
            setDeleting(true);
        
            try {
              await api.delete(`/api/infomarket/v1/items/${itemToDelete.item_id}`);
              await fetchPosts(formData.seller_phone);
              setShowDeleteModal(false);
              setItemToDelete(null);
              toast.success("Item deleted successfully");
            } catch (error) {
              setShowDeleteModal(false);
              toast.error("Failed to delete item");
              console.error("Failed to delete item:", error);
            } finally {
              setDeleting(false);
            }
          };

    return (
        <>
            <div className="w-full min-h-screen p-4 md:p-8 lg:p-12 items-center text-center bg-gray-50 justify-center">
                <div className="flex justify-center items-center  mb-5 bg-gray-50">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-pink-500 to-blue-900 bg-clip-text text-transparent">
                        My Posts
                    </h1>
                </div>

                <div className="w-full flex flex-col px-6 gap-4 md:gap-6 lg:gap-8 px-4 lg:px-15 bg-white rounded-lg shadow-sm py-4">
                <h3 className="text-xl text-blue-600">Hi, these are all the items you posted.</h3>
                <div className="my-posts-container-btm grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2 flex-grow">
                    {posts.length === 0 ? (
                        <motion.div
                            className="w-full flex flex-col justify-center items-center text-center"
                            style={{ gridColumn: "1 / -1" }}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                        {/* Animated icon */}
                        <DotLottieReact
                        src="https://lottie.host/a61bff08-9037-4e31-9508-3373ccf9a085/8aVkTo3hgC.lottie"
                        loop
                        autoplay
                        className="md:h-50"
                        />
                        <motion.div
                            className="mb-4 text-gray-400"
                            initial={{ scale: 0 }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "mirror",
                            }}
                        >
                            <i className="fas fa-box-open text-6xl"></i>
                        </motion.div>

                        {/* Text with subtle pulse */}
                        <motion.h2
                            className="text-2xl font-semibold mb-2 text-gray-600"
                            animate={{ opacity: [1, 0.7, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            No Posts yet!
                        </motion.h2>

                        <p className="text-gray-600">Post to view your products here.</p>
                        </motion.div>
                    ) : (
                    posts.map((post) => (
                        <div className="item-card" key={post.item_id}>
                        <div
                            className="item-image"
                            style={{ backgroundImage: `url(${post.item_photo})` }}
                        />
                        <div className="item-details">
                            <div>
                            <h5>{post.item_name}</h5>
                            <p>Tsh {post.item_description}</p>
                            <p>Tsh {post.item_price.toLocaleString()}</p>
                            </div>
                            <div className="icon-btn">
                            <button className="expand-button" onClick={() => openDeleteModal(post)}>
                            <FontAwesomeIcon icon="trash" />
                            </button>
                            </div>
                        </div>
                        </div>
                    ))
                    )}
                </div>
                </div>
                <DeleteConfirmationModal
                show={showDeleteModal}
                onHide={() => {
                    setShowDeleteModal(false);
                    setItemToDelete(null);
                }}
                onDelete={handleDelete}
                itemName={itemToDelete?.item_name || "this item"}
                deleting={deleting}
                />

                <Toaster position="top-right"
                reverseOrder={false} />
            </div>
        </>
    );
}

export default SellerItems;