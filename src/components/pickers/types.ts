import { DatePickerType } from "antd/es/date-picker";

export interface DateRangePickerProps {
  onSelect: (date1: string, date2: string) => void;
}
export interface DatePickerPropTypes {
  label?: string;
  onSelect?: (value: string) => void;
  isISO?: boolean;
  value?: string | null;
  disabled?: boolean;
  props?: DatePickerType;
  isRequired?: boolean;
}
