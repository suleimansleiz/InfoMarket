import React, { useState } from "react";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import api from "../api/axiosConfig";
import AwaitPaymentModal from "./AwaitPaymentModal";
import ToastMessage from "../components/DialogMessage";

interface PurchaseModalProps {
  show: boolean;
  onHide: () => void;
  item: {
    itemId: number;
    itemName: string;
    item_price: string;
    seller_name: string;
    sellerPhone: string;
  };
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({
  show,
  onHide,
  item,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    network: "",
    location: "",
    block: "",
    agreed: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    network: "",
    location: "",
    block: "",
  });

  const [loading, setLoading] = useState(false);
  const [showAwaitPaymentModal, setShowAwaitPaymentModal] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastTitle, setToastTitle] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [orderReference, setOrderReference] = useState<string | null>(null);

  const validate = () => {
    const newErrors: typeof errors = { email: "", phone: "", network: "", location: "", block: "", };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /255\d{9}$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone must start with 255...";
    }

    if (!formData.network) {
      newErrors.network = "Please select a network";
    }

    if (!formData.location) {
      newErrors.network = "Please select your location";
    }

    if (!formData.block) {
      newErrors.network = "Please insert block number";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleBuy = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      const res = await api.post("/api/infomarket/v1/payments/initiate-ussd", {
      itemId: item.itemId,
      itemName: item.itemName,
      itemPrice: item.item_price,
      sellerName: item.seller_name,
      sellerPhone: item.sellerPhone,
      buyerEmail: formData.email,
      buyerPhone: formData.phone,
      paymentNetwork: formData.network,
      location: formData.location,
      block: formData.block,
    });

    const orderReference = res.data.orderReference;
    setOrderReference(orderReference);
    setShowAwaitPaymentModal(true);

      setShowAwaitPaymentModal(true);
      onHide();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setToastMsg("Something went wrong. Please try again.");
      setToastTitle("Failure");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, type } = e.target;
  const value = type === "checkbox"
    ? (e.target as HTMLInputElement).checked
    : e.target.value;

  setFormData((prev) => ({ ...prev, [name]: value }));
};


  return (
    <>
      <Dialog open={show} onClose={onHide} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/70">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-4 border border-gray-300 rounded-lg">
            <DialogTitle
              className="font-bold text-center text-blue-900 text-lg">
              Confirm Purchase
            </DialogTitle>
            <Description>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Enter email"
                  onChange={handleChange}
                  className={`w-full px-3 py-2 mb-2 border rounded-lg focus:ring-2 focus:ring-gray-300 outline-none ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && <p className="error-texts text-danger">{errors.email}</p>}

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  placeholder="Enter Phone (255...)"
                  onChange={handleChange}
                  className={`w-full px-3 py-2 mb-2 border rounded-lg focus:ring-2 focus:ring-gray-300 outline-none ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phone && <p className="error-texts text-danger">{errors.phone}</p>}

                <select
                  name="network"
                  value={formData.network}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 mb-2 border rounded-lg focus:ring-2 focus:ring-gray-300 outline-none ${
                    errors.network ? "border-red-500" : "border-gray-300"
                  }`}>
                  <option value="">Select Mode of Payment</option>
                  <option value="mpesa">M-Pesa</option>
                  <option value="tigopesa">Tigo Pesa</option>
                  <option value="airtelmoney">Airtel Money</option>
                  <option value="halopesa">HaloPesa</option>
                </select>
                {errors.network && <p className="error-texts text-danger">{errors.network}</p>}

                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 mb-2 border rounded-lg focus:ring-2 focus:ring-gray-300 outline-none ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}>
                    <option value="">Select Location</option>
                    <option value="cive">CIVE</option>
                    <option value="social">Social</option>
                    <option value="humanity">Humanity</option>
                    <option value="coed">COED</option>
                    <option value="tiba">Tiba</option>
                  </select>
                  {errors.location && <p className="error-texts text-danger">{errors.location}</p>}

                <input
                  type="text"
                  name="block"
                  value={formData.block}
                  placeholder="Block No. ie Block 5A-G1"
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-300 outline-none ${
                    errors.block ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.block && <p className="error-texts text-danger">{errors.block}</p>}
              </div>

              <div className="flex items-center mt-3">
              <input
                type="checkbox"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
                id="agreed"
                className="text-green-600 cursor-pointer"
              />
              <label htmlFor="agreed" className="ml-2 text-sm text-gray-600">
                You're about to buy {item.itemName} for Tsh {item.item_price.toLocaleString()} from {item.seller_name}. Delivery fees shall be paid by cash. Agree to buy.
              </label>
            </div>
            </Description>
              <div className="flex gap-2 justify-end mt-4">
                <button
                  onClick={onHide}
                  className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 cursor-pointer"
                >
                  Abort
                </button>
                <button
                  onClick={handleBuy}
                  disabled={!formData.agreed || loading}
                  className={`px-3 py-1 text-white rounded transition
                    ${!formData.agreed || loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 cursor-pointer"}`}>
                  {loading ? "Buying..." : "Buy"}
                </button>
              </div>
          </DialogPanel>
        </div>
      </Dialog>

      <AwaitPaymentModal
        show={showAwaitPaymentModal}
        onHide={() => setShowAwaitPaymentModal(false)}
        dialogTitle="Payment Confirmation"
        message="Thank you. Please complete payment via USSD-PUSH notification dialog sent to your phone. Once you have completed, click Confirm button."
        orderReference={orderReference ?? ""}
      />

      <ToastMessage
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMsg}
        dialogTitle={toastTitle}
      />
    </>
  );
};

export default PurchaseModal;
