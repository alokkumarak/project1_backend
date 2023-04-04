import {Schema , model} from 'mongoose'

const teacherSchema = new Schema({
    teacher_id:{
        type:String,
        required:true
    },
    teacher_name:{
        type:String,
        required:true
    },
    teacher_email:{
        type:String,
        required:true
    },
    teacher_password:{
        type:String,
        required:true
    },
    teacher_phone:{
        type:Number,
        required:true
    },
    teacher_institute:{
        type:String,
        required:false
    }
})


export const TeacherAccount= model('teacher_account',teacherSchema)