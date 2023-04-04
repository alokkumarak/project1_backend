import { TeacherAccount } from "./model.js";

export const createTeacherAccount = async (query, callback) => {
    let _session=new TeacherAccount(query)
    _session.save(callback)
}

export const createTeacherAccountAwait = async (query) => {
    let _session= await TeacherAccount.create(query)
    return _session
}

export const updateTeacherAccount =  (query,teachr_data, callback) => {
    TeacherAccount.updateOne(query,teachr_data,callback)
}

export const deleteTeacherAccount =  (query, callback) => {
    TeacherAccount.deleteOne(query,callback)
}

export const getTeacherAccount =  async(query) => {
    let queryTeacher=await TeacherAccount.findOne(query)
    return queryTeacher
}


 