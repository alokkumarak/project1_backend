import { EnrolledStudent } from "./model.js";

export const createEnrolledStudent = async (query, callback) => {
    let _session=new EnrolledStudent(query)
    _session.save(callback)
}

export const createEnrolledStudentAwait = async (query) => {
    let _session= await EnrolledStudent.create(query)
    return _session
}

export const updateEnrolledStudent = async (query,enrolledStudent_data) => {
    const result = await EnrolledStudent.updateOne(query, enrolledStudent_data);
    return result;

}

export const deleteEnrolledStudent =  (query, callback) => {
    EnrolledStudent.deleteOne(query,callback)
}

export const getEnrolledStudent =  async(query) => {
        let queryEnrolledStudent=await EnrolledStudent.findOne(query)
        return queryEnrolledStudent
}




