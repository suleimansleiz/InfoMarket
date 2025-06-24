import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import FeedbackModal from "../modals/FeedbackModal";

const Help: React.FC = () => {
  const [formData, setFormData] = useState<{
    email: string;
    issue: string;
    feedback: string;
  }>({
    email: "",
    issue: "",
    feedback: "",
  });


  const [formSimulation, setFormSimulation] = useState<string | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);


  useEffect(() => {
      if (formSimulation) {
        const timer = setTimeout(() => setFormSimulation(null), 3000);
        return () => clearTimeout(timer);
      }
    }, [formSimulation]);

  const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const openFeedbackCModal = () => {
      setShowFeedbackModal(true);
    };

    const validateForm = (): boolean => {
      const { email, issue, feedback } = formData;
      if (!email || !issue || !feedback ) {
        
        return false;
      }
      return true;
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        openFeedbackCModal();

    };

  return(
    <div>
      <div className="topbar d-flex align-items-center p-3">
        <h1 className="headers-2">Help</h1>
      </div>
      <div className="center-container">
        <div className="container-card card">
          <div className="card-top">
          <h6>Hello,</h6>
          <h6>how can we help you?</h6>
          </div>
          <div className="card-input">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Your Phone No."
              className="form-control"
              value={formData.email}
              onChange={handleInputChange}
            />
            <select
                name="issue"
                className="form-select"
                value={formData.issue}
                onChange={handleInputChange}
            >
              <option value="" disabled>
                What's your issue
              </option>
              <option value="newFeature">Suggest new feature</option>
              <option value="experiencingErrors">Experiencing errors</option>
              <option value="remarks">Remarks</option>
            </select>
            <textarea
              name="feedback"
              placeholder="Describe your item"
              className="form-control"
              value={formData.feedback}
              onChange={handleInputChange}
            />
              <Button variant="primary"
              type="submit">
                Send Feeback
              </Button>
          </form>
        </div>
        </div>
      </div>
      <FeedbackModal
        show={showFeedbackModal}
        onHide={() => {
          setShowFeedbackModal(false);
        } }
      />
    </div>
  );
};

export default Help;
