import { NextResponse } from 'next/server'
import { getMongoModel } from '@/app/components/MongoC';


export async function GET(request){

    const mongoModel = await getMongoModel(null)
    var results;

    try {
        const allResults = await mongoModel.find().limit(150)
        
        const results = []
        allResults.map((obj) =>{
            results.push( {
                id: obj._id,
                title: obj.title,
                lat: obj.lat,
                long: obj.long
            })

        })

        const response = {
            data: results,
            error: null
        }

        return new NextResponse(JSON.stringify(response))
    } catch (error) {
        const response = {
            data: null,
            error: error
        }
        return new NextResponse(JSON.stringify(response))
    }

}