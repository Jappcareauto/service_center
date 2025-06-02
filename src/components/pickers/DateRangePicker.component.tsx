/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker } from "antd";
import { FC } from "react";
import { DateRangePickerProps } from "./types";

const { RangePicker } = DatePicker;

const DateRangePicker: FC<DateRangePickerProps> = ({ onSelect }) => {
  
  const onChange = (value: any) => {
    onSelect?.(
      value?.[0].format("YYYY-MM-DD"),
      value?.[1].format("YYYY-MM-DD")
    );
  };

  return (
    <RangePicker
      picker="week"
      size="small"
      className="bg-transparent w-[45%]"
      onChange={onChange}
    />
  );
};

export default DateRangePicker;
