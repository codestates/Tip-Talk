const { post } = require('../../models');

module.exports = async (req, res) => {
  const { title, content, images, categoryId } = req.body;
  const { id } = req.params;
  if (!title || !content || !images || !categoryId) {
    return res
      .status(400)
      .json({ status: false, message: '모든 항목을 입력해야 합니다.' });
  }
  try {
    const posts = await post.findOne({
      where: { id },
    });

    if (!posts) {
      return res
        .status(404)
        .json({ status: false, message: '존재하지 않는 게시글입니다.' });
    }
    await post.update(
      { title, content, images, categoryId },
      { where: { id: id } },
    );
    const updated = await post.findOne({
      where: { id },
    });
    res.status(200).json({ status: true, data: updated });
  } catch (error) {
    res.status(500).json({ status: false, message: 'server error' });
  }
};
