import React, { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { FaChevronDown} from "react-icons/fa";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from "framer-motion";
import api from "../api/axiosConfig";

interface Notifications {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notifications[]>([]);

  useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const response = await api.get("/api/infomarket/v1/notifications", {});
          const data = response.data.items || response.data;
          setNotifications(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Failed to fetch items:", error);
        }
      };
      fetchNotifications();
    }, []);

  return(
  <div className="w-full min-h-screen p-4 md:p-8 lg:p-12 items-center text-center bg-gray-50 justify-center">
    <div className="flex justify-center items-center  mb-5 bg-gray-50">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-pink-500 to-blue-800 bg-clip-text text-transparent">
        Notifications
      </h1>
    </div>
      <div>
      {notifications.length === 0 ? (
      <motion.div
                className="w-full flex flex-col justify-center items-center text-center"
                style={{ gridColumn: "1 / -1" }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
            {/* Animated icon */}
            <DotLottieReact
            src="https://lottie.host/dfca80bb-8cb6-4ddb-80da-3830e1ebd559/hBvoQENitz.lottie"
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
              No new notifications.
            </motion.h2>
      
            <p className="text-gray-600">Please check back later.</p>
          </motion.div>
      ) : (

      notifications.map(( notifications: Notifications ) => (
        <Disclosure key={notifications.id}>
          {({ open }) => (
            <div className="w-full bg-white rounded-lg shadow mb-2">
              {/* Header Row */}
              <Disclosure.Button className="w-full flex justify-between items-center px-4 py-3 cursor-pointer">
                <div className="flex items-center gap-3">
                  {/* Red dot for unread */}
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  <span className="font-semibold text-blue-600">{notifications.title}</span>
                </div>

                <FaChevronDown
                  className={`ml-2 text-blue-500 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Disclosure.Button>

              {/* Panel (Message) */}
              <Disclosure.Panel className="px-4 pb-4 text-gray-600 bg-white rounded-b-lg">
                {notifications.message}
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      ))
      )}
    </div>
    </div>
  );
};

export default Notifications;
