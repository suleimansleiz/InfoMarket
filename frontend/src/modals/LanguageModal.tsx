import React, { useState } from "react";
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { Description, Dialog, DialogPanel, DialogTitle, Field, Label, Radio, RadioGroup } from '@headlessui/react'

interface LanguageModalProps {
    show: boolean;
    onHide: () => void;
  }

const LanguageModal: React.FC<LanguageModalProps> = ({
  show,
  onHide,
}) => {

  const languages = ['English (us)', 'Swahili'];
  const [selected, setSelected] = useState(languages[0]);

  return (
    <>
      <Dialog open={show} onClose={onHide} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/70">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-4 border border-gray-300 rounded-lg">
            <DialogTitle
              className="font-bold text-center text-blue-900 text-lg">
              Language Preference
            </DialogTitle>
            <Description>
              <RadioGroup value={selected} onChange={setSelected} aria-label="Server size">
                {languages.map((language) => (
                  <Field key={language} className="flex items-center gap-2">
                    <Radio
                      value={language}
                      className="group flex size-5 my-1 items-center justify-center rounded-full border border-gray-300 bg-white data-checked:bg-blue-400 cursor-pointer"
                    >
                      {/* <span className="invisible size-2 rounded-full bg-white group-data-checked:visible" /> */}
                      <CheckCircleIcon className="size-6 fill-gray-100 opacity-0 transition group-data-checked:opacity-100" />
                    </Radio>
                    <Label>{language}</Label>
                  </Field>
                ))}
              </RadioGroup>
            </Description>
              <div className="flex gap-2 justify-end mt-4">
                <button onClick={onHide} className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer">
                  Cancel
                </button>
                <button onClick={onHide} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">
                  Ok
                </button>
              </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default LanguageModal;
