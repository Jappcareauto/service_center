"use client"

import { SessionProvider } from "next-auth/react";
import "../globals.css";
import NavbarManager from "@/components/UI/NavBarManager";
import HeaderManager from "@/components/service_center/header-manager";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (    
        <>
            <SessionProvider>
                <main className="relative bg-white w-full min-h-screen" >
                    <section className="flex w-full h-full">
                        <NavbarManager />
                        <main className="w-full">
                            <section className="w-full min-h-screen max-h-screen relative  overflow-y-auto ">
                                <HeaderManager />
                                <div className="pt-16 sm:px-[56px] w-full " >
                                    {children}
                                </div>
                            </section>
                        </main >
                    </section>

                </main>
            </SessionProvider>
        </>
    );
}
