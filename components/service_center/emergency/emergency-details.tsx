import CalendarIcon from "@/components/Icones/calendarIcon"
import { Button } from "@/components/UI/Button"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useMemo, useState } from "react"

interface EmergencyDetailsProps {
    name: string,
    type: "Request" | "Accepted" | "Declined" | "In progress",
    vehicle: string,
    cause: string,
    price: string,
    device: string,
    distance: string,
}
const center = {
    lat: 51.505,
    lng: -0.09,
}
const EmergencyDetails = ({ name, type, vehicle, cause, price, device, distance }: EmergencyDetailsProps) => {
    
    const Map = useMemo(() => dynamic(
        () => import('@/components/UI/Map'),
        {
            loading: () => <p>A map is loading </p>,
            ssr: false
        }
    ), [])
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const cardType = () => {
        console.log(longitude, latitude)
        switch (type) {
            case "Accepted":
                return (
                    <div className="flex flex-col items-end">
                        <div className="w-fit p-1 text-sm text-green-600 rounded-full px-3 bg-green-200 hover:text-green-700 hover:bg-green-300">
                            Accepted
                        </div>
                    </div>
                )
                break;
            case "Request":
                return (
                    <div className="flex flex-col items-end">
                        <div className="w-fit  p-1 text-sm text-stone-600 rounded-full px-3 bg-stone-200 hover:text-stone-700 hover:bg-stone-300">
                            Request
                        </div>

                    </div>
                )
                break;
            case "Declined":
                return (
                    <div className="flex flex-col items-end">
                        <div className="w-fit p-1 font-semibold text-[14px] text-red-600 rounded-full px-3 bg-red-200 hover:text-red-700 hover:bg-red-300">
                            Declined
                        </div>
                    </div>
                )
                break;

            default:

                return (
                    <div className="flex flex-col items-end">
                        <div className="w-fit p-1 font-semibold text-[14px] text-orange-600 rounded-full px-3 bg-orange-200 hover:text-orange-700 hover:bg-orange-300">
                            In Progress
                        </div>
                    </div>
                )
                break;
        }
    }
    return (
        <div className="fixed top-0 z-50 border w-[416px]  border-l justify-end right-0  h-full ">
            <div
                className="relative flex flex-col justify-between h-full px-5 py-6 pt-8 overflow-y-auto bg-white  shadow-xl max-md:py-10 max-md:px-5 modal-content">
                <div>

                    <h2 className="font-bold text-normal text-[18px] mt-8">Emergency Details</h2>
                    <h1 className=" text-[24px] font-semibold  text-primary">{vehicle}</h1>
                    <h3>2024, RWD</h3>
                    <div className="py-2">
                        <Image src={"/images/car.png"} width={400} height={200} alt="" />
                    </div>
                    <div className="flex items-center justify-between w-full gap-4 rounded-2xl">
                        <div className="flex items-center gap-2">
                            <div className="w-12 h-12 p-1 ">
                                <Image width={50} height={50} className="rounded-full"
                                    src={"/images/default-image-manager.png"}
                                    alt="default-profil" />
                            </div>
                            <span>{name == "" ? "James Mann" : name}</span>
                        </div>
                        {cardType()}
                    </div>
                    <div className="flex items-end justify-between mt-4">
                        <div>
                            <h3 className="font-semibold text-xl text-primary "> {cause} Emergency</h3>

                            <div className="flex flex-col gap-2 mt-2  text-stone-500">
                                <div className="flex gap-1">
                                    <CalendarIcon fill="none" stroke="#797676" />
                                    <span >Oct, 20, 2024 10am</span>
                                </div>
                                <div className="flex gap-1">
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
                                    <span>{distance == "" ? '12Km Away' : distance}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className=" text-stone-500">Revenue</span> <br />
                            <span className="font-semibold text-primary">{price == "" ? "5,000" : price} {device == "" ? "Frs" : device}</span>
                        </div>

                    </div>

                    <p className="text-normal mt-2">
                        Hello, Please i have a break failure, the pedal seems very loose.
                    </p>
                    <h6 className="font-bold">User's Location</h6>
                    <div className="w-full h-52  bg-no-repeat border rounded-xl ">
                        <Map isDraggable={true} latitude={setLatitude} positionInit={center} longitude={setLongitude} posix={[51.505, -0.09]} />
                    </div>
                </div>

                <div>
                    <Button typeButton="dark" label="Accept"></Button>
                    <Button typeButton="outline" className="mt-4" label="Decline"></Button>

                </div>
            </div>
        </div>
    )
}

export default EmergencyDetails