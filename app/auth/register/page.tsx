"use client";

import Image from 'next/image'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import EyeOpenImage from "@/public/images/eye.svg"
import EyeCloseImage from "@/public/images/eye-close.svg"
import React from 'react';
import { Input } from '@/components/UI/Input';
import { Select } from '@/components/UI/Select';
import { Button } from '@/components/UI/Button';
import Link from 'next/link';

export default function Page() {

    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<string>("");
    const [typePassword, setTypePassword] = useState<string>("password");
    const [code, setCode] = useState<string>("CM");
    const [phone, setPhone] = useState<string>("");
    const [openEye, setOpenEye] = useState<boolean>(true);
    const [message, setMessage] = useState<string>("");
    const router = useRouter();

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault()
        try {
            const res = await fetch('/api/users/register', { method: "POST", body: JSON.stringify({ email: email, password: password, name: name,  dateOfBirth: dateOfBirth, code: code, number: phone }) });
            if (res.ok) {
                const err = await res.json();
                console.log(err)
                router.push("/auth/verify-email")
            }else{
                const err = await res.json();
                console.log(err)
            }
           
        } catch (err) {
            console.log(err)
            
            setMessage("Error try again!")
        }
    }

    return (
        <form className="w-full p-10 m-auto bg-white rounded-md shadow-xl " onSubmit={onSubmit} style={{ maxWidth: "456px" }}>
            <div className="space-y-12">
                <div className="pb-12 ">
                    <h2 className="text-2xl leading-7 text-gray-900">Sign In</h2>
                    <h6 className='text-xs my-2 italic text-red-400 mb-4 font-medium text-left'>{message}</h6>
                    <div className="grid grid-cols-1 gap-4 py-4 mt-4">
                        <div className="block">
                            <label htmlFor="name" className="text-sm">Nom</label>
                            <Input placeholder="name" value={name} onChange={e => { setName(e.target.value); setMessage("") }} className='mt-1' name="name" id="name" type='text' ></Input>
                        </div>
                        <div className="block" id="email-to-phone">
                            <label htmlFor="email" className="text-sm">Email</label>
                            <Input placeholder="Email" value={email} onChange={e => { setEmail(e.target.value); setMessage("") }} className='mt-1' name="email" id="email" type='email' ></Input>
                        </div>
                        <div id="phone-to-email">
                            <label htmlFor="phone" className="text-sm">Phone</label>
                            <div className="flex gap-2 mt-1">
                                <div className="basis-1/4">
                                    <Select value={code} onChange={e => { setCode(e.target.value); setMessage("") }} options={[{ value: "CM", label: "+237" }]}></Select>
                                </div>
                                <div className="w-full basis-3/4">
                                    <Input value={phone} onChange={e => { setPhone(e.target.value); setMessage("") }} placeholder="Phone number" className='mt-1' name="phone" id="phone" type='tel' ></Input>
                                </div>
                            </div>
                        </div>
                        <div className="block" id="email-to-phone">
                            <label htmlFor="dateOfBirth" className="text-sm">date Of Birth</label>
                            <Input placeholder="dateOfBirth" value={dateOfBirth} onChange={e => { setDateOfBirth(e.target.value); setMessage("") }} className='mt-1' name="dateOfBirth" id="dateOfBirth" type='date' ></Input>
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
                   
                    </div>

                </div>
            </div>
          
           
            <Button className='mt-2' label="Register" typeButton='dark' type='submit'></Button>
            <div className='text-center text-orange-500 mt-2 m-auto' >
                <Link className='text-center text-sm m-auto' href={"/"}>SignIn</Link>
            </div>
          
        </form >
    )
}