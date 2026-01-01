import { MongoClient } from "mongodb";
import "dotenv/config";

let mongoDb;

export async function connectToMongoDb() {
    try {
        if (mongoDb) {
            return mongoDb;
        }
        let client = new MongoClient(process.env.URI_MONGO_DB);
        await client.connect();
        mongoDb = client.db(process.env.MONGO_NAME_DB);
        console.log("MongoDB connected:", mongoDb.databaseName);
        return mongoDb;
    } catch (error) {
        console.log(`the problem is in connect to mongo: ${error}`);
    }
};