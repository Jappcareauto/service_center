import { useState } from "react"
import CloseIcon from "../Icones/CloseIcon"
import { MediaItemInterface } from "@/interfaces/MediaItemInterface"

const ImagesView = (props: { item: MediaItemInterface[] }) => {
    const [hiddenFullScreenView, setHiddenFullScreenView] = useState<boolean>(false);
    const [currentUrl, setCurrentUrl] = useState<string>("")
    return (
        <>
            <div className="flex w-full gap-2 overflow-hidden">
                {
                    props.item.map((element, key) => (
                        <img key={key} onClick={() => {setCurrentUrl(element.sourceUrl); setHiddenFullScreenView(true)}} src={element.sourceUrl} width="140"
                            height="140" className="cursor-pointer rounded-xl " alt="" />
                    ))
                }
            </div>
            {
                hiddenFullScreenView ? (
                    <div id="fullScreenView"
                        className="fixed top-0 left-0 z-50 items-center justify-center hidden w-full h-full bg-black/10 backdrop-blur-sm">
                        <div className="relative">
                            <button onClick={() => setHiddenFullScreenView(false)} type="button" className="text-gray-400 float-end relative bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                <CloseIcon stroke="#000"></CloseIcon>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <img id="imageFullScreen" src={currentUrl}
                                className="w-full h-full rounded-xl imageFullScreen" alt=""
                            />
                            <div className="flex justify-center w-full gap-2 mt-4 overflow-hidden">
                                {
                                    props.item.map((item, index) => (
                                        <img src={item.sourceUrl} onClick={() => setCurrentUrl(item.sourceUrl)} key={index} width="140" height="140"
                                            className="cursor-pointer rounded-xl imageFullScreen" alt="" />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ) : null
            }

        </>
    )
}

export default ImagesView