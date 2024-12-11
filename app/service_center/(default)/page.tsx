"use client";

import { useEffect, useState } from 'react'
import React from 'react';
import CardBasic from '@/components/UI/CardBasic';
import CalendarIcon from '@/components/Icones/calendarIcon';
import StatIcon from '@/components/Icones/StatIcon';
import { useSession } from 'next-auth/react';
import CardEmergencyAdmin from '@/components/UI/CardEmergencyAdmin';
import Alert from '@/components/UI/Alert';
import CardAppointmentAdmin from '@/components/UI/CardAppointmentAdmin';
import FilterBy from '@/components/UI/FilterBy';
import Image from "next/image"
import { AppointmentInterface } from '@/interfaces/AppointmentInterface';
import AppointmentDetailModal from '@/components/UI/AppointmentDetailModal';
import GenerateReportModal from "@/components/UI/GenerateReportModal";

import CardChartBar from '@/components/UI/CardChartBar';
import axios from 'axios';
export default function Page() {
    const session = useSession();
    const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
    const [messageAlert, setMessageAlert] = useState<string>("")
    const [colorAlert, setColorAlert] = useState<string>("")
    const [openGeneraleReport, setOpenGeneraleReport] = useState<boolean>(false);
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
        { label: "Not Started", actived: false },
        { label: "In Progress", actived: false },
        { label: "Completed", actived: false },

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
        <div>
            <title>Service center Home - Jappcare Autocare </title>

            <section className="w-full relative max-xl:max-w-[1128px] px-4  bg-white" >
                <div className="relative " >
                    <div>
                        <div className="w-full gap-6 items-start justify-items-start flex flex-wrap flex-row ">
                            <CardBasic color="primary" icon={CalendarIcon({ stroke: "white", fill: "white" })} subTitle="This week" title="Appointments" stat={appointments.length + ''} />
                            <CardBasic color="secondary" icon={StatIcon({ fill: "#FB7C37" })} subTitle="This week" title="Revenue" stat={"0 Frs"} />
                            <CardChartBar data={[0, 0, 0, 0, 0, 0, 0]} subTitle='Appointments' maxWidth="w-full" height={''} />
                            <div className=' col-span-2 mt-2 w-[745px]'  >
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
                            <div className='w-full max-w-[360px] '>

                                <div className='p-2 w-full'>
                                    <h3 className='font-bold text-lg mb-2 '>Services</h3>
                                    <div
                                        className="flex flex-col w-full items-start justify-between gap-2 xl:flex-col lg:flex-row xl:gap-0 sm:flex-row">
                                        <div onClick={() => setOpenGeneraleReport(true)}
                                            className="relative  flex items-center w-full bg-[#F4EEFF] p-4 rounded-3xl  lg:basis-1/2 basis-full min-h-32">
                                            <h2 className="text-2xl  w-[160px]">Vehicle
                                                Reports</h2>
                                            <Image src={"/images/service_1.png"} width={123} height={155} className="absolute right-0 -bottom-0" alt="" />
                                        </div>
                                        <div
                                            className="relative flex items-center bg-[#C4FFCD] p-4 rounded-3xl xl:mt-4 min-h-32 lg:basis-1/2 xl:w-full basis-full">
                                            <h2 className="text-2xl w-[160px]">Vehicle
                                                Reports</h2>
                                            <Image src={"/images/service_2.png"} width={123} height={155} className="absolute right-0 -bottom-0" alt="" />
                                        </div>
                                    </div>
                                </div>

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
                (openDetailAppointment && itemData) ? <AppointmentDetailModal markTask={handleMarkTask} onClose={setOpenDetailAppointment} item={itemData} /> : null
            }
            {
                (openGeneraleReport) ? <GenerateReportModal onClose={setOpenGeneraleReport} /> : null
            }
        </div>
    )
}