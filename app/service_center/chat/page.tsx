
"use client"
import { ChatMessageInterface } from "@/interfaces/ChatMessageInterface"
import Image from "next/image";
import { FormEvent, useState } from "react"

export default function Page() {
    const [message, setMessage] = useState<string>("")
    const [messages, setMessages] = useState<ChatMessageInterface[]>([]);
    
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const date = new Date()
        setMessages([...messages, { senderId: `02`, content: message, chatRoomId: `01`, timestamp: date, type: 'TEXT_SIMPLE', appointmentId: "" }])
        setMessage("")
    }

    return (
        <div className="flex w-full flex-col justify-between  h-[93vh] col-span-3 px-8 text-sm ">
            <div>
                <div className="flex items-center w-full gap-4 pb-4 rounded-2xl">
                    <Image src={"/images/profil7.png"} className="rounded-full" width={60} height={60} alt="" />
                    <div>
                        <h1 className="text-2xl  font-thin ">Sara</h1>
                    </div>
                </div>
                <hr />
                <div className="mt-8  ">
                    <Image src={"/images/capture.png"} width={300} height={600} alt="" />
                    <div className="flex flex-col items-start gap-1 mt-5" >
                        <div className="p-2 rounded-lg text-[14px] text-normal bg-neutral w-fit max-w-80">Yorem ipsum dolor sit amet. consectetur adipiscing elit. Nunc vulputate?</div>
                    </div>
                    <div className="flex flex-col items-end gap-1 mt-5" >
                        <div className="p-2 rounded-lg text-[14px] text-normal bg-primary-light w-fit max-w-80">Yorem ipsum dolor sit amet. consectetur adipiscing elit. Nunc vulputate?</div>
                    </div>
                    <div className="flex flex-col items-end gap-1 mt-5" >
                        <div className="p-2 rounded-lg text-[14px] text-normal bg-primary-light w-fit max-w-80">Yorem ipsum dolor sit amet.</div>
                    </div>
                    <div className="flex flex-col items-start gap-1 mt-5" >
                        <div className="p-2 rounded-lg text-[14px] text-normal bg-neutral w-fit max-w-80">Yorem ipsum dolor sit amet. consectetur adipiscing elit. Nunc vulputate?</div>
                    </div>
                    {messages.map((item, index) => (
                        <div className="flex flex-col items-end gap-1 mt-5" key={index}>
                            <div className="p-2 rounded-lg bg-rose-50 w-fit max-w-80">{item.content}</div>
                        </div>
                    ))
                    }
                </div>
            </div>
            <form onSubmit={onSubmit} className="flex items-center gap-2 py-8">
                <div className="flex items-center w-full gap-2 p-2 rounded-full bg-rose-50">
                    <input type="text" onChange={e => { setMessage(e.target.value); }} value={message} className="border-none w-full focus-visible:outline-none text-sm p-2 bg-inherit" placeholder="Write a message" />
                    <input type="file" hidden />
                    <button>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.82844 10.4857L10.4853 4.82888C11.6569 3.6573 13.5564 3.6573 14.7279 4.82888C15.8995 6.00045 15.8995 7.89994 14.7279 9.07152L8.01042 15.789C7.42463 16.3748 6.47488 16.3748 5.8891 15.789C5.30331 15.2032 5.30331 14.2535 5.8891 13.6677L11.8995 7.6573C12.0948 7.46204 12.0948 7.14546 11.8995 6.9502C11.7042 6.75493 11.3877 6.75493 11.1924 6.9502L5.18199 12.9606C4.20568 13.9369 4.20568 15.5198 5.18199 16.4961C6.1583 17.4724 7.74121 17.4724 8.71752 16.4961L15.435 9.77862C16.9971 8.21653 16.9971 5.68387 15.435 4.12177C13.8729 2.55967 11.3403 2.55967 9.77818 4.12177L4.12133 9.77862C3.92607 9.97388 3.92607 10.2905 4.12133 10.4857C4.31659 10.681 4.63318 10.681 4.82844 10.4857Z"
                                fill="#111111" />
                        </svg>
                    </button>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 6.00003C7.79086 6.00003 6 7.79089 6 10C6 12.2092 7.79086 14 10 14C12.2091 14 14 12.2092 14 10C14 7.79089 12.2091 6.00003 10 6.00003ZM7 10C7 8.34318 8.34315 7.00003 10 7.00003C11.6569 7.00003 13 8.34318 13 10C13 11.6569 11.6569 13 10 13C8.34315 13 7 11.6569 7 10ZM8.12394 2C7.55688 2 7.0383 2.31977 6.78367 2.82643L6.19418 3.9994H4.5047C3.12399 3.9994 2.0047 5.11868 2.0047 6.4994V14.5C2.0047 15.8807 3.12399 17 4.5047 17H15.5047C16.8854 17 18.0047 15.8807 18.0047 14.5V6.4994C18.0047 5.11869 16.8854 3.9994 15.5047 3.9994H13.8148L13.2298 2.8293C12.9758 2.32106 12.4563 2 11.8881 2H8.12394ZM7.67718 3.27548C7.76206 3.10659 7.93492 3 8.12394 3H11.8881C12.0775 3 12.2507 3.10702 12.3354 3.27643L13.0585 4.72296C13.1432 4.89238 13.3163 4.9994 13.5057 4.9994H15.5047C16.3331 4.9994 17.0047 5.67097 17.0047 6.4994V14.5C17.0047 15.3284 16.3331 16 15.5047 16H4.5047C3.67627 16 3.0047 15.3284 3.0047 14.5V6.4994C3.0047 5.67097 3.67627 4.9994 4.5047 4.9994H6.50249C6.69151 4.9994 6.86437 4.89281 6.94925 4.72392L7.67718 3.27548Z"
                            fill="#111111" />
                    </svg>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 13C11.6569 13 13 11.6568 13 9.99998V5C13 3.34315 11.6569 2 10 2C8.34315 2 7 3.34315 7 5V9.99998C7 11.6568 8.34315 13 10 13ZM10 12C8.89543 12 8 11.1046 8 9.99998V5C8 3.89543 8.89543 3 10 3C11.1046 3 12 3.89543 12 5V9.99998C12 11.1046 11.1046 12 10 12ZM5 9.49998C5.27614 9.49998 5.5 9.72384 5.5 9.99998C5.5 12.4853 7.51472 14.5 10 14.5C12.4853 14.5 14.5 12.4853 14.5 9.99998C14.5 9.72384 14.7239 9.49998 15 9.49998C15.2761 9.49998 15.5 9.72384 15.5 9.99998C15.5 12.869 13.3033 15.2249 10.5 15.4776V17.5C10.5 17.7761 10.2761 18 10 18C9.72386 18 9.5 17.7761 9.5 17.5V15.4776C6.69675 15.2249 4.5 12.869 4.5 9.99998C4.5 9.72384 4.72386 9.49998 5 9.49998Z"
                            fill="#111111" />
                    </svg>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#111111" fillRule="evenodd" clipRule="evenodd" d="M4 18.6458V8.05426C4 5.20025 4 3.77325 4.87868 2.88663C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.88663C20 3.77325 20 5.20025 20 8.05426V18.6458C20 20.1575 20 20.9133 19.538 21.2108C18.909 21.616 17.9939 20.9757 17.3666 20.5367C17.241 20.4488 17.127 20.369 17.0291 20.3073L17.029 20.3072L17.029 20.3072C16.5441 20.0014 16.3017 19.8485 16.0325 19.8397C15.7417 19.8301 15.4949 19.9768 14.9709 20.3073L13.06 21.5124L13.0589 21.5131C12.5441 21.8376 12.2866 22 12 22C11.7134 22 11.4559 21.8376 10.9411 21.5131L10.9411 21.5131L10.94 21.5124L9.02913 20.3073C8.54415 20.0014 8.30166 19.8485 8.03253 19.8397C7.74172 19.8301 7.49493 19.9768 6.97087 20.3073C6.87303 20.369 6.75906 20.4488 6.63356 20.5366L6.63353 20.5366C6.00625 20.9756 5.09101 21.616 4.46195 21.2108C4 20.9133 4 20.1575 4 18.6458ZM7.25 11C7.25 10.5858 7.58579 10.25 8 10.25H11C11.4142 10.25 11.75 10.5858 11.75 11C11.75 11.4142 11.4142 11.75 11 11.75H8C7.58579 11.75 7.25 11.4142 7.25 11ZM8 6.25C7.58579 6.25 7.25 6.58579 7.25 7C7.25 7.41421 7.58579 7.75 8 7.75H14C14.4142 7.75 14.75 7.41421 14.75 7C14.75 6.58579 14.4142 6.25 14 6.25H8Z" />
                    </svg>
                </div>
                <button type="submit" className="flex items-center justify-center bg-primary rounded-full size-12">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.18412 0.11244C0.336572 -0.0118225 0.547712 -0.0351664 0.723627 0.0527913L15.7236 7.55279C15.893 7.63749 16 7.81062 16 8C16 8.18939 15.893 8.36252 15.7236 8.44722L0.723627 15.9472C0.547712 16.0352 0.336572 16.0118 0.18412 15.8876C0.0316676 15.7633 -0.0337739 15.5612 0.0169031 15.3712L1.98255 8L0.0169031 0.628836C-0.0337739 0.438798 0.0316676 0.236702 0.18412 0.11244ZM2.88416 8.5L1.26911 14.5564L14.382 8L1.26911 1.44357L2.88416 7.5H9.50002C9.77616 7.5 10 7.72386 10 8C10 8.27615 9.77616 8.5 9.50002 8.5H2.88416Z"
                            fill="white" />
                    </svg>
                </button>
            </form>
        </div>
    )
}