import {
  createTeacherAccountAwait,
  getOneTeacherAccount,
  getTeacherAccount,
} from "../../modules/teacherAccount/service.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const teacherSignup = async (req, res) => {
  const {
    teacher_name,
    teacher_email,
    teacher_password,
    confirm_password,
    teacher_phone,
    teacher_institute,
  } = req.body;
  if (!teacher_name || !teacher_email || !teacher_password || !teacher_phone) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  try {
    // if(teacher_password !== confirm_password){
    //     return res.status(422).json({error:"Password and confirm password do not match"})
    // }
    const teacher = await getTeacherAccount({ teacher_email });
    if (teacher.result.length > 0) {
      return res.status(422).json({ error: "Teacher already exists with this email" });
    }
    const teacher_id = uuidv4();

    bcrypt.hash(teacher_password, 15).then((hashedpassword) => {
      createTeacherAccountAwait({
        teacher_id,
        teacher_name,
        teacher_email,
        teacher_password: hashedpassword,
        teacher_phone,
        teacher_institute,
      });
      res.status(200).json({ message: "Teacher account created successfully" });
    });
  } catch (err) {
    console.log(err);
  }
};

export const teacherSignIn = async (req, res) => {
  const { teacher_email, teacher_password } = req.body;
  if (!teacher_email || !teacher_password) {
    return res.status(422).json({ error: "Please add email or password" });
  }
  try {
    const teacher = await getOneTeacherAccount({ teacher_email });
    if (!teacher) {
      return res.status(422).json({ error: "Invalid email or password" });
    }
    bcrypt
      .compare(teacher_password, teacher.teacher_password)
      .then((doMatch) => {
        if (doMatch) {
          const generateToken = jwt.sign(
            { _id: teacher._id },
            process.env.JSON_WEB_TOKEN
          );
          const {
            teacher_id,
            teacher_name,
            teacher_email,
            teacher_phone,
            teacher_institute,
          } = teacher;
          res
            .status(200)
            .json({
              token: generateToken,
              user: {
                teacher_id,
                teacher_name,
                teacher_email,
                teacher_phone,
                teacher_institute,
              },
              message: "Teacher signed in successfully",
            });
        } else {
          return res.status(422).json({ error: "Invalid email or password" });
        }
      });
  } catch (err) {
    console.log(err);
  }
};



export const getPopularTeacher = async (req, res) => {
  const { limit } = req.query;
  const query = {};
  const resData = await getTeacherAccount(query, limit);
  return res.status(200).json({
    data: resData.result,
  });
};
