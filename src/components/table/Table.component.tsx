// components/CustomTable.tsx
import { Table as AntTable } from "antd";
import { CustomTableProps } from "./types";
import Skeleton from '../skeletons/Skeleton.component';

const Table = <T extends object>({
  columns,
  data,
  loading,
  rowKey = "key",
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
          showHeader={false}
          rowClassName="bg-background"
        />
      )}
    </>
  );
};

export default Table;
