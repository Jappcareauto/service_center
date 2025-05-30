import {
  Bar,
  BarChart as BarChartComponent,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DateRangePicker from "../pickers/DateRangePicker.component";
import { DateRangePickerProps } from "../pickers/types";
import { BarChartItemType } from "@/types";
import { Empty, Skeleton } from "antd";
import { twMerge } from "tailwind-merge";

interface props extends DateRangePickerProps {
  title: string;
  data: BarChartItemType[];
  isLoading?: boolean;
  className?: string;
}

const BarChart = ({ title, data, onSelect, isLoading, className }: props) => {
  return (
    <div className="w-full border rounded-2xl border-borderColor flex flex-col justify-between px-4 py-3 gap-y-2">
      <div className="flex items-center justify-between mb-3">
        <DateRangePicker onSelect={onSelect} />
        <div className="text-xs rounded-xl px-3 py-2 bg-grey3 text-grey4">
          {title}
        </div>
      </div>
      <div className={twMerge("h-[120px] w-full", className)}>
        {isLoading ? (
          <Skeleton active paragraph={{ rows: 3 }} />
        ) : data && data?.length > 0 && data.some((item) => item.value > 0) ? (
          <ResponsiveContainer width="100%" height="100%" className="">
            <BarChartComponent data={data} margin={{ left: 0 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis width={0} axisLine={false} tickLine={false} tick={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#FB7C37" radius={4} barSize={35} />
            </BarChartComponent>
          </ResponsiveContainer>
        ) : (
          <Empty
            styles={{
              image: {
                width: 80,
                height: 80,
              },
            }}
            rootClassName='flex items-center flex-col'
          />
        )}
      </div>
    </div>
  );
};

export default BarChart;
