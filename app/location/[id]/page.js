'use client'

import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Popup from "@/app/components/Popup";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react"

import { generateDirectionsLink } from "@/app/search/page";
import { shareText } from "@/app/utils/frontend-utils";


function generateMapFrame(lat, long)
{
    return `<iframe className="rounded-2xl" width="100%" height="100%" src='https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${lat},${long}&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'></iframe>`;
}


export function MapView({ locationData })
{

    if (locationData)
    {
        // Beware: A mapview in the admin console depends on 'locationData' being a dict with two required values.
        const lat = locationData ? locationData.lat :  "5.6506059396555495";
        const long = locationData ? locationData.long :  "-0.1869636030092159";
        
        //console.log(lat, long)

        const mapFrame = generateMapFrame(lat, long);
        
        return (
            <div className="md:basis-1/2 md:rounded-2xl h-[80%] md:h-auto overflow-hidden md:shadow-md md:shadow-lightBlue" dangerouslySetInnerHTML={{__html: mapFrame}}></div>
        )   
    }
    else
    {
        return(
            <div className="rounded-t-2xl md:rounded-3xl h-[60%] flex items-center justify-center md:h-auto overflow-hidden md:shadow-md md:shadow-lightBlue" >
                <div className="flex flex-row items-center px-[calc(100% - 20px)] mt-8 justify-evenly min-h-[10px] w-full max-w-[320px]">
                    <span className="w-1 h-1 bg-blue rounded-[100%] animate-ping"></span>
                    <span className="w-1 h-1 bg-blue rounded-full animate-ping delay-300"></span>
                    <span className="w-1 h-1 rounded-full bg-blue animate-ping delay-500"></span>
                </div>
            </div>
        )
    }
}


export function LocationView({ activeLocation, pageURL })
{
    if (!activeLocation)
    {
        return(
            <div className="flex flex-row items-center px-[calc(100% - 20px)] justify-evenly h-full w-full max-w-[200px] m-auto">
                <span className="w-1 h-1 bg-blue rounded-full animate-ping"></span>
                <span className="w-1 h-1 bg-blue rounded-full animate-ping delay-300"></span>
                <span className="w-1 h-1 rounded-full bg-blue animate-ping delay-500"></span>
            </div>
        )
    }
    else{
        return (
            <div className="flex flex-col w-full h-full text-black justify-between">
                <span>
                    <p className="text-blue font-medium text-[25px] md:text-[35px]">{activeLocation.title}</p>
                    <p className=" opacity-50 text-[12px] md:text-sm">{activeLocation.lat.slice(0, 9) }, {activeLocation.long.slice(0, 9)}</p>
                    <div className="flex flex-row w-full max-w-[320px] md:scrollbar-thin scrollbar-track-lightBlue overflow-x-auto">
                        {(activeLocation.rooms != [])? activeLocation.rooms.map((room, index) => {return(<div key={index} className=" whitespace-nowrap px-3 md:px-4 py-1 md:py-2 mt-2 md:mt-4 bg-lightGrey text-blue text-sm rounded-full mr-3 md:mr-4 last:mr-0 md:font-medium pointer-events-none border-[1px] border-blue">{room}</div>)}) : null}
                    </div>
                    <p className="mt-2 md:mt-4 font-semibold">{activeLocation.type_desc ? activeLocation.type_desc: 'Building'} in the {activeLocation.uni ? activeLocation.uni: 'University of Ghana'} </p>
                    <p className="mt-1 md:mt-4">{activeLocation.description ? activeLocation.description: 'No description.'} </p>
                </span>
                <span className="flex flex-row mt-2 md:mt-0 md:gap-4">
                    <a className="basis-3/5 md:basis-3/4" target="_blank" href={generateDirectionsLink(`${activeLocation.lat},${activeLocation.long}`)}><button className="bg-blue text-white text-[15px] md:text-base w-full flex flex-row-reverse md:gap-4 items-center font-semibold px-2 md:px-4 py-3 rounded-full hover:bg-transparent hover:text-blue duration-150 border-2" onMouseEnter={(e)=>{e.target.children[0].src='/img/arrow-t-r-b.png'}} onMouseLeave={(e)=>{e.target.children[0].src='/img/arrow-t-r-w.png'}}><img src="/img/arrow-t-r-w.png"  className="w-5 h-5 mr-2 md:mr-4" /> <span className="mr-2 md:mr-0">Get Directions</span></button></a>
                    <button className="basis-2/5 flex justify-center items-center opacity-70 text-black text-[15px] md:text-base font-medium hover:text-blue duration-150" onClick={() => shareText("https://locateu.vercel.app/location/" + activeLocation._id)}>Copy Link</button>
                </span>
            </div>
        )
    }
}




export default function Location(props)
{
    const [ activeLocation, setActivelocation ] = useState(null);
    
    const asPath = usePathname();
    
    //console.log(asPath)

    useEffect(()=>{
        fetch('/api/location?a=find&id=' + props.params.id)
        .then((res) =>res.json())
        .then((d) => {
            //console.log(d)
            setActivelocation(d)
        })
    }, [])

    return(
        <main className="bg-white">
            <Popup />
            <Header absolute={true} searchBar={true}/>
            <div className=" flex md:grid flex-col md:grid-cols-search w-full md:w-[calc(100%-8rem)] h-[90vh] md:h-[80vh] min-h-[620px] m-auto md:mt-2 mb-[calc(10vh-4rem)] md:mx-14 md:py-8 md:gap-8">
                <MapView locationData={activeLocation} />
                <div  className="md:basis-1/2 w-[95%] md:w-full flex flex-col shadow-md shadow-lightBlue justify-between mx-[2.5%] md:mx-0 mt-[-1.5rem] md:mt-auto p-5 md:p-8 md:h-[calc(80vh-4rem)] h-[45%] bg-white md:bg-transparent rounded-2xl md:rounded-3xl">
                    <LocationView activeLocation={activeLocation} pageURL = {asPath} />
                </div>
            </div>
            <Footer />
        </main>
    )
}