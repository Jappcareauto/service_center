/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CheckIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { TableProps } from "antd";
import { Form, Table } from "antd";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // for generating unique keys
import Button from "../button/Button.component";
import Input from "../inputs/Input.component";
import "./table.css";
import { InvoiceDataType } from "@/types";
import { EditableTableProps } from "./types";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  inputType: "number" | "text";
  record: InvoiceDataType;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  inputType,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === "number" ? (
      <Input type="number" placeholder="0" />
    ) : (
      <Input placeholder="Item Name" />
    );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Required!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const initialData = [
  { key: uuidv4(), item: "", quantity: "", unitPrice: "", totalPrice: "" },
];

const EditableTable: React.FC<EditableTableProps> = ({ onAdd, onDelete }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<InvoiceDataType[]>(initialData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: InvoiceDataType) => record.key === editingKey;

  const edit = (record: Partial<InvoiceDataType> & { key: React.Key }) => {
    form.setFieldsValue({
      item: "",
      quantity: "",
      unitPrice: "",
      totalPrice: "",
      ...record,
    });
    setEditingKey(record.key as string);
  };

  const cancel = (record?: InvoiceDataType) => {
    if (record) {
      const { item, quantity, unitPrice, totalPrice } = record;
      if (!item || !quantity || !unitPrice || !totalPrice) {
        deleteRow(record?.key as string);
      }
      setEditingKey("");
    }
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as InvoiceDataType;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
          totalPrice: (
            parseFloat(row.quantity) * parseFloat(row.unitPrice)
          ).toFixed(2),
        });
        setData(newData);
        setEditingKey("");
        onAdd?.(newData);
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
        onAdd?.(newData);
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const addRow = () => {
    const newKey = uuidv4();
    const newRow: InvoiceDataType = {
      key: newKey,
      item: "",
      quantity: "",
      unitPrice: "",
      totalPrice: "",
    };
    setData((prevData) => [...prevData, newRow]);
    form.setFieldsValue({
      item: "",
      quantity: "",
      unitPrice: "",
      totalPrice: "",
    });
    setEditingKey(newKey);
  };

  const deleteRow = (key: string) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
    onDelete?.(newData);
  };

  const columns = [
    {
      title: "Item",
      dataIndex: "item",
      width: "40%",
      editable: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "15%",
      editable: true,
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      width: "15%",
      editable: true,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      width: "15%",
      editable: false,
    },
    {
      title: "",
      dataIndex: "operations",
      width: "15%",
      render: (_: any, record: InvoiceDataType) => {
        const editable = isEditing(record);
        return editable ? (
          <div className="flex flex-row items-center">
            <button
              className="bg-black rounded-md p-1 justify-center items-center"
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              <CheckIcon className="w-5 h-5 text-white" />
            </button>
            <button onClick={() => cancel(record)} className="cursor-pointer">
              <XMarkIcon className="w-6 h-6 ml-3" />
            </button>
          </div>
        ) : (
          <div className="flex gap-x-4">
            <button
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
              style={{ marginRight: 15 }}
              className="w-5 h-5 ml-3"
            >
              <PencilIcon />
            </button>
            <button onClick={() => deleteRow(record.key)}>
              <div className="w-5 h-5">
                <TrashIcon className="text-red hover:text-red-700 cursor-pointer" />
              </div>
            </button>
          </div>
        );
      },
    },
  ];

  const mergedColumns: TableProps<InvoiceDataType>["columns"] = columns.map(
    (col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: InvoiceDataType) => ({
          record,
          inputType:
            col.dataIndex === "unitPrice" || col.dataIndex === "quantity"
              ? "number"
              : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    }
  );

  return (
    <Form form={form} component={false}>
      <Table<InvoiceDataType>
        components={{
          body: { cell: EditableCell },
        }}
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
      <div className="w-full flex justify-end">
        <Button
          onClick={addRow}
          className=" h-9 px-4 rounded-full bg-transparent border border-black text-black text-sm w-auto hover:bg-white self-end my-5 font-normal"
          variant="primary"
          leftIcon={<PlusIcon className="w-5 h-5" />}
        >
          Add Item
        </Button>
      </div>
    </Form>
  );
};

export default EditableTable;
