"use client"

import CalendarIcon from "@/components/Icones/calendarIcon"
import CardEmergency from "@/components/service_center/emergency/card-emergency"
import EmergencyDetails from "@/components/service_center/emergency/emergency-details"
import CardChartBar from "@/components/UI/CardChartBar"
import FilterBy from "@/components/UI/FilterBy"
import { useState } from "react"

interface IEmergency {
    name: string,
    type: "Request" | "Accepted" | "Declined" | "In progress",
    vehicle: string,
    cause: string,
    price: string,
    device: string,
    distance: string,
}

export default function Page() {
    const [TabStateEmergency, setTabStatedEmergency] = useState<{ actived: boolean, label: string }[]>([
        { label: "Request", actived: false },
        { label: "Accepted", actived: false },
        { label: "Declined", actived: false },
    ])
    const [item, setItem] = useState<IEmergency>({
        name: "",
        distance: "",
        type: "Request",
        vehicle: "",
        price: "",
        device: "",
        cause: ""
    })
    const onStateChange = (e: number) => {
        setTabStatedEmergency([]);
        const tab: { actived: boolean, label: string }[] = [];
        TabStateEmergency.map((item: { actived: boolean; label: string; }, index: number) => {
            if (e == index) {
                item.actived = true;
            } else {
                item.actived = false;
            }
            tab.push(item)
        })
        setTabStatedEmergency(tab)
    }
   
    return (
        <section className="w-full relative  container px-4 flex flex-row bg-white">
            <div className="w-full" >
                <div className="flex flex-row gap-6">
                    <div
                        className={"flex flex-col    w-full justify-between max-w-[360px] pt-[16px] px-[24px] pb-[24px] max-md:min-h-24 bg-white border border-neutral rounded-[20px]  h-[180px] "}>
                        <div className="flex items-center justify-between">
                            <CalendarIcon fill="#FB7C37" stroke="#FB7C37" />
                            <span className={"p-2 px-3 text-[14px]  rounded-full text-primary bg-neutral "}>In Progress</span>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <h2 className={" text-[32px] font-bold  text-normal"}>00</h2>
                                <p className={"text-[14px] text-normal"}>Emergency Request</p>
                            </div>

                        </div>
                    </div>
                    <CardChartBar subTitle={"This week"} maxWidth={""} height={""} data={[10, 5, 20, 30, 20, 15, 24]} />
                </div>
                <div className="grid grid-cols-1 gap-5 mt-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
                    <div className="col-span-1 lg:col-span-2 md:col-span-1">
                        <div className="mt-5">
                            <div className="flex items-center gap-2">
                                <CalendarIcon fill="#242424" stroke="#242424" />
                                <span className="font-semibold" >Emergency Assistance Requests</span>
                            </div>
                            <div className="flex mt-4 gap-2 items-center justify-between ">
                                <FilterBy onEvent={(e: number) => onStateChange(e)} filterTab={TabStateEmergency}></FilterBy>
                            </div>
                            <div
                                className="flex flex-col h-full gap-4 py-4 overflow-x-hidden overflow-y-auto">
                                <CardEmergency name={"James Mann"} showDetail={(e) => { setItem(e) }} type={"Request"} vehicle={"Prorsche Taycan Turbo S"} cause={"Break Failure"} price={"7000"} device={"Frs"} distance={"12km away"} />
                                <CardEmergency name={"James Mann"} showDetail={(e) => { setItem(e) }} type={"Declined"} vehicle={"Prorsche Taycan Turbo S"} cause={"Break Failure"} price={"7000"} device={"Frs"} distance={"12km away"}/>
                                <CardEmergency name={"James Mann"} showDetail={(e) => { setItem(e) }} type={"In progress"} vehicle={"Prorsche Taycan Turbo S"} cause={"Break Failure"} price={"7000"} device={"Frs"} distance={"12km away"}/>
                                <CardEmergency name={"James Mann"} showDetail={(e) => { setItem(e) }} type={"Accepted"} vehicle={"Prorsche Taycan Turbo S"} cause={"Break Failure"} price={"7000"} device={"Frs"} distance={"12km away"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EmergencyDetails name={item.name} type={item.type} vehicle={item.vehicle} cause={item.cause} price={item.price} device={item.device} distance={item.distance} />
        </section>
    )
}