"use client"
import { TITLE_WEBSITE } from "@/app/lib/constantes";
import CalendarIcon from "@/components/Icones/calendarIcon";
import GridIcon from "@/components/Icones/GridIcon";
import InvoiceIcon from "@/components/Icones/InvoiceIcon";
import ListIcon from "@/components/Icones/ListIcon";
import InvoiceForm from "@/components/manager/invoice/invoice-form";
import InvoiceItem from "@/components/manager/invoice/invoice-item";

import { Button } from "@/components/UI/Button";
// import { Button } from "@/components/UI/Button";
// import CardinvoiceAdmin  from "@/components/UI/CardinvoiceAdmin";
import CardBasic from "@/components/UI/CardBasic";
import CardChartBar from "@/components/UI/CardChartBar";
// import CardChartLine from "@/components/UI/CardChartLine";
import CardListItem from "@/components/UI/CardListItem";
import CardStat from "@/components/UI/CardStat";
import FilterBy from "@/components/UI/FilterBy";
import { InvoiceInterface } from "@/interfaces/InvoiceInterface";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

enum StateEnum {
    PENDING = "Pending",
    CONFIRMED = "Confirmed",
    CANCELLED = "Cancelled",
    COMPLETED = "Completed",
    NO_SHOW = "No show",
    COUNT = 4
}
export default function Page() {
    // const [state, setState] = useState<string>("")
    const session = useSession();
    const [isList, setIsList] = useState(true)
    const [noinvoice, setNoinvoice] = useState<boolean>(false)
    const [itemData, setItemData] = useState<InvoiceInterface | undefined>()
    const [invoices, setinvoices] = useState<InvoiceInterface[] | null>(null);
    const [openDetailinvoice, setOpenDetailinvoice] = useState<boolean>(false);
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);
    const [TabStateAppointement, setTabStateinvoice] = useState<{ actived: boolean, label: string }[]>([
        { label: "Pending", actived: false },
        { label: "Paid", actived: false },
        { label: "Declined", actived: false },
    ])
    useEffect(() => {
        const getDataAndStat = async () => {
            try {
                if (session.data) {
                    if (session.data?.user) {
                        const resinvoice = await fetch('/api/invoices/list?token=' + session.data?.user?.accessToken);
                        if (resinvoice.ok) {
                            const data = await resinvoice.json();
                            setinvoices(data.data);
                            setNoinvoice(true)
                        } else {
                            setNoinvoice(false)
                        }
                        if (noinvoice) {
                            console.log(1)
                        }
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
        getDataAndStat();
    }, [session])
    const onStateChange = (e: number) => {
        setTabStateinvoice([]);
        let tab: { actived: boolean, label: string }[] = [];
        TabStateAppointement.map((item: { actived: boolean; label: string; }, index: number) => {
            if (e == index) {
                item.actived = true;
            } else {
                item.actived = false;
            }
            tab.push(item)
        })
        setTabStateinvoice(tab)
    }
    return (
        <section className="w-full relative container px-4 flex flex-row bg-white">
            {/* <title>{TITLE_WEBSITE} | invoice</title> */}
            <div className="w-full" >

                <div>
                    <div className=" mt-5 ">
                        <div>
                            {
                                isList ? (<>
                                    <div className="">
                                        <div className="flex my-8 text-[#141B34] items-center gap-4 font-semibold">
                                            <InvoiceIcon fill="#141B34" />
                                            Invoices
                                        </div>
                                        <div className="flex my-4 gap-2 items-center justify-between ">
                                            <FilterBy onEvent={(e: number) => onStateChange(e)} filterTab={TabStateAppointement}></FilterBy>
                                            <div className="flex gap-2 items-center ">
                                                <button onClick={() => setIsList(false)} className="size-10 p-1 hover:shadow-md rounded-full flex items-center justify-center" style={{ backgroundColor: !isList ? "#FB7C37" : "#f7f7f7" }}><GridIcon fill={!isList ? "#fff" : "#242424"}></GridIcon></button>
                                                <button onClick={() => setIsList(true)} className="size-10 p-1 rounded-full flex items-center hover:shadow-md justify-center" style={{ backgroundColor: isList ? "#FB7C37" : "#f7f7f7" }}><ListIcon fill={isList ? "#fff" : "#242424"}></ListIcon></button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-4">
                                            <CardStat icon={InvoiceIcon({ fill: "#FB7C37" })} color={"secondary"} title={"Pending Invoices"} stat={"0"} />
                                            <CardStat icon={InvoiceIcon({ fill: "#FB7C37" })} color={"secondary"} title={"Total Invoices"} stat={"0"} />
                                        </div>
                                        <div className="mt-8 ">

                                            {
                                                invoices ?
                                                    invoices.map((item, index) => (
                                                        <InvoiceItem key={index} />
                                                    )) : (
                                                        <div>
                                                            <div className=" animate-pulse min-h-10  bg-gray-200 h-full rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
                                                            {/* <div className=" animate-pulse  min-h-52  bg-gray-200 h-full rounded-2xl dark:bg-gray-700 w-full mb-4"></div> */}
                                                        </div>
                                                    )
                                            }
                                        </div>
                                    </div>
                                </>) : (
                                    <div className="py-8">
                                        <InvoiceForm />
                                    </div>
                                )
                            }
                        </div>

                    </div>

                </div>
            </div>

        </section>
    )
}