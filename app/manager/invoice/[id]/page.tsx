"use client"

import { TITLE_WEBSITE } from "@/app/lib/constantes"
// import OrderDetailsModal from "@/components/UI/OrderDetailsModal"
// import { OrderInterface } from "@/interfaces/OrderInterface"
import { useSession } from "next-auth/react"
import { useEffect } from "react"


export default function Page() {
    // const [TabStateOrder, setTabStateOrder] = useState<{ actived: boolean, label: string }[]>([
    //     { label: "Pending", actived: true },
    //     { label: "In Progress", actived: false },
    //     { label: "Delivered", actived: false },
    // ])
    
    // const [openOrderDetailsModal, setOpenOrderDetailsModal] = useState<boolean>(false)
    const session = useSession();
    // const [dataRequest, setDataRequest] = useState<OrderInterface[] | null>(null);
    // const [itemData, setItemData] = useState<OrderInterface | undefined>()
   
    useEffect(() => {
        const getDataAndStat = async () => {
            try {
                if (session.data) {
                    if (session.data?.user) {
                        const resAppointment = await fetch('/api/orders?token=' + session.data?.user?.accessToken);
                        if (resAppointment.ok) {
                            const data = await resAppointment.json();
                            // setDataRequest(data);
                            // setNoAppointment(true)
                        }

                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
        getDataAndStat();
    }, [session])


    return (
        <section className="w-full py-8 relative container px-4  bg-white" >
            <title> {TITLE_WEBSITE} | Invoice</title>
            <div className="relative max-w-full">
                <section className="w-full px-4 xl:px-20 ">
                    <div className="relative max-w-full py-8 xl:max-w-7xl">
                        <div className="w-full flex justify-end">
                            <button type="button" className="p-2 rounded-full notificationButton" id="notificationButton">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2.52992 14.394C2.31727 15.7471 3.268 16.6862 4.43205 17.1542C8.89481 18.9486 15.1052 18.9486 19.5679 17.1542C20.732 16.6862 21.6827 15.7471 21.4701 14.394C21.3394 13.5625 20.6932 12.8701 20.2144 12.194C19.5873 11.2975 19.525 10.3197 19.5249 9.27941C19.5249 5.2591 16.1559 2 12 2C7.84413 2 4.47513 5.2591 4.47513 9.27941C4.47503 10.3197 4.41272 11.2975 3.78561 12.194C3.30684 12.8701 2.66061 13.5625 2.52992 14.394Z"
                                        stroke="#111111" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M9 21C9.79613 21.6219 10.8475 22 12 22C13.1525 22 14.2039 21.6219 15 21"
                                        stroke="#111111" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <span className="hidden">1</span>
                            </button>
                        </div>
                        <div>
                            <div className="font-bold flex items-center gap-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M4 18.6458V8.05426C4 5.20025 4 3.77325 4.87868 2.88663C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.88663C20 3.77325 20 5.20025 20 8.05426V18.6458C20 20.1575 20 20.9133 19.538 21.2108C18.909 21.616 17.9939 20.9757 17.3666 20.5367C17.241 20.4488 17.127 20.369 17.0291 20.3073L17.029 20.3072L17.029 20.3072C16.5441 20.0014 16.3017 19.8485 16.0325 19.8397C15.7417 19.8301 15.4949 19.9768 14.9709 20.3073L13.06 21.5124L13.0589 21.5131C12.5441 21.8376 12.2866 22 12 22C11.7134 22 11.4559 21.8376 10.9411 21.5131L10.9411 21.5131L10.94 21.5124L9.02913 20.3073C8.54415 20.0014 8.30166 19.8485 8.03253 19.8397C7.74172 19.8301 7.49493 19.9768 6.97087 20.3073C6.87303 20.369 6.75906 20.4488 6.63356 20.5366L6.63353 20.5366C6.00625 20.9756 5.09101 21.616 4.46195 21.2108C4 20.9133 4 20.1575 4 18.6458ZM7.25 11C7.25 10.5858 7.58579 10.25 8 10.25H11C11.4142 10.25 11.75 10.5858 11.75 11C11.75 11.4142 11.4142 11.75 11 11.75H8C7.58579 11.75 7.25 11.4142 7.25 11ZM8 6.25C7.58579 6.25 7.25 6.58579 7.25 7C7.25 7.41421 7.58579 7.75 8 7.75H14C14.4142 7.75 14.75 7.41421 14.75 7C14.75 6.58579 14.4142 6.25 14 6.25H8Z"
                                        fill="#141B34" />
                                </svg>
                                Create Invoice
                            </div>
                            <div className="flex max-w-3xl justify-end text-red-500 font-bold">
                                Unpaid
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4" style={{ width: 744 }}>
                            <div className="block">
                                <label htmlFor="InvoiceNumber" className="text-sm">Invoice Number</label>
                                <div className="mt-1">
                                    <input type="text"
                                        className="w-full border-none p-3 text-sm focus-visible:bg-orange-100/40 focus-visible:outline-orange-500 focus-visible:outline-1 focus-visible:placeholder:text-orange-500 rounded-xl bg-stone-100"
                                        placeholder="Invoice Number" name="InvoiceNumber" id="InvoiceNumber" />
                                </div>
                            </div>
                            <div id="phone-to-email">
                                <label htmlFor="Vehicle" className="text-sm">Vehicle</label>
                                <div className="flex gap-2 mt-1">
                                    <select id="Vehicle" name="Vehicle" 
                                        className="w-full p-3 text-sm border-none focus-visible:bg-orange-100/40 focus-visible:outline-orange-500 focus-visible:outline-1 focus-visible:placeholder:text-orange-500 rounded-xl bg-stone-100">
                                        <option>Porshe Taycan</option>
                                    </select>
                                </div>
                            </div>
                            <div className="block">
                                <label htmlFor="IssueDate" className="text-sm">Issue Date</label>
                                <div className="mt-1">
                                    <input type="date"
                                        className="w-full border-none p-3 text-sm focus-visible:bg-orange-100/40 focus-visible:outline-orange-500 focus-visible:outline-1 focus-visible:placeholder:text-orange-500 rounded-xl bg-stone-100"
                                        placeholder="Issue Date" name="IssueDate" id="IssueDate" />
                                </div>
                            </div>
                            <div className="block">
                                <label htmlFor="DueDate" className="text-sm">Due Date</label>
                                <div className="mt-1">
                                    <input type="date"
                                        className="w-full border-none p-3 text-sm focus-visible:bg-orange-100/40 focus-visible:outline-orange-500 focus-visible:outline-1 focus-visible:placeholder:text-orange-500 rounded-xl bg-stone-100"
                                        placeholder="Due Date" name="DueDate" id="DueDate" />
                                </div>
                            </div>
                            <div>
                                Billed From
                                <div className="block border p-4 rounded-2xl">
                                    <div className="flex items-center font-bold gap-4">
                                        <img src="./../../assets/images/e251d71c3423db0397a03934f2d1c3ee.png"
                                            className="rounded-full" width="48" height="48" />
                                        Dave&apos;s Garage
                                    </div>
                                    <div className="text-sm">
                                        <p>Tradex Makepe, Douala Cameroon</p>
                                        <p>(555)1314-9684</p>
                                        <p>person@email.com</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                Billed To
                                <div className="block border p-4 rounded-2xl">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center font-bold gap-4">
                                            <img src="./../../assets/images/e251d71c3423db0397a03934f2d1c3ee.png"
                                                className="rounded-full" width="48" height="48" />
                                            Sara May
                                        </div>

                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
                                                fill="#111111" />
                                        </svg>

                                    </div>
                                    <div className="text-sm">
                                        <p>Tradex Makepe, Douala Cameroon</p>
                                        <p>(555)1314-9684</p>
                                        <p>person@email.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="block border col-span-2 p-4 rounded-2xl">
                                <div className="border-b pb-2 text-sm flex justify-between">
                                    <div>
                                        <span className="text-orange-500">Item</span>
                                    </div>
                                    <div className="gap-6 grid grid-cols-3">
                                        <span className="text-orange-500">Qnty</span>
                                        <span className="text-orange-500">Unit price</span>
                                        <span className="text-orange-500">Total Price</span>
                                    </div>
                                </div>

                                <div className="text-sm flex justify-between py-4">
                                    <div>
                                        <span className="text-black">Spark Plugs</span>
                                    </div>
                                    <div className="gap-6 grid grid-cols-3">
                                        <span className="text-black">2</span>
                                        <span className="text-black">2,500 frs</span>
                                        <span className="text-black font-bold">5,000 frs</span>
                                    </div>
                                </div>
                                <div className="text-sm flex justify-between py-4">
                                    <div>
                                        <span className="text-black">Spark Plugs</span>
                                    </div>
                                    <div className="gap-6 grid grid-cols-3">
                                        <span className="text-black">2</span>
                                        <span className="text-black">2,500 frs</span>
                                        <span className="text-black font-bold">5,000 frs</span>
                                    </div>
                                </div>
                                <div className="text-sm flex justify-between py-4">
                                    <div>
                                        <span className="text-black">Spark Plugs</span>
                                    </div>
                                    <div className="gap-6 grid grid-cols-3">
                                        <span className="text-black">2</span>
                                        <span className="text-black">2,500 frs</span>
                                        <span className="text-black font-bold">5,000 frs</span>
                                    </div>
                                </div>
                                <div className="text-sm flex gap-2 justify-between py-4">
                                    <div className="w-full">
                                        <input type="text"
                                            className="w-full border-none p-3 text-sm focus-visible:bg-orange-100/40 focus-visible:outline-orange-500 focus-visible:outline-1 focus-visible:placeholder:text-orange-500 rounded-xl bg-stone-100"
                                            placeholder="Item Name" name="ItemName" id="ItemName" />
                                    </div>
                                    <div className="gap-1 grid grid-cols-3">
                                        <input type="number"
                                            className=" border-none p-2 text-sm focus-visible:bg-orange-100/40 focus-visible:outline-orange-500 focus-visible:outline-1 focus-visible:placeholder:text-orange-500 rounded-xl bg-stone-100"
                                            placeholder="Qnty" name="ItemName" id="ItemName" />
                                        <input type="number"
                                            className=" border-none p-2 text-sm focus-visible:bg-orange-100/40 focus-visible:outline-orange-500 focus-visible:outline-1 focus-visible:placeholder:text-orange-500 rounded-xl bg-stone-100"
                                            placeholder="Unit price" name="ItemName" id="ItemName" />
                                        <input type="number"
                                            className=" border-none p-2 text-sm focus-visible:bg-orange-100/40 focus-visible:outline-orange-500 focus-visible:outline-1 focus-visible:placeholder:text-orange-500 rounded-xl bg-stone-100"
                                            placeholder="Total Price" name="ItemName" id="ItemName" />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button className="px-4 p-3 text-sm border-2 border-black text-black rounded-xl">Add Item</button>
                                </div>
                            </div>

                            <div className="block border col-span-2 text-sm p-4 rounded-2xl">
                                <div className="border-b pb-2">
                                    <span className="text-orange-500">Total</span>
                                </div>
                                <div className="flex  mt-4 gap-5 flex-col">
                                    <div className="flex justify-between ">
                                        <span>Include Tax</span>
                                        {/* <svg width="51" height="31" viewBox="0 0 51 31" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_2102_16763)">
                                                <rect width="51" height="31" rx="15.5" fill="#FB7C37" />
                                                <g filter="url(#filter0_ddd_2102_16763)">
                                                    <rect x="22" y="2" width="27" height="27" rx="13.5" fill="white" />
                                                </g>
                                            </g>
                                            <defs>
                                                <filter id="filter0_ddd_2102_16763" x="14" y="-3" width="43" height="43"
                                                    filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                    <feColorMatrix in="SourceAlpha" type="matrix"
                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                        result="hardAlpha" />
                                                    <feOffset dy="3" />
                                                    <feGaussianBlur stdDeviation="0.5" />
                                                    <feComposite in2="hardAlpha" operator="out" />
                                                    <feColorMatrix type="matrix"
                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                                    <feBlend mode="normal" in2="BackgroundImageFix"
                                                        result="effect1_dropShadow_2102_16763" />
                                                    <feColorMatrix in="SourceAlpha" type="matrix"
                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                        result="hardAlpha" />
                                                    <feOffset dy="3" />
                                                    <feGaussianBlur stdDeviation="4" />
                                                    <feComposite in2="hardAlpha" operator="out" />
                                                    <feColorMatrix type="matrix"
                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                                    <feBlend mode="normal" in2="effect1_dropShadow_2102_16763"
                                                        result="effect2_dropShadow_2102_16763" />
                                                    <feColorMatrix in="SourceAlpha" type="matrix"
                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                        result="hardAlpha" />
                                                    <feMorphology radius="1" operator="dilate" in="SourceAlpha"
                                                        result="effect3_dropShadow_2102_16763" />
                                                    <feOffset />
                                                    <feComposite in2="hardAlpha" operator="out" />
                                                    <feColorMatrix type="matrix"
                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
                                                    <feBlend mode="normal" in2="effect2_dropShadow_2102_16763"
                                                        result="effect3_dropShadow_2102_16763" />
                                                    <feBlend mode="normal" in="SourceGraphic"
                                                        in2="effect3_dropShadow_2102_16763" result="shape" />
                                                </filter>
                                                <clipPath id="clip0_2102_16763">
                                                    <rect width="51" height="31" rx="15.5" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg> */}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Subtotal</span>
                                        <span className="font-bold">28,500 Frs</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <span>Tax</span>
                                            <input type="number"
                                                className="w-20 border-none p-3 text-sm   focus-visible:bg-orange-100/40 focus-visible:outline-orange-500 focus-visible:outline-1 focus-visible:placeholder:text-orange-500 rounded-xl bg-stone-100"
                                                placeholder="10%" name="InvoiceNumber" id="Tax" />
                                        </div>
                                        <span className="font-bold">28,50 Frs</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>Payment Method</div>

                                        <select id="methodePaiment"
                                            className="w-72 p-3  text-sm border-none focus-visible:bg-orange-100/40 focus-visible:outline-orange-500 focus-visible:outline-1 focus-visible:placeholder:text-orange-500 rounded-xl bg-stone-100">
                                            <option>MTN Mobile Money</option>
                                        </select>
                                    </div>
                                    <div className="flex text-orange-500 bg-orange-50 rounded-xl p-3 justify-between">
                                        <span>Total</span>
                                        <span className="font-bold">28,500 Frs</span>

                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 w-full col-span-2  flex justify-end gap-4">
                                <button className="px-4 p-3 border text-sm border-black text-black rounded-xl">Save Draft</button>
                                <button className="px-4 p-3 border text-sm bg-black text-white rounded-xl">Send to client</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* {
                (openOrderDetailsModal && itemData) ? <OrderDetailsModal item={itemData} onClose={setOpenOrderDetailsModal} /> : null
            } */}
        </section>

    )
}