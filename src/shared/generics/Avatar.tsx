import IMAGES from '@/assets/images';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface OwnProps {
  className?: string;
  name?: string;
}

const Avatar: React.FC<OwnProps> = ({ className, name }) => {
  return (
    <div className='flex items-center w-full gap-x-4 font-normal'>
      <div className='rounded-full border-[2px] border-primary p-[1.5px]'>
        <img src={IMAGES.avatar} alt="" className={
          twMerge(
            'w-12 h-12',
            className,
          )
        } />
      </div>
      <p>{name ?? 'Dave’s Garage'}</p>
    </div>
  )
}

export default Avatar
