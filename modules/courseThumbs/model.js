import { Schema,model } from "mongoose";

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
    course_student_inrolled: {
        type: [String],
        required: false,
    },
});

export const CourseThumbnail = model("course_thumbnail", courseThumbSchema);