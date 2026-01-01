import { connectToMongoDb } from "../connections/connect_to_mongo_db.js";

export default async function isUsernameAlreadyExist(req, res, next){
    try {
        const getBody = req.body;
        const bodyValues = Object.values(getBody);
        const mongoDb = await connectToMongoDb();
        const isHadAlreadyThatName = await mongoDb.collection("users_collection").find().toArray();
        for (let name of isHadAlreadyThatName){
            if (name["username"] === bodyValues[0]){
                return res.send("that name is already exist, please try onther name")
            }
        }
        next()
    } catch (error){
        res.send(`the problem is in username or the password values: ${error}`)
    }
}