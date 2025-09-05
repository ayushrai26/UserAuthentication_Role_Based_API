const User = require('../models/User')



const getProfile = async(req,res)=>{
    try{
        const user = req.user;
        const userId = user.userId
        console.log(userId,'userId')
        const existUser = await User.findOne({_id:userId})
        console.log(existUser)
        if(!existUser){
            return res.status(404).json({message:'Not found'})
        }
        return res.status(200).json({message:'User details',existUser})

    }catch(err){
         return res.status(500).json({message:'Internal Server Error',err:err.message})
    }

}

module.exports = {getProfile}