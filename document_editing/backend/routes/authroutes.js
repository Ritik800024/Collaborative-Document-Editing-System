const express=require("express")
const router=express.Router()
const bcrypt=require("bcrypt")
const User=require("../models/user")
const createtoken=require("../utils/helpers")

router.post("/register",async (req,res)=>{
    const email=req.body.email
    const password=req.body.password
    const name=req.body.name
    const user=await User.findOne({email:email})
    if(user){
        return res.status(403).json({error:"User already exists."})
    }
    const hashedpassword=await bcrypt.hash(password,10)
    const newuserdata={
        name,
        email,
        password:hashedpassword
    }
    const newuser=await User.create(newuserdata)
    const token=await createtoken.getToken(email,newuser)
    console.log(token)
    return res.status(200).json({token:token})
})

router.post("/login",async (req,res)=>{
    const {email,password}=req.body
    const user= await User.findOne({email:email})

    if(!user){
        return res.status(403).json({err:"Invalid Cardentials"})
    }

    const ispasswordvalid= await bcrypt.compare(password,user.password)

    if(!ispasswordvalid){
        return res.status(403).json({err:"Invalid cardentials"})
    }

    const token=await createtoken.getToken(user.email,user)
    return res.status(200).json({token:token})


})

module.exports=router