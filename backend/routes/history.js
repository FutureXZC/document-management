var express = require('express');
var router = express.Router();
const sql = require('../src/Dao/sql');

// 获取历史记录列表
router.post('/getHistory', (req, res) => {
  let s =
    'select h.submitDate, t.name, t.desc, t.teacher from history h join taskList t on h.releaseDate = t.releaseDate';
  sql.sqlGetAll(s, [], res);
});

// 删除指定行的历史记录
router.post('/deleteHistory', (req, res) => {
  let submitDate = req.body.submitDate;
  if (sql.deleteHistory(submitDate)) {
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
