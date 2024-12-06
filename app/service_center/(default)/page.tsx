"use client";

import { useEffect, useState } from 'react'
import React from 'react';
import CardBasic from '@/components/UI/CardBasic';
import CalendarIcon from '@/components/Icones/calendarIcon';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import CardEmergencyAdmin from '@/components/UI/CardEmergencyAdmin';
import Alert from '@/components/UI/Alert';
import CardAppointmentAdmin from '@/components/UI/CardAppointmentAdmin';
import FilterBy from '@/components/UI/FilterBy';
import { StateEnum } from '@/enums/statusEnum';
import { AppointmentInterface } from '@/interfaces/AppointmentInterface';
import AppointmentDetailModal from '@/components/UI/AppointmentDetailModal';
import { ServiceInterface } from '@/interfaces/ServiceInterface';
import CardChartBar from '@/components/UI/CardChartBar';
export default function Page() {
    const session = useSession();
    const [noAppointment, setNoAppointment] = useState<boolean>(false)
    const [appointments, setAppointments] = useState<AppointmentInterface[] | null>(null);
    const [services, setServices] = useState<ServiceInterface[] | null>(null);
    const [messageAlert, setMessageAlert] = useState<string>("")
    const [colorAlert, setColorAlert] = useState<string>("")
    const [isHiddenAlert, setIsHiddenAlert] = useState<boolean>(true)
    const [itemData, setItemData] = useState<AppointmentInterface | undefined>()
    const [openDetailAppointment, setOpenDetailAppointment] = useState<boolean>(false);
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
                        const resService = await fetch('/api/services?token=' + session.data?.user?.accessToken);
                        if (resService.ok) {
                            const data = await resService.json();
                            setServices(data.data);
                        } else {
                            setServices(null)
                        }
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
        getDataAndStat();
    }, [session])
    const EmergencyButtonHandler = (e: boolean) => {
        if (e) {
            setMessageAlert("Accept Emergency Assitance Request")
            setColorAlert("border-l-green-600")
        } else {
            setMessageAlert("Decline Emergency Assitance Request")
            setColorAlert('border-l-red-600')
        }
        setIsHiddenAlert(false)

    }
    const HiddenAlertHandler = (e: boolean) => {
        setIsHiddenAlert(e)
    }

    const [TabStateAppointement, setTabStateAppointment] = useState<{ actived: boolean, label: string }[]>([
        { label: StateEnum.PENDING.toString(), actived: false },
        { label: StateEnum.CONFIRMED.toString(), actived: false },
        { label: StateEnum.CANCELLED.toString(), actived: false },
        { label: StateEnum.COMPLETED.toString(), actived: false },
        { label: StateEnum.NO_SHOW.toString(), actived: false }
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


    return (
        <div>
            <title>Admin | home </title>
         
            <section className="w-full py-8 relative container px-4  bg-white" >
                <div className="relative py-8 " >
                    <div className="flex flex-row flex-wrap gap-4 items-start">
                        <div style={{ maxWidth: "65%" }} className="w-full gap-4 items-start justify-items-start grid grid-cols-1 sm:grid-cols-2  ">
                            {
                                noAppointment ? (<CardBasic color="primary" icon={CalendarIcon({ stroke: "white", fill: "white" })} subTitle="This week" title="Appointments" stat={appointments?.length + ''} pourcentage={0} sup={false}></CardBasic>)
                                    : (<div className=" animate-pulse  bg-gray-200 h-full rounded-2xl dark:bg-gray-700 w-full mb-4"></div>)
                            }
                            <CardBasic color="secondary" icon={CalendarIcon({ stroke: "orange", fill: "orange" })} subTitle="This week" title="Revenue" stat={"0 Frs"} pourcentage={0} sup={false}></CardBasic>
                            <CardBasic color="secondary" icon={CalendarIcon({ stroke: "orange", fill: "orange" })} subTitle="This week" title="Accepted Emergency Request" stat={"0"} pourcentage={0} sup={false}></CardBasic>
                            <CardBasic color="secondary" icon={CalendarIcon({ stroke: "orange", fill: "orange" })} subTitle="This week" title="Rejected Emergency Request" stat={"0"} pourcentage={0} sup={false}></CardBasic>
                            <div className='w-full col-span-2 mt-2' >
                                <CardEmergencyAdmin emitHandler={EmergencyButtonHandler} carName={'Car'} nameManager={'Mark Garage'} nameClient={'Paul'} cause={'Break Failure'} prix={'4500'} distance={'12 km'} ></CardEmergencyAdmin>
                                <div className='flex mb-2 items-center gap-4 font-medium mt-8'>
                                    <CalendarIcon stroke='black' fill='black'></CalendarIcon>
                                    <span>Recent Appointments</span>
                                </div>
                                <FilterBy onEvent={(e: number) => onStateChange(e)} filterTab={TabStateAppointement}></FilterBy>

                                <div className='mt-4'>
                                    {
                                        appointments ?
                                            appointments.map((item, index) => (
                                                <CardAppointmentAdmin key={index}
                                                    item={item} onShow={(e) => { setOpenDetailAppointment(e); setItemData(item) }}></CardAppointmentAdmin>
                                            )) : (
                                                <div>
                                                    <div className=" animate-pulse min-h-52  bg-gray-200 h-full rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
                                                    <div className=" animate-pulse  min-h-52  bg-gray-200 h-full rounded-2xl dark:bg-gray-700 w-full mb-4"></div>

                                                </div>
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                        <div style={{ maxWidth: "32%" }} className='w-full'>
                            <CardChartBar data={[0, 0, 0, 0, 0, 0, 0]} subTitle='Appointments' maxWidth="w-full" height={''}  ></CardChartBar>
                            <div className='p-2'>
                                <h3 className='font-bold text-lg mb-2 '>Services</h3>
                                {
                                    services ? (
                                        <>
                                            {
                                                services.length > 0 ? (
                                                    <div className='flex flex-col gap-4'>
                                                        {
                                                            services.map((item, index) => (
                                                                <Link key={index} href={"/service_center/services/" + item.id}>
                                                                    <div
                                                                        className="relative flex items-start p-4 rounded-3xl cursor-pointer bg-purple-100 lg:basis-1/2 xl:w-full basis-full min-h-32">
                                                                        <h2 className="text-2xl font-medium" >{item.title}</h2>

                                                                    </div>
                                                                </Link>
                                                            ))
                                                        }
                                                    </div>
                                                ) : (<>No services</>)
                                            }

                                        </>
                                    )
                                        : (<div className=" animate-pulse min-h-32 bg-gray-200  rounded-2xl dark:bg-gray-700 w-full mb-4"></div>)
                                }   
                            </div>

                        </div>
                    </div>
                </div>
            </section >
            {
                !isHiddenAlert ? (
                    <div className=' flex justify-center items-center fixed w-full h-full top-0 bg-black/50 left-0'>
                        <Alert message={messageAlert} emitHandler={HiddenAlertHandler} color={colorAlert}></Alert>
                    </div>
                ) : ''
            }
            {
                (openDetailAppointment && itemData) ? <AppointmentDetailModal onClose={setOpenDetailAppointment} item={itemData} /> : null
            }
        </div>
    )
}