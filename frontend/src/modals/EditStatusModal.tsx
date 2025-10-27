import React, { useState } from "react";
import { Description, Dialog, DialogPanel, DialogTitle, Field, Label, Radio, RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

interface EditStatusModalProps {
  show: boolean;
  onHide: () => void;
  status: string;
  onSave: (newStatus: string) => void;
  loading: boolean;
}

  const EditStatusModal: React.FC<EditStatusModalProps> = ({ show, onHide, status, onSave, loading}) => {
  const [newStatus] = React.useState(status);
  const statuses = ['Available', 'Sold'];
  const [selected, setSelected] = useState(statuses[0]);

  const handleSave = () => {
    onSave(newStatus);
    onHide();
  };

  return (
    // <Modal
    //   size="sm"
    //   className="modal-full"
    //   dialogClassName="modal-container"
    //   show={show}
    //   onHide={onHide}
    //   animation
    //   centered
    // >
    //   <Modal.Header className="modal-header" closeButton>
    //     <Modal.Title className="modal-title">Edit Item Status</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body className="modal-body">
    //     <Form className="modal-form">
    //       <Form.Group>
    //         <Form.Check
    //           type="radio"
    //           label="Available"
    //           name="status"
    //           value="Available"
    //           checked={newStatus === "Available"}
    //           onChange={() => setNewStatus("Available")}
    //         />
    //         <Form.Check
    //           type="radio"
    //           label="Sold"
    //           name="status"
    //           value="Sold"
    //           checked={newStatus === "Sold"}
    //           onChange={() => setNewStatus("Sold")}
    //         />
    //       </Form.Group>
    //     </Form>
    //   </Modal.Body>
    //   <Modal.Footer className="modal-footer">
    //     <Button variant="secondary" onClick={onHide}>Cancel</Button>
    //     <Button variant="primary" onClick={handleSave}>
    //     {loading ? <Spinner size="sm" animation="border" /> : "Save"}
    //     </Button>
    //   </Modal.Footer>
    // </Modal>

    <>
      <Dialog open={show} onClose={onHide} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/70">
              <DialogPanel className="max-w-lg space-y-4 border bg-white p-4 border border-gray-300 rounded-lg">
                <DialogTitle
                  className="font-bold text-center text-blue-900 text-lg">
                  Edit Item Status
                </DialogTitle>
                <Description>
                  <RadioGroup value={selected} onChange={setSelected} aria-label="Server size">
                    {statuses.map((status) => (
                      <Field key={status} className="flex items-center gap-2">
                        <Radio
                          value={status}
                          className="group flex size-5 my-1 items-center justify-center rounded-full border border-gray-300 bg-white data-checked:bg-blue-400 cursor-pointer"
                        >
                          {/* <span className="invisible size-2 rounded-full bg-white group-data-checked:visible" /> */}
                          <CheckCircleIcon className="size-6 fill-gray-100 opacity-0 transition group-data-checked:opacity-100" />
                        </Radio>
                        <Label>{status}</Label>
                      </Field>
                    ))}
                  </RadioGroup>
                </Description>
                  <div className="flex gap-2 justify-end mt-4">
                    <button onClick={onHide} className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer">
                      Cancel
                    </button>
                    <button onClick={handleSave} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">
                      {loading ? "Saving..." : "Save"}
                    </button>
                  </div>
              </DialogPanel>
            </div>
          </Dialog>
    </>
  );
};

export default EditStatusModal;

