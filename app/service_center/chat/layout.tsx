"use client"
import ChatNavBar from "@/components/UI/ChatNavBar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="inline-flex w-full">
            <ChatNavBar></ChatNavBar>
            <div className="w-full  " style={{ maxWidth: 800, width: "100%" }}>
                {children}
            </div>

        </div>
    );
}
