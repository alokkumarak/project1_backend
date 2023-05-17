import { model, Schema } from "mongoose";

const VideoSchema = new Schema({
    video_title: {
        type: String,
        required: true,
    },
    video_file: {
        type: String,
        required: true,
    },
});

const courseVideoSchema = new Schema({
    course_id: {
        type: String,
        required: true,
    },
    course_videos: {
        type: [VideoSchema],
        required: true,
    },
});

export const CourseVideo = model("course_video", courseVideoSchema);