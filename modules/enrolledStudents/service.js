import { EnrolledStudent } from "./model.js";

export const createEnrolledStudent = async (query, callback) => {
    let _session=new EnrolledStudent(query)
    _session.save(callback)
}

export const createEnrolledStudentAwait = async (query) => {
    let _session= await EnrolledStudent.create(query)
    return _session
}

export const updateEnrolledStudent =  (query,enrolledStudent_data, callback) => {
    EnrolledStudent.updateOne(query,enrolledStudent_data,callback)   
}

export const deleteEnrolledStudent =  (query, callback) => {
    EnrolledStudent.deleteOne(query,callback)
}

export const getEnrolledStudent =  async(query) => {
        let queryEnrolledStudent=await EnrolledStudent.findOne(query)
        return queryEnrolledStudent
}




