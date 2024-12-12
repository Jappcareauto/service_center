import { Button } from "@/components/UI/Button"
import Image from "next/image"

interface CardEmergencyProps {
    name: string,
    type: "Request" | "Accepted" | "Declined" | "In progress",
    vehicle: string,
    cause: string,
    price: string,
    device: string,
    distance: string,
    showDetail: (value: {
        name: string,
        type: "Request" | "Accepted" | "Declined" | "In progress",
        vehicle: string,
        cause: string,
        price: string,
        device: string,
        distance: string,
    }) => void
}
const CardEmergency = ({ name, type, vehicle, cause, price, device, distance, showDetail }: CardEmergencyProps) => {
    const cardType = () => {
        switch (type) {
            case "Accepted":
                return null

            case "Request":
                return (
                    <div className="flex flex-col gap-3 items-end">

                        <div className="flex mt-4 gap-4">
                            <Button typeButton="outline" className="w-24 px-[20px]  h-[40px] rounded-full" label="Decline"></Button>
                            <Button typeButton="dark" className="w-24 px-[20px]  h-[40px] rounded-full" label="Accept"></Button>
                        </div>
                    </div>
                )

            case "Declined":
                return null

            default:

                return null

        }
    }
    const getStatus = () => {
        switch (type) {
            case "Accepted":
                return (
                    <div className="flex flex-col gap-3 items-end">
                        <div className="w-fit p-1 font-semibold text-[14px] text-green-600 rounded-full px-3 bg-green-200 hover:text-green-700 hover:bg-green-300">
                            Completed
                        </div>
                    </div>
                )

            case "Request":
                return (
                    <div className="flex flex-col gap-3 items-end">
                        <div className="w-fit  p-1 font-semibold text-[14px] text-stone-600 rounded-full px-3 bg-stone-200 hover:text-stone-700 hover:bg-stone-300">
                            Request
                        </div>

                    </div>
                )

            case "Declined":
                return (
                    <div className="flex flex-col gap-3 items-end">
                        <div className="w-fit p-1 font-semibold text-[14px] text-red-600 rounded-full px-3 bg-red-200 hover:text-red-700 hover:bg-red-300">
                            Declined
                        </div>
                    </div>
                )


            default:

                return (
                    <div className="flex flex-col gap-3 items-end">
                        <div className="w-fit p-1 font-semibold text-[14px] text-primary rounded-full px-3 bg-orange-200 hover:text-orange-700 hover:bg-orange-300">
                            In Progress
                        </div>
                    </div>
                )

        }
    }
    return (
        <div className="p-4 border cursor-pointer rounded-3xl" onClick={() => showDetail({
            name: name,
            distance: distance,
            type: type,
            vehicle: vehicle,
            price: price,
            device: device,
            cause: cause
        })}>
            <div >
                <div className="">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 p-1 bg-stone-200 rounded-full">
                                <Image width="48" height="48" className="rounded-full"
                                    src={"/images/default-image-manager.png"}
                                    alt="default-profil" />
                            </div>
                            <span className="text-stone-700">{name}</span>
                        </div>
                        {getStatus()}
                    </div>
                    <div className="flex justify-between  w-full items-center">
                        <div className="flex">
                            <span className=" text-normal text-[14px] font-semibold border-r border-neutral pr-4 ">{vehicle}</span>
                            <span className=" text-normal text-[14px] font-semibold border-r border-neutral px-4 ">{cause}</span>
                            <span className=" text-normal text-[14px] font-semibold border-r border-neutral px-4 ">{price} {device}</span>
                            <span className=" text-normal text-[14px] font-semibold  px-4 ">{distance}</span>
                        </div>
                        {cardType()}

                    </div>
                </div>


            </div>

        </div>
    )
}

export default CardEmergency