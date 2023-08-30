'use client'

import Header from "../components/Header";
import Footer from "../components/Footer";
import Popup, { changePopup } from "../components/Popup";
import { useState } from "react";
import { currDate } from "../utils/custom-date";

export default function Contact()
{
    const [ responseSent, changeSent ] = useState(null)

    function handleSubmit(e)
    {
        e.preventDefault()
    
        changeSent(true)

        const today = new Date()

        const userData =  {
            "name": e.target.name.value,
            "email": e.target.email.value,
            "msg": e.target.msg.value,
            "type":"contact-form",
            "createdAt": currDate()
        }

        //console.log(userData)
        fetch('/api/user/contact', {
            headers: {"content-type": "application/json"},
            method: 'POST',
            body: JSON.stringify(userData)
        })
        .then(res=> res.json())
        .then((data)=>{
            if (data.status == 200)
            {
                changePopup("We've recieved your request.")
            }
        })
        
    }



    return (
        <main className="bg-lightGrey">
            <Popup />
            <Header onlyLogo={true} centered={true} />
            <div className="h-[calc(100vh-130px-4rem)] mx-8 md:mx-10 my-8 py-10 flex flex-row gap-8 bg-white rounded-3xl p-4 md:p-8">
                {!responseSent && <div className="w-full"><p className="text-black w-full md:w-[calc(80%)] font-semibold text-[45px] md:text-[65px] md:ml-5">Let's get in contact!</p>
                <form className="mt-4 md:mt-auto flex flex-col gap-4" onSubmit={handleSubmit}>
                    <span className="w-full md:w-[500px] flex flex-col md:flex-row gap-4">
                        <input type="text" className="w-full md:w-1/2 duration-150 text-blue text-[20px] rounded-2xl px-4 md:px-8 py-2 md:py-4 border-2 border-lightBlue border-solid active:border-blue" name="name" placeholder="First Name" required />
                        <input type="email" className="w-full md:w-1/2 duration-150 text-blue text-[20px] rounded-2xl px-4 md:px-8 py-2 md:py-4 border-2 border-lightBlue border-solid active:border-blue" name="email" placeholder="Email" required />
                    </span>
                    <textarea className="w-full md:w-[500px] duration-150 text-blue text-[20px] rounded-2xl px-4 md:px-8 py-2 md:py-4 border-2 border-lightBlue border-solid active:border-blue scrollbar-thin scrollbar-track-lightGrey scrollbar-thumb-lightBlue" placeholder="Any feedback, suggestion (or criticism) is appreciated!" name="msg" rows={5} maxLength={200} required />
                    <button className="bg-blue text-white w-fit mt-4 font-semibold px-10 py-3 rounded-full hover:bg-transparent hover:text-blue duration-150 border-2" >Submit</button>
                </form></div>}
                {responseSent && <div className="w-full">
                <p className="text-blue w-full md:w-[calc(40%)] font-semibold text-[45px] md:text-[65px] md:ml-5">We value your input.</p>
                <p className="text-black w-full md:w-[calc(70%)] font-semibold text-[18px] md:text-[35px] md:ml-5">Thank you for contacting us!</p>
                <a href="/"><button className="bg-blue text-white w-fit mt-4 font-semibold px-10 py-3 rounded-full hover:bg-transparent hover:text-blue duration-150 border-2" >Back to Home</button></a>
                </div>
                }
                <div className="w-0 md:w-full h-0 md:h-full bg-[url('/img/contact-bg.png')] rounded-2xl overflow-hidden">
                </div>
            </div>
            <Footer />
        </main>
    )
}