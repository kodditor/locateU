import SearchBarMob from "./searchBarMob";


export default function Header({onlyLogo, centered, searchBar, absolute})
{ 

    return(
        <>
        <div className={` w-[calc(100%-2.5rem)] flex flex-row ${(centered)? "justify-center": "justify-between"} ${absolute? "absolute md:static bg-white md:bg-transparent rounded-2xl md:rounded-none shadow-md md:shadow-none p-2 mt-4 md:mt-0": ""}  ml-5 mr-5 md:ml-10 md:mr-10 md:p-0 md:pt-4`}>
            <div className={`w-32 md:w-48 flex items-center`}>
                <a href="/"><img src={'/img/logo.png'} /></a>
            </div>

           {!onlyLogo && <div className="flex flex-row md:justify-between md:gap-8 items-center">
                {!searchBar && <>
                <div className="hidden">
                    <a href="/request-location" className="blue hover:font-semibold text-center text-blue duration-150">Request a new location</a>
                </div>
                <div className="hidden">
                    <a href="/contact"><button className="text-white bg-blue px-3 py-2 md:px-5 md:py-3 border-2 font-semibold rounded-full hover:bg-transparent hover:text-blue duration-150">Contact</button></a>
                </div>
                </>}
                {searchBar && <SearchBarMob />}
            </div>
            }
        </div>
        </>
    )
}