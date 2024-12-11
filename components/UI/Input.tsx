import * as React from "react"

import { cn } from "@/app/lib/utils"
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, type, ...props }, ref) => {
        return (
            <input type={type}
                className={cn(" p-3 text-sm text-normal bg-[#F4F0EF] hover:bg-[#FFEDE6] focus-visible:bg-[#FFEDE6] placeholder:text-placeholder w-full min-h-[44px]  focus-visible:outline-[#FF8C52] focus-visible:outline-1 focus-visible:placeholder:text-orange-500 rounded-xl ", className)}
                ref={ref}  {...props} />
        )
    }
)
Input.displayName = "Input"

export { Input }
