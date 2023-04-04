import pkg from "jsonwebtoken";
const {jwt} = pkg
import {TeacherAccount} from '../modules/teacherAccount/model.js'
import { config } from "dotenv";
config()

export const teacherMustSignin = async (req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:"You must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    try{
        jwt.verify(token,process.env.JSON_WEB_TOKEN,(err,payload)=>{
            if(err){
                return res.status(401).json({error:"You must be logged in"})
            }
            const {_id} = payload
            TeacherAccount.findById(_id).then(userdata=>{
                req.user=userdata
                next()
            })
        }
        )
    }catch(err){
        console.log(err)
    }
}

