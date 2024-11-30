"use client"

import { SessionProvider } from "next-auth/react";
import "../globals.css";
import NavbarManager from "@/components/UI/NavBarManager";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  
    return (
        <SessionProvider>
            <main className="relative bg-white w-full min-h-screen" >
                <section className="flex w-full h-full">
                    <NavbarManager />
                    <main className="w-full">
                        <section className="w-full min-h-screen max-h-screen relative  overflow-y-auto ">
                            <div className="mt-16 px-4 w-full " >
                                {children}
                            </div>
                        </section>
                    </main >
                </section>
               
            </main>
        </SessionProvider>
    );
}
