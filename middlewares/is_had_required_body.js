export default function isHadRequiredBody(req, res, next){
    try {
        const getBody = req.body;
        const bodyKeys = Object.keys(getBody);
        const bodyValues = Object.values(getBody);
        if (bodyKeys.length === 4){
            if ((bodyKeys[0] === "username") && (bodyKeys[1] === "password") && (bodyKeys[2] === "message") && (bodyKeys[3] === "cipherType")){
                if ((typeof bodyValues[0] === "string") && (typeof bodyValues[1] === "string") && (typeof bodyValues[2] === "string") && (typeof bodyValues[3] === "string")){
                    return next()
                } else {
                    return res.send("one or more of your request values is not string")
                }
            } else {
                return res.send("your request keys are not match names as required")
            }
        } else {
            return res.send("you did not enter four keys in your request")
        }
    } catch (error){
        res.send(`the problem is in one of your request keys: ${error}`)
    }
}