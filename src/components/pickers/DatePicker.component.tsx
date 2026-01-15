import CalendarIcon from "@/assets/icons/CalendarIcon";
import { DatePicker as AntdDatePicker, DatePickerProps } from "antd";
import { DatePickerType } from "antd/es/date-picker";
import dayjs from "dayjs";

const DatePicker = ({
  label,
  onSelect,
  isISO,
  value,
  disabled,
  ...props
}: {
  label?: string;
  onSelect?: (value: string) => void;
  isISO?: boolean;
  value?: string | null;
  disabled?: boolean;
  props?: DatePickerType;
}) => {
  const onChange: DatePickerProps["onChange"] = (date) => {
    if (!date) return;
    if (isISO) {
      onSelect?.(date.format("YYYY-MM-DDTHH:mm:ss"));
      return;
    }
    onSelect?.(date.format("YYYY-MM-DD"));
  };
  return (
    <div className="w-full relative">
      {label && <label className="mb-2 block text-sm">{label}</label>}
      <AntdDatePicker
        value={value ? dayjs(value) : null}
        onChange={onChange}
        className="w-full h-10"
        disabled={disabled}
        suffixIcon={<CalendarIcon color={disabled ? '#b6b6b6' : '#000'} />}
        {...props}
      />
    </div>
  );
};

export default DatePicker;
