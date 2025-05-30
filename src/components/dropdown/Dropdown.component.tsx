import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { MenuProps } from "antd";
import { Dropdown as AntdDropdown } from "antd";
import React from "react";

interface DropdownProps {
  items: MenuProps["items"];
  label?: string | React.ReactNode;
  onClick?: (info: { key: string }) => void;
  heading?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  label = "Select option",
  heading,
  onClick,
}) => {
  return (
    <div className="w-full relative">
      {heading && <label className="mb-2 block text-sm">{heading}</label>}
      <AntdDropdown
        menu={{
          items,
          onClick: ({ key }) => {
            if (onClick) {
              onClick({ key });
            }
          },
        }}
        trigger={["click"]}
        className="rounded-lg w-full bg-white focus:placeholder-primary border focus:border-primary focus:outline-none focus:bg-primaryAccent justify-between"
      >
        <div className="flex items-center justify-between h-10 text-gray-400 px-4">
          {label}
          <ChevronDownIcon className="w-5 h-5 text-gray-400" />
        </div>
      </AntdDropdown>
    </div>
  );
};

export default Dropdown;
