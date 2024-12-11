"use client"

import SearchIcon from "@/components/Icones/SearchIcon";
import { Button } from "@/components/UI/Button";
import CardMessageUser from "@/components/UI/CardMessageUser";
import { useEffect, useState } from "react";
import profilImage from "@/public/images/profil7.png"
import { useSession } from "next-auth/react";
import { changeDateForm } from "@/functions/boostrapFunctions"

interface ChatRoomInterface {
    name: string,
    participantIds: string[],
    id: string,
    createdBy: string,
    updatedBy: string,
    createdAt: string,
    updatedAt: string
}
const ChatNavBar = () => {

    const session = useSession();

    const [chatRoomList, setChatRoomList] = useState<ChatRoomInterface[]>([])
    const [searchInputValue, setSearchInputValue] = useState<string>("")
    const [activedButton, setActivedButton] = useState<boolean>(true)
    const [discusionsUser, setDiscusionsUser] = useState<ChatRoomInterface[]>([])

    useEffect(() => {
        const getDataAndStat = async () => {
            if (session.status == "authenticated") {
                try {

                    const resChatRoom = await fetch('/api/chat?token=' + session.data?.user?.accessToken);
                    if (resChatRoom.ok) {
                        const dataChat = await resChatRoom.json();
                        setChatRoomList(dataChat);
                        setDiscusionsUser(dataChat)
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        }

        getDataAndStat()
    }, [session])

    const onSearchUser = () => {
        setActivedButton(true)
        setDiscusionsUser(chatRoomList);
        if (searchInputValue == "") {
            setDiscusionsUser(chatRoomList)
            return
        }
        const tab: ChatRoomInterface[] = []
        discusionsUser.map((item) => {
            if (item.name.trim().toLocaleLowerCase().search(searchInputValue.toLocaleLowerCase()) != -1) {
                tab.push(item);
            }
        })
        setDiscusionsUser(tab)
    }
    const buttonAllAndUnreadHandler = () => {
        if (!activedButton) {
            setDiscusionsUser(chatRoomList)
        } else {
            const tab: ChatRoomInterface[] = []
            discusionsUser.map((item) => {
                if (item.participantIds.length.toString() != "0") {
                    tab.push(item);
                }
            })
            setDiscusionsUser(tab)
        }
    }
    return (
        <>
            <div style={{ maxWidth: 450, width: "100%" }} className="max-h-[95vh]">

                <div className="relative  col-span-2 px-8 " id="serviceCenter">
                    <div className={"flex gap-2 font-bold "}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.3596 22 8.77516 21.6039 7.35578 20.8583L3.06538 21.9753C2.6111 22.0937 2.1469 21.8213 2.02858 21.367C1.99199 21.2266 1.99198 21.0791 2.02855 20.9386L3.1449 16.6502C2.3972 15.2294 2 13.6428 2 12C2 6.47715 6.47715 2 12 2ZM13.2517 13H8.75L8.64823 13.0068C8.28215 13.0565 8 13.3703 8 13.75C8 14.1297 8.28215 14.4435 8.64823 14.4932L8.75 14.5H13.2517L13.3535 14.4932C13.7196 14.4435 14.0017 14.1297 14.0017 13.75C14.0017 13.3703 13.7196 13.0565 13.3535 13.0068L13.2517 13ZM15.25 9.5H8.75L8.64823 9.50685C8.28215 9.55651 8 9.8703 8 10.25C8 10.6297 8.28215 10.9435 8.64823 10.9932L8.75 11H15.25L15.3518 10.9932C15.7178 10.9435 16 10.6297 16 10.25C16 9.8703 15.7178 9.55651 15.3518 9.50685L15.25 9.5Z"
                                fill="#111111" />
                        </svg>
                        <span>Chat</span>
                    </div>

                    <div className="flex gap-2 mt-5 text-sm">
                        <Button style={{ width: "fit-content" }} onClick={() => { setActivedButton(true); buttonAllAndUnreadHandler() }} className="rounded-full h-10 px-4" typeButton={activedButton ? "primary" : "gray"} label={"All"} ></Button>
                        <Button style={{ width: "fit-content" }} onClick={() => { setActivedButton(false); buttonAllAndUnreadHandler() }} className="rounded-full h-10 px-4" typeButton={!activedButton ? "primary" : "gray"} label={"Unread"} ></Button>
                    </div>
                    <form className="flex items-center w-full p-2 pl-5 mt-5 bg-rose-50 rounded-full">
                        <SearchIcon fill="#C5550E" stroke="none"></SearchIcon>
                        <input type="search" value={searchInputValue} onKeyUp={onSearchUser} onChange={(e) => setSearchInputValue(e.target.value)} className="border-none w-full focus-visible:outline-none text-sm p-2 bg-inherit" placeholder="Search" />
                    </form>
                    <div className="mt-5">
                        {
                            discusionsUser ? discusionsUser.map((item) => (
                                <div key={item.id}>
                                    <CardMessageUser image={""} chatRoomId={item.id} userName={item.name} lastMessage={""} time={changeDateForm(item.updatedAt)} countNewMessage={item.participantIds.length.toString()}  ></CardMessageUser>
                                </div>
                            )) : (<div className=" animate-pulse  bg-gray-200 h-full min-h-28 rounded-2xl dark:bg-gray-700 w-full mb-4"></div>)
                        }
                        <CardMessageUser image={profilImage.src} chatRoomId={"01"} userName={"Sara"} lastMessage={"Last Sent Message"} time={"3:32pm"} countNewMessage={"2"}  ></CardMessageUser>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ChatNavBar