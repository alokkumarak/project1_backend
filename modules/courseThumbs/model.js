import { Schema,model } from "mongoose";

const reviewRatingSchema = new Schema({
    student_id:{
        type:String,
        required:true
    },
    student_name:{
        type:String,
        required:true
    },
    student_review:{
        type:String,
        required:true
    },
    student_rating:{
        type:Number,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now()
    }
})


const courseThumbSchema = new Schema({
    course_id: {
        type: String,
        required: true,
    },
    course_title: {
        type: String,
        required: true,
    },
    course_description: {
        type: String,
        required: true,
    },
    course_thumbnail: {
        type: String,
        required: false,
    },
    course_type: {
        type: [String],
        required: false,
    },
    course_price: {
        type: Number,
        required: false,
    },
    course_teacher_id: {
        type: String,
        required: true,
    },
    course_teacher_name:{
        type: String,
        required: false,
    },
    course_student_inrolled: {
        type: [String],
        required: false,
        default:[]
    },
    course_review_rating: {
        type:[reviewRatingSchema],
        required: false,
        default:[]
    },
});

export const CourseThumbnail = model("course_thumbnail", courseThumbSchema);