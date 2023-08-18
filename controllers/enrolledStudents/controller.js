import {
  getEnrolledStudent,
  createEnrolledStudent,
  updateEnrolledStudent,
} from "../../modules/enrolledStudents/service.js";
import {
  getCourseThumbnailById,
  updateCourseThumbnail,
} from "../../modules/courseThumbs/service.js";

export const getStudentEnrolledCourses = async (req, res) => {
  if (!req.query) {
    return res.status(422).json({ error: "query not provided" });
  }
  const { student_id } = req.query;
  try {
    const studentCourses = await getEnrolledStudent({
      student_id: student_id,
    });
    if (!studentCourses) {
      return res.status(404).json({ error: "student courses not found" });
    }
    return res.status(200).json({ data: studentCourses.course_ids });
  } catch (error) {
    console.log(error, "error in getting response");
  }
};

export const enrollStudent = async (req, res) => {
  const { course_id, student_id } = req.body;
  if (!course_id || !student_id) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  try {
    if (course_id) {
      const course = await getCourseThumbnailById({ course_id });
      if (!course) {
        return res.status(404).json({ error: "course not found" });
      }
      const course_student_inrolled = [
        ...course.course_student_inrolled,
        student_id,
      ];
      const data = await updateCourseThumbnail(
        { course_id: course_id },
        { course_student_inrolled: course_student_inrolled }
      );
      console.log(data, "data");
    }

    const studentCourses = await getEnrolledStudent({
      student_id: student_id,
    });
    if (!studentCourses) {
      createEnrolledStudent({
        student_id: student_id,
        course_ids: [course_id],
      });
      return res.status(200).json({
        message: "yahaaa!! New Course Enrolled Successfully",
        course_id: course_id,
      });
    }
    const course_ids = [...studentCourses.course_ids, course_id];
    const enrolled = await updateEnrolledStudent(
      { student_id: student_id },
      { course_ids: course_ids }
    );
    console.log(enrolled, "enrolled");
    return res.status(200).json({
      message: "yahaaa!! New Course Enrolled Successfully",
      course_id: course_id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const studentEnrolledStatus = async (req, res) => {
  const { course_id, student_id } = req.query;
  if (!course_id || !student_id) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  try {
    const studentCourses = await getEnrolledStudent({
      student_id: student_id,
    });
    if (!studentCourses) {
      return res.status(200).json({
        message: "Not Enrolled",
        course_id: course_id,
        enrolled:false
      });
    }
    // console.log(studentCourses.course_ids.includes(course_id), "enrolled");
    if (studentCourses.course_ids.includes(course_id)) {
      return res.status(200).json({
        message: "Enrolled",
        course_id: course_id,
        enrolled:true
      });
    }
   
    return res.status(200).json({
      message: "Not Enrolled",
      course_id: course_id,
      enrolled:false
    });
  } catch (err) {
    console.log(err);
  }
};
