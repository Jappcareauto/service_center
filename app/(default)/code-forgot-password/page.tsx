"use client";

import Image from 'next/image'
import { FormEvent, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import LoaderImage from "@/public/images/loader.svg"
import React from 'react';
// import { useSession } from "next-auth/react";
// import { Input } from '@/components/UI/Input';
// import { Select } from '@/components/UI/Select';
// import { signIn } from 'next-auth/react';
// import { Button } from '@/components/UI/Button';
import axios from 'axios';
import Link from 'next/link';
import { Input } from '@/components/UI/Input';
import { Button } from '@/components/UI/Button';

export default function Page() {
    const [code, setCode] = useState<string>("");
    const [count, setCount] = useState<number>(30);
    // const [isStart, setIsStart] = useState<boolean>(false);
    const router = useRouter();
    // const queries = useSearchParams()
    const onSubmit = async (event: FormEvent) => {
        event.preventDefault()
        const data = {
            code: code
        }
        try {
            const response = await axios.post('/api/users/verify', JSON.stringify(data));
            // Handle successful login (redirect, update state, etc.)
            if (response.status == 200) {
                router.push("/signin")
            }
        } catch (err) {
            alert("Code no found")
        }
    }

    const startCompteur = () => {
        for (let index = 0; index < 30; index++) {
            setTimeout(() => {
                setCount(count - 1)
            }, 100)
        }   
    }


    return (
        <form onSubmit={onSubmit} className=" p-10 m-auto w-96 bg-white rounded-md shadow-xl md:shadow-none "
        >
            <div className="space-y-12">
                <div className="pb-12 ">
                    <h2 className="text-2xl leading-7 text-gray-900">Password reset by email</h2>
                    <div className="grid grid-cols-1 gap-4 py-4 mt-4">
                        <p className="font-medium text-sm">We’ve sent a verification email to <a target="_blank"
                            href="https://mail.google.com/" rel=""
                            className="text-orange-500"></a>
                        </p>
                        <Input type="text" value={code} placeholder="_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _" onChange={e => { setCode(e.target.value); }}></Input>
                        <p className="text-sm text-stone-600">Didn’t get the code? <Button type='button' onClick={() => { startCompteur() }} className='w-fit text-orange-600' typeButton={'clear'} label={'Resend it'}></Button> </p>
                        <div id="loader" className="opacity-0">
                            <Image width={24} height={24} src={LoaderImage.src} className=" animate-spin" alt="" />
                        </div>
                        <div id="resendMessage" className="">
                            The code will be sent in <span id="compteur">{count}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button type="submit" id="submitButton"
                    className="w-full p-3 my-2 text-sm text-white rounded-md focus-within:outline-4 focus-visible:outline-orange-400/70 disabled:bg-stone-700 bg-stone-950 hover:bg-stone-900">Submit</button>
                <Link href={"/signin"} className="text-sm text-orange-500" id="backButton">Back</Link>
            </div>
        </form>
    )
}