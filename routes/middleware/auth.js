const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next) =>{
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) return res.status(401).json({message:'there are no token'})
    try {
        const decodetoken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userId = decodetoken.userId
        console.log(decodetoken)
        
        next()
    } catch (error) {
        console.log(error);
        return res.status(403).json({message:'token fake'})
    }

}
module.exports = verifyToken