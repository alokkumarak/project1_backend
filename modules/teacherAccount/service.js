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

export const getOneTeacherAccount =  async(query) => {
    let queryTeacher=await TeacherAccount.findOne(query)
    return queryTeacher
}

export const getTeacherAccount =  async(query,limit) => {

    try {
        let count = await TeacherAccount.countDocuments(query);
        let result = await TeacherAccount.find(query, {
            _id: false,
            teacher_password: false,
        })
            .limit(limit)
        return { result, count };
    } catch {
        return { result: [], count: 0 };
    }
    
}


 