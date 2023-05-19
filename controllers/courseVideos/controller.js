import { getCourseThumbnailById } from "../../modules/courseThumbs/service.js";
import { createCourseVideoAwait, getCourseVideoByCourseId } from "../../modules/courseVideos/service.js";

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

export const getOneCourseVideos = async (req,res)=>{
    const {course_id} = req.query;
    try{
       
        const courseVideos = await getCourseVideoByCourseId({course_id:course_id})
        if(courseVideos){
            return res.status(200).json({data:courseVideos.course_videos})
        }
        else{
            return res.status(404).json({error:"courseVideos not found"})
        }
        
    }catch(err){
        console.log(err)
    }
}

