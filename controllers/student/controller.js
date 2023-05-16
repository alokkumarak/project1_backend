import { createStudentAccountAwait,getStudentAccount } from "../../modules/studentAccount/service.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config()

export const studentSignup = async (req,res)=>{
    const {student_name,student_email,student_password,confirm_password,student_phone,student_institute} = req.body;
    if(!student_name || !student_email || !student_password || !student_phone){
        return res.status(422).json({error:"Please add all the fields"})
    }
    try{
        // if(student_password !== confirm_password){
        //     return res.status(422).json({error:"Password and confirm password do not match"})
        // }

        
        const student = await getStudentAccount({student_email})
        if(student){
            return res.status(422).json({error:"Student already exists"})
        }
        const student_id = uuidv4()
        bcrypt.hash(student_password,15).then(hashedpassword=>{
            createStudentAccountAwait({student_id,student_name,student_email,student_password:hashedpassword,student_phone,student_institute})
            res.status(200).json({message:"Student account created successfully"})
        })
    }catch(err){
        console.log(err)
    }
}

export const studentSignIn = async (req,res)=>{
    const {student_email,student_password} = req.body
    if(!student_email || !student_password){
        return res.status(422).json({error:"Please add email or password"})
    }
    try{
        const student = await getStudentAccount({student_email})
        if(!student){
            return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(student_password,student.student_password).then(doMatch=>{
            if(doMatch){
                const generateToken=jwt.sign({_id:student._id},process.env.JSON_WEB_TOKEN)
                const {student_id,student_name,student_email,student_phone,student_institute} = student
                res.status(200).json({token:generateToken,user:{student_id,student_name,student_email,student_phone,student_institute},message:"Student signed in successfully"})
            }else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
    }catch(err){
        console.log(err)
    }
}