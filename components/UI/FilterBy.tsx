import { Button } from "./Button"
const FilterBy = (props: { filterTab: { actived: boolean, label: string }[], onEvent: (value: number) => void }) => {
    return (
        <div className="flex gap-2 items-start ">
            {
                props.filterTab.map((item, index) => (
                    <Button key={item.label} typeButton={item.actived ? 'primary' : 'gray'} onClick={() => props.onEvent(index)} className="text-sm rounded-3xl px-4 h-[40px] w-fit" label={item.label}></Button>
                ))
            }
        </div>
    )
}
export default FilterBy