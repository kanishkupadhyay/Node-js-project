const mongoose=require("mongoose")

// Creating Schema

const regSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email id already present"]
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    cpassword:{
        type:String,
        required:true,
        minlength:8
    }
})


// Creating Model
const Registration=new mongoose.model("Registration",regSchema)


module.exports=Registration