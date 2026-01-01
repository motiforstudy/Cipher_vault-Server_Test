export default function isUsernameAndPasswordString(req, res, next){
    try {
        const getBody = req.body;
        const bodyValues = Object.values(getBody);
        if ((typeof bodyValues[0] === "string") && (typeof bodyValues[1] === "string")){
            return next()
        } else {
            return res.send("your request keys are not good they are not string")
        }
    } catch (error){
        res.send(`the problem is in username or the password: ${error}`)
    }
}