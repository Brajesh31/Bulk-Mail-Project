const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const nodemailer=require("nodemailer")
const bodyParser=require('body-parser')
require ("dotenv").config();
const app=express()
app.use(express.json())
 app.use(cors({
    origin:process.env.FRONTEND_URL||"http://localhost:3000",
    methods:"GET,PUT,POST,DELETE",
    credentials:true
 }))
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_URL).then(()=>{console.log("Sucess")})
.catch(()=>{console.log("faild")})

const mainId=mongoose.model("mainId",{email:String,pass:String},"user")

mainId.find().then(function(data)

{
 
    const transponter=nodemailer.createTransport({
        service:"gmail",
        auth:{
          user:data[0].toJSON().email,
          pass:data[0].toJSON().pass,
        }
    })
    app.post("/sendmail",function(req,res){
        var text=req.body.msg
        var emailList=req.body.bulkEmail
        console.log(emailList)
   new Promise (async function(resolve,reject){
       try{
           for( var i=0;i<emailList.length;i++)
               {
                await transponter.sendMail(
                    {
                    from:"suriyanarayanan2012@gmail.com",
                    to:emailList[i],
                    subject:"test",
                    text:text
                }
                )
                console.log("email number:"+[i] )
            }
           resolve("sucess")
          }
        
          catch{
          reject ("faild")
          }
        
   }).then(()=>{
       res.send(true)
   }).catch(()=>{
       res.send(false)
   })
      
   
   })  
})



app.listen("3000",function(){
    console.log("Server has Started....")
})