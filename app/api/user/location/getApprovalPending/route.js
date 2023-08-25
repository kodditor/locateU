import { NextResponse } from 'next/server'
import { getMongoModel } from '@/app/components/MongoC';

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id'); 
    const a = searchParams.get('a'); 

    const mongoModel = await getMongoModel("user-location")
    var results;

    if (id)
    {
        results = await mongoModel.findById(id)
    }
    else
    {
        if(a == "size")
        {
            results = await mongoModel.estimatedDocumentCount()
        }
        else{
            results = await mongoModel.find()
        }
    }

    //console.log(id)
    console.log(results)
    return new NextResponse(JSON.stringify(results))
}
