import GridIcon from "@/assets/icons/GridIcon";
import ListIcon from "@/assets/icons/ListIcon";
import { DropdownType } from "@/constants";
import React, { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";

interface OwnProps {
  activeFilter?: string;
  onFilter: (filter: string) => void;
  filterClassName?: (isSelected: boolean) => string;
  filters: DropdownType[];
  onList?: () => void;
  onGrid?: () => void;
  hideLayoutButtons?: boolean;
  isList?: boolean;
  customButtons?: ReactNode;
  defaultActiveFilter?: string;
  className?: string;
}
const FilterBar: React.FC<OwnProps> = ({
  filterClassName,
  onFilter,
  filters,
  onGrid,
  onList,
  isList,
  customButtons,
  hideLayoutButtons = false,
  defaultActiveFilter = "",
  className = "",
}) => {
  const [activeItem, setActiveItem] = useState(defaultActiveFilter || filters[0].label || '');

  return (
   <div
  className={twMerge(
    "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full",
    className
  )}
>
  {/* Filters */}
  <div className="flex items-center gap-3 overflow-x-auto sm:overflow-visible no-scrollbar">
    {filters?.map((item) => {
      const isSelected = item.label === activeItem;
      return (
        <div
          key={"filter-bar-item-" + item.value}
          onClick={() => {
            setActiveItem(item.label);
            onFilter(item.value);
          }}
          className={twMerge(
            "whitespace-nowrap rounded-full h-9 px-5 flex items-center justify-center cursor-pointer first-letter:uppercase",
            isSelected
              ? "bg-primary text-white"
              : "bg-primaryAccent text-black",
            filterClassName?.(isSelected)
          )}
        >
          {item.label}
        </div>
      );
    })}
  </div>

  {/* Layout Buttons */}
  <div className="flex gap-2 shrink-0">
    {customButtons ? (
      customButtons
    ) : (
      !hideLayoutButtons && (
        <>
          <button
            onClick={() => onGrid?.()}
            className={twMerge(
              "w-10 h-10 rounded-full flex items-center justify-center",
              isList ? "bg-primaryAccent" : "bg-primary text-white"
            )}
          >
            <GridIcon />
          </button>
          <button
            onClick={() => onList?.()}
            className={twMerge(
              "w-10 h-10 rounded-full flex items-center justify-center",
              !isList ? "bg-primaryAccent" : "bg-primary text-white"
            )}
          >
            <ListIcon />
          </button>
        </>
      )
    )}
  </div>
</div>

  );
};

export default FilterBar;
