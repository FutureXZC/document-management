var express = require('express');
var router = express.Router();
var multer = require('multer');

const sql = require('../src/dao/sql');
const file = require('../src/dao/file');

// 获取任务列表
router.post('/getSubmitList', (req, res) => {
  let s1 = 'select * from taskList order by releaseDate desc limit ?, ?';
  let currentPage = req.body.currentPage;
  let pageSize = req.body.pageSize;
  let s2 = 'select count(*) from taskList';
  sql.sqlGetAll(s1, s2, [(currentPage - 1) * pageSize, pageSize], res);
});

// 获取指定任务的需求文件列表
router.post('/getFileList', (req, res) => {
  let s1 = 'select * from taskInfo where releaseDate = ?';
  let releaseDate = req.body.releaseDate;
  let s2 = 'select count(*) from taskInfo';
  sql.sqlGetAll(s1, s2, [releaseDate], res);
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
