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

export function upload(req, res) {
  const { postid } = req.params;
  const { text } = req.body;

  const created = {
    id: 1,
    text,
    userId: 1,
    postId: +postid,
    updatedAt: Date.now(),
    createdAt: Date.now(),
  };

  comments.push(created);

  res.status(200).json({ status: true, data: created });
}

export function update(req, res) {
  res.status(200).json(comments);
}

export function deleteOne(req, res) {
  res.status(200).json(comments);
}
