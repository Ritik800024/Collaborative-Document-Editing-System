const mongoose=require("mongoose")
const Document=require("./models/document")
const express=require("express")
var cors=require('cors')
const authroutes=require('./routes/authroutes')
const bodyParser = require('body-parser')

const app=express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use("/auth",authroutes)


require("dotenv").config()
mongoose.connect('mongodb+srv://ritikkumar800024:'+process.env.MONGO_PASS+'@cluster0.jbtzoxo.mongodb.net/?retryWrites=true&w=majority',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(console.log("connected"))
.catch(err=>{console.log(err)})

const io=require('socket.io')(3001,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    },
})

const defaultValue=""

io.on("connection",socket=>{
    socket.on("get-document",async documentId=>{
        const document=await findOrCreateDocument(documentId)
        socket.join(documentId)
        socket.emit('load-document',document.data)

        socket.on("send-changes",delta=>{
            socket.brodcast.to(documentId).emit("receive-changes",delta)
        })
        socket.on("save-document",async data=>{
            await Document.findByOneAndUpdate(documentId,{data})
        })
    })
})

async function findOrCreateDocument(id){
    if(id==null) return

    const document=await Document.findById(id)
    if(document) return document 
    return await Document.create({Id:id, data:defaultValue})

}

app.listen(3002)