import {StudentAccount} from "./model.js";

export const createStudentAccount = async (query, callback) => {
    let _session=new StudentAccount(query)
    _session.save(callback)
}

export const createStudentAccountAwait = async (query) => {
    let _session= await StudentAccount.create(query)
    return _session
}

export const updateStudentAccount =  (query,student_data, callback) => {
    StudentAccount.updateOne(query,student_data,callback)   
}

export const deleteStudentAccount =  (query, callback) => {
    StudentAccount.deleteOne(query,callback)
}

export const getStudentAccount =  async(query) => {
        let queryStudent=await StudentAccount.findOne(query)
        return queryStudent
}