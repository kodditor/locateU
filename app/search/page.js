'use client'


import Header from "../components/Header"
import Footer from "../components/Footer"
import { useSearchParams } from 'next/navigation'
import { usePathname } from "next/navigation"

import { MapContainer, TileLayer } from 'react-leaflet'
import { useEffect, useState } from "react"
import { shareText } from "../location/[id]/page"
import { MapView } from "../location/[id]/page"


export function generateDirectionsLink(destination, location=null)
{
    var link = "#"
    if (location)
    {
        link = `https://www.google.com/maps/dir/${location}/${destination}`;
    }
    else
    {   
        link = `https://www.google.com/maps/dir//${destination}`;
    }

    return link

}


function generateMapFrame(lat, long)
{
    return `<iframe className="rounded-2xl" width="100%" height="100%" src='https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${lat},${long}&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'></iframe>`;
}


export function SearchResults({ query, setActive })
{
    const [ loading, setLoading ] = useState(true);
    const [ results, setResults ] = useState(null);


    useEffect(()=> {
        setLoading(true);
        fetch('/api/search/?a=find&q='+ query)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            setResults(data)
            setLoading(false)
        })
    }, [])

    if (loading)
    {
        return(
            <div className="flex flex-row items-center px-[calc(100% - 20px)] mt-8 justify-evenly min-h-[10px] w-full max-w-[320px]">
                <span className="w-1 h-1 bg-blue rounded-[100%] animate-ping"></span>
                <span className="w-1 h-1 bg-blue rounded-full animate-ping delay-300"></span>
                <span className="w-1 h-1 rounded-full bg-blue animate-ping delay-500"></span>
            </div>
        )
    }
    if(!loading && !results)
    {
        return (
            <div className="flex flex-col items-center h-full w-full">
                <img className="m-auto w-100% max-w-[150px]" src="/img/not-found.png" />
                <p className="text-blue mt-2 md:mt-7 text-center" >Location not found</p>
                <p className="text-center mt-1 md:mt-2 font-semibold"><a href="#"className="text-blue opacity-50 m-auto">Know this place? Ask for it to be added to locateU.</a></p>
            </div>
        )
    }
    else
    {
        console.log(results)
        if (results.length == 0)
        {
            return (
                <div className="flex flex-col items-center h-full w-full">
                    <img className="m-auto w-100% max-w-[150px]" src="/img/not-found.png" />
                    <p className="text-blue mt-2 md:mt-6 text-center" >Location not found</p>
                    <p className="text-center mt-1 md:mt-2 md:w-[70%] font-semibold"><a href="#"className="text-blue opacity-50 m-auto">Know this place? Ask for it to be added to locateU.</a></p>
                </div>
            )
        }
        else
        {
            return(
                <div className="scroll-thin scrollbar-track-lightBlue">
                    {
                        results.map((result, index) => {
                            if (index == 0)
                            {
                                setActive(result);
                            }
                            return (
                                <a href={`/location/${result._id}`} key={index} className="bg-lightGrey flex flex-row items-center first:bg-blue text-black first:text-white border-lightBlue border-2 rounded-md mb-3  last:mb-0 p-2 md:p-4 shadow-md hover:bg-lightBlue duration-150 cursor-pointer">
                                    <img src="/img/building.png" className="border-2 border-lightBlue mr-4 rounded-full w-10 h-10 overflow-hidden bg-white"/>
                                    <p className="text-[18px]">{result.title}</p> 
                                </a>
                            )
                        }
    
                        )
                    }
                </div>
            )
        }
        
    }
}


export default function Search()
{
    const [ activeLocation, setActivelocation ] = useState(null);

    const params = useSearchParams()
    const query = params.get('q')

    const pageURL = usePathname();

    return(
        <main className="bg-white">
        <Header />
        <div className="flex md:grid flex-col md:grid-cols-search w-[90%] md:w-[calc(100%-8rem)] h-[80vh] md:h-[80vh] m-auto mt-8 mb-[calc(10vh-4rem)] md:mx-14 md:py-8 md:gap-8">
            <MapView locationData={activeLocation} />
            <div className=" flex flex-col justify-between border-2 border-lightBlue mt-[-1.5rem] md:mt-auto p-8 h-[calc(80vh-4rem)] bg-white md:bg-transparent rounded-3xl">
                <span className="flex flex-col overflow-y-auto">
                    <span>
                        <form action="/search" className="flex flex-col items-center ">
                            <div className="flex flex-row items-center justify-between gap-2">
                                <input type="text" className="w-[calc(100%-40px)] duration-150 text-blue text-[20px] rounded-full px-4 md:px-8 py-2 md:py-4 border-2 border-lightBlue border-solid active:border-blue" placeholder="Search for a lecture hall..." defaultValue={query} required maxLength={50} name="q"/>
                                <button className="flex justify-center items-center duration-150 px-3 py-3 md:p-4 bg-blue hover:bg-lightBlue rounded-full border-2"><img className="w-[25px] h-[25px]" src="/img/magnifying-glass.png" /></button>   
                            </div>
                            <select className="flex-none [display:none]" name="uni">
                                <option value={'UG'}>University of Ghana</option>
                            </select>
                        </form>
                    </span>
                    
                    <div className="overflow-y-auto min-h-[calc(10px+3rem)] basis-3/4 mt-5 scrollbar-thin scrollbar-thumb-lightBlue scrollbar-track-lightGrey scrollbar-rounded-large">
                        <SearchResults query={query} setActive={setActivelocation}/>
                    </div>
                </span>
                {activeLocation && <span className="flex flex-row gap-4">
                    <a className="basis-3/4" target="_blank" href={generateDirectionsLink(`${activeLocation.lat},${activeLocation.long}`)}><button className="bg-blue text-white w-full flex flex-row-reverse gap-3 md:gap-6 items-center font-semibold px-4 py-3 rounded-full hover:bg-transparent hover:text-blue duration-150 border-2" onMouseEnter={(e)=>{e.target.children[0].src='/img/arrow-t-r-b.png'}} onMouseLeave={(e)=>{e.target.children[0].src='/img/arrow-t-r-w.png'}}><img src="/img/arrow-t-r-w.png"  className="w-5 h-5 mr-2 md:mr-4" /> Get Directions</button></a>
                    <button className=" basis-1/4 flex justify-center items-center text-blue font-medium hover:font-bold duration-150" onClick={() => shareText('Share Location', ('Share the location of ' + activeLocation.title)  ,('127.0.0.1:3000' + pageURL))}>Share</button>
                </span>}
            </div>

        </div>
        <Footer />
        </main>
    )
}