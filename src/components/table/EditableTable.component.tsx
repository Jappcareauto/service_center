import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useToast } from "@/context/ToastContext";
import { ToastType } from "@/enums";

interface InvoiceItem {
  key: string;
  item: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
}

interface IProps {
  onChange: (items: InvoiceItem[]) => void;
}

const EditableTable: React.FC<IProps> = ({ onChange }) => {
  const [data, setData] = useState<InvoiceItem[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [formState, setFormState] = useState<Partial<InvoiceItem>>({});
  const { toast } = useToast();

  const isEditing = (key: string) => key === editingKey;

  const startEdit = (record: InvoiceItem) => {
    setEditingKey(record.key);
    setFormState({ ...record });
  };

  const cancelEdit = () => {
    setEditingKey(null);
    setFormState({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const saveRow = (key: string) => {
    const { item, quantity, unitPrice } = formState;

    if (!item || !quantity || !unitPrice) {
      toast(ToastType.ERROR, "All fields are required.");
      return;
    }

    const total = (
      parseFloat(quantity || "0") * parseFloat(unitPrice || "0")
    ).toFixed(2);

    const updated = data?.map((row) =>
      row.key === key
        ? {
            ...row,
            item,
            quantity,
            unitPrice,
            totalPrice: total,
          }
        : row
    );
    console.log("updated", updated);
    setData(updated);
    setEditingKey(null);
    setFormState({});
    onChange(updated);
  };

  const addRow = () => {
    const newKey = uuidv4();
    const newRow: InvoiceItem = {
      key: newKey,
      item: "",
      quantity: "",
      unitPrice: "",
      totalPrice: "",
    };

    const updated = [...data, newRow];
    setData(updated);
    setEditingKey(newKey);
    setFormState(newRow);
    onChange(updated);
  };

  const deleteRow = (key: string) => {
    const filtered = data.filter((row) => row.key !== key);
    setData(filtered);
    onChange(filtered);
    if (editingKey === key) cancelEdit();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {data.length === 0 ? (
        <div className="text-center border-gray-300 rounded-lg py-4">
          <p className="text-gray-500 text-sm mb-4">No purchased items</p>
          <button
            onClick={addRow}
            className="inline-flex text-sm items-center space-x-2 px-4 py-2 bg-black text-white rounded-full"
          >
            <PlusIcon className="w-4 h-4" />
            <span className="text-sm text-gray-300">Add Item</span>
          </button>
        </div>
      ) : (
        <>
          <table className="w-full border-gray-300">
            <thead>
              <tr className="bg-primaryAccent text-center">
                <th className="p-2 py-4">Item</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Unit Price</th>
                <th className="p-2">Total Price</th>
                <th className="p-2 w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((row) => {
                const editable = isEditing(row.key);
                return (
                  <tr key={row.key} className="border-t border-gray-200">
                    {editable ? (
                      <>
                        <td className="p-2 w-[20%]">
                          <input
                            type="text"
                            name="item"
                            value={formState.item || ""}
                            onChange={handleChange}
                            className="border w-full p-1 mt-2 rounded-md"
                          />
                        </td>
                        <td className="p-2 w-[20%]">
                          <input
                            type="number"
                            name="quantity"
                            value={formState.quantity || ""}
                            onChange={handleChange}
                            className="border w-full p-1 mt-2 rounded-md"
                          />
                        </td>
                        <td className="p-2 w-[20%]">
                          <input
                            type="number"
                            name="unitPrice"
                            value={formState.unitPrice || ""}
                            onChange={handleChange}
                            className="border w-full p-1 mt-2 rounded-md"
                          />
                        </td>
                        <td className="p-2 text-gray-500 italic w-[20%] mt-2">
                          {(
                            parseFloat(formState.quantity || "0") *
                            parseFloat(formState.unitPrice || "0")
                          ).toFixed(2)}{" "}
                          XAF
                        </td>
                        <td className="p-2 flex space-x-5 w-[20%]">
                          <button
                            onClick={() => saveRow(row.key)}
                            className="text-green-600 bg-primary mt-2 rounded-md p-1"
                          >
                            <CheckIcon className="w-5 h-5 text-white" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-red-500 border mt-2 border-red rounded-md p-1"
                          >
                            <XMarkIcon className="w-5 h-5 text-red" />
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-2 text-center">{row.item}</td>
                        <td className="p-2 text-center">{row.quantity}</td>
                        <td className="p-2 text-center">{row.unitPrice}</td>
                        <td className="p-2 text-center">{row.totalPrice}</td>
                        <td className="p-2 text-center flex space-x-5">
                          <button
                            onClick={() => startEdit(row)}
                            disabled={!!editingKey}
                            className="text-blue-600 p-1"
                          >
                            <PencilIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => deleteRow(row.key)}
                            className="text-red p-1"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-end mt-4">
            <button
              onClick={addRow}
              disabled={!!editingKey}
              className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-full disabled:opacity-50"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Add Item</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditableTable;
