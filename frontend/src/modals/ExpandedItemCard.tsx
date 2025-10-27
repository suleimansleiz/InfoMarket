// components/ExpandedItemCard.tsx
import { Dialog, Description, DialogPanel, DialogTitle } from "@headlessui/react";

interface Item {
  itemId: number;
  item_photo?: string;
  itemName: string;
  item_price: string;
  itemCategory: string;
  item_description: string;
  seller_name: string;
  sellerPhone: string;
}

interface Props {
 show: boolean;
 onHide: () => void;
 item: Item | null;
 onPurchase: () => void;
}

const ExpandedItemCard: React.FC<Props> = ({ show, item, onPurchase, onHide }) => {
  if (!item) return null;

  return (
    <>
      <Dialog open={show} onClose={onHide} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/30">
          <DialogPanel className="max-w-lg h-full space-y-4 border bg-white px-12 py-5 border border-gray-300 rounded-lg overflow-y-auto hide-scrollbar">
            <DialogTitle className="text-2xl text-gray-600 font-bold">{item.itemName}</DialogTitle>
            <Description>
              <img
                src={item.item_photo}
                alt="item"
                className="rounded-lg mb-3"
              />
              <p className="text-gray-600"><strong>Price:</strong> Tsh {Number(item.item_price).toLocaleString()}</p>
              <p className="text-gray-600"><strong>Category:</strong> {item.itemCategory}</p>
              <p className="text-gray-600"><strong>Description:</strong> {item.item_description}</p>
              <p className="text-gray-600"><strong>Seller:</strong> {item.seller_name} - {item.sellerPhone}</p>
            </Description>
            <div className="flex gap-4 justify-end">
              <button onClick={onHide} className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer">
                Cancel
              </button>
              <button onClick={onPurchase} className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                Purchase
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default ExpandedItemCard;
