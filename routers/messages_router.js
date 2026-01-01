import express from "express";
import { connectToMongoDb } from "../connections/connect_to_mongo_db.js";
import { connectToSupabaseDb } from "../connections/connect_to_supabase_db.js";
import isHadBody from "../middlewares/is_had_body.js";
import isHadRequiredBody from "../middlewares/is_had_required_body.js";
import isCorrectUsernameAndPassword from "../middlewares/is_correct_username_and_password.js";

const messagesRouter = express();

messagesRouter.post("/messages/encrypt", isHadBody, isHadRequiredBody, isCorrectUsernameAndPassword, async (req, res)=>{
    try {
        const getBodyReq = req.body
        if (getBodyReq["cipherType"] === "reverse"){
            const mongoDb = await connectToMongoDb();
            const supabaseDb = await connectToSupabaseDb();
            const getMessage = getBodyReq["message"]
            const messageLength = getMessage.length;
            let messageLengthDown = getMessage.length;
            let encryptMessage = ""
            for (let i = 0; i <= messageLength - 1; i ++){
                messageLengthDown --
                encryptMessage += getMessage[messageLengthDown]
            }
            const convertToUppercase = encryptMessage.toUpperCase()
            const insertToSupabase = await supabaseDb.from("messages").insert({username: getBodyReq["username"], cipher_type: getBodyReq["cipherType"], encrypted_text: convertToUppercase}).select()
            const isHadThatName = await mongoDb.collection("users_collection").find().toArray();
            for (let name of isHadThatName){ 
                if (name["username"] === getBodyReq["username"]){
                    name["encryptedMessagesCount"] += 1;
                }
            }
            res.json({id: insertToSupabase["data"][0]["id"], cipherType: getBodyReq["cipherType"], encryptedText: convertToUppercase})
        } else {
            res.send("our platform did not support you type of encryption")
        }
    } catch (error){
        res.send(`the problem is in messages encrypt: ${error}`)
    }
})

messagesRouter.post("/messages/decrypt", isHadBody, isCorrectUsernameAndPassword, async (req, res)=>{
    try {
        const getBodyReq = req.body
        const supabaseDb = await connectToSupabaseDb();
        const getAllMessages = await supabaseDb.from("messages").select()
        let getMessage;
        for (let data of getAllMessages["data"]){
            if (data["id"] === getBodyReq["messageId"]){
                getMessage = data["encrypted_text"]
            }
        }
        const messageLength = getMessage.length;
        let messageLengthDown = getMessage.length;
        let decryptMessage = ""
        for (let i = 0; i <= messageLength - 1; i ++){
                messageLengthDown --
                decryptMessage += getMessage[messageLengthDown]
            }
        const convertToLowercase = decryptMessage.toLowerCase();
        res.json({id: getBodyReq["messageId"], decryptedText: convertToLowercase})
    } catch (error){
        res.send(`the problem is in messages decrypt: ${error}`)
    }
})

export default messagesRouter;