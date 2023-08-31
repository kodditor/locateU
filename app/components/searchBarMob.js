"use client"

import { useState } from "react"


export default function SearchBarMob()
{
    const [ searchClicked, setSearch ] = useState(false)

    if(searchClicked)
    {
        return (
            <>
                <div className="fixed w-[calc(100%-2.5rem)] md:w-fit pt-4 top-0 mr-5 ml-5 md:mr-10 md:ml-10 right-0">
                    <form action="/search" className="bg-white w-max m-auto flex flex-row-reverse items-center">
                        <div className="flex flex-row items-center justify-between gap-2">
                            <input type="text" className={`${(searchClicked)? "block" : "hidden"} w-[calc(100%-40px)] duration-150 text-blue text-[18px] rounded-full px-4 md:px-8 py-1 md:py-4 border-2 border-lightBlue border-solid active:border-blue`} placeholder="Search for a lecture hall..." required maxLength={50} name="q"/>
                            <button className="flex justify-center items-center duration-150 px-2 py-2 md:p-4 bg-blue hover:bg-lightBlue rounded-full border-2"><img className="w-[10px] md:w-[25px] h-[10px] md:h-[20px]" src="/img/magnifying-glass.png" /></button>
                            <div className="text-red hover:text-white px-2 md:px-5 pt-2 md:py-5 pb-2.5 w-[25px] md:w-[40px] h-[25px] md:h-[40px] flex items-center justify-center rounded-full bg-lightGrey hover:bg-red border-[1px] border-red cursor-pointer duration-150" onClick={()=>setSearch(false)}>x</div>
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