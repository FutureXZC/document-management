var express = require('express');
var router = express.Router();
const sqlTools = require('../src/Dao/sql');

// 创建任务，将任务的所有相关信息写入taskList和taskInfo表中
router.post('/addTask', (req, res) => {
  let formData = req.body;
  if (sqlTools.addTask(formData)) {
    res.send({
      msg: '任务创建成功！',
      code: 200,
    });
  } else {
    res.send({
      msg: '任务创建失败，请重试！',
      code: 500,
    });
  }
});

module.exports = router;
