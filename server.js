import express from 'express';
import mongoDB from './db.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
config()
const app=express()
import v1 from './routes/v1.js';
import v2 from './routes/v2.js';

mongoDB()
const port=process.env.PORT || 8000
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())

// v1 routes is for user details save 
app.use(v1)
// v2 routes is for course details save
app.use(v2)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})