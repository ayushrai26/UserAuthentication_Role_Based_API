const jwt = require('jsonwebtoken')
require('dotenv').config();

const authMiddleware = (req,res,next)=>{
    try{
        const accessToken  = req.cookies.access_token
        console.log(accessToken)
        if(!accessToken){
            return res.status(400).json({message:'Invalid token'})
        }

    const user = jwt.verify(accessToken,process.env.JWT_SECRET_ACCESS_TOKEN)
    

        req.user = user;
        next();
    

    }catch(err){
        return res.status(500).json({message:'Internal Server Error',err:err.message})
    }
}

module.exports = authMiddleware