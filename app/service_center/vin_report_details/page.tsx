"use client"

import FilterBy from "@/components/UI/FilterBy";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
    const [TabStateAppointement, setTabStateAppointment] = useState<{ actived: boolean, label: string }[]>([
        { label: "Overview", actived: false },
        { label: "Specs", actived: false },
        { label: "History", actived: false },
        { label: "Mileage", actived: false },
        { label: "Damage", actived: false },

    ])
    const onStateChange = (e: number) => {
        setTabStateAppointment([]);
        const tab: { actived: boolean, label: string }[] = [];
        TabStateAppointement.map((item: { actived: boolean; label: string; }, index: number) => {
            if (e == index) {
                item.actived = true;
            } else {
                item.actived = false;
            }
            tab.push(item)
        })
        setTabStateAppointment(tab)
    }
    const specs = [
        {
            title: "Make",
            value: "Porsche"
        }
    ]
    const [isHidden, setIsHidden] = useState<boolean>(true)
    return (
        <section className="w-full relative container">
            <div className="relative max-w-full py-4 ">
                <div className="flex justify-between">
                    <h2 className="font-bold">
                        Appointment
                    </h2>

                </div>
                <div>
                    <h3 className="text-[22px] text-primary">Porsche Taycan Turbo S</h3>
                    <h4 className="text-normal text-[14px]">2024, RWD</h4>
                </div>
                <Image className="w-1/2" width={354} height={159} src="" alt="" />
                <FilterBy onEvent={(e: number) => onStateChange(e)} filterTab={TabStateAppointement}></FilterBy>
                <div className="grid grid-cols-3">
                    <div>
                        <div className="flex justify-between items-center">
                            <h3>Specs</h3>
                            <button onClick={() => setIsHidden(!isHidden)} type="button" id="detailButton"
                                className="p-2 transition-all rounded-full hover:bg-rose-200/70">
                                <svg width="20" height="20" className={isHidden ? "" : "rotate-180"} viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
                                        fill="#111111" />
                                </svg>
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           { specs.map((item, index) => (
                            <div key={`${item}${index}`} className="border p-4 rounded-xl border-neutral">
                                <h4 className="text-placeholder text-[14px]">{item.title}</h4>
                                <h4 className="text-normal  text-[14px]">{item.value}</h4>
                            </div>
                           ))}
                        </div>
                    </div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </section>
    )
}   