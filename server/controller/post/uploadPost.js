const { post } = require('../../models');

module.exports = async (req, res) => {
  const { title, content, images, categoryId, lat, lng, region } = req.body;
  //여행category-> 숙박, 맛집, 여행지, 카페
  if (!title || !content || !images || !categoryId) {
    return res
      .status(400)
      .json({ status: false, message: '모든 항목을 입력해야 합니다.' });
  }
  //images를 blob형태
  try {
    const data = {
      userId: req.user.id,
      title,
      content,
      images,
      views: 0,
      categoryId: +categoryId,
      lat,
      lng,
      region,
    };
    const create = await post.create({ ...data });
    res.status(201).json({ status: true, data: create });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: 'server error' });
  }
};
