const express=require('express')
const bodyParser=require('body-parser')                       
const mongoose=require('mongoose')                            
const { request, response, application } = require('express')
const { movieModel } = require('./model')


let app = express()                                     


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use( (req,res,next) => { 
    res.setHeader('Access-Control-Allow-Origin','*')                          
    res.setHeader('Access-Control-Allow-Methods','GET','POST')
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials',true)
    next()
})



//MongoDatabase connection
mongoose.connect("mongodb+srv://Vishnuallapra:Vishnuallapra@cluster0.p0dbm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")                                                 


app.get('/',(req,res)=>{
    res.send("Welcome to Api")
})


app.post('/add',async(req,res)=>{
    console.log(req.body)
    let movie=new movieModel(req.body)
    let result=await movie.save()
    res.json(result)
})


app.get("/view",async (req,res)=>{
    try
    {
        var result=await movieModel.find()
        res.json(result)
    }
    catch(error)
    {
        res.status(500).send(error)
    }
})


app.post("/delete",async(req,res)=>{
    try
    {
        var result=await movieModel.findByIdAndDelete(req.body)
        res.json({"status":"Succesfully deleted"})
    }
    catch(error)
    {
        res.status(500).json({"status":error})
    }
})


app.post("/update",async(req,res)=>{
    try
    {
        var result=await movieModel.findByIdAndUpdate(req.body._id,req.body)
        res.json({"status":"Succesfully Updated"})
    }
    catch(error)
    {
        res.status(500).json({"status":error})
    }
})


app.post("/search",async(req,res)=>{
    try
    {
        var result=await movieModel.find({"title": {$regex:'.*'+req.body.title+'.*'}})
        res.json(result)
    }
    catch(error)
    {
        res.status(500).json({"status":error})
    }
})


app.post("/searchsingle",async(req,res)=>{
    try
    {
        var result=await movieModel.find(req.body.title)        
        res.json(result)
    }
    catch(error)
    {
        res.status(500).json(error)
    }
})



app.listen(8080,()=>{
    console.log('Running')
})