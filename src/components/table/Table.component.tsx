// components/CustomTable.tsx
import empty from '@/assets/images/empty.png';
import { Table as AntTable } from "antd";
import Button from "../button/Button.component";
import Skeleton from "../skeletons/Skeleton.component";
import { CustomTableProps } from "./types";

interface CustomEmptyTextProps {
  emptyText?: string;
  onAdd?: () => void;
}

const CustomEmptyText = ({ emptyText, onAdd }: CustomEmptyTextProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-5 opacity-70">
      <img src={empty} className='w-12 h-12 mb-2' />
      <p className="text-gray-500">{emptyText}</p>
      {onAdd && (
        <Button className="mt-4" variant="primary" onClick={() => {}}>
          Add New
        </Button>
      )}
    </div>
  );
};

const Table = <T extends object>({
  columns,
  data,
  loading,
  rowKey = "key",
  emptyText = "Oops! This is empty.",
  onAdd,
  pageSize = 10,
}: CustomTableProps<T>) => {
  return (
    <>
      {loading ? (
        <div className="flex-co space-y-10 top-8 relative">
          <Skeleton paragraph={{ rows: 8 }} />
          <Skeleton paragraph={{ rows: 8 }} />
        </div>
      ) : (
        <AntTable<T>
          columns={columns?.map((col) => ({
            ...col,
            className: "whitespace-nowrap",
          }))}
          dataSource={data}
          loading={loading}
          rowKey={rowKey}
          pagination={{ pageSize }}
          className="bg-background"
          style={{
            tableLayout: "fixed",
            width: "100%",
            backgroundColor: "#FFF8F6",
            marginTop: "1.5rem",
          }}
          // showHeader={false}
          rowClassName="bg-background"
          locale={{
            emptyText: <CustomEmptyText emptyText={emptyText} onAdd={onAdd} />,
          }}
        />
      )}
    </>
  );
};

export default Table;
