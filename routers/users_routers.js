import express from "express";
import { connectToMongoDb } from "../connections/connect_to_mongo_db.js";
import isHadBody from "../middlewares/is_had_body.js";
import isHadUsernameAndPassword from "../middlewares/is_had_username_and_password.js";
import isCorrectUsernameAndPassword from "../middlewares/is_correct_username_and_password.js";

const usersRouter = express();

usersRouter.get("/users/me", isHadBody, isHadUsernameAndPassword, isCorrectUsernameAndPassword, async (req, res)=>{
    try {
        const getBody = req.body;
        const bodyValues = Object.values(getBody);
        const mongoDb = await connectToMongoDb();
        const isHadThatName = await mongoDb.collection("users_collection").find().toArray();
        for (let name of isHadThatName){
            if ((name["username"] === bodyValues[0]) && (name["password"] === bodyValues[1])){
                return res.json({username: bodyValues[0], encryptedMessagesCount: name["encryptedMessagesCount"]})
            }
        }
        res.send("the name or the password are not exist or incorrect")
    } catch (error){
        res.send(`the problem is in users router get_me: ${error}`)
    }
})

export default usersRouter;