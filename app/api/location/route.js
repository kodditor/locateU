import { NextResponse } from 'next/server'
import { getMongoModel } from '@/app/components/MongoC';

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id'); 
    const action =  searchParams.get('a'); 
    const load =  {
        'title': 'New N Block',
        'id': 'NNB',
        'rooms': ['1', '2', '3'],
        'lat': '5.6558897',
        'long': '-0.1881336', 
    }

    const mongoModel = await getMongoModel(null)
    var results;

    switch (action) {   
        case 'find':
            results = await mongoModel.find({_id: id}).limit(10)
            break;
        case 'remove':
            results = await mongoModel.findByIdAndRemove(id)
            console.log(results)
            break;
        default:
            break;
    }
    //console.log(mongoModel)
    const doc = await mongoModel.findOne({'_id': id})
    //console.log(id)
    //console.log(docs)
    return new NextResponse(JSON.stringify(doc))
}

export async function POST(request)
{
    const data = await request.json()

    const mongoModel = await getMongoModel()

    console.log(mongoModel.insertMany(data))

    console.log(data)
    return new NextResponse(JSON.stringify({status: 200}))
}