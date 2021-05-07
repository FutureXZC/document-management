var express = require('express');
var router = express.Router();
const sqlTools = require('../src/Dao/sql');

// 删除指定行的历史记录
router.post('/deleteHistory', (req, res) => {
  let submitData = req.body.submitData;
  if (sqlTools.deleteHistory(submitData)) {
    res.send({
      msg: '删除历史记录成功！',
      code: 200,
    });
  } else {
    res.send({
      msg: '删除历史记录失败！请重试！',
      code: 500,
    });
  }
});

module.exports = router;
