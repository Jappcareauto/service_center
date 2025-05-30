import React from "react";
import { Collapse, CollapseProps } from "antd";

type CustomCollapseProps = {
  items: CollapseProps["items"];
  defaultActiveKey?: string[];
  accordion?: boolean;
  onChange?: (key: string | string[]) => void;
};

const CustomCollapse: React.FC<CustomCollapseProps> = ({
  items,
  defaultActiveKey = [],
  accordion = false,
  onChange,
  ...props
}) => {
  return (
    <Collapse
      items={items}
      defaultActiveKey={defaultActiveKey}
      accordion={accordion}
      onChange={onChange}
      expandIcon={() => null}
      className='bg-primaryAccent'
      {...props}
    />
  );
};

export default CustomCollapse;
