
import { Router } from 'express';
import cors from 'cors';
import { courseThumbUpload, getCourseByTeacherId, getCourseThumbnailPagination } from '../controllers/courseThumbs/controller.js';
import { courseVideoUpload } from '../controllers/courseVideos/controller.js';
const v2=Router()
v2.use(cors())


v2.post('/teacher/uploadCurse',courseThumbUpload)
v2.post('/course_videos/upload',courseVideoUpload)
v2.get('/getCourseByTeacherId',getCourseByTeacherId)
v2.get('/getAllCourses',getCourseThumbnailPagination)


export default v2