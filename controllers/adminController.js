const User = require('../models/User')

const fetchAllUsers = async(req,res)=>{
      try{

        const allUsers =  await User.find().select("-password")
        return res.status(200).json({message:'All USers',allUsers})

      }catch(err){
        return res.status(500).json({message:'Internal Server Error'})
      }
}

const deleteUser = async(req,res)=>{

    try{
          const {id} = req.params;
          const existUser = await User.findByIdAndDelete(id)
          if(!existUser){
            return res.status(404).json({message:'No user to delete'})
          }

          return res.status(200).json({message:'User successfully deleted'})
    }catch(err){
         return res.status(500).json({message:'Internal Server Error'})
    }
}

module.exports = {deleteUser,fetchAllUsers}