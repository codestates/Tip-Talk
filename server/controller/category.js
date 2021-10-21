const comments = [
  {
    id: 1,
    value: '여행지',
  },
];

export function getAll(req, res) {
  res.status(200).json(comments);
}
