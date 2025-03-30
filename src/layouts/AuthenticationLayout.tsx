import IMAGES from '@/assets/images'
import React from 'react'

interface OwnProps {
    children: React.ReactNode,
}

const AuthenticationLayout: React.FC<OwnProps> = ({ children }) => {
    return (
        <div className="grid md:grid-cols-2 h-screen bg-[#FDEEE7]">
            <div className="bg-primary hidden items-center justify-center md:flex">
                <img src={IMAGES.login} alt="" />
            </div>
            <div className="flex items-center justify-center px-4">
                <div className="bg-white rounded-3xl px-12 py-16 max-w-[456px] w-full shadow-lg">
                    <h1 className="text-primary text-2xl mb-12 font-bold">Jappcare Service Center</h1>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthenticationLayout
