const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const staticPath = path.join(__dirname, "/public");
const ejs = require("ejs");
require("./db/conn/conn");
const RegistrartionModel = require("./db/model/model");
// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/views"));

// for css js and image
app.use(express.static(staticPath));

// for partial
const partialPath = path.join(__dirname, "./partials");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/users", async (req, res) => {
  try {
    const data = await RegistrartionModel.find();
    res.render("users", { value: data,success:''});
  } catch (e) {
    res.status(401).send(e);
  }
});


app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    const result = new RegistrartionModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      cpassword: req.body.cpassword,
    });
    if (password == cpassword) {
      const data = await result.save();
      res.status(201).render("msg");
    } else {
      res.send("Password did not match");
    }
  } catch (e) {
    res.status(400).send(e);
  }
});
app.post("/login", async (req, res) => {
  try {
    const loginemail = req.body.email;
    const loginpassword = req.body.password;
    const data = await RegistrartionModel.findOne({ email: loginemail });
    if (data.password == loginpassword) {
      res.status(201).send(data);
    } else {
      res.status(400).send("error");
    }
  } catch (e) {
    res.status(400).send("<h1>invalid login</h1>");
  }
});

// Filtering User
app.post("/search", async (req, res) => {
  try {
    console.log(req.body.filName);
    const filterName = req.body.filName;
    const filterEmail = req.body.filEmail;
    if (filterEmail == "" && filterName == "") {
      const data = await RegistrartionModel.find();
      res.render("users", { value: data,success:"" });
    } else if (filterEmail.length > 0) {
      const filter = await RegistrartionModel.find({ email: filterEmail });
      res.render("users", { value: filter,success:"" });
    } else {
      const filter = await RegistrartionModel.find({ name: filterName });
      res.render("users", { value: filter,success:"" });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});
app.get("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await RegistrartionModel.findByIdAndDelete(id);
    const datas = await RegistrartionModel.find();
    res.render("users", { value: datas,success:"Data Deleted Successfully" });
    res.send("data delted successfully");
  } catch (e) {
    res.status(400).send(e);
  }
});
app.get("/edit/:id",async(req,res)=>{
    const id=req.params.id
    try{
        const dataVal=await RegistrartionModel.findById(id)
        res.render("edit",{data:dataVal})

    }catch(e){
        res.send(e)
    }

})
app.post("/update",async(req,res)=>{
try{

    const upData=await RegistrartionModel.findByIdAndUpdate(req.body.id,{
        name: req.body.name,
        email: req.body.email,
        password:req.body.password,
        cpassword:req.body.cpassword,
    })
    if(req.body.password==req.body.cpassword){
         // res.send(upData)
         const data = await RegistrartionModel.find();
         res.render("users", { value: data,success:"Data Updated Successfully" });
    }
    else{
        res.send("Password did not match")
    }
   
   
}catch(e){
    res.send(e)
}
})
app.get("/**",(req,res)=>{
  res.render("error")
})
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
