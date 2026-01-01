import { connectToMongoDb } from "../connections/connect_to_mongo_db.js";

export default async function isCorrectUsernameAndPassword(req, res, next){
    try {
        const getBody = req.body;
        const bodyValues = Object.values(getBody);
        const mongoDb = await connectToMongoDb();
        const isHadThatName = await mongoDb.collection("users_collection").find().toArray();
        for (let name of isHadThatName){
            if ((name["username"] === bodyValues[0]) && (name["password"] === bodyValues[1])){
                return next()
            }
        }
        res.send("the name or the password are not exist or incorrect")
    } catch (error){
        res.send(`the problem is in username or the password values: ${error}`)
    }
}