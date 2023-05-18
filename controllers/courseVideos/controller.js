import { getCourseThumbnailById } from "../../modules/courseThumbs/service.js";
import { createCourseVideoAwait } from "../../modules/courseVideos/service.js";

export const courseVideoUpload = async (req,res)=>{
    const {course_id, course_videos } = req.body;
    try{
         if(course_videos.length === 0){
            return res.status(422).json({error:"Please add all the fields"})
        }
        const courseExist= await getCourseThumbnailById({course_id:course_id})
        if(!courseExist){
            return res.status(422).json({error:"course not exist"})
        }
        createCourseVideoAwait({course_id,course_videos})
        res.status(200).json({message:"yahaaa!! New Course Created Successfully"})
    }catch(err){
        console.log(err)
    }
}