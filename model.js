const mongoose=require('mongoose') 

let MongooseSchema = mongoose.Schema           
const movieSchema=new MongooseSchema(
{                                               
    name:String,
    actor:String,
    actress:String,
    director:String,
    releaseyear:String,
    camera:String,
    producer:String,
    language:String
}
)

var movieModel=mongoose.model("movies",movieSchema)

module.exports={movieModel}