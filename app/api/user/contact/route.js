
import { NextResponse } from "next/server"
import { getMongoModel } from "@/app/components/MongoC"


export async function POST(request)
{
    const data = await request.json()

    const mongoModel = await getMongoModel("user")
    mongoModel.insertMany(data)
    //console.log(data)
    return new NextResponse(JSON.stringify({status: 200}))
}