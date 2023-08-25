import mongoose from 'mongoose';
import atlasPlugin from 'mongoose-atlas-search';

const connection = await mongoose.connect(process.env.CLOUD_MONGO_URI)

const documentScheme = new mongoose.Schema(
    {
        _id: String,
        title: String,
        lat: String,
        type_desc: String,
        type: String,
        long: String,
        rooms: Array,
        tags: Array,
        createdAt: String
    }
)

const userScheme = new mongoose.Schema(
    {
        _id: String,
        name: String,
        email: String,
        location: String,
        msg: String,
        type: String,
        createdAt: String
    }
)


//atlasPlugin.initialize({
//    model: getMongoModel(),
//    overwriteFind: true,
//    searchKey: 'fullSearch',
//    addFields: {
//      id: '$_id'
//    },
//    searchFunction: query => {
//        return {
//          'wildcard': {
 //           'query': `${query}*`,
// //           'path': '_id',
//            'allowAnalyzedField': true
//            }
//        }
//}
//});


export async function getMongoModel(collection)
{
    var docs

    switch(collection)
    {
        case "user":
        {
            try {
                docs = mongoose.model('userContact')
            } catch (e) {
                docs = mongoose.model('userContact', userScheme, "userContact")
            }
            break;
        }
        case "user-location":
        {
            try {
                docs = mongoose.model('locationApprovalRequired')
            } catch (e) {
                docs = mongoose.model('locationApprovalRequired', userScheme, "locationApprovalRequired")
            }
            break;
        }
        default:
        {
            try {
                docs = mongoose.model('locations')
            } catch (e) {
                docs = mongoose.model('locations', documentScheme, "locations")
            }
        }
    }
    
    //const allDocs = await docs.findOne({'_id': id})
    //console.log(id)
    //console.log(allDocs)
    return docs
}


async function shutDownMongo(connection)
{
    connection.disconnect()
}