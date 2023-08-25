import { NextResponse } from "next/server"
import { getMongoModel } from "@/app/components/MongoC";

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q"); 
    const action = searchParams.get("a"); 

    var results;

    const load =  [
        {
            "title": "New N Block",
            "id": "NNB",
            "rooms": ["1", "2", "3"],
            "lat": "5.6558897",
            "long": "-0.1881336", 
        },
        {
            "title": "N Block",
            "id": "NB",
            "rooms": ["1", "2", "3"],
            "lat": "5.6545808",
            "long": "-0.1880886", 
        },
        {
            "title": "GCB Building",
            "id": "GCB",
            "rooms": [],
            "lat": "5.6551106",
            "long": "-0.1888806", 
        },
        {
            "title": "K. Folson Building",
            "id": "KFB",
            "rooms": [],
            "lat": "5.6554832",
            "long": "-0.1875315", 
        }

    ]
    const mongoModel = await getMongoModel(null)

    switch (action) {
        case 'find':
            results = await mongoModel.find({$text: {$search: query}}).limit(10)
            //results = await mongoModel.find({search: query}).limit(10)
            break;
        case 'all':
            results = await mongoModel.find()
        default:
            break;
    }
    //console.log(mongoModel)

    //results = query ? await mongoModel.find({$text: {$search: query}}).limit(10) : 
    //console.log(results)
    //console.log(load)
    return new NextResponse(JSON.stringify(results))
}