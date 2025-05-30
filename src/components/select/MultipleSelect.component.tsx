import { Select, SelectProps, Space } from "antd";
interface IProps extends SelectProps {
  options: { label: string; value: string }[];
  onSelect?: (value: string[]) => void;
}
const MultipleSelect = ({ options, onSelect, ...props }: IProps) => {
  const handleChange = (value: string[]) => {
    if (value?.length > 0 && onSelect) {
      onSelect(value);
    }
  };
  return (
    <Space style={{ width: "100%" }} direction="vertical">
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select"
        // defaultValue={["a10", "c12"]}
        onChange={handleChange}
        options={options}
        autoFocus
        {...props}
      />
    </Space>
  );
};

export default MultipleSelect;
