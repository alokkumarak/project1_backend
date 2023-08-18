import { v4 as uuidv4 } from "uuid";
import {
  createCourseThumbnailAwait,
  getCourseThumbnailByTeacherId,
  getCourseThumbnailSortedPagination,
  getCourseThumbnailById,
  getCourseThumbnail,
  addCourseReviewRatings,
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
    course_teacher_name
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
      course_teacher_name
    });
    res.status(200).json({
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
    console.log(error, "error in getting response");
  }
};

export const getCourseThumbnailsByIds = async (req, res) => {
  if (!req.query) {
    return res.status(422).json({ error: "query not provided" });
  }
  const { course_ids } = req.query;
  try {
    const courseThumbnails = await getCourseThumbnail({ course_id: { $in: course_ids } });
    if (!courseThumbnails) {
      return res.status(404).json({ error: "course thumbnails not found" });
    }
    return res.status(200).json({ data: courseThumbnails });
  } catch (error) {
    console.log(error, "error in getting response");
  }
};


export const getCourseThumbnailPagination = async (req, res) => {
  const { currentPage, limit, search, filter } = req.query;
  const query = {};

  if(search){
    query.$or = [
      { course_title: { $regex: search, $options: "i" } },
      { course_description: { $regex: search, $options: "i" } },
    ];
  }
  if(filter && filter !== 'all'){
    query.course_type = filter
  }

  const resData = await getCourseThumbnailSortedPagination(
    query,
    limit,
    currentPage
  );
  return res.status(200).json({
    limit: limit,
    skip: (currentPage - 1) * limit,
    length: resData.result.length,
    count: resData.count,
    data: resData.result,
  });
};

export const getOneCourseDetail = async (req, res) => {
  const { course_id } = req.query;
  try {
    const resData = await getCourseThumbnailById({ course_id });
    if (resData) {
      return res.status(200).json({
        data: resData,
      });
    } else {
      return res.status(404).json({
        error: "course not found",
      });
    }
  } catch (error) {}
};


// add course review and rating
export const addCourseReviewRating = async (req, res) => {
  let { course_id, student_id, student_name, student_review, student_rating } =
    req.body;
  let query = { course_id: course_id };
  let course_data = await getCourseThumbnailById(query);
  if(!course_data){
    return res.status(404).json({
      error: "course not found",
    });
  }

  let course_review_rating = course_data.course_review_rating;
  let review_rating = {
    student_id: student_id,
    student_name: student_name,
    student_review: student_review,
    student_rating: student_rating,
    created_at: Date.now(),
  };
  course_review_rating.push(review_rating);
  let course_data_update = {
    course_review_rating: course_review_rating,
  };
  try {
    const result = await addCourseReviewRatings(query, course_data_update);
    if (result) {
      return res.status(200).json({
        message: "review and rating added successfully",
      });
    } else {
      return res.status(404).json({
        error: "course not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
