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

export function getAll(req, res) {
  res.status(200).json({ status: true, data: categories });
}

export function add(req, res) {
  const { value } = req.body;

  // ToDo 토큰 확인 후, 역할이 admin인지 확인하기
  /*
  if (user.role !== 0) {
    res
      .status(403)
      .json({ status: false, message: '권한이 없는 사용자입니다.' });
  }
  */

  const created = {
    id: Date.now(),
    value,
  };

  categories.push(created);

  res.status(201).json({ status: true, data: created });
}

export function deleteOne(req, res) {
  const { id } = req.params;

  categories = categories.filter((category) => category.id !== +id);

  // ! 204는 데이터를 보내지 않는 것 같음. API 문서 수정하기
  res
    .status(204)
    .json({ status: true, message: '카테고리 삭제가 성공하였습니다.' });
}
