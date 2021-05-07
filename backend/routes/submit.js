var express = require('express');
var router = express.Router();
const sqlTools = require('../src/dao/sql');
const fileTools = require('../src/dao/file');

// 获取任务列表
router.post('/getSubmitList', (req, res) => {
  let sql = 'select * from taskList';
  sqlTools.sqlGetAll(sql, [], res);
});

// 获取指定任务的需求文件列表
router.post('/getFileList', (req, res) => {
  let sql = 'select * from taskInfo where releaseDate = ?';
  let params = req.body.releaseDate;
  sqlTools.sqlGetAll(sql, [params], res);
});

// 上传文件
router.post('/upload', (req, res) => {
  let formData = req.body;
  fileTools.upload(formData);
  // let sampleFile = req.files;
  // console.log(sampleFile);
  // fileTools.upload(sampleFile);
  // res.send('http://127.0.0.1:8080/#/submit');
});

module.exports = router;
