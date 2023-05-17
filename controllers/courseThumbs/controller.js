import { v4 as uuidv4 } from 'uuid';
import { createCourseThumbnailAwait } from '../../modules/courseThumbs/service.js';

export const courseThumbUpload = async (req,res)=>{
    const {course_title,course_description,course_thumbnail,course_type,course_price,course_teacher_id} = req.body;
    if(!course_title || !course_thumbnail || !course_teacher_id){
        return res.status(422).json({error:"Please add all the fields"})
    }
    try{
        const course_id = uuidv4()
        createCourseThumbnailAwait({course_id,course_title,course_description,course_thumbnail,course_price,course_type,course_teacher_id})
        res.status(200).json({message:"yahaaa!! New Course Created Successfully", course_id:course_id})
    }catch(err){
        console.log(err)
    }
}