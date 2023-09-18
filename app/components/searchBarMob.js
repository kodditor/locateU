"use client"

import { useState } from "react"


export default function SearchBarMob()
{
    const [ searchClicked, setSearch ] = useState(false)

    if(searchClicked)
    {
        return (
            <>
                <div className="absolute w-[100vw-.7rem] mx-[1.35rem] md:mx-0 md:w-fit md:pt-4 top-4.5 md:top-0 md:mr-10 md:ml-10 left-0 md:left-auto md:right-0">
                    <form action="/search" className="bg-white w-full md:w-max m-auto flex flex-row justify-center md:justify-normal items-center">
                        <div className="flex flex-row items-center justify-center md:justify-between">
                            <input type="text" className={`${(searchClicked)? "block" : "hidden"} w-[calc(100%-50px)] duration-150 text-blue text-[18px] rounded-full px-4 md:px-8 py-1 md:py-4 border-2 border-lightBlue border-solid active:border-blue`} placeholder="Search for a lecture hall..." required maxLength={50} name="q"/>
                            <button className="flex justify-center items-center duration-150 px-2 py-2 ml-3 md:p-4 bg-blue hover:bg-lightBlue rounded-full border-2"><img className="w-[10px] md:w-[25px] h-[10px] md:h-[20px]" src="/img/magnifying-glass.png" /></button>
                            <div className="text-red hover:text-white ml-3 px-2 md:px-5 pt-2 md:py-5 pb-2.5 w-[25px] md:w-[40px] h-[25px] md:h-[40px] flex items-center justify-center rounded-full bg-lightGrey hover:bg-red border-[1px] border-red cursor-pointer duration-150" onClick={()=>setSearch(false)}>x</div>
                        </div>
                    </form>
                </div>
            </>
        )
    }
    else{
        
        return (
            <>
                <button className="flex justify-center items-center duration-150 px-2 py-2 md:p-3 md:mr-6 bg-blue hover:bg-lightBlue rounded-full border-2" onClick={()=>setSearch(true)}><img className="w-[10px] md:w-[20px] h-[10px] md:h-[20px]" src="/img/magnifying-glass.png" /></button>   
            </>
        )

    }
}