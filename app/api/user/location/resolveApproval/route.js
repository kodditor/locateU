import { NextResponse } from 'next/server'
import { getMongoModel } from '@/app/components/MongoC';

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id'); 
    
    const mongoModel = await getMongoModel("user-location")
    var results;

    results = await mongoModel.findByIdAndDelete(id)

    //console.log(id)
    //console.log(results)
    return new NextResponse(JSON.stringify({status: 200}))
}