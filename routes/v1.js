
import { Router } from 'express'
import cors from 'cors'
const v1=Router()
v1.use(cors())
import { teacherMustSignin } from '../middlewares/teacherMustSignin.js'
import { teacherSignup,teacherSignIn, getPopularTeacher } from '../controllers/teacher/controller.js'
import { studentSignIn, studentSignup } from '../controllers/student/controller.js'

v1.get('/test',teacherMustSignin,(req,res)=>{
    res.send("signed in teacher")
}
)

v1.post('/signup/teacher', teacherSignup)
v1.post('/signin/teacher', teacherSignIn)
v1.post('/signup/student', studentSignup)
v1.post('/signin/student', studentSignIn)
v1.get('/getPopularTeacher',getPopularTeacher)

export default v1
