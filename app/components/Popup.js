'use client'

import { useEffect, useState } from "react"

export function changePopup(changeValue)
{
    const p = document.getElementById('popup')
    p.innerHTML = `<p class="text-blue text-[15px] md:text-[18px] font-medium md:font-semibold bg-white border-2 border-lightBlue rounded-full shadow-md px-4 md:px-8 py-2 md:py-4">${changeValue}</p>`
    p.style.opacity = '1'
    setTimeout(()=>{p.style.opacity='0'}, 3500);
}


export default function Popup()
{
    return (
        <>
            <div id="popup" className="w-[100vw] flex justify-center absolute bottom-12 md:bottom-5">
            </div>
        </>
    )
}