import IMAGES from '@/assets/images';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface OwnProps {
  className?: string;
  parentClassName?: string;
  name?: string;
  disabledBorder?: boolean;
  url?: string;
}

const Avatar: React.FC<OwnProps> = ({ className, name, parentClassName, disabledBorder, url }) => {
  return (
    <div className='flex items-center gap-x-4 font-normal'>
      <div className={
        twMerge(
          'rounded-full border-[2px] border-primary p-[1.5px]',
          disabledBorder ? 'border-none p-0' : '',
          parentClassName,
        )
      }>
        <img
          src={url ?? IMAGES.avatar}
          alt=""
          className={
          twMerge(
            'w-12 h-12 rounded-full',
            className,
          )
        } />
      </div>
      {!!name && <p>{name}</p>}
    </div>
  )
}

export default Avatar
