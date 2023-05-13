import { CourseVideo } from "./model";

export const createCourseVideo = async (query, callback) => {
    let _session=new CourseVideo(query)
    _session.save(callback)
}

export const createCourseVideoAwait = async (query) => {
    let _session= await CourseVideo.create(query)
    return _session
}

export const updateCourseVideo =  (query,courseVideo_data, callback) => {
    CourseVideo.updateOne(query,courseVideo_data,callback)   
}

export const deleteCourseVideo =  (query, callback) => {
    CourseVideo.deleteOne(query,callback)
}

export const getCourseVideoByCourseId =  async(query) => {
    let queryCourse=await CourseVideo.findOne(query)
    return queryCourse
}

