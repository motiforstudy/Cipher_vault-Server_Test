import express from "express";
import { connectToMongoDb } from "../connections/connect_to_mongo_db.js";
import isHadBody from "../middlewares/is_had_body.js";
import isHadUsernameAndPassword from "../middlewares/is_had_username_and_password.js";
import isUsernameAndPasswordString from "../middlewares/is_username_and_password_sting.js";
import isUsernameAlreadyExist from "../middlewares/is_username_already_exist.js";

const authRouter = express();

authRouter.post("/auth/register", isHadBody, isHadUsernameAndPassword, isUsernameAndPasswordString, isUsernameAlreadyExist, async (req, res)=> {
    try {
        const getBodyReq = req.body
        const mongoDb = await connectToMongoDb();
        getBodyReq["encryptedMessagesCount"] = 0;
        getBodyReq["createdAt"] = new Date()
        const insertUser = await mongoDb.collection("users_collection").insertOne(getBodyReq)
        res.json({id: insertUser.insertedId, username: getBodyReq["username"]})
    } catch (error){
        res.send(`the problem is in register post ${error}`)
    }
})

export default authRouter