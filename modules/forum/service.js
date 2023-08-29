import { forumModel } from "./model.js";

export const createForum = async (query, callback) => {
  let _session = new forumModel(query);
  _session.save(callback);
};

export const createForumAwait = async (query) => {
  let _session = await forumModel.create(query);
  return _session;
};

// export const updateForum = async (query, forum_data) => {
//   const result = await forumModel.updateOne(query, forum_data);
//   return result;
// };

export const getForum = async (query) => {
  let queryForum = await forumModel.find(query);
  return queryForum;
};

export const getForumByQuery = async (query) => {
  let queryForum = await forumModel.findOne(query);
  return queryForum;
};

export const addForumAnswers = async (query, forum_data) => {
  const result = await forumModel.updateOne(query, forum_data);
  return result;
};
