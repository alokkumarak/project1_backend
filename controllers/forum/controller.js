import { v4 as uuidv4 } from "uuid";
import { addForumAnswers, createForumAwait, getForum, getForumByQuery } from "../../modules/forum/service.js";


export const postforumQuestion = async (req, res) => {
    let { forum_question, asked_by_id, asked_by_name } = req.body;

    if (!forum_question || !asked_by_id || !asked_by_name) {
        return res.status(422).json({
            error: "Please add all the fields",
        });
    }

    let query = { forum_question: forum_question };
    let forum_data = await getForumByQuery(query);
    if (forum_data) {
        return res.status(404).json({
            error: "This question already exist",
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
                message: "Your question added successfully",
            });
        } else {
            return res.status(404).json({
                error: "Question not added",
            });
        }
    } catch (error) {
        console.log(error);
    }
}


export const postforumAnswer = async (req, res) => {
    let { forum_id, answered_by_id, answered_by_name, answer } = req.body;

    if (!forum_id || !answered_by_id || !answered_by_name || !answer) {
        return res.status(422).json({
            error: "Please add all the fields",
        });
    }

    let query = { forum_id: forum_id };
    let forum_data = await getForumByQuery(query);
    if (!forum_data) {
        return res.status(404).json({
            error: "This question not found",
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
                message: "Your answer added successfully",
            });
        } else {
            return res.status(404).json({
                error: "Answer not added",
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
    const query={}

    if (search) {
        query.forum_question = { $regex: search, $options: "i" };
    }
    
    try {
        const resData = await getForum(query);
        if(resData.length===0){
            return res.status(404).json({
                error: "No question found",
            });
        }
        return res.status(200).json({
            data: resData.reverse(),
        });
    }
    catch (error) {
        console.log(error);
    }

}
