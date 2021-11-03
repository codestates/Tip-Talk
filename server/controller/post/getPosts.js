const { Op } = require('sequelize');
const { post } = require('../../models');

module.exports = async (req, res) => {
  const { categoryId, page, search } = req.query;
  try {
    if (categoryId) {
      const found = await post.findAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              region: {
                [Op.like]: `%${search}%`,
              },
            },
          ],
          categoryId: {
            [Op.eq]: +categoryId,
          },
        },
        offset: page ? +page * 6 : 0,
        limit: page ? 6 : 100,
      });
      res.status(200).json({ status: true, data: { posts: found } });
    } else {
      const found = await post.findAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              region: {
                [Op.like]: `%${search}%`,
              },
            },
          ],
        },
        offset: page ? +page * 6 : 1,
        limit: page ? 6 : 100,
      });
      res.status(200).json({ status: true, data: { posts: found } });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: false, message: err.message });
  }
};
