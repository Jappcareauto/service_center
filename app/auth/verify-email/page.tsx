"use client";

import Image from 'next/image'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoaderImage from "@/public/images/loader.svg"
import React from 'react';
import axios from 'axios';
import { Input } from '@/components/UI/Input';

export default function Page() {
    const [firstLetter, setFirstLetter] = useState<string>("");
    const [secondLetter, setSecondLetter] = useState<string>("");
    const [thirdLetter, setThirdLetter] = useState<string>("");
    const [fourLetter, setFourLetter] = useState<string>("");
    const [fiveLetter, setFiveLetter] = useState<string>("");
    const [sixLetter, setSixLetter] = useState<string>("");
    const [timer, setTimer] = useState<number>(30);
    const router = useRouter();

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault()
        const data = {
            code: `${firstLetter}${secondLetter}${thirdLetter}${fourLetter}${fiveLetter}${sixLetter}`
        }
        console.log(data)
        try {
            const res = await fetch('/api/users/verify', { method: "POST", body: JSON.stringify(data) });
            if (res.ok) {
                const err = await res.json();
                console.log(err)
                router.push("/auth/signin")
            }else{
                const err = await res.json();
                console.log(err)
            }
        } catch (err) {
           
            console.log(err)
        }
    }

    const resent = async () => {
        const data = {
            "email": ""
        }
        const interval = setInterval(() => {
            setTimer(timer - 1);
            if (timer == 0) {
                clearInterval(interval)
            }
        }, 1000);
        console.log(data)
        try {
            const response = await axios.post('/api/auth/register/verify-resend', JSON.stringify(data));
            if (response.status == 200) {
                router.push("/auth/signin")
            }
        } catch (err) {
            alert("Code no found")
            console.log(err)
        }
    }

    return (
        <form className="w-full p-10 m-auto bg-white px-[48px] py-[64px] rounded-3xl flex justify-between flex-col" onSubmit={onSubmit} style={{ maxWidth: "456px", height: "533px" }}>
            <div className="space-y-12">
                <div className="pb-12 ">
                    <h2 className="text-2xl leading-7 text-gray-900">Verify Email</h2>
                    <div className="grid grid-cols-1 gap-4 py-4 mt-4">
                        <p className="font-bold">We’ve sent a verification email to <a target="_blank"
                            href="https://mail.google.com/" rel=""
                            className="text-orange-500"></a>
                        </p>

                        <div className="grid grid-cols-6 gap-2">
                            <Input type="text" value={firstLetter} onChange={e => { setFirstLetter(e.target.value); }} maxLength={1} placeholder='_' />
                            <Input type="text" value={secondLetter} onChange={e => { setSecondLetter(e.target.value); }} maxLength={1} placeholder='_' />
                            <Input type="text" value={thirdLetter} onChange={e => { setThirdLetter(e.target.value); }} maxLength={1} placeholder='_' />
                            <Input type="text" value={fourLetter} onChange={e => { setFourLetter(e.target.value); }} maxLength={1} placeholder='_' />
                            <Input type="text" value={fiveLetter} onChange={e => { setFiveLetter(e.target.value); }} maxLength={1} placeholder='_' />
                            <Input type="text" value={sixLetter} onChange={e => { setSixLetter(e.target.value); }} maxLength={1} placeholder='_' />
                        </div>
                        <p className="text-sm text-stone-600">Didn’t get the code? <button onClick={() => resent()} type="button"
                            className="text-orange-500" id="resend">Resend it</button></p>
                        <div id="loader" className="opacity-0">
                            <Image width={24} height={24} src={LoaderImage.src} className=" animate-spin" alt="" />
                        </div>
                       
                    </div>
                </div>
            </div>
            <div>
                <button type="submit" id="submitButton"
                    className="w-full p-3 my-2 text-sm text-white rounded-md focus-within:outline-4 focus-visible:outline-orange-400/70 disabled:bg-stone-700 bg-stone-950 hover:bg-stone-900">Submit</button>
              
            </div>
        </form>
    )
}