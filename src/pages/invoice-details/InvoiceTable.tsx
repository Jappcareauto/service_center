import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ItemType {
  key: string;
  item: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

const InvoiceTable = () => {
  const [items, setItems] = useState<ItemType[]>([
    { key: uuidv4(), item: 'Spark Plugs', quantity: 2, unitPrice: 2500, totalPrice: 5000 },
    { key: uuidv4(), item: 'Wiper Blades', quantity: 1, unitPrice: 3500, totalPrice: 3500 },
    { key: uuidv4(), item: 'Labour Fee', quantity: 0, unitPrice: 0, totalPrice: 20000 },
  ]);

  const [newItem, setNewItem] = useState<ItemType>({
    key: '',
    item: '',
    quantity: 0,
    unitPrice: 0,
    totalPrice: 0,
  });

  const handleAddItem = () => {
    const newKey = uuidv4();
    setItems([...items, { ...newItem, key: newKey }]);
    setNewItem({ key: '', item: '', quantity: 0, unitPrice: 0, totalPrice: 0 });
  };

  return (
    <div className="p-4 bg-orange-50 rounded-md shadow-md max-w-2xl mx-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-orange-500 font-semibold">
            <th className="pb-2">Item</th>
            <th className="pb-2">Qnty</th>
            <th className="pb-2">Unit price</th>
            <th className="pb-2">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.key} className="border-b last:border-b-0">
              <td className="py-2">{item.item}</td>
              <td className="py-2">{item.quantity > 0 ? item.quantity : ''}</td>
              <td className="py-2">{item.unitPrice ? `${item.unitPrice.toLocaleString()} frs` : ''}</td>
              <td className="py-2 font-semibold">{item.totalPrice.toLocaleString()} frs</td>
            </tr>
          ))}
          <tr>
            <td className="pt-4">
              <input
                className="w-full border rounded px-2 py-1"
                placeholder="Item Name"
                value={newItem.item}
                onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
              />
            </td>
            <td className="pt-4">
              <input
                type="number"
                className="w-full border rounded px-2 py-1"
                placeholder="Qnty"
                value={newItem.quantity || ''}
                onChange={(e) =>
                  setNewItem({ ...newItem, quantity: Number(e.target.value) })
                }
              />
            </td>
            <td className="pt-4">
              <input
                type="number"
                className="w-full border rounded px-2 py-1"
                placeholder="Unit Price"
                value={newItem.unitPrice || ''}
                onChange={(e) =>
                  setNewItem({ ...newItem, unitPrice: Number(e.target.value) })
                }
              />
            </td>
            <td className="pt-4">
              <input
                type="number"
                className="w-full border rounded px-2 py-1"
                placeholder="Total Price"
                value={newItem.totalPrice || ''}
                onChange={(e) =>
                  setNewItem({ ...newItem, totalPrice: Number(e.target.value) })
                }
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-end mt-2">
        <button
          onClick={handleAddItem}
          className="flex items-center gap-2 px-4 py-2 border border-black rounded-full hover:bg-black hover:text-white transition"
        >
          + Add Item
        </button>
      </div>
    </div>
  );
};

export default InvoiceTable;
