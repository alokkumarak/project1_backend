
import { Router } from 'express';
import cors from 'cors';
import { courseThumbUpload, getCourseByTeacherId, getCourseThumbnailPagination, getCourseThumbnailsByIds, getOneCourseDetail } from '../controllers/courseThumbs/controller.js';
import { courseVideoUpload,getOneCourseVideos } from '../controllers/courseVideos/controller.js';
import { getStudentEnrolledCourses, enrollStudent, studentEnrolledStatus } from '../controllers/enrolledStudents/controller.js';
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


export default v2