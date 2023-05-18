import { v4 as uuidv4 } from "uuid";
import {
  createCourseThumbnailAwait,
  getCourseThumbnailByTeacherId,
  getCourseThumbnailSortedPagination,
} from "../../modules/courseThumbs/service.js";
import { getTeacherAccount } from "../../modules/teacherAccount/service.js";

export const courseThumbUpload = async (req, res) => {
  const {
    course_title,
    course_description,
    course_thumbnail,
    course_type,
    course_price,
    course_teacher_id,
  } = req.body;
  if (!course_title || !course_thumbnail || !course_teacher_id) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  try {
    const course_id = uuidv4();
    createCourseThumbnailAwait({
      course_id,
      course_title,
      course_description,
      course_thumbnail,
      course_price,
      course_type,
      course_teacher_id,
    });
    res
      .status(200)
      .json({
        message: "yahaaa!! New Course Created Successfully",
        course_id: course_id,
      });
  } catch (err) {
    console.log(err);
  }
};

export const getCourseByTeacherId = async (req, res) => {
  if (!req.query) {
    return res.status(422).json({ error: "query not provided" });
  }
  const { teacher_id } = req.query;
  try {
    const teacherProfile = await getTeacherAccount({ teacher_id });
    if (!teacherProfile) {
      return res.status(404).json({ error: "teacher profile not found" });
    }
    const teacherCourses = await getCourseThumbnailByTeacherId({
      course_teacher_id: teacher_id,
    });
    return res.status(200).json({ data: teacherCourses });
  } catch (error) {
    console.log(error, "error in getting response")
  }
};


export const getCourseThumbnailPagination =async (req,res)=>{
    const {currentPage, limit} =req.query
    const query={}

    const resData= await getCourseThumbnailSortedPagination(query,limit,currentPage)
     return res.status(200).json({
        limit: limit,
        skip: (currentPage - 1) * limit,
        length: resData.result.length,
        count: resData.count,
        data: resData.result
    })
}
