let comments = [
  {
    id: 1,
    text: '좋아요',
    userId: 1,
    postId: 1,
    updatedAt: Date.now(),
    createdAt: Date.now(),
  },
  {
    id: 2,
    text: '와',
    userId: 1,
    postId: 1,
    updatedAt: Date.now(),
    createdAt: Date.now(),
  },
  {
    id: 3,
    text: '감사해요',
    userId: 1,
    postId: 2,
    updatedAt: Date.now(),
    createdAt: Date.now(),
  },
];

export function getAll(req, res) {
  const { postid } = req.params;

  const filtered = comments.filter((comment) => comment.postId === +postid);

  res.status(200).json({ status: true, data: filtered });
}

async function getOne(id) {
  return await comments.find((comment) => comment.id === +id);
}

export function upload(req, res) {
  const { postid } = req.params;
  const { text } = req.body;

  // ToDo postid로 post를 찾고 없을때 처리
  /*
  if (!post) {
    return res.status(404).json({ status: false, message: '존재하지 않는 게시글입니다.' });
  }
  */

  if (!text) {
    return res
      .status(400)
      .json({ status: false, message: '댓글을 입력해주세요' });
  }

  const created = {
    id: +Date.now(),
    text,
    userId: 1, // ToDo 유저 아이디로 변경
    postId: +postid,
    updatedAt: Date.now(),
    createdAt: Date.now(),
  };

  comments.push(created);

  res.status(200).json({ status: true, data: created });
}

export async function update(req, res) {
  const { commentid } = req.params;
  const { text } = req.body;

  // * 텍스트 입력했는지 확인
  if (!text) {
    return res
      .status(400)
      .json({ status: false, message: '댓글을 입력해주세요' });
  }

  // * commentid를 이용 comment 찾기
  const comment = await getOne(commentid);

  if (!comment) {
    return res
      .status(404)
      .json({ status: false, message: '존재하지 않는 댓글입니다.' });
  }

  comment.text = text;

  res.status(200).json({ status: true, data: comment });
}

export function deleteOne(req, res) {
  const { commentid } = req.params;
  comments = comments.filter((comment) => comment.id !== +commentid);
  res.sendStatus(204);
}
