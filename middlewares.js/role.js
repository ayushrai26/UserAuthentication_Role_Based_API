const jwt = require('jsonwebtoken')
require('dotenv').config();

const roleMiddleware = (roles=[])=>{

    return (req,res,next)=>{
   try{
  const accessToken = req.cookies.access_token;
  if(!accessToken){
    return res.status(400).json({message:'Invalid Token'})

  }

  jwt.verify(accessToken,process.env.JWT_SECRET_ACCESS_TOKEN,(err,user)=>{
    if(err){
        return res.status(400).json({message:'Invalid or expired Token'})
    }

    if(roles.length && !roles.includes(user.role)){
        return res.status(403).json({message:'Access Denied'})
    }

    req.user = user;
    next();

  })

    }catch(err){
        return res.status(500).json({message:'Internal Server error'})
    }
    }

}

module.exports = roleMiddleware