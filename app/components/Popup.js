'use client'

import { useEffect, useState } from "react"

export function changePopup(changeValue)
{
    const p = document.getElementById('popup')
    p.innerHTML = `<p class="text-blue text-[18px] font-semibold bg-white border-2 border-lightBlue rounded-full shadow-md px-8 py-4">${changeValue}</p>`
    p.style.opacity = '1'
    setTimeout(()=>{p.style.opacity='0'}, 5000);
}


export default function Popup({ statefulVariable})
{
    const [ popupText, changePopup ] = useState('')
    

    return (
        <>
            <div id="popup" className="w-[100vw] flex justify-center absolute bottom-5">
            </div>
        </>
    )
}