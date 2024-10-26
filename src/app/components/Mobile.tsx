import React, { HTMLAttributes } from 'react'
import { cn } from "@/lib/utils";

interface MobileProps extends HTMLAttributes<HTMLDivElement>{
    imgSrc:string,
    darkmode?:boolean
}
const Mobile = ({imgSrc, className, darkmode = false, ...props}: MobileProps) => {
  return (
    <div className={cn("relative pointer-events-none z-50 overflow-hidden", className)}
        {...props}>
            <img src={darkmode ?"/phone-template-dark-edges.png":"/phone-template-white-edges.png"} className='pointer-events-none z-50 select-none' alt="mobile image"/>
            <div className='absolute -z-10 inset-0'>
                <img className='object-cover' src={imgSrc} alt="some image"/>
            </div>
    </div>
  )
}

export default Mobile