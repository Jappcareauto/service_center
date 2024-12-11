
const   CardBasic = (props: { color: string, icon: JSX.Element | null, subTitle: string, title: string, stat: string }) => {
    const getThemeBackground = (color: string) => {
        let backgroundColor = ""
        switch (color) {
            case "primary":
                backgroundColor = "bg-primary"
                break;
            case "secondary":
                backgroundColor = "bg-white border border-neutral"
                break;
            default:
                backgroundColor = "bg-primary"
                break;
        }
        return backgroundColor
    }
    const getColorFont = (color: string) => {
        let fontColor = ""
        switch (color) {
            case "primary":
                fontColor = "text-white bg-primary-neutral"
                break;
            case "secondary":
                fontColor = "text-placeholder bg-neutral"
                break;
            default:
                fontColor = "text-white bg-primary-neutral"
                break;
        }
        return fontColor
    }

    
    return (
        <div
            className={"flex flex-col    w-full justify-between max-w-[360px] pt-[16px] px-[24px] pb-[24px] max-md:min-h-24 rounded-[20px]  h-[180px] " + getThemeBackground(props.color)}>
            <div className="flex items-center justify-between">
                {props.icon}
                <span className={"p-2 px-3 text-[14px]  rounded-full  " + getColorFont(props.color)}>{props.subTitle}
                </span>
            </div>
            <div className="flex items-end justify-between">
                <div>
                    <h2 className={" text-[32px] font-bold  " + (props.color == "primary" ? "text-white" : "text-black")}>{props.stat}</h2>
                    <p className={"text-[14px] " + (props.color == "primary" ? "text-white" : "text-normal")}>{props.title}</p>
                </div>
              
            </div>
        </div>
    )
}

export default CardBasic