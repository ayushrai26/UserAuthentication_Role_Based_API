const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()



const createUser = async(req,res)=>{
    try{

          const {name,email,password} = req.body;
          
          if(!name||!email||!password){
          return res.status(400).json({message:'All Fields are Required'})
          }
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    return res.status(400).json({message:'Invalid Email format'})
   }
   
   if(password.length < 6){
    return res.status(400).json({message:'Password must be atleast 6 charaters'})
   }

   const existUser = await User.findOne({email})
   if(existUser){
    return res.status(409).json({message:'User already signedUp'})
   }
   
   const salt =  await bcrypt.genSalt(10);
   
   const hashedPassword =  await bcrypt.hash(password,salt)
   

   const newUser = await  new User({name,email,password:hashedPassword})

   await newUser.save()

   
   return res.status(201).json({message:'User signup Successfull',newUser})

    }catch(err){
        return res.status(500).json({message:'Internal Server Error',err})
    }
}

const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email||!password){
            return res.status(400).json({message:'Email and Password are required'})
        }

        const existUser = await User.findOne({email}).select("+password")
        
        if(!existUser){
            return res.status(404).json({message:'User not found'})
        }
        
        const isMatch = await bcrypt.compare(password,existUser.password)
        
        if(!isMatch){
            return res.status(401).json({message:'Wrong Password'})
        }

        existUser.lastLogin = new Date();
        await existUser.save();
       
        const access_token = jwt.sign(
            {userId:existUser._id,role:existUser.role},
            process.env.JWT_SECRET_ACCESS_TOKEN,
            {expiresIn:'15m'}
        )

        const Refresh_token = jwt.sign(
            {userId:existUser._id,role:existUser.role},
            process.env.JWT_SECRET_REFRESH_TOKEN,
            {expiresIn:'15d'}
        )
        res.cookie("access_token",access_token,{
            httpOnly:true,
            secure:true,
            sameSite: "None",
            maxAge: 15 * 60 * 1000
        })

        res.cookie("Refresh_token",Refresh_token,{
            httpOnly:true,
            secure:true,
            sameSite: "None",
            maxAge:15*24*60*60*1000
        })
        return res.status(200).json({message:'User successfully SignedIn',existUser})

    }catch(err){
     return res.status(500).json({message:'Internal Server Error',err})
    }
}

const refreshToken = (req,res)=>{
    
    try{
   
        const refresh_token = req.cookies.Refresh_token;
        
    if(!refresh_token){
        return res.status(400).json({message:'Invalid token'})
    }

  const user =     jwt.verify(refresh_token,process.env.JWT_SECRET_REFRESH_TOKEN)

         const newAccessToken =   jwt.sign(
            {userId:user.userId, role:user.role},
            process.env.JWT_SECRET_ACCESS_TOKEN,
            {expiresIn:'15m'})
         
        
        res.cookie("access_token", newAccessToken,{
        httpOnly:true,
        maxAge:15*60*1000,
        secure:true,
        sameSite:"None",

    })

    return res.status(200).json({message:'Access token refresh succesfully',newAccessToken})
    

    }catch(err){

        return res.status(500).json({message:'Internal Server Error',err:err.message})
    }

}

const logoutUser = async(req,res)=>{
    try{
        res.clearCookie("access_token",{
       httpOnly:true,
       secure:true,
       sameSite:"None"
        });
        res.clearCookie("Refresh_token",{
         httpOnly:true,
       secure:true,
       sameSite:"None"
        });
        res.json({ message: "Logged out" });

    }catch(err){
  return res.status(500).json({message:'Internal Server Error',err})
    }
}

const resetPassword = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:'Invalid Fields'})
        }

       const existUser =  await User.findOne({email})
       if(!existUser){
        return res.status(404).json({message:'User not found'})
       }

       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(password,salt)
       existUser.password = hashedPassword;
       await existUser.save();
       return res.status(200).json({message:'Password updated successfully'})

    }catch(err){
        return res.status(500).json({message:'Internal Server Error'})
    }
}




module.exports = {createUser,loginUser,logoutUser,refreshToken,resetPassword}