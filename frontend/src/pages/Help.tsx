/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import api from "../api/axiosConfig";
import DialogMessage from "../components/DialogMessage";
import Navbar from "../components/Navbar";

const Help: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", issue: "", feedback: "", phone: ""});
  const [errors, setErrors] = useState({ email: "", issue: "", feedback: "", phone: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");

  const validateForm = (): boolean => {
  const newErrors = { email: "", issue: "", feedback: "", phone: "" };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /255\d{9}$/;

    if (!formData.email) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email.";

    if (!formData.issue) newErrors.issue = "Please select an Issue to report.";

    if (!formData.phone) { newErrors.phone = "Phone is required.";
    }else if ( !phoneRegex.test(formData.phone) ) { newErrors.phone = "Enter a valid phone number."; }

    if (!formData.feedback) newErrors.feedback = "What's your feedback?";

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const submitEmail = async () => {
      if (!validateForm()) return;
      setLoading(true);
  
      try {
        const response = await api.post("/api/infomarket/v1/user/feedback", formData);
          setDialogMsg(response.data);
          setDialogTitle("Thanks for the feedback, We appreciate it.");
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          setDialogMsg("Please fill in the required details.");
          setDialogTitle("Careful!");
          setIsOpen(true);
        } else {
          setDialogMsg("Please check your internet connectivity and try again.");
          setDialogTitle("Oops!");
          setIsOpen(true);
        }
      } finally {
        setLoading(false);
      }
    };

  return(
    <>
      <Navbar />
      <div className="w-full min-h-screen p-4 md:p-8 lg:p-12 items-center text-center bg-gray-50 justify-center">
    <div className="flex justify-center items-center  mb-5 bg-gray-50">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-pink-500 to-blue-800 bg-clip-text text-transparent">
        Support
      </h1>
    </div>
      <div>
        <div className="w-full flex flex-col px-6 gap-4 md:gap-6 lg:gap-8 px-4 lg:px-15 bg-white rounded-lg shadow-sm py-4">
          <div className="flex flex-col gap-3">
          <h1 className="text-2xl text-blue-900 font-semibold text-center">Seeking for help!</h1>
          <h1 className="text-xl text-gray-600 text-center">Well, how may we help you today?</h1>
          </div>
          <div className="flex flex-col gap-4 text-left">
          <form onSubmit={submitEmail}>
            <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full px-3 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-gray-300 outline-none ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}

        <input
          type="text"
          name="phone"
          placeholder="Phone Number ie. 255712345678"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={`w-full px-3 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-gray-300 outline-none ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
            <select
              name="issue"
              value={formData.issue}
              onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
              className={`w-full px-3 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none appearance-none bg-white text-gray-700 ${
                errors.issue ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" disabled hidden>
                What's your issue
              </option>
              <option value="newFeature">Suggest new feature</option>
              <option value="experiencingErrors">Experiencing errors</option>
              <option value="remarks">Remarks</option>
            </select>
            {errors.issue && <p className="text-xs text-red-500">{errors.issue}</p>}

            <textarea
              name="feedback"
              placeholder="Describe your item"
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              className={`w-full px-3 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-gray-300 outline-none ${
                errors.feedback ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.feedback && <p className="text-xs text-red-500">{errors.feedback}</p>}

              <button
            onClick={submitEmail}
            disabled={loading}
            type="submit"
            className="w-full mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Submitting Feedback..." : "Submit Feedback"}
          </button>
          </form>
        </div>
        </div>
      </div>
      <DialogMessage
        show={isOpen}
        onClose={() => setIsOpen(false)}
        dialogTitle={dialogTitle}
        message={dialogMsg}
        />
    </div>
    </>
  );
};

export default Help;
