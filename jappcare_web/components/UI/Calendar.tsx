import { useEffect, useState } from "react"
interface DayInterface {
    label: string,
    isActive: boolean,
    day: number,
    longLabel: string
}


const Calendar = () => {
    const [data, setData] = useState<DayInterface[]>([])
    // const [nbrJour, setNbrJour] = useState<number>(1);

    useEffect(() => {
        const now = new Date();
        const d = new Date();
        const mois = d.getMonth() + 1;
        const annee = d.getFullYear();

        const generateCalendar = (dm: number, dan: number): DayInterface[] => {
            const thisMonth = now.getMonth() + 1;
            const thisYear = now.getFullYear();
            const thisDay = now.getDate();
            const date = new Date(dan, dm - 1, 1);
            let startDay = date.getDay();
            if (startDay > 0) startDay--;
            else startDay = 6;
            let Stop = 31;
            if (dm == 4 || dm == 6 || dm == 9 || dm == 11) --Stop;
            if (dm == 2) {
                Stop = Stop - 3;
                if (dan % 4 == 0) Stop++;
                if (dan % 100 == 0) Stop--;
                if (dan % 400 == 0) Stop++;
            }
            let sd = 1
            const tab: DayInterface[] = []
            for (var i = 0; i <= 5; i++) {

                for (var j = 0; j <= 5; j++) {

                    if ((i == 0) && (j < startDay)) {
                        // console.log(sd)
                    } else {
                        if (sd < Stop) {
                            if ((dan == thisYear) && (dm == thisMonth) && (sd == thisDay))
                                // setData([...data, { label: "", day: sd, longLabel: "", isActive: true }]);
                                tab.push({ label: "", day: sd, longLabel: "", isActive: true })
                            else
                                tab.push({ label: "", day: sd, longLabel: "", isActive: true })
                            // setData([...data, { label: "", day: sd, longLabel: "", isActive: false }]);
                            // setNbrJour(sd)
                            sd++
                            // console.log(sd)
                        } else {

                        }
                    }
                }
                if (sd < Stop) {
                    if ((dan == thisYear) && (dm == thisMonth) && (sd == thisDay))
                        tab.push({ label: "", day: sd, longLabel: "", isActive: true })
                    // setData([...data, { label: "", day: sd, longLabel: "", isActive: true }]);
                    else
                        tab.push({ label: "", day: sd, longLabel: "", isActive: true });
                    // setData([...data, { label: "", day: sd, longLabel: "", isActive: false }]);
                    // setNbrJour(sd);
                    sd++;
                    // console.log(sd)
                } else {

                }
            }
            console.table(tab)
            return tab
        }
        setData(generateCalendar(mois, annee))
    }, [data])
    return (
        <div className="grid w-full grid-cols-7 gap-1 p-2">
            <div className="flex flex-col justify-center py-3 text-center border rounded-full">
                <span>M</span>
                <span>27</span>
            </div>
            <div className="flex flex-col justify-center py-3 text-center border rounded-full">
                <span>M</span>
                <span>28</span>
            </div>
            <div className="flex flex-col justify-center py-3 text-center border rounded-full">
                <span>M</span>
                <span>{data.length}</span>
            </div>
            {
                data.map((item, index) => (
                    <div key={index}
                        className="flex flex-col justify-center py-3 text-center text-white bg-orange-500 border rounded-full">
                        <span>M</span>
                        <span>{item.day}</span>
                    </div>
                ))
            }

            <div className="flex flex-col justify-center py-3 text-center border rounded-full">
                <span>M</span>
                <span>31</span>
            </div>
            <div className="flex flex-col justify-center py-3 text-center border rounded-full"> <span>M</span>
                <span>1</span>
            </div>
            <div className="flex flex-col justify-center py-3 text-center border rounded-full"> <span>M</span>
                <span>2</span>
            </div>
        </div>
    )
}

export default Calendar