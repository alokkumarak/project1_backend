import { getEnrolledStudent } from "../../modules/enrolledStudents/service.js";



export const getStudentEnrolledCourses=async (req,res)=>{
    if (!req.query) {
        return res.status(422).json({ error: "query not provided" });
      }
      const { student_id } = req.query;
      try {
        const studentCourses = await getEnrolledStudent({
            student_id: student_id,
        });
        if(!studentCourses){
            return res.status(404).json({ error: "student courses not found" });
        }
        return res.status(200).json({ data: studentCourses.course_ids });
      } catch (error) {
        console.log(error, "error in getting response");
      }
}