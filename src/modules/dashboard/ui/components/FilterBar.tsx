import GridIcon from "@/shared/generics/menu/icons/GridIcon";
import ListIcon from "@/shared/generics/menu/icons/ListIcon";
import { formatStatusText } from "@/shared/utils/formatText";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

interface OwnProps {
  activeFilter?: string;
  labels: unknown[];
  disableDisposition?: boolean;
  onFilter: (filter: unknown) => void;
  filterClassName?: (isSelected: boolean) => string;
}
const FilterBar: React.FC<OwnProps> = ({
  labels,
  disableDisposition,
  filterClassName,
  onFilter,
  activeFilter,
}) => {
  const [currentLabel, setCurrentLabel] = useState<unknown>(activeFilter);
  const [isList, setIsList] = useState(false);
  const handleFilter = (label: (typeof labels)[0]) => {
    setCurrentLabel(label);
      onFilter(label);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-3      ">
        {labels.map((label, index) => {
          const isSelected = label === currentLabel;
          return (
            <div
              key={"filter-bar-item-" + index}
              onClick={() => handleFilter(label)}
              className={twMerge(
                "rounded-full h-10 px-5 flex items-center lowercase first-letter:uppercase  justify-center cursor-pointer",
                isSelected
                  ? "bg-primary text-white"
                  : "bg-primaryAccent text-black",
                filterClassName?.(isSelected)
              )}
            >
              {formatStatusText(label as string)}
            </div>
          );
        })}
      </div>

      {!disableDisposition && (
        <div className="flex gap-x-2">
          <button
            onClick={() => setIsList(false)}
            className={twMerge(
              "w-11 h-11 rounded-full flex items-center justify-center",
              isList ? "bg-primaryAccent" : "bg-primary text-white"
            )}
          >
            <GridIcon />
          </button>

          <button
            onClick={() => setIsList(true)}
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
  );
};

export default FilterBar;
