
import { Router } from 'express';
import cors from 'cors';
import { courseThumbUpload } from '../controllers/courseThumbs/controller.js';
import { courseVideoUpload } from '../controllers/courseVideos/controller.js';
const v2=Router()
v2.use(cors())


v2.post('/teacher/uploadCurse',courseThumbUpload)
v2.post('/course_videos/upload',courseVideoUpload)


export default v2