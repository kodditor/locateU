import { getMongoModel } from "@/app/components/MongoC"
import { NextResponse } from 'next/server'

export async function POST(request)
{
    const tempData = await request.json()
    //console.log(tempData)
    const mongoModel = await getMongoModel(null)

    //console.log(await mongoModel.updateOne({ _id:tempData._id }, tempData))
    const doc = await mongoModel.findByIdAndUpdate(tempData._id, {$set:tempData})
    console.log(doc)
    // Need to implement save to prod here
    return new NextResponse(JSON.stringify({status: 200}))
}