"use client";

import Image from 'next/image'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import EyeOpenImage from "@/public/images/eye.svg"
import EyeCloseImage from "@/public/images/eye-close.svg"
import React from 'react';
import { Input } from '@/components/UI/Input';
import { Button } from '@/components/UI/Button';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Loader from '@/components/UI/Loader';
import AuthentificationImage from "@/public/images/Group633106.png"
import "./globals.css";
export default function Page() {

    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [typePassword, setTypePassword] = useState<string>("password");
    const [openEye, setOpenEye] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string>("");
    const router = useRouter();

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            const signInData = await signIn("credentials", {
                username: email,
                password: password,
                redirect: false
            });
            setTimeout(() => {
                if (signInData?.error) {
                    setMessage("Password or email is incorrect")
                    console.log(signInData.error);
                    setIsLoading(false)
                } else {
                    router.push("/service_center")
                }
            }, 2000);
        } catch (err) {
            setMessage("Password or username is incorrect or user does not exist!")
            setIsLoading(false)
            console.error(err)
        }
    }

    return (
        <div className="grid  min-h-screen lg:grid-cols-2 bg-primary-light" >
            <div className="bg-primary flex justify-center items-center lg:block">
                <Image priority width={402.87} height={573.76} className='lg:absolute xl:left-[177px] lg:top-[214.37px] lg:left-[90px]' src={AuthentificationImage.src} alt="" />
            </div>
            <div className="fixed top-0 xl:px-[75px]   2xl:px-[150px] py-[180px] w-full h-full p-3  lg:relative">
                <form className="w-full bg-white  px-[48px] py-[64px] m-auto  rounded-3xl flex justify-between flex-col" onSubmit={onSubmit} style={{ maxWidth: "456px", height: "567px" }}>
                    <Loader isLoading={isLoading} message={null}></Loader>
                    <div className="space-y-12">
                        <div className="pb-12 ">
                            <h2 className="text-[28px] leading-7 text-gray-900 mb-8">Sign In</h2>
                            <h6 className='text-xs my-2 italic text-red-400 mb-4 font-medium text-left'>{message}</h6>
                            <div className="grid grid-cols-1 gap-6 py-4 mt-4">
                                <div className="block" id="email-to-phone">
                                    <label htmlFor="email" className="text-[14px] font-normal text-normal">Email</label>
                                    <Input placeholder="Email" value={email} onChange={e => { setEmail(e.target.value); setMessage("") }} className='mt-1' name="email" id="email" type='email' ></Input>
                                </div>
                                <div className="block ">
                                    <label htmlFor="password" className="text-sm">Password</label>
                                    <div className="relative mt-1">
                                        <Input value={password} onChange={e => { setPassword(e.target.value); setMessage("") }} placeholder="Password" className='mt-1' name="password" id="password" type={typePassword} ></Input>
                                        <button type="button" onClick={() => { setOpenEye(!openEye); if (openEye) setTypePassword("text"); else setTypePassword("password") }} id="passwordButton" name="showpasswordButton"
                                            className="absolute -translate-y-1/2 top-1/2 right-2 opacity-30">
                                            <Image src={EyeOpenImage.src} width={24} height={24} className={openEye ? 'block' : 'hidden'} alt='eye-open'></Image>
                                            <Image src={EyeCloseImage.src} width={24} height={24} className={!openEye ? 'block' : 'hidden'} alt='eye-close'></Image>
                                        </button>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Link href="/auth/forgot-password" className="text-sm text-primary hover:text-orange-600">Forgot Password?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Button label="SignIn" typeButton='dark' type='submit'></Button>
                    </div>
                </form >
            </div>
        </div>

    )
}