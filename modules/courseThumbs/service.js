import { CourseThumbnail } from "./model";

export const createCourseThumbnail = async (query, callback) => {
    let _session=new CourseThumbnail(query)
    _session.save(callback)
}

export const createCourseThumbnailAwait = async (query) => {
    let _session= await CourseThumbnail.create(query)
    return _session
}

export const updateCourseThumbnail =  (query,course_data, callback) => {
    CourseThumbnail.updateOne(query,course_data,callback)   
}

export const deleteCourseThumbnail =  (query, callback) => {
    CourseThumbnail.deleteOne(query,callback)
}

export const getCourseThumbnail =  async(query) => {
        let queryCourse=await CourseThumbnail.find(query)
        return queryCourse
}

export const getCourseThumbnailById =  async(query) => {
    let queryCourse=await CourseThumbnail.findOne(query)
    return queryCourse
}

export const getCourseThumbnailByTeacherId =  async(query) => {
    let queryCourse=await CourseThumbnail.find(query)
    return queryCourse
}

