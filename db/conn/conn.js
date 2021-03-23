const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://kanishk:kanishk123@cluster0.5bvn0.mongodb.net/Registration",{ useNewUrlParser: true ,useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:false})
.then((data)=>console.log("connection established"))
.catch((e)=>console.log("connection rejected",e))