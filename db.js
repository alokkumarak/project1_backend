
import { config } from 'dotenv';
config()
import mongoose from 'mongoose';
const URI=process.env.MONGO_URI
const mongoDB=async()=>{
    try{
        await mongoose.connect(URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("MongoDB connected");
    }catch(err){
        console.log(err.message,"MongoDB not connected");
        process.exit(1)
    }
}

export default mongoDB