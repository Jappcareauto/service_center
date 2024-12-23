import IMAGES from '@/assets/images'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface OwnProps {
  children: React.ReactNode,
}

const UnAuthenticatePageLayout: React.FC<OwnProps> = ({ children }) => {
  return (
    <div className={
      twMerge(
        "grid md:grid-cols-2 h-screen bg-primaryAccent"
      )
    }>
      <div className='bg-primary hidden items-center justify-center md:flex'>
        <img src={IMAGES.login} alt="" />
      </div>
      <div className='flex items-center justify-center px-4'>
        <div className={
          twMerge(
            "bg-white rounded-3xl px-12 py-16 max-w-[456px] w-full"
          )
        }>
          <h1 className='text-primary mb-12'>Jappcare Service Center</h1>
          {children}
        </div>
      </div>
    </div>
  )
}

export default UnAuthenticatePageLayout
