import { v4 as uuidv4 } from "uuid";
import { addForumAnswers, createForumAwait, getForum, getForumByQuery } from "../../modules/forum/service.js";


export const postforumQuestion = async (req, res) => {
    let { forum_question, asked_by_id, asked_by_name } = req.body;
    let query = { forum_question: forum_question };
    let forum_data = await getForumByQuery(query);
    if (forum_data) {
        return res.status(404).json({
            error: "forum question already exist",
        });
    }
   
    try {

 const forum_id = uuidv4();
        let forum_data_create = {
            forum_id: forum_id,
            forum_question: forum_question,
            asked_by_id: asked_by_id,
            asked_by_name: asked_by_name,
            created_at: Date.now(),
        };
        const result = await createForumAwait(forum_data_create);
        if (result) {
            return res.status(200).json({
                message: "forum question added successfully",
            });
        } else {
            return res.status(404).json({
                error: "forum question not added",
            });
        }
    } catch (error) {
        console.log(error);
    }
}


export const postforumAnswer = async (req, res) => {
    let { forum_id, answered_by_id, answered_by_name, answer } = req.body;
    let query = { forum_id: forum_id };
    let forum_data = await getForumByQuery(query);
    if (!forum_data) {
        return res.status(404).json({
            error: "forum question not found",
        });
    }
    let forum_answers = forum_data.forum_answers;
    let forum_answer = {
        answered_by_id: answered_by_id,
        answered_by_name: answered_by_name,
        answer: answer,
        answered_at: Date.now(),
    };
    forum_answers.push(forum_answer);
    let forum_data_update = {
        forum_answers: forum_answers,
    };
    try {
        const result = await addForumAnswers(query, forum_data_update);
        if (result) {
            return res.status(200).json({
                message: "forum answer added successfully",
            });
        } else {
            return res.status(404).json({
                error: "forum answer not added",
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export const getAllForums = async (req, res) => {
    try {
        const resData = await getForum({});
        return res.status(200).json({
            data: resData.reverse(),
        });
    } catch (error) {
        console.log(error);
    }
}

export const getForumBySearch = async (req, res) => {
    const { search } = req.query;
    try {
        const resData = await getForum({ forum_question: { $regex: search, $options: "i" } });
        return res.status(200).json({
            data: resData,
        });
    } catch (error) {
        console.log(error);
    }
}
