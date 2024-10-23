"use client"

import { useRef, useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Mobile from "./Mobile";

const MOBILES = [
    "/testimonials/1.jpg",
    "/testimonials/2.jpg",
    "/testimonials/3.jpg",
    "/testimonials/4.jpg",
    "/testimonials/5.jpg",
    "/testimonials/6.jpg"
]

function splitArray<T>(array: Array<T>, num: number ){
    const result: Array<Array<T>> = []
    for (let i = 0; i < array.length; i++) {
        const index = i % num
        if(!result[index]){
            result[index] = []
        }
        result[index].push(array[i])
        
    }
    return result
}

function ReviewColumn({
    reviews,
    className,
    reviewClassName,
    perPixel = 0

}: {
    reviews: string[]
    className?: string
    reviewClassName?: (reviewIndex: number) => string
    perPixel?: number
}){
    const columnRef = useRef<HTMLDivElement | null>(null)
    const [columnHeight, setColumnHeight] = useState(0)
      const duration = `${columnHeight * perPixel}ms`

  useEffect(() => {
    if (!columnRef.current) return

    const resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0)
    })

    resizeObserver.observe(columnRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])
   

    return (
        <div ref={columnRef} className={cn("animate-marquee space-y-8 py-4", className)}style={{"--marquee-duration":duration} as React.CSSProperties}>
            {reviews.concat(reviews).map((img, reviewIndex) => (
                <Review/>
            )) }
        </div>
    )

}

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
    img: string
  }
  
  function Review({ img, className, ...props }: ReviewProps) {
    const POSSIBLE_ANIMATION_DELAYS = [
      '0s',
      '0.1s',
      '0.2s',
      '0.3s',
      '0.4s',
      '0.5s',
    ]
  
    const animationDelay =
      POSSIBLE_ANIMATION_DELAYS[
        Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
      ]
  
    return (
      <div
        className={cn(
          'animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5',
          className
        )}
        style={{ animationDelay }}
        {...props}>
        <Mobile img={img} />
      </div>
    )
  }
  
function ReviewGrid(){
    const containerRef = useRef<HTMLDivElement | null >(null)
    const inView = useInView(containerRef, {once:true, amount:0.4})
    const columns = splitArray(MOBILES, 3)
    const column1 = columns[0]
    const column2 = columns[1]
    const column3 = splitArray(columns[2], 2)


    return (
    <div ref={containerRef} className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">

    </div>)
}


export function Reviews(){
        return (
        <Wrapper className="relative max-w-5xl">
                <img aria-hidden="true" src="/"/>
                <ReviewGrid/>
        </Wrapper>)
}

