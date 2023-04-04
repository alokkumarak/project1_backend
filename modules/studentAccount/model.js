import { Schema,model } from "mongoose";

const studentSchema = new Schema({
    student_id: {
        type: String,
        required: true,
    },
    student_name: {
        type: String,
        required: true,
    },
    student_email: {
        type: String,
        required: true,
    },
    student_password: {

        type: String,
        required: true,
    },
    student_phone: {
        type: Number,
        required: true,
    },
    student_institute: {
        type: String,
        required: false,
    },
});

export const StudentAccount = model("student_account", studentSchema);