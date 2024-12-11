import CloseIcon from "../Icones/CloseIcon"
import { Button } from "./Button"
import { Input } from "./Input"
import { useState } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"
import Loader from "./Loader"

interface GenerateReportModalProps {
    onClose: (value: boolean) => void,
}
const GenerateReportModal = (props: GenerateReportModalProps) => {
    const [vin, setVin] = useState<string>("")
    const [registration, setRegistration] = useState<string>("")
    const session = useSession()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const onSubmit = async () => {
        setIsLoading(true)
        try {
            const config = {
                method: 'get',
                url: '',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.data?.user?.accessToken}`,
                },
            };
            const sender = await axios(config);
            console.log(sender.data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="fixed top-0 z-50 justify-end right-0 w-[416px] h-full ">
            <form
                className="relative flex flex-col justify-between h-full px-5 py-6 pt-8 overflow-y-auto bg-white shadow-[#A6430F1A] shadow-xl max-md:py-10 max-md:px-5 modal-content">
                <div>
                    <Loader isLoading={isLoading} message={null}></Loader>
                    <button onClick={() => props.onClose(false)} type="button" className="text-gray-400 float-end relative bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="default-modal">
                        <CloseIcon stroke="#000"></CloseIcon>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <h2 className="font-semibold text-[16px]">Generate Vehicle Report</h2>

                    <div onSubmit={onSubmit} className="flex flex-col gap-4 mt-[20px]">
                        <div className="flex p-1 mt-4 rounded-xl bg-primary-light">
                            <button type="button"
                                className="w-full p-3 text-sm text-white bg-primary rounded-lg hover:bg-orange-500">VIN</button>
                            <button type="button"
                                className="w-full p-3 text-sm rounded-lg text-normal bg-inherit hover:bg-orange-100/50 hover:font-medium">Make
                                & Model</button>
                        </div>
                        <div className="mt-[20px]">
                            <div className="block mb-[30px]" id="vin-to-phone">
                                <label htmlFor="vin" className="text-[14px] font-normal text-normal">VIN/Chassi Number</label>
                                <Input placeholder="Ex: NW905 AG" value={vin} onChange={e => { setVin(e.target.value); }} className='mt-1' name="vin" id="vin" type='text' ></Input>
                            </div>
                            <div className="block" id="vin-to-phone">
                                <label htmlFor="vin" className="text-[14px] font-normal text-normal">Vehicle Registration Number</label>
                                <Input placeholder="Ex: NW905 AG" value={registration} onChange={e => { setRegistration(e.target.value); }} className='mt-1' name="vin" id="vin" type='text' ></Input>
                            </div>
                        </div>
                       
                    </div>
                </div>
                <Button type="submit" typeButton="dark" label="Generate Report"></Button>
            </form>
        </div>
    )
}

export default GenerateReportModal