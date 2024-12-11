import * as React from "react"

import { cn } from "@/app/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    typeButton: string, label: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(

    ({ className, label, typeButton, type, ...props }, ref) => {

        const selectType = (type: string) => {
            let cls
            switch (type) {
                case "dark":
                    cls = "w-full p-2 text-sm h-[52px]  text-white rounded-xl bg-normal hover:bg-stone-900";
                    break;
                case "clear":
                    cls = "w-full p-2 text-sm h-[52px]  text-stone-600 rounded-xl bg-white hover:text-stone-700";
                    break;
                case "primary":
                    cls = "w-full p-2 text-sm h-[52px]  text-white rounded-xl bg-orange-500 hover:bg-orange-600 hover:text-white";
                    break;
                case "gray":
                    cls = "w-full p-2 text-sm h-[52px]  text-stone-600 rounded-xl bg-stone-100 hover:text-stone-700 hover:bg-stone-200";
                    break;
                case "outline":
                    cls = "w-full p-2 text-sm h-[52px]  text-normal border border-normal rounded-xl hover:text-black hover:border-stone-800";
                    break;
                default:
                    cls = "w-full p-2 text-sm h-[52px]  text-white rounded-xl bg-normal hover:bg-stone-900";
                    break;
            }
            return cls;
        }
        return (
            <button type={type}
                className={
                    cn(selectType(typeButton), className)
                }
                ref={ref}  {...props} >{label}</button>
        )
    }
)
Button.displayName = "Button"

export { Button }
