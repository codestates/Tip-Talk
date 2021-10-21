const comments = [
  {
    id: 1,
    text: '좋아요',
    userId: 1,
    postId: 1,
    updatedAt: Date.now(),
    createdAt: Date.now(),
  },
];

export function getAll(req, res) {
  res.status(200).json(comments);
}
