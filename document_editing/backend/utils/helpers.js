const jwt=require("jsonwebtoken")

exports.getToken=async (email,user)=>{
    const token=jwt.sign({identifier:user._id},process.env.secret_key)
    return token
}

exports.authorization= async (token)=>{
    console.log(token)
    const decode=jwt.verify(token,process.env.secret_key)
    console.log(decode)
    return decode
}

module.exports=exports