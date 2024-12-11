"use client"
import CalendarIcon from "@/components/Icones/calendarIcon";
import GridIcon from "@/components/Icones/GridIcon";
import ListIcon from "@/components/Icones/ListIcon";
import AppointmentCalendarModal from "@/components/UI/AppointmentCalendarModal";
import AppointmentDetailModal from "@/components/UI/AppointmentDetailModal";
import { Button } from "@/components/UI/Button";
import CardAppointmentAdmin from "@/components/UI/CardAppointmentAdmin";
import CardBasic from "@/components/UI/CardBasic";
import CardChartBar from "@/components/UI/CardChartBar";
import CardListItem from "@/components/UI/CardListItem";
import CardStat from "@/components/UI/CardStat";
import FilterBy from "@/components/UI/FilterBy";
import { AppointmentInterface } from "@/interfaces/AppointmentInterface";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


export default function Page() {
    const session = useSession();
    const [isList, setIsList] = useState(false)
    const [noAppointment, setNoAppointment] = useState<boolean>(false)
    const [itemData, setItemData] = useState<AppointmentInterface | undefined>()
    const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
    const [openDetailAppointment, setOpenDetailAppointment] = useState<boolean>(false);
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);
    const [TabStateAppointement, setTabStateAppointment] = useState<{ actived: boolean, label: string }[]>([
        { label: "Not Started", actived: false },
        { label: "In Progress", actived: false },
        { label: "Completed", actived: false },
    ])
    useEffect(() => {
        const getDataAndStat = async () => {
            try {
                if (session.data) {
                    if (session.data?.user) {
                        const resAppointment = await fetch('/api/appointments/list?token=' + session.data?.user?.accessToken);
                        if (resAppointment.ok) {
                            const data = await resAppointment.json();
                            setAppointments(data.data);
                            setNoAppointment(true)
                        } else {
                            setNoAppointment(false)
                        }
                        if (noAppointment) {
                            console.log(1)
                        }
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
        getDataAndStat();
    }, [session, noAppointment])
    const getDataAndStat = async () => {
        try {
            if (session.data) {
                if (session.data?.user) {
                    const resAppointment = await fetch('/api/appointments/list?token=' + session.data?.user?.accessToken);
                    if (resAppointment.ok) {
                        const data = await resAppointment.json();
                        setAppointments(data.data);
                        setNoAppointment(true)
                    } else {
                        setNoAppointment(false)
                    }
                    if (noAppointment) {
                        console.log(1)
                    }
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
    getDataAndStat();
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
    const handleMarkTask = async (id: string) => {
        try {
            const config = {
                method: 'get',
                url: process.env.apiUrl + 'appointment/' + id + '/status',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.data?.user?.accessToken}`,
                },
            };
            const sender = await axios(config);
            console.log(sender.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <section className="w-full relative container px-4 flex flex-row bg-white">
            <div className="w-full" >
                {
                    !isList ? (
                        <div className="grid grid-cols-4 gap-4">
                            <CardBasic color={"secondary"} icon={CalendarIcon({ stroke: "#FB7C37", fill: "#FB7C37" })} subTitle={"In progress"} title={"Appointments"} stat={"0"}  ></CardBasic>
                            <CardChartBar subTitle={"This week"} maxWidth={"max-w-96"} data={[0, 0, 0, 0, 0, 0, 0]} height={""}></CardChartBar>
                        </div>)
                        : null
                }
                <div>
                    <div className="max-w-6xl mt-5 ">
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 font-bold">
                                    <CalendarIcon stroke="black" fill="black"></CalendarIcon>
                                    <span>
                                        Appointments

                                    </span>
                                </div>
                                <Button onClick={() => setOpenCalendar(true)} typeButton="dark" className="w-fit rounded-full px-4" label="Calendar"></Button>
                            </div>
                            <div className="flex mt-4 gap-2 items-center justify-between ">
                                <FilterBy onEvent={(e: number) => onStateChange(e)} filterTab={TabStateAppointement}></FilterBy>
                                <div className="flex gap-2 items-center ">
                                    <button onClick={() => setIsList(false)} className="size-10 p-1 hover:shadow-md rounded-full flex items-center justify-center" style={{ backgroundColor: !isList ? "#FB7C37" : "#f7f7f7" }}><GridIcon fill={!isList ? "#fff" : "#242424"}></GridIcon></button>
                                    <button onClick={() => setIsList(true)} className="size-10 p-1 rounded-full flex items-center hover:shadow-md justify-center" style={{ backgroundColor: isList ? "#FB7C37" : "#f7f7f7" }}><ListIcon fill={isList ? "#fff" : "#242424"}></ListIcon></button></div>
                            </div>
                            {
                                isList ? (<>
                                    <div className="col-span-1 lg:col-span-2 md:col-span-1">
                                        <div className=" gap-4 grid grid-cols-4 mt-8">
                                            <CardStat icon={CalendarIcon({ fill: "#FB7C37", stroke: "#FB7C37" })} stat={appointments?.length ?? 0} color="secondary" title="Current Appointments"></CardStat>
                                            <CardStat icon={CalendarIcon({ fill: "#FB7C37", stroke: "#FB7C37" })} stat={appointments?.length ?? 0} color="secondary" title="Total Appointments"></CardStat>
                                        </div>
                                        <div className="mt-8 ">

                                            {
                                                appointments ?
                                                    appointments.map((item) => (
                                                        <CardListItem key={item.id}
                                                            item={item} onShow={(e) => { setOpenDetailAppointment(e); setItemData(item) }}></CardListItem>
                                                    )) : (
                                                        <div>
                                                            <div className=" animate-pulse min-h-10  bg-gray-200 h-full rounded-2xl dark:bg-gray-700 w-full mb-4"></div>

                                                        </div>
                                                    )
                                            }
                                        </div>
                                    </div>
                                </>) : (
                                    <>
                                        <div>
                                            <h2 className="my-4 text-lg font-bold">Up Next</h2>
                                            <div className="flex flex-col gap-2">
                                                <div className='mt-4'>
                                                    {appointments.map((item) => (
                                                        <CardAppointmentAdmin key={item.id}
                                                            item={item} onShow={(e) => { setOpenDetailAppointment(e); setItemData(item) }}></CardAppointmentAdmin>
                                                    ))}
                                                </div>
                                            </div>
                                            <h2 className="my-4 text-lg font-bold">Later</h2>

                                        </div>
                                    </>
                                )
                            }
                        </div>

                    </div>

                </div>
            </div>
            {
                (openDetailAppointment && itemData) ? <AppointmentDetailModal markTask={handleMarkTask} onClose={setOpenDetailAppointment} item={itemData} /> : null
            }
            {
                (openCalendar) ? <AppointmentCalendarModal appointmentList={appointments} onClose={setOpenCalendar} /> : null
            }
           
            
        </section>
    )
}