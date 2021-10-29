const { comments } = require('../../models');

module.exports = async (req, res) => {
  const { commentId } = req.params;

  try {
    const found = await comments.findOne({ where: { id: commentId } });

    // ToDo 유저 확인하기
    /*
    if(found.userId !== user.id){
    
    }
    */
    await comments.destroy({ where: { id: commentId } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
