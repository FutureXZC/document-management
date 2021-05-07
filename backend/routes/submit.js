var express = require('express');
var router = express.Router();
var multer = require('multer');

const sql = require('../src/dao/sql');
const file = require('../src/dao/file');

// 获取任务列表
router.post('/getSubmitList', (req, res) => {
  let s = 'select * from taskList';
  sql.sqlGetAll(s, [], res);
});

// 获取指定任务的需求文件列表
router.post('/getFileList', (req, res) => {
  let s = 'select * from taskInfo where releaseDate = ?';
  let params = req.body.releaseDate;
  sql.sqlGetAll(s, [params], res);
});

// 上传文件
router.post(
  '/upload',
  multer({ dest: './public/upload/' }).any(),
  (req, res, next) => {
    let fileList = req.files;
    file.upload(fileList, res);
  }
);

module.exports = router;
