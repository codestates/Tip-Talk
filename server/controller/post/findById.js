const { post } = require('../../models');

module.exports = async (id) => {
  try {
    return await post.findOne({ where: { id } });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
