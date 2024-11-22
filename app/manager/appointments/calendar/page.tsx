"use client"

import { Button } from "@/components/UI/Button"
import Calendar from "@/components/UI/Calendar"
import Planning from "@/components/UI/planning";
import ScheduleItem from "@/components/UI/ScheduleItem";
import { AppointmentInterface } from "@/interfaces/AppointmentInterface";
import { useState } from "react";

export default function Page() {
    const [appointments, setAppointments] = useState<AppointmentInterface[] | null>([]);
    const [showSchedule, setShowSchedule] = useState<boolean>(false);
    const [expend, setExpend] = useState<boolean>(false);
    return (
        <section className="w-full relative container px-4 flex flex-row bg-white">
            <div className="relative max-w-full py-8 w-full xl:max-w-7xl" >
                {
                    expend ? (
                        <div id="calendarCard" className="justify-between gap-8 flex mt-8 ">
                            <div className="flex items-end justify-between min-w-2/3 rounded-2xl bg-rose-50" style={{ height: 304, width: "100%" }}>
                                <div className="flex justify-between w-full p-4 item">
                                    <div className="text-xl font-bold">Calendar</div>
                                    <div className="p-2 px-3 font-semibold text-orange-500 bg-white rounded-full">Week</div>
                                </div>
                            </div>
                            <div className="max-w-md">
                                <Calendar isWeekView={true} />
                            </div>
                        </div>
                    ) : null
                }
                {
                    !expend ? (
                        <div id="textCalendar" className="mt-8 text-xl font-bold">Calendar</div>
                    ) : null}
                <Button onClick={() => setShowSchedule(true)} typeButton="outline" type="button" className="w-fit mt-4 rounded-full px-4" label="Show schedule"></Button>
                {
                    showSchedule ? <Calendar isWeekView={false} /> : <Planning isMobile={false} />
                }
            </div>

            {
                !expend ? (
                    <div>
                        <div id="calendarModal" className="fixed z-50 top-0 max-w-sm right-0 flex justify-end h-full ">
                            <div
                                className="relative flex flex-col justify-start h-full px-5 py-10 overflow-y-auto bg-white border-l shadow-lg max-md:py-10 max-md:px-5 modal-content">
                                <div>
                                    <Button typeButton="clear" onClick={() => setExpend(true)} className="relative float-right mt-8 w-fit" label="Expend"></Button>
                                    <div className="mt-8">
                                        <Calendar isWeekView={true} />
                                    </div>
                                    <div className="hidden mt-6">
                                        <img src="./../../assets/images/small-schedule.svg" alt="" />
                                    </div>
                                    <div className="flex flex-col gap-4 mt-8" id="calendarToSchedule">
                                        {
                                            appointments ?
                                                appointments.map((item, index) => (
                                                    <ScheduleItem key={index} name={""} serviceName={item.service.title} vehicleName={item.vehicle.name} date={item.date} dateEnd={item.date} />
                                                )) : (
                                                    <div>
                                                        <div className=" animate-pulse min-h-20  bg-gray-200 h-full rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
                                                        <div className=" animate-pulse  min-h-20  bg-gray-200 h-full rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
                                                    </div>
                                                )
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null
            }

        </section>
    )
}