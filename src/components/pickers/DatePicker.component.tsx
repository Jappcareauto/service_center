/* eslint-disable @typescript-eslint/no-explicit-any */
import CalendarIcon from "@/assets/icons/CalendarIcon";
import { DatePicker as AntdDatePicker, DatePickerProps } from "antd";

const DatePicker = ({
  label,
  onSelect,
  ...props
}: {
  label?: string;
  onSelect?: (value: string) => void;
  props?: any;
}) => {
  const onChange: DatePickerProps["onChange"] = (date) => {
    onSelect?.(date.format("YYYY-MM-DD"));
  };

  return (
    <div className="w-full relative">
      {label && <label className="mb-2 block text-sm">{label}</label>}
      <AntdDatePicker
        onChange={onChange}
        className="w-full h-10"
        suffixIcon={<CalendarIcon />}
        {...props}
      />
    </div>
  );
};

export default DatePicker;
