const { post } = require('../models');

module.exports = async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await post.findOne({ where: { id: id } });
    await post.destroy({ where: { id: id } });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ status: false, message: 'server error' });
  }
};
