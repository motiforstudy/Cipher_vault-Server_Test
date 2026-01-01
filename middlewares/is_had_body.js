export default function isHadBody(req, res, next){
    try{
        const getBody = req.body;
        if (getBody){
            return next()
        }
        res.send("you did not enter a body in your request")
    } catch (error){
        res.send(`the problem is in your body request: ${error}`)
    }
}