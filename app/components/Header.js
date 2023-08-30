

export default function Header({onlyLogo, centered})
{
    return(
        <>
        <div className={`flex flex-row ${(centered)? "justify-center": "justify-between"} ml-5 mr-5 md:ml-10 md:mr-10 pt-4`}>
            <div className="w-32 md:w-48 flex items-center">
                <a href="/"><img src={'/img/logo.png'} /></a>
            </div>

           {!onlyLogo && <div className="hidden flex flex-row justify-between gap-8 items-center">
                <div className="hidden md:block">
                    <a href="/request-location" className="blue hover:font-semibold text-center text-blue duration-150">Request a new location</a>
                </div>
                <div>
                    <a href="/contact"><button className="text-white bg-blue px-3 py-2 md:px-5 md:py-3 border-2 font-semibold rounded-full hover:bg-transparent hover:text-blue duration-150">Contact</button></a>
                </div>
            </div>
            }
        </div>
        </>
    )
}