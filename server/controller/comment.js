const { comments, post } = require('../models');

async function getOne(id) {
  return await comments.find((comment) => comment.id === +id);
}

module.exports = {
  getAll: async (req, res) => {
    const { postid } = req.params;

    try {
      const data = await comments.findAll({ where: { postid } });
      res.status(200).json({ status: true, data });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  upload: async (req, res) => {
    const { postId } = req.params;
    const { text } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({ status: false, message: '댓글을 입력해주세요' });
    }

    // ToDo postid로 post를 찾고 없을때 처리

    try {
      const found = await post.findOne({ where: { id: postId } });

      if (!found) {
        return res
          .status(404)
          .json({ status: false, message: '존재하지 않는 게시글입니다.' });
      }

      const data = {
        text,
        userId: 1, // ToDo 유저 아이디로 변경
        postId,
      };

      const created = await comments.create({ data });

      res.status(200).json({ status: true, data: created });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  update: async (req, res) => {
    const { commentid } = req.params;
    const { text } = req.body;

    // * 텍스트 입력했는지 확인
    if (!text) {
      return res
        .status(400)
        .json({ status: false, message: '댓글을 입력해주세요' });
    }

    try {
      // * commentid를 이용 comment 찾기
      const comment = await comments.findOne({ where: { id: commentid } });

      if (!comment) {
        return res
          .status(404)
          .json({ status: false, message: '존재하지 않는 댓글입니다.' });
      }

      const updated = await comments.update(
        { text },
        { where: { id: commentid } },
      );

      res.status(200).json({ status: true, data: updated });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  deleteOne: (req, res) => {
    const { commentid } = req.params;

    try {
      const found = await comments.findOne({ where: { id: commentid } });

      // ToDo 유저 확인하기
      /*
      if(found.userId !== user.id){
      
      }
      */
      await comments.destroy({ where: { id: commentid } });
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
};
