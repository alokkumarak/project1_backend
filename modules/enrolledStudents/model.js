import { model, Schema } from "mongoose";

const enrolledStudentSchema = new Schema({
    student_id: {
        type: String,
        required: true,
    },
    course_ids: {
        type: [String],
        required: true,
    },
});

export const EnrolledStudent = model("enrolled_student", enrolledStudentSchema);