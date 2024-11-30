"use client";

import Image from 'next/image'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoaderImage from "@/public/images/loader.svg"
import React from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Page() {
    const [code, setCode] = useState<string>("");
    const router = useRouter();

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault()
        const data = {
            code: code
        }
        console.log(data)   
        try {
            const response = await axios.post('/api/auth/verify/' + code, JSON.stringify(data));
           
            if (response.status == 200) {
                router.push("/auth/signin")
            }
        } catch (err) {
            alert("Code no found")
            console.log(err)
        }
    }

    const resent = async () => {
        const data = {
            "email": ""
        }
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
        <form onSubmit={onSubmit} className=" p-10 m-auto w-96 bg-white rounded-md shadow-xl md:shadow-none "
        >
            <div className="space-y-12">
                <div className="pb-12 ">
                    <h2 className="text-2xl leading-7 text-gray-900">Verify Email</h2>
                    <div className="grid grid-cols-1 gap-4 py-4 mt-4">
                        <p className="font-bold">We’ve sent a verification email to <a target="_blank"
                            href="https://mail.google.com/" rel=""
                            className="text-orange-500"></a>
                        </p>
                        <div>
                            <input type="text" value={code} onChange={e => { setCode(e.target.value); }}
                                className="w-full p-3 text-sm focus-visible:bg-orange-100/40 focus-visible:outline-orange-500 focus-visible:outline-1 focus-visible:placeholder:text-orange-500 rounded-xl bg-stone-100"
                                placeholder="_" name="phone" />
                        </div>
                        <p className="text-sm text-stone-600">Didn’t get the code? <button onClick={() => resent()} type="button"
                            className="text-orange-500" id="resend">Resend it</button></p>
                        <div id="loader" className="opacity-0">
                            <Image width={24} height={24} src={LoaderImage.src} className=" animate-spin" alt="" />
                        </div>
                        <div id="resendMessage" className="hidden">
                            The code will be sent in <span id="compteur"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button type="submit" id="submitButton"
                    className="w-full p-3 my-2 text-sm text-white rounded-md focus-within:outline-4 focus-visible:outline-orange-400/70 disabled:bg-stone-700 bg-stone-950 hover:bg-stone-900">Submit</button>
                <Link href={"/auth/signin"} className="text-sm text-orange-500" id="backButton">Back</Link>
            </div>
        </form>
    )
}