import { useState } from "react";
import { twMerge } from "tailwind-merge";

const DateRangeComponent = () => {

  const [currentLabel] = useState('This Week');

  return (
    <div className="mt-4">
      <h2 className="font-[600] ">Date Range</h2>
      <div className="flex items-center flex-wrap gap-2 mt-4">
        {
          ['This Week', 'This Month', 'YTD', 'Custom'].map((label, index) => {
            const isSelected = currentLabel === label;
            return <div
              key={'date-range-item-' + index}
              className={
                twMerge(
                  "rounded-full h-10 px-5 flex items-center justify-center cursor-pointer bg-primaryAccent text-black",
                  isSelected ? "bg-primary text-white" : "bg-primaryAccent text-black",
                )
              }>
              {label}
            </div>
          })
        }
      </div>
    </div>
  )
}

export default DateRangeComponent
