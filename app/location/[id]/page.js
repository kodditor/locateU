'use client'


import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { usePathname } from 'next/navigation';

import { useEffect, useState } from "react"
import { generateDirectionsLink } from "@/app/search/page";

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
            <div className="rounded-t-2xl md:rounded-2xl h-[50%] md:h-auto overflow-hidden border-2 border-lightBlue" dangerouslySetInnerHTML={{__html: mapFrame}}></div>
        )   
    }
    else
    {
        return(
            <div className="rounded-t-2xl md:rounded-2xl h-[50%] flex items-center justify-center md:h-auto overflow-hidden border-2 border-lightBlue" >
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
                    <p className="text-blue font-medium text-[35px]">{activeLocation.title}</p>
                    <p className=" opacity-50 text-sm">{activeLocation.lat.slice(0, 9) }, {activeLocation.long.slice(0, 9)}</p>
                    <div className="flex flex-row w-full max-w-[320px] scrollbar-thin scrollbar-track-lightBlue overflow-x-auto">
                        {(activeLocation.rooms != [])? activeLocation.rooms.map((room, index) => {return(<div key={index} className="px-3 md:px-4 py-1 md:py-2 mt-2 md:mt-4 bg-lightBlue text-blue rounded-full mr-4 font-medium pointer-events-none">{room}</div>)}) : null}
                    </div>
                    <p className="mt-4 font-semibold">{activeLocation.type_desc ? activeLocation.type_desc: 'Building'} in the {activeLocation.uni ? activeLocation.uni: 'University of Ghana'} </p>
                    <p className="mt-4">{activeLocation.description ? activeLocation.description: 'No description.'} </p>
                </span>
                <span className="flex flex-row gap-4">
                    <a className="basis-3/4" target="_blank" href={generateDirectionsLink(`${activeLocation.lat},${activeLocation.long}`)}><button className="bg-blue text-white w-full flex flex-row-reverse gap-3 md:gap-6 items-center font-semibold px-4 py-3 rounded-full hover:bg-transparent hover:text-blue duration-150 border-2" onMouseEnter={(e)=>{e.target.children[0].src='/img/arrow-t-r-b.png'}} onMouseLeave={(e)=>{e.target.children[0].src='/img/arrow-t-r-w.png'}}><img src="/img/arrow-t-r-w.png"  className="w-5 h-5 mr-2 md:mr-4" /> Get Directions</button></a>
                    <button className="basis-1/4 flex justify-center items-center text-blue font-medium hover:font-bold duration-150" onClick={() => shareText('Share Location', ('Share the location of ' + activeLocation.title)  ,('127.0.0.1:3000' + pageURL))}>Share</button>
                </span>
            </div>
        )
    }
}

export function shareText(title, text, url)
{
    if (navigator.share) {
        navigator
        .share({
            title: title,
            text: text,
            url: url,
        })
        .then(() => {
            console.log("Successfully shared");
        })
        .catch((error) => {
            console.error("Something went wrong", error);
        });
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
            console.log(d)
            setActivelocation(d)
        })
    }, [])

    return(
        <main className="bg-white">
        <Header />
        <div className=" flex md:grid flex-col md:grid-cols-search w-[90%] md:w-[calc(100%-8rem)] h-[80vh] md:h-[80vh] m-auto mt-8 mb-[calc(10vh-4rem)] md:mx-14 md:py-8 md:gap-8">
            <MapView locationData={activeLocation} />
            <div  className=" flex flex-col justify-between border-2 border-lightBlue mt-[-1.5rem] md:mt-auto p-8 h-[calc(80vh-4rem)] bg-white md:bg-transparent rounded-3xl">
                <LocationView activeLocation={activeLocation} pageURL = {asPath} />
            </div>

        </div>
        <Footer />
        </main>
    )
}