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
}) => {
  const [activeItem, setActiveItem] = useState("");

  return (
    <div
      className={twMerge(
        "flex items-center justify-between",
        (customButtons || !hideLayoutButtons) && "w-full"
      )}
    >
      <div className="flex items-center gap-x-5">
        {filters.map((item, index) => {
          const isSelected = item.label === activeItem;
          return (
            <div
              key={"filter-bar-item-" + index}
              onClick={() => {
                setActiveItem(item.label);
                onFilter(item.value);
              }}
              className={twMerge(
                "rounded-full h-9 px-5 flex items-center first-letter:uppercase  justify-center cursor-pointer",
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
      <div>
        {customButtons
          ? customButtons
          : !hideLayoutButtons && (
              <div className="flex gap-x-2">
                <button
                  onClick={() => {
                    onGrid?.();
                  }}
                  className={twMerge(
                    "w-11 h-11 rounded-full flex items-center justify-center",
                    isList ? "bg-primaryAccent" : "bg-primary text-white"
                  )}
                >
                  <GridIcon />
                </button>
                <button
                  onClick={() => {
                    onList?.();
                  }}
                  className={twMerge(
                    "w-11 h-11 rounded-full flex items-center justify-center",
                    !isList ? "bg-primaryAccent" : "bg-primary text-white"
                  )}
                >
                  <ListIcon />
                </button>
              </div>
            )}
      </div>
    </div>
  );
};

export default FilterBar;
