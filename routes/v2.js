
import { Router } from 'express';
import cors from 'cors';
import { addCourseReviewRating, courseThumbUpload, getCourseByTeacherId, getCourseThumbnailPagination, getCourseThumbnailsByIds, getOneCourseDetail } from '../controllers/courseThumbs/controller.js';
import { courseVideoUpload,getOneCourseVideos } from '../controllers/courseVideos/controller.js';
import { getStudentEnrolledCourses, enrollStudent, studentEnrolledStatus } from '../controllers/enrolledStudents/controller.js';
import { postforumQuestion , postforumAnswer, getAllForums, getForumBySearch} from '../controllers/forum/controller.js';
const v2=Router()
v2.use(cors())


v2.post('/teacher/uploadCurse',courseThumbUpload)
v2.post('/course_videos/upload',courseVideoUpload)
v2.get('/getCourseByTeacherId',getCourseByTeacherId)
v2.get('/getAllCourses',getCourseThumbnailPagination)
v2.get('/getOneCourseDetail',getOneCourseDetail)
v2.get(`/getOneCourseVideos`,getOneCourseVideos)
v2.post('/enrollOneStudent',enrollStudent)
v2.get('/getStudentEnrolledCourses',getStudentEnrolledCourses)
v2.get('/getCourseThumbnailsByIds',getCourseThumbnailsByIds)
v2.get('/studentEnrolledStatus',studentEnrolledStatus)
v2.post('/addCourseReviewRating',addCourseReviewRating)

v2.post('/postforumQuestion',postforumQuestion)
v2.post('/postforumAnswer',postforumAnswer)
v2.get('/getAllForums',getAllForums)
v2.get('/getForumBySearch',getForumBySearch)


export default v2