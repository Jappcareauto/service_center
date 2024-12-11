import { AppointmentInterface } from "@/interfaces/AppointmentInterface"
import CloseIcon from "../Icones/CloseIcon"
import CalendarIcon from "../Icones/calendarIcon"
import { changeDateForm } from "@/functions/boostrapFunctions"
import { Button } from "./Button"
import ImagesView from "./ImageView"
import Image from "next/image"

interface AppointmentDetailModalProps {
    onClose: (value: boolean) => void,
    item: AppointmentInterface,
    markTask: (value: string) => void,
}
const AppointmentDetailModal = (props: AppointmentDetailModalProps) => {
    const EnumtoString = (type: string) => {
        switch (type) {
            case "PENDING":
                return "In Progress"
            case "CONFIRMED":
                return "Completed"
            case "NO_SHOW":
                return "Not Started"
            default:
                return "Not Started"
        }
    }
    const LocationToString = (type: string) => {

        switch (type) {
            case "HOME":
                return "At Home";
            default:
                return type
        }
    }
    return (
        <div className="fixed top-0 z-50 justify-end right-0 w-[416px] h-full ">
            <div
                className="relative flex flex-col justify-between h-full px-5 py-6 pt-8 overflow-y-auto bg-white shadow-[#A6430F1A] shadow-xl max-md:py-10 max-md:px-5 modal-content">
                <div>
                    <button onClick={() => props.onClose(false)} type="button" className="text-gray-400 float-end relative bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="default-modal">
                        <CloseIcon stroke="#000"></CloseIcon>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <h2 className="font-semibold text-[16px]">Appointment Details</h2>

                    <div className="flex flex-col gap-4 mt-[20px]">
                        <div>
                            <h3 className="text-2xl font-semibold text-primary">
                                Porsche Taycan Turbo S
                            </h3>
                            <h4>2024, RWD</h4>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-4 items-center">
                                <Image width={48} height={48} alt="Default image" src={"/images/default-image-manager.png"} />
                                <span className="text-[14px] text-normal" >James Mann</span>
                            </div>
                            <div className="p-2 text-xs text-center text-primary rounded-full p w-28 bg-rose-50 lg:text-sm" >
                                <span>
                                    {EnumtoString(props.item.status)}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-end justify-between mt-4">
                            <div>
                                <h3 className="text-xl font-semibold text-primary max-md:text-sm">
                                    Appointment
                                </h3>
                                <h4 className="mt-2 font-bold">

                                </h4>
                                <div className="flex flex-col gap-2 mt-2 ">
                                    <div className="flex items-center gap-2">
                                        <CalendarIcon fill="#fff" stroke="#797676" />
                                        <span className="text-[14px] text-placeholder">{changeDateForm(props.item.date)}</span>
                                    </div>
                                    <div className="flex items-center text-placeholder gap-2 text-[14px]">
                                        <svg width="20" className="hidden md:block" height="20"
                                            viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12 2.00024C16.8706 2.00024 21 6.03322 21 10.926C21 15.8967 16.8033 19.3849 12.927 21.7569C12.6445 21.9164 12.325 22.0002 12 22.0002C11.675 22.0002 11.3555 21.9164 11.073 21.7569C7.2039 19.3618 3 15.9139 3 10.926C3 6.03322 7.12944 2.00024 12 2.00024Z"
                                                stroke="#797676" strokeWidth="1.5" />
                                            <path
                                                d="M15.4999 11C15.4999 12.933 13.9329 14.5 11.9999 14.5C10.0669 14.5 8.49991 12.933 8.49991 11C8.49991 9.067 10.0669 7.5 11.9999 7.5C13.9329 7.5 15.4999 9.067 15.4999 11Z"
                                                stroke="#797676" strokeWidth="1.5" />
                                        </svg>
                                        {LocationToString(props.item.locationType)}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[14px] text-placeholder">Revenue</span>
                                <span className="text-lg font-semibold text-primary ">
                                    
                                </span>
                            </div>
                        </div>
                        <p className="text-sm text-normal">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium dolorum reiciendis porro beatae, non laboriosam expedita quod enim sint architecto saepe. Nostrum, quam voluptatum reiciendis ab quod tempora corporis aliquid?
                        </p>
                        <h3 className="font-semibold">Images</h3>
                        <div className="flex w-full gap-2 overflow-hidden">
                            {
                                props.item.vehicle?.media.map((item, index) => (
                                    <ImagesView item={item.items} key={index}></ImagesView>
                                ))
                            }
                        </div>
                        <Button typeButton="dark" onClick={() => props.markTask(props.item.id)} label="Mark as completed"></Button>
                        <Button typeButton="outline" label="Expand View"></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppointmentDetailModal