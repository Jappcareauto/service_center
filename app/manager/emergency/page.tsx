"use client"

import CalendarIcon from "@/components/Icones/calendarIcon"
import StatIcon from "@/components/Icones/StatIcon"
import CardEmergency from "@/components/manager/emergency/card-emergency"
import EmergencyDetails from "@/components/manager/emergency/emergency-details"
import CardBasic from "@/components/UI/CardBasic"
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
        let tab: { actived: boolean, label: string }[] = [];
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
    const [showDetail, setShowDetail] = useState<boolean>(false)
    return (
        <section className="w-full relative container px-4 flex flex-row bg-white">
            <div className="w-full" >
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
                    <CardBasic color={"secondary"} icon={StatIcon({ fill: "#FB7C37" })} subTitle={"In progress"} title={"Emergency Request"} stat={"0"} pourcentage={0} sup={false} />
                    <CardChartBar subTitle={"This week"} maxWidth={""} height={""} data={[]} />
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
                                className="flex flex-col h-full gap-4 py-8 mt-4 overflow-x-hidden overflow-y-auto">
                                <CardEmergency name={""} showDetail={(e) => { setItem(e); setShowDetail(true) }} type={"Request"} vehicle={""} cause={""} price={""} device={""} distance={""} />
                                <CardEmergency name={""} showDetail={(e) => { setItem(e); setShowDetail(true) }} type={"Declined"} vehicle={""} cause={""} price={""} device={""} distance={""} />
                                <CardEmergency name={""} showDetail={(e) => { setItem(e); setShowDetail(true) }} type={"In progress"} vehicle={""} cause={""} price={""} device={""} distance={""} />
                                <CardEmergency name={""} showDetail={(e) => { setItem(e); setShowDetail(true) }} type={"Accepted"} vehicle={""} cause={""} price={""} device={""} distance={""} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                showDetail ?  <EmergencyDetails name={item.name} type={item.type} vehicle={item.vehicle} cause={item.cause} price={item.price} device={item.device} distance={item.distance} onClose={setShowDetail}  /> : null
            }
        </section>
    )
}