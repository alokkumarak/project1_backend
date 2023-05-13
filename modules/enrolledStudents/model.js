import { Model, Schema } from "mongoose";

const enrolledStudentSchema = new Schema({
    student_id: {
        type: String,
        required: true,
    },
    course_id: {
        type: [String],
        required: true,
    },
});

export const EnrolledStudent = Model("enrolled_student", enrolledStudentSchema);