let categories = [
  {
    id: 1,
    value: '여행지',
  },
  {
    id: 2,
    value: '카페',
  },
];

module.exports = {
  getAll: (req, res) => {
    res.status(200).json({ status: true, data: categories });
  },
};
