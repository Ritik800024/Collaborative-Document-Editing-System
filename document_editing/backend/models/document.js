const {Schema,model}=require("mongoose")

const Document=new Schema({
    Id:{
        Type:String
    },
    data:Object
})

module.exports=model("Document",Document)