"use client";

import { FormEvent, useState } from 'react'
import React from 'react';
import { Input } from '@/components/UI/Input';
import { Button } from '@/components/UI/Button';
import Image from 'next/image'
import EyeOpenImage from "@/public/images/eye.svg"
import EyeCloseImage from "@/public/images/eye-close.svg"

export default function Page() {

    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [openEye, setOpenEye] = useState<boolean>(false);
    const [openEyeNewPassword, setOpenEyeNewPassword] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault()
       
    }

    return (

        <form className="w-full p-10 m-auto bg-white px-[48px] py-[64px] rounded-3xl flex justify-between flex-col" onSubmit={onSubmit} style={{ maxWidth: "456px", height: "533px" }}>
            <div className="space-y-12">
                <div className="pb-12 ">
                    <h2 className="text-[28px] leading-7 text-gray-900 mb-8">Change Password</h2>
                    <h6 className='text-xs my-2 italic text-red-400 mb-4 font-medium text-left'>{message}</h6>
                    <div className="grid grid-cols-1 gap-6 py-4 mt-4">
                        <div className="block ">
                            <label htmlFor="password" className="text-[14px] font-normal text-normal">Current Password</label>
                            <div className="relative mt-1">
                                <Input value={currentPassword} onChange={e => { setCurrentPassword(e.target.value); setMessage("") }} placeholder="Password" className='mt-1' name="password" id="password" type={openEye ? "text" : "password"} ></Input>
                                <button type="button" onClick={() => { setOpenEye(!openEye) }} id="passwordButton" name="showpasswordButton"
                                    className="absolute -translate-y-1/2 top-1/2 right-2 opacity-30">
                                    <Image src={EyeOpenImage.src} width={24} height={24} className={openEye ? 'block' : 'hidden'} alt='eye-open'></Image>
                                    <Image src={EyeCloseImage.src} width={24} height={24} className={!openEye ? 'block' : 'hidden'} alt='eye-close'></Image>
                                </button>
                            </div>
                        </div>
                        <div className="block ">
                            <label htmlFor="password" className="text-[14px] font-normal text-normal">New Password</label>
                            <div className="relative mt-1">
                                <Input value={newPassword} onChange={e => { setNewPassword(e.target.value); setMessage("") }} placeholder="Password" className='mt-1' name="password" id="password" type={openEyeNewPassword ? "text" : "password"} ></Input>
                                <button type="button" onClick={() => { setOpenEyeNewPassword(!openEyeNewPassword) }} id="passwordButton" name="showpasswordButton"
                                    className="absolute -translate-y-1/2 top-1/2 right-2 opacity-30">
                                    <Image src={EyeOpenImage.src} width={24} height={24} className={openEyeNewPassword ? 'block' : 'hidden'} alt='eye-open'></Image>
                                    <Image src={EyeCloseImage.src} width={24} height={24} className={!openEyeNewPassword ? 'block' : 'hidden'} alt='eye-close'></Image>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <Button label="Submit" typeButton='dark' type='submit'></Button>
           
        </form >
    )
}