import { InvoiceDataType } from '@/types';
import { TableProps } from "antd";

export interface CustomTableProps<T> {
  columns: TableProps<T>["columns"];
  data: T[];
  loading?: boolean;
  rowKey?: string | ((record: T) => string);
  pageSize?: number;
}
export interface EditableTableProps {
  onAdd?: (items: InvoiceDataType[]) => void;
  onDelete?: (items: InvoiceDataType[]) => void;
}
