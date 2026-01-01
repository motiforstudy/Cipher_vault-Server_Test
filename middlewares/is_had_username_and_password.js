export default function isHadUsernameAndPassword(req, res, next){
    try {
        const getBody = req.body;
        const bodyKeys = Object.keys(getBody); 
        if (bodyKeys.length === 2){
            if ((bodyKeys[0] === "username") && (bodyKeys[1] === "password")){
                return next()
            } else {
                return res.send("your request keys are not good")
            }
        } else {
            return res.send("you did not enter tow keys in your request")
        }
    } catch (error){
        res.send(`the problem is in username or the password: ${error}`)
    }
}