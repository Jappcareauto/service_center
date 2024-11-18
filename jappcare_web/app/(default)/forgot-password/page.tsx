"use client";

// import Image from 'next/image'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
// import AuthentificationImage from "@/public/images/authentification.svg"
import React from 'react';
import { Input } from '@/components/UI/Input';
import { Select } from '@/components/UI/Select';
// import { signIn } from 'next-auth/react';
import { Button } from '@/components/UI/Button';
import Link from 'next/link';

export default function Page() {

    // const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [loginWithEmail, setLoginWithEmail] = useState(true);

    const [message, setMessage] = useState<string>("");
    const router = useRouter();

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault()
        if (loginWithEmail) {
            if (email != "") {
                router.push("/code-forgot-password?email=" + email)
            } else {
                setMessage("Field email is empty")
            }
        } else {
            if (phone != "") {
                router.push("/code-forgot-password?phone=" + phone)
            } else {
                setMessage("Field phone is empty")
            }
        }
    }

    return (

        <form className="w-full p-10 m-auto bg-white rounded-md shadow-xl " onSubmit={onSubmit} style={{ maxWidth: "456px" }}>
            <div className="space-y-12">
                <div className="pb-12 ">
                    <h2 className="text-2xl leading-7 text-gray-900">Forgot Password</h2>
                    <p className="mt-2 text-xs sm:text-sm sm:mt-0">Please enter your <span id="resetText"></span> to request a password
                        reset.</p>
                    <h6 className='text-xs my-2 italic text-red-400 mb-4 font-medium text-left'>{message}</h6>
                    <div className="grid grid-cols-1 gap-4 py-4 mt-4">
                        {
                            loginWithEmail ? (
                                <div className="block" id="email-to-phone">
                                    <label htmlFor="email" className="text-xs sm:text-sm">Email</label>
                                    <div className="mt-1">
                                        <Input type="   " value={email} onChange={e => { setEmail(e.target.value); setMessage("") }} placeholder="Email" name="email" id="email"></Input>

                                    </div>
                                </div>
                            ) : (
                                <div >
                                    <label htmlFor="phone" className="text-xs sm:text-sm">Phone</label>
                                    <div className="flex gap-2 mt-1">
                                        <div className="basis-1/4">
                                            <Select value={code} onChange={e => { setCode(e.target.value); setMessage("") }} options={[{ value: "+237", label: "+237" }]}></Select>
                                        </div>
                                        <div className="w-full basis-3/4">
                                            <Input value={phone} onChange={e => { setPhone(e.target.value); setMessage("") }} type="tel" placeholder="Phone" name="phone" id="phone"></Input>
                                        </div>
                                    </div>
                                </div>
                            )
                        }


                    </div>
                </div>
            </div>
            <Button onClick={() => setLoginWithEmail(!loginWithEmail)} label={loginWithEmail ? "Retrieve with my phone number" : "Retrieve with email"} typeButton='clear' type='button'></Button>
            <Button label="Submit" typeButton='dark' type='submit'></Button>
            <Link href={"/signin"} className='text-orange-500' >Back</Link>
        </form >
    )
}