const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String, 
        required:[true, 'Email is required'],
        unique:true,
        lowercase:true,
        match:[
             /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
             "Please fill a valid email address"
        ]

    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[6,"Password must be 6 characters long"],
        maxlength:[220,"Password must be less then 20 characters"],
        select:false
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',
        required:false
    },
    lastLogin:{
        type:Date
    }
})

const User = mongoose.model('user',UserSchema)

module.exports = User;