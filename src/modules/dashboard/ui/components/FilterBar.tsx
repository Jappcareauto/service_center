import GridIcon from '@/shared/generics/menu/icons/GridIcon';
import ListIcon from '@/shared/generics/menu/icons/ListIcon';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface OwnProps {
  labels: string[];
  disableDisposition?: boolean;
  filterClassName?: (isSelected: boolean) => string;
}
const FilterBar: React.FC<OwnProps> = ({
  labels, disableDisposition,
  filterClassName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isList, setIsList] = useState(false);

  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-x-3'>
        {
          labels.map((label, index) => {
            const isSelected = index === currentIndex;
            return <div
              key={'filter-bar-item-' + index}
              onClick={() => setCurrentIndex(index)}
              className={
                twMerge(
                  'rounded-full h-10 px-5 flex items-center justify-center cursor-pointer',
                  isSelected ? "bg-primary text-white" : "bg-primaryAccent text-black",
                  filterClassName?.(isSelected),
                )
              }>
              {label}
            </div>
          })
        }
      </div>

      {!disableDisposition && <div className='flex gap-x-2'>
        <button
          onClick={() => setIsList(false)}
          className={
            twMerge(
              "w-11 h-11 rounded-full flex items-center justify-center",
              isList ? "bg-primaryAccent" : "bg-primary text-white"
            )
          }>
          <GridIcon />
        </button>

        <button
          onClick={() => setIsList(true)}
          className={
            twMerge(
              "w-11 h-11 rounded-full flex items-center justify-center",
              !isList ? "bg-primaryAccent" : "bg-primary text-white"
            )
          }>
          <ListIcon />
        </button>
      </div>}
    </div>
  )
}

export default FilterBar
