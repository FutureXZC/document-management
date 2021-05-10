var express = require('express');
var router = express.Router();
var multer = require('multer');

const sql = require('../src/dao/sql');
const file = require('../src/dao/file');

// router.get('/', (req, res) => {
//   res.redirect('/submit');
// });

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
    if (fileList.length === 0) {
      console.log('文件列表为空');
      res.status(500).reder('index', {
        msg: '您没有提交任何文件。请返回页面添加文件再次提交。',
      });
    } else {
      file.upload(fileList, res);
    }
  }
);

module.exports = router;
