'use client'
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

import { MapView } from "../location/[id]/page"

import Popup ,{ changePopup } from "./Popup"

import { currDate } from "../utils/custom-date"
import { removeSpaces } from "../utils/backend-utils"

function DashView({mongoData, approvalNum}){
    return (
        <>
            <div className="min-h-[620px]">
                <p className="text-[30px] text-black">Dashboard</p>
                {!mongoData && <p className="mt-4 text-[20px] text-blue"> Loading Data...</p>}
                {mongoData && <div className="mt-4 md:mt-8 text-[20px] text-black">
                    <span className=" flex w-full flex-col md:flex-row gap-4 md:gap-8">
                        <div className="basis-1/2 bg-lightBlue rounded-2xl flex flex-row gap-8 overflow-hidden p-3 md:p-5 items-center"><p className="text-blue ml-2 md:ml-4 text-[40px] md:text-[60px]">{mongoData.length}</p> <p className="text-[25px] md:text-[30px]">Total Locations</p></div>
                        <div className="basis-1/2 bg-lightGrey rounded-2xl flex flex-row gap-8 overflow-hidden p-3 md:p-5 items-center"><p className="text-red ml-2 md:ml-4 text-[40px] md:text-[60px]">{(approvalNum? approvalNum : 0)}</p> <p className=" text-[25px] md:text-[30px]"> Pending Location approval{(approvalNum > 1 || approvalNum == 0)? "s" : null}</p></div>
                    </span>
                    <span className="bg-lightGrey block h-[calc(50vh-140px)] mt-8 overflow-y-scroll scrollbar-thin scrollbar-thumb-lightBlue">
                        {mongoData.map((d, index) => {
                            return (
                                <Link href={`/location/${d._id}`} key={index} className="bg-white flex flex-row items-center text-black border-lightBlue border-2 rounded-md mb-4 last:mb-0 p-4 shadow-sm hover:bg-lightBlue duration-150 cursor-pointer">
                                    <img src="/img/building.png" className="border-2 border-lightBlue mr-4 rounded-full w-10 h-10 overflow-hidden bg-white"/>
                                    <p className=" text-[16px] md:text-[18px]">{d.title}</p> 
                                    <p className="ml-2 md:ml-8 text-black opacity-50 text-[15px] ">{d._id}</p>
                                    <p className="ml-2 md:ml-8 text-black text-[15px] opacity-50">{d.createdAt}</p>
                                </Link>
                            )
                        })}
                    </span>
                    </div>}
            </div>
        </>
    )
}


function AddLocation()
{
    const router = useRouter()

    const [dataCollection, setData] = useState(null)
    const [similarIDSearchResults, setSimilarID] = useState(null)

    const params = useSearchParams()

    function handleDialogSubmit(e)
    {
        e.preventDefault()
        if (dataCollection)
        {
            const formattedRooms = []
            dataCollection.rooms.value.split(',').map((r) =>{formattedRooms.push(removeSpaces(r))})
            
            const formattedTags = []
            dataCollection.tags.value.split(',').map((t) =>{formattedTags.push(removeSpaces(t))})
            
            fetch('/api/location', {
                headers: {"content-type": "application/json"},
                method: 'POST',
                body: JSON.stringify({
                    title: dataCollection.title.value,
                    _id: dataCollection._id.value,
                    lat: dataCollection.lat.value,
                    long: dataCollection.long.value,
                    type: dataCollection.type.value,
                    type_desc: dataCollection.type_desc.value,
                    desc: dataCollection.desc.value,
                    rooms: formattedRooms,
                    tags: formattedTags,
                })
            }
            )
            .then(res=> res.json())
            .then((data)=>{
                if (data.status == 200)
                {
                    changePopup( dataCollection.title.value + " Added")
                    setTimeout(()=>router.push("/admin"), 3000)
                }
                else{
                    changePopup("An error occurred")
                }
            })
            document.getElementById("dialog").close()
        }
        else
        {
            console.log('State not changed')
        }

    }


    function handleSubmit(e)
    {
        e.preventDefault();

        fetch("/api/location?a=find&id="+ e.target._id.value)
        .then(res=>res.json())
        .then((data) =>{
            setSimilarID(data)
        })

        setData(e.target)
        const d = document.getElementById('dialog').showModal()

    }

    var lat;
    var long;

    return (
        <>
            <div>
                <dialog id='dialog' className="bg-transparent">
                    { (similarIDSearchResults) && <div className="bg-white py-8 px-4 border-2 border-lightBlue rounded-2xl max-w-xl"><p className="mb-4  text-[18px]">Location <span className="text-blue">{similarIDSearchResults.title}</span> with ID: <span className="text-blue">{similarIDSearchResults._id}</span> already exists</p> <div className="hover:text-red flex justify-center items-center cursor-pointer hover:font-semibold px-8 duration-150 m-auto" onClick={()=>{document.getElementById('dialog').close(); setSimilarID(null)}}>Cancel</div></div> }
                    { (dataCollection && !similarIDSearchResults) && <span id="dialogPlace" className="flex flex-col gap-4 px-8 py-8 border-2 overflow-hidden rounded-2xl border-lightBlue bg-white max-w-xl">
                        <p className="text-[20px] text-blue font-semibold">Confirm Location: {dataCollection.title.value} ({dataCollection._id.value})</p>
                        <p className="text-lightBlue">{dataCollection.lat.value}, {dataCollection.long.value}</p>
                        <p>{dataCollection.type.value} - {dataCollection.type_desc.value}</p>
                        <p>Rooms:<span className="text-blue"> {dataCollection.rooms.value}</span></p>
                        <p>Description: <span className="text-blue">{dataCollection.desc.value}</span></p>
                        <div className="basis-3/4">
                            <MapView locationData={{'lat': `${dataCollection.lat.value}`, 'long': `${dataCollection.long.value}`}} />
                        </div>
                        <form onSubmit={handleDialogSubmit} className="flex flex-row justify-between">
                            <button className="text-white bg-blue px-4 py-2 rounded-full font-semibold duration-150 hover:text-blue hover:bg-white border-2 border-blue">Confirm Details</button>
                            <div className="hover:text-red flex justify-center items-center cursor-pointer hover:font-semibold px-8 duration-150" onClick={()=>{document.getElementById('dialog').close(); setData(null)}}>Cancel</div>
                        </form>
                    </span>}
                    { (!dataCollection) && <span></span> }
                </dialog>
                <p className="text-[30px] text-black">Add a new Location</p>
                <form onSubmit={handleSubmit} className="flex flex-col mt-4 group-[formElements]:mt-4">
                    <span className="flex flex-col md:flex-row gap-4 md:gap-8 mt-4">
                        <input  className="formElements basis-1/2 duration-150 text-blue text-[18px] rounded-md px-4 py-2 border-2 border-lightBlue border-solid active:border-blue" type="text" name="title" placeholder="Title" defaultValue={(params.get('title')) ? params.get('title') : null} required autoComplete='false'/>
                        <input  className="basis-1/4 duration-150 text-blue text-[18px] rounded-md px-4 py-2 border-2 border-lightBlue border-solid active:border-blue" type="text" name="_id" placeholder="Unique ID" defaultValue={(params.get('_id')) ? params.get('_id') : null} required autoComplete='false' />
                        <input  className="basis-1/4 duration-150 text-blue text-[18px] rounded-md px-4 py-2 border-2 border-lightBlue border-solid active:border-blue" type="text" name="tags" placeholder="Search tags" defaultValue={(params.get('tags')) ? params.get('tags') : null} required autoComplete='false' />                    
                    </span>
                    
                    <span className="flex flex-row gap-4 md:gap-8 mt-4">
                        <input  className=" w-full md:basis-1/2 duration-150 text-blue text-[18px] rounded-md px-4 py-2 border-2 border-lightBlue border-solid active:border-blue"  type="number" name="lat" step="any" placeholder="Latitude Coordinate" defaultValue={(params.get('lat'))? params.get('lat') : null} required autoComplete='false'/>
                        <input  className="w-full md:basis-1/2 duration-150 text-blue text-[18px] rounded-md px-4 py-2 border-2 border-lightBlue border-solid active:border-blue"  type="number" name="long" step="any" placeholder="Longitude Coordinate" defaultValue={(params.get('long'))? params.get('long') : null} required autoComplete='false'/>
                    </span>
                    
                    <span className="flex flex-col md:flex-row gap-4 md:gap-8 mt-4">
                        <select  className="basis-1/2 duration-150 text-blue text-[18px] rounded-md px-4 py-2 border-2 border-lightBlue border-solid active:border-blue"  required name="type" defaultValue={'Type of structure'}>
                            <option>Building</option>
                        </select>
                        <input  className="basis-1/2 duration-150 text-blue text-[18px] rounded-md px-4 py-2 border-2 border-lightBlue border-solid active:border-blue"  type="text" name="type_desc" placeholder="Description of use case, eg. Lecture hall" defaultValue={(params.get('type_desc'))? params.get('type_desc') : null} required autoComplete='false'/>
                    </span>
                    <input  className="mt-4 duration-150 text-blue text-[18px] rounded-md px-4 py-2 border-2 border-lightBlue border-solid active:border-blue"  type="text" name="desc" placeholder="Brief description" defaultValue={(params.get('desc'))? params.get('desc') : null} autoComplete="false" />
                    <input  className="mt-4 duration-150 text-blue text-[18px] rounded-md px-4 py-2 border-2 border-lightBlue border-solid active:border-blue"  type="text" name="rooms" placeholder="Room names (separated by a comma)" defaultValue={(params.get('rooms'))? params.get('rooms') : null} required autoComplete='false'/> 
                    <div className="flex flex-col-reverse md:flex-row items-center md:items-baseline justify-between w-full mt-5 md:mt-8">
                        <Link href="https://google.com/maps" target={"_blank"}><div className="bg-lightGrey text-blue w-full max-w-[200px] font-semibold px-4 py-3 rounded-full hover:bg-blue hover:text-white duration-150 border-2">Open Google Maps</div></Link>
                        <span  className=" mb-4 md:mb-0 flex flex-row-reverse gap-4 items-center">

                            <button className="bg-blue text-white w-full max-w-[200px] font-semibold px-4 py-3 rounded-full hover:bg-transparent hover:text-blue duration-150 border-2" onClick={()=>setData(null)}>Add Location</button>
                            <Link href="/admin"><div className=" basis-1/4 flex justify-center items-center text-red bg-lightGrey w-full max-w-[200px] px-4 py-3 rounded-full font-medium hover:text-white hover:bg-red duration-150 cursor-pointer" >Cancel</div></Link>
                        </span>
                    </div>
                </form>
            </div>
        </>
    )
}

function RemoveLocation() {

    const [removeID, setRemoveID] = useState(null)

    function handleDialogSubmit()
    {
        fetch('/api/location?a=remove&id='+ removeID)
        .then(res=>res.json())
        .then((data)=>{
            changePopup("Location Removed")
        })
    }

    function handleSubmit(e)
    {
        setRemoveID(e.target._id.value)
        e.preventDefault()
        document.getElementById('dialog').showModal()
    }

    return (
        <>
            <dialog id='dialog' className="bg-transparent">
                    <span id="dialogPlace" className="flex flex-col gap-4 px-8 py-8 border-2 overflow-hidden rounded-2xl border-lightBlue bg-white max-w-xl">
                        <p className="text-[20px]">Are you sure you want to delete <span className="text-blue">{removeID}</span>?</p>
                        <span  className="flex flex-col gap-4 items-center justify-center">
                            <button className="bg-blue text-white w-full max-w-[200px] font-semibold px-2 py-2 rounded-full hover:bg-transparent hover:text-blue duration-150 border-2" onClick={()=>{document.getElementById('dialog').close(); handleDialogSubmit()}}>Confirm Removal</button>
                            <div className=" basis-1/4 flex justify-center items-center cursor-pointer text-red bg-lightGrey w-full max-w-[200px] px-2 py-2 rounded-full font-medium hover:text-white hover:bg-red duration-150" onClick={()=>{document.getElementById('dialog').close()}}>Cancel</div>
                        </span>
                    </span>
            </dialog>
            <div className="text-black  flex md:block flex-col justify-center items-center">
                <p className="text-[25px] mb-4">Remove A Location</p>
                <p className="text-black opacity-50 mb-4">Enter the unique Location ID</p>
                <form onSubmit={handleSubmit}>
                    <input  className="basis-1/2 duration-150 text-blue text-[18px] rounded-md px-4 py-2 border-2 border-lightBlue border-solid active:border-blue"  type="text" name="_id" required placeholder="Unique ID eg. NNB"/>
                    <span  className="flex flex-col gap-4 items-center justify-center w-fit px-8 mt-4">
                        <button className="bg-blue text-white w-full max-w-[200px] font-semibold px-4 py-3 rounded-full hover:bg-transparent hover:text-blue duration-150 border-2" >Remove Location</button>
                        <Link href="/admin"><div className=" basis-1/4 flex justify-center items-center cursor-pointer text-red bg-lightGrey w-full max-w-[200px] px-4 py-3 rounded-full font-medium hover:text-white hover:bg-red duration-150">Cancel</div></Link>
                    </span>
                </form>
            </div>
        </>
    )
    
}

function EditView({mongoData})
{
    const params = useSearchParams()

    const [ editorLocation, setEditLocation ] = useState(null)
    const [ editedLocation, setEdited ] = useState(null)


    function generate_doc(htmlformelement)
    {
        const formattedRooms = []
        htmlformelement.rooms.value.split(',').map((r) =>{formattedRooms.push(removeSpaces(r))})
            
        const formattedTags = []
        htmlformelement.tags.value.split(',').map((t) =>{formattedTags.push(removeSpaces(t))})
            
        return {
            title: htmlformelement.title.value,
            _id: htmlformelement._id.value,
            lat: htmlformelement.lat.value,
            long: htmlformelement.long.value,
            type: htmlformelement.type.value,
            type_desc: htmlformelement.type_desc.value,
            desc: htmlformelement.desc.value,
            rooms: formattedRooms,
            tags: formattedTags,
            createdAt: currDate()
        }
    }

    function handleSubmit(e)
    {
        e.preventDefault()
        setEdited(generate_doc(e.target))
        document.getElementById('dialog').showModal()
    }
    function confirmChanges()
    {
        document.getElementById('dialog').close()
        var changesObj = {}
        Object.keys(editedLocation).map((k)=>{
            if (editedLocation[k] != editorLocation[k])
            {
                changesObj[k] = editedLocation[k]
            }
        })

        changesObj._id = changesObj._id ? null : editorLocation._id

        fetch('/api/location/update', {
            headers: {"content-type": "application/json"},
            method: 'POST',
            body: JSON.stringify(changesObj)
        })
        .then(res=> res.json())
        .then((data)=>{
            if (data.status == 200)
            {
                changePopup( editorLocation.title + " Updated")
            }
            else{
                changePopup("An error occurred")
            }
        })
        //console.log(changesObj);
    }

    return (
        <> 
            <dialog id="dialog" className="bg-transparent">
                <span className="flex flex-col gap-4 p-8 bg-white overflow-hidden border-2 border-lightBlue rounded-2xl text-black">
                    <p className="text-[18px]">Save changes to <span className="text-blue">{editorLocation ? editorLocation.title: null}?</span></p>
                    <span className="flex flex-col justify-center items-center gap-4">
                        <button  className="bg-blue text-white w-full max-w-[200px] font-semibold px-4 py-3 rounded-full hover:bg-transparent hover:text-blue duration-150 border-2" onClick={()=> confirmChanges()}>Save Changes</button>
                        <div className="hover:text-red flex justify-center items-center cursor-pointer hover:font-semibold px-8 duration-150"  onClick={()=>document.getElementById('dialog').close()}>Cancel</div>
                    </span>
                </span>
            </dialog>
            {!mongoData &&  <p className="mt-4 text-[20px] text-blue"> Loading Data...</p>}
            {mongoData && <div className="flex flex-col gap-5 w-full full text-black">
                <div className="basis-1/2 h-full">
                    <p className="text-[30px]">Edit a Location</p>
                    <span className="bg-lightGrey block h-[calc(50vh-140px)] mt-8 overflow-y-scroll scrollbar-thin scrollbar-thumb-lightBlue">
                        {mongoData.map((d, index) => {
                            return (
                                <div key={index} className="bg-white flex justify-between flex-row items-center text-black border-lightBlue border-2 rounded-md mb-4 last:mb-0 p-4 shadow-sm hover:bg-lightBlue duration-150 cursor-pointer">
                                    <span className="flex flex-row items-center">
                                        <img src="/img/building.png" className="border-2 border-lightBlue mr-4 rounded-full w-10 h-10 overflow-hidden bg-white"/>
                                        <span className=" flex flex-col md:flex-row">
                                            <p className="text-[18px]">{d.title}</p> 
                                            <p className="text-[16px] md:text-base ml-0 md:ml-8 text-black opacity-50">{d._id}</p>
                                        </span>
                                        <p className="hidden md:block ml-8 text-black opacity-50">{d.createdAt}</p>
                                    </span>
                                    <span className="flex flex-col md:flex-row gap-2 md:gap-4">
                                        {!editorLocation && <p className="py-2 px-4 border-2 border-blue text-white bg-blue hover:text-blue hover:bg-transparent rounded-full duration-150" onClick={()=>{setEditLocation(null);setEditLocation(d)}}>Edit</p>}
                                        <Link href={`/location/${d._id}`}  className="py-2 px-4 border-2 border-blue text-blue bg-transparent hover:text-white hover:bg-blue rounded-full duration-150">Visit</Link>
                                    </span>
                                </div>
                            )
                        })}
                    </span>
                </div>
                <div className="basis-1/2">
                    {(!editorLocation) && <> <div className="w-full flex items-center justify-center bg-lightGrey text-lightBlue">Select a Location to Edit</div></> }
                    {(editorLocation != null) && <>
                    <div className="basis-1/2 h-[calc(50vh-220px)]">
                        <form onSubmit={handleSubmit}>
                            <span className="flex flex-col md:flex-row gap-3">
                                <input  className="w-full md:w-5/12 duration-150 text-blue text-[18px] rounded-md px-4 py-2 border-2 border-lightBlue border-solid active:border-blue" type="text" name="title" defaultValue={editorLocation.title} placeholder="Title" required />
                                <input  className="w-full md:w-1/12 duration-150 text-blue text-[18px] rounded-md px-4 py-2 border-2 border-lightBlue border-solid active:border-blue" type="text" name="_id" defaultValue={editorLocation._id} unselectable="on"  placeholder="Unique ID" required />
                                <input  className="w-full md:w-2/12 duration-150 text-blue text-[18px] rounded-md px-4 py-2 border-2 border-lightBlue border-solid active:border-blue" type="text" name="tags" defaultValue={editorLocation.tags} placeholder="Search tags" required />
                                <input  className="w-full md:w-2/12 duration-150 text-blue text-[18px] rounded-md px-4 py-2 border-2 border-lightBlue border-solid active:border-blue"  type="number" name="lat" step="any" defaultValue={editorLocation.lat} placeholder="Latitude Coordinate" required/>
                                <input  className="w-full md:w-2/12 duration-150 text-blue text-[18px] rounded-md px-4 py-2 border-2 border-lightBlue border-solid active:border-blue"  type="number" name="long" step="any" defaultValue={editorLocation.long} placeholder="Longitude Coordinate"  required/>
                            </span>
                            
                            <span className="flex flex-col md:flex-row gap-4 mt-4">
                                <select  className="basis-1/2 duration-150 text-blue text-[18px] rounded-md px-4 py-2 border-2 border-lightBlue border-solid active:border-blue"  required name="type" defaultValue={"b"}>
                                    <option>Building</option>
                                </select>
                                <input  className="basis-1/2 duration-150 text-blue text-[18px] rounded-md px-4 py-2 border-2 border-lightBlue border-solid active:border-blue"  type="text" name="type_desc" defaultValue={editorLocation.type_desc} placeholder="Description of use case, eg. Lecture hall" required/>
                                <input  className="basis-1/2 duration-150 text-blue text-[18px] rounded-md px-4 py-2 border-2 border-lightBlue border-solid active:border-blue"  type="text" name="desc" defaultValue={editorLocation.desc} placeholder="Brief description"autoComplete="false" />
                                <input  className="basis-1/2 duration-150 text-blue text-[18px] rounded-md px-4 py-2 border-2 border-lightBlue border-solid active:border-blue"  type="text" name="rooms" defaultValue={editorLocation.rooms} placeholder="Room names (separated by a comma)"/>
                            </span>

                            <span className="flex flex-row-reverse gap-4 mt-4">
                                <button  className="bg-blue text-white w-full max-w-[200px] font-semibold px-4 py-3 rounded-full hover:bg-transparent hover:text-blue duration-150 border-2">Save Changes</button>
                                <div className="hover:text-red flex justify-center items-center cursor-pointer hover:font-semibold px-8 duration-150"  onClick={()=>setEditLocation(null)}>Cancel</div>
                            </span> 
                        </form>
                    </div>
                    </>}
                </div>
            </div>
            }
        </>
    )

}

function LocationApproval()
{
    const router = useRouter()
    const [ ApprovalData, setApprovalData ] = useState(null)
    const [ activeLocation, setActive ] = useState(null)

    const [ dataChangeFlag, changeDataFlag ] = useState(true)

    function alternateFlag()
    {
        if (dataChangeFlag)
        {
            changeDataFlag(false)
        }
        else{
            changeDataFlag(true)
        }
    }

    useEffect(()=>{
        fetch("/api/user/location/getApprovalPending")
        .then(res => res.json())
        .then((data) => {setApprovalData(data)})
    }, [dataChangeFlag])


    function handleSubmit(e)
    {
        e.preventDefault()
        fetch(`/api/user/location/resolveApproval?id=${e.target._id.value}`)
        .then(res=>res.json())
        .then((data)=>{
            if (data.status == 200)
            {
                return router.push(`/admin?tab=add&title=${e.target.title.value}&lat=${e.target.lat.value}&long=${e.target.long.value}`)
            }
            else{
                changePopup("Location approval failed.")
            }
        })
    }

    function deleteRequest(_id)
    {
        fetch("/api/user/location/resolveApproval?id="+ _id)
        .then(res=>res.json())
        .then((data)=>{
            if (data.status == 200)
            {
                alternateFlag()
                changePopup("Request Deleted")
            }
            else{
                changePopup("Request Deletion attempt failed")
            }
        })
    }
    //console.log(ApprovalData)
    return (
        <> 
            {!ApprovalData &&  <p className="mt-4 text-[20px] text-blue"> Loading Data...</p>}
            {ApprovalData && <div className="flex flex-col gap-5 w-full full text-black">
                <div className="basis-1/2 h-full">
                    <p className="text-[30px]">Approve a Location into the Production Environment</p>
                    <span className="bg-lightGrey block h-[calc(50vh-140px)] mt-8 overflow-y-scroll scrollbar-thin scrollbar-thumb-lightBlue">
                        {(ApprovalData == [] && <p>No Approvals Requested</p> )}
                        {(ApprovalData != []) && ApprovalData.map((d, index) => {
                            return (
                                <div key={index} className="bg-white flex justify-between flex-row items-center text-black border-lightBlue border-2 rounded-md mb-4 last:mb-0 p-4 shadow-sm hover:bg-lightBlue duration-150 cursor-pointer">
                                    <span className="flex flex-row items-center">
                                        <img src="/img/building.png" className="border-2 border-lightBlue mr-4 rounded-full w-10 h-10 overflow-hidden bg-white"/>
                                        <p className="text-[18px]">{d.location}</p> 
                                        <p className="ml-8 text-black opacity-50    ">{d.email}</p>
                                        <p className="ml-8 text-black opacity-50">{d.createdAt}</p>
                                    </span>
                                    <span className="flex flex-row items-center gap-4">
                                        <img src="/img/trash-b.png" className="w-[25px] h-[25px]" onClick={()=>deleteRequest(d._id)} onMouseEnter={(e)=>e.target.src= "/img/trash-blue.png"} onMouseLeave={(e)=>e.target.src= "/img/trash-b.png"} />
                                        {!activeLocation && <p className="py-2 px-4 border-2 border-blue text-white bg-blue hover:text-blue hover:bg-transparent rounded-full duration-150" onClick={()=>{setActive(d)}}>Expand</p>}
                                    </span>
                                </div>
                            )
                        })}
                    </span>
                </div>
                <div className="basis-1/2">
                    {(!activeLocation) && <> <div className="w-full flex items-center justify-center bg-lightGrey text-lightBlue">Select a Location to Approve</div></> }
                    {(activeLocation != null) && <>
                    <div className="basis-1/2 h-[calc(50vh-220px)]">
                        <form onSubmit={handleSubmit}>
                            <span className="flex flex-row gap-3">
                                <input  className=" w-6/12 duration-150 text-blue text-[18px] rounded-md px-4 py-2 border-2 border-lightBlue border-solid active:border-blue" type="text" name="title" defaultValue={activeLocation.location} placeholder="Title" required />
                                <input  className="w-3/12 duration-150 text-blue text-[18px] rounded-md px-4 py-2 border-2 border-lightBlue border-solid active:border-blue" step="any" type="number" name="lat" placeholder="Latitude Coordinate" required/>
                                <input  className="w-3/12 duration-150 text-blue text-[18px] rounded-md px-4 py-2 border-2 border-lightBlue border-solid active:border-blue" step="any" type="number" name="long"placeholder="Longitude Coordinate"  required/>
                            </span>
                            <input  className="w-[300px] duration-150 text-blue text-[18px] mt-4 rounded-md px-4 py-2 border-2 border-lightBlue border-solid active:border-blue" defaultValue={activeLocation._id} name="_id" required />
                            <span className="flex flex-row-reverse gap-4 mt-4">
                                
                                <button  className="bg-blue text-white w-full max-w-[200px] font-semibold px-4 py-3 rounded-full hover:bg-transparent hover:text-blue duration-150 border-2">Approve Location</button>
                                <Link href={`https://google.com/maps/search/${activeLocation.location}`} target="_blank" className="py-2 px-4 flex items-center border-2 border-blue text-blue bg-transparent hover:text-white hover:bg-blue rounded-full duration-150">Confirm Coordinates</Link>
                                <div className="hover:text-red flex justify-center items-center cursor-pointer hover:font-semibold px-8 duration-150"  onClick={()=>setActive(null)}>Cancel</div>
                            </span> 
                        </form>
                    </div>
                    </>}
                </div>
            </div>
            }
        </>
    )

}

export default function AdminDash({user})
{
    const params = useSearchParams()

    const activeTab = params.get('tab')

    const [mongoData, setMongoData] = useState(null)
    const [ApprovalNum, setApprovalNum] = useState(null)


    useEffect(()=>{
        fetch("/api/search?a=all")
        .then(res => res.json())
        .then((data) => {setMongoData(data)})

        fetch("/api/user/location/getApprovalPending?a=size")
        .then(res=>res.json())
        .then((data)=>{setApprovalNum(data)})
    }, [])

    var toggleOpened = false

    function toggleNav(e) // For the mobile menu
    {
        e.preventDefault()
        const menuObjects = document.getElementsByClassName('mobile-open')
        for(let i= 0; i < menuObjects.length; i++){menuObjects[i].style.display = (toggleOpened ? "none" : "list-item" )}
        //console.log(menuObjects)
        toggleOpened = !toggleOpened
        //console.log(toggleOpened)
    }
    return (
        <>
            <Popup />
            <div className=" h-fit md:h-[calc(100vh-130px)] min-h-[620px] px-4 md:px-0 mx-0 md:mx-10 py-2 md:py-10 flex flex-col md:flex-row gap-5 md:gap-10">
                <div className="basis-auto md:basis-1/4 bg-white shadow-sm rounded-2xl p-4 md:p-8">
                    <ul className="w-full flex flex-col gap-4">
                        <li className="md:hidden text-blue opacity-75 font-semibold w-full py-2 pl-4 pr-4 bg-lightGrey rounded-full hover:bg-blue hover:text-white duration-150 cursor-pointer" onClick={toggleNav}><span className="flex justify-between"><span>Menu</span><span>&darr;</span></span></li>
                        <Link href="/admin"><li className="mobile-open hidden md:list-item text-blue opacity-75 font-semibold w-full py-2 pl-4 bg-lightGrey rounded-full hover:bg-blue hover:text-white duration-150 cursor-pointer" >Dashboard</li></Link>
                        <Link href="/admin?tab=add"><li className="mobile-open hidden md:list-item text-blue opacity-75 font-semibold w-full py-2 pl-4 bg-lightGrey rounded-full hover:bg-blue hover:text-white duration-150 cursor-pointer" >Add a New Location</li></Link>
                        <Link href="/admin?tab=approve"><li className="mobile-open hidden md:list-item text-blue opacity-75 font-semibold w-full py-2 pl-4 bg-lightGrey rounded-full hover:bg-blue hover:text-white duration-150 cursor-pointer" >Approve a requested location</li></Link>
                        <Link href="/admin?tab=edit&location=all"><li className="mobile-open hidden md:list-item text-blue opacity-75 font-semibold w-full py-2 pl-4 bg-lightGrey rounded-full hover:bg-blue hover:text-white duration-150 cursor-pointer" >Edit a Location</li></Link>
                        <Link href="/admin?tab=remove"><li className="mobile-open hidden md:list-item text-blue opacity-75 font-semibold w-full py-2 pl-4 bg-lightGrey rounded-full hover:bg-blue hover:text-white duration-150 cursor-pointer">Remove a Location</li></Link>
                        <Link href="/"><li className="mobile-open hidden md:list-item text-red font-semibold w-full py-2 pl-4 bg-lightGrey rounded-full hover:bg-red hover:text-white duration-150 cursor-pointer">Logout</li></Link>
                    </ul>
                </div>
                <div className="basis-auto md:basis-3/4 bg-white rounded-2xl shadow-sm">
                    <div className={`p-4 md:p-8`}>
                        { (activeTab == 'dashboard' || !activeTab) && <DashView mongoData={mongoData} approvalNum={ApprovalNum} />}
                        { (activeTab == 'add') && <AddLocation /> }
                        { (activeTab == 'approve') && <LocationApproval />}
                        { (activeTab == 'edit') && <EditView mongoData={mongoData} />}
                        { (activeTab == 'remove') && <RemoveLocation />}
                    </div>
                </div>
            </div>
        </>
    )
}