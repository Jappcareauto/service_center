import Image from "next/image"
import * as React from "react"
import { Button } from "./Button"
const CardEmergencyAdmin =
    (props: { carName: string, emitHandler: (value: boolean) => void, cause: string, prix: string, distance: string, nameManager: string, nameClient: string }) => {

        const [isHidden, setIsHidden] = React.useState<boolean>(true)
        return (
            <div className="w-full"
            >
                <div className="pt-3 px-4 pb-4  bg-primary-light rounded-2xl ">
                    <div className="flex justify-between">
                        <div className="flex gap-2">
                            <svg width="24" height="24" viewBox="0 0 24 24"  fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.52992 14.394C2.31727 15.7471 3.268 16.6862 4.43205 17.1542C8.89481 18.9486 15.1052 18.9486 19.5679 17.1542C20.732 16.6862 21.6827 15.7471 21.4701 14.394C21.3394 13.5625 20.6932 12.8701 20.2144 12.194C19.5873 11.2975 19.525 10.3197 19.5249 9.27941C19.5249 5.2591 16.1559 2 12 2C7.84413 2 4.47513 5.2591 4.47513 9.27941C4.47503 10.3197 4.41272 11.2975 3.78561 12.194C3.30684 12.8701 2.66061 13.5625 2.52992 14.394Z"
                                    fill="#111111" />
                                <path
                                    d="M9 21C9.79613 21.6219 10.8475 22 12 22C13.1525 22 14.2039 21.6219 15 21"
                                    stroke="#111111" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round" />
                            </svg>
                            <span className="text-sm font-semibold">Emergency Assitance Request</span>
                        </div>
                        <button onClick={() => setIsHidden(!isHidden)} type="button" id="detailButton"
                            className="p-2 transition-all rounded-full hover:bg-rose-200/70">
                            <svg width="20" height="20" className={isHidden ? "" : "rotate-180"} viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
                                    fill="#111111" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Image width={48} height={48} alt="Default image" src={"/images/default-image-manager.png"} />
                        <span className="text-[14px] font-normal text-normal" >James Mann</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex">
                            <span className=" text-normal text-[14px] font-semibold border-r border-neutral pr-4 ">{props.carName}</span>
                            <span className=" text-normal text-[14px] font-semibold border-r border-neutral px-4 ">{props.cause}</span>
                            <span className=" text-normal text-[14px] font-semibold border-r border-neutral px-4 ">{props.prix}</span>
                            <span className=" text-normal text-[14px] font-semibold  px-4 ">{props.distance}</span>
                        </div>
                        <div className="flex gap-3">
                            <Button className="w-24 px-[20px]  h-[40px] rounded-full" typeButton={"outline"} label={"Decline"}></Button>
                            <Button className="w-24 px-[20px]  h-[40px] rounded-full" typeButton={"dark"} label={"Accept"}></Button>
                        </div>
                    </div>
                    {
                        isHidden ? null : (
                            <div className=" mt-4 flex" id="detail-emergency">
                                <div className="w-full">
                                    <h2 className="text-xs text-stone-500">Added Note</h2>
                                    <p className="text-sm">Hello, Please I have a break failure, the pedal seems very loose.</p>
                                </div>
                                <div className="text-sm">
                                    map
                                </div>
                            </div>
                        )
                    }

                    <button onClick={() => props.emitHandler(true)} ><span className="hidden">Hidden</span></button>
                </div>
            </div>

        )
    }


export default CardEmergencyAdmin
