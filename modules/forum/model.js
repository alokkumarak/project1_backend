import { Schema, model } from "mongoose";

const forumAnswerSchema = new Schema({
    answered_by_id: {
        type: String,
        required: true,
    },
    answered_by_name: {
        type: String,
        required: true,
    },
    answered_at: {
        type: Date,
        default: Date.now(),
    },
    answer: {
        type: String,
        required: true,
    },
});

const forumSchema = new Schema({
    forum_id: {
        type: String,
        required: true,
    },
    forum_question: {
        type: String,
        required: true,
    },
    asked_by_id: {
        type: String,
        required: true,
    },
    asked_by_name: {
        type: String,
        required: true,
    },
    creaed_at: {
        type: Date,
        default: Date.now(),
    },
    forum_answers: {
        type: [forumAnswerSchema],
        required: false,
        default: [],
    },
});

export const forumModel = model("forum", forumSchema);

 
