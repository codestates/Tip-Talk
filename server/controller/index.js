module.exports = {
  commentController: {
    getAll: require('./comments/getAll'),
    upload: require('./comments/upload'),
    update: require('./comments/update'),
    deleteOne: require('./comments/deleteOne'),
  },
  categoryController: {
    getAll: require('./categories/getAll'),
  },
  oauthController: {
    googleLogin: require('./oauth/googleLogin'),
  },
  authController: {
    deleteUser: require('./auth/deleteUser'),
    findId: require('./auth/findId'),
    login: require('./auth/login'),
    signout: require('./auth/signout'),
    signup: require('./auth/signup'),
    me: require('./auth/me'),
  },
  postController: {
    deletePost: require('./post/deletePost'),
    editPost: require('./post/editPost'),
    getPost: require('./post/getPost'),
    uploadPost: require('./post/uploadPost'),
    getPosts: require('./post/getPosts'),
  },
  userController: {
    editUserInfo: require('./user/editUserInfo'),
    getUserInfo: require('./user/getUserInfo'),
  },
};
