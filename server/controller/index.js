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
};
