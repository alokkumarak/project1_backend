import { CourseThumbnail } from "./model.js";

export const createCourseThumbnail = async (query, callback) => {
  let _session = new CourseThumbnail(query);
  _session.save(callback);
};

export const createCourseThumbnailAwait = async (query) => {
  let _session = await CourseThumbnail.create(query);
  return _session;
};

export const updateCourseThumbnail = async (query, course_data) => {
  const result = await CourseThumbnail.updateOne(query, course_data);
  return result;
};

export const deleteCourseThumbnail = (query, callback) => {
  CourseThumbnail.deleteOne(query, callback);
};

export const getCourseThumbnail = async (query) => {
  let queryCourse = await CourseThumbnail.find(query);
  return queryCourse;
};

export const getCourseThumbnailById = async (query) => {
  let queryCourse = await CourseThumbnail.findOne(query);
  return queryCourse;
};

export const getCourseThumbnailByTeacherId = async (query) => {
  let queryCourse = await CourseThumbnail.find(query);
  return queryCourse;
};

export const getCourseThumbnailSortedPagination = async (
  query,
  limit,
  currentPage
) => {
  try {
    let count = await CourseThumbnail.countDocuments(query);
    let result = await CourseThumbnail.find(query, {
      _id: false,
      __v: false,
      csv: false,
    })
      .limit(limit)
      .skip((currentPage - 1) * limit);
    return { result, count };
  } catch {
    return { result: [], count: 0 };
  }
};

// for review and rating

export const addCourseReviewRatings = async (query, course_data) => {
    const result = await CourseThumbnail.updateOne(query, course_data);
    return result;
};


