import { metadata } from "@/app/layout";
import Image from 'next/image'
metadata.title = "Jappcare autocare - Auth"
import AuthentificationImage from "@/public/images/Group633106.png"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="grid  min-h-screen lg:grid-cols-2 bg-primary-light" >
        <div className="bg-primary flex justify-center items-center lg:block">
            <Image priority width={402.87} height={573.76} className='lg:absolute xl:left-[177px] lg:top-[214.37px] lg:left-[90px]' src={AuthentificationImage.src} alt="" />
        </div>
        <div className="fixed top-0 xl:px-[75px]   2xl:px-[150px] py-[180px] w-full h-full p-3  lg:relative">
                {children}
            </div>
        </div>
    )
}