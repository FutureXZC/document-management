var express = require('express');
var router = express.Router();
const fs = require('fs');
var child_process = require('child_process');
const sql = require('../src/dao/sql');

// 获取当前用户的提交历史记录
router.post('/getHistory', (req, res) => {
  let submitId = req.body.submitId;
  let currentPage = req.body.currentPage;
  let pageSize = req.body.pageSize;
  let s1 =
    'select h.submitDate, t.name, t.desc, t.teacher from history h join taskList t on h.releaseDate = t.releaseDate where h.id = ? order by h.submitDate desc limit ?, ?';
  let obj = [submitId, (currentPage - 1) * pageSize, pageSize];
  let s2 = 'select count(?) from history where id = ?';
  sql.sqlGetAll(s1, s2, obj, res);
});

// 删除指定当前用户的提交历史记录
router.post('/deleteHistory', (req, res) => {
  let submitDate = req.body.submitDate;
  sql.deleteHistory(submitDate, res);
});

// 获取当前用户的任务发布历史记录
router.post('/getPublishedTask', (req, res) => {
  let submitId = req.body.submitId;
  let currentPage = req.body.currentPage;
  let pageSize = req.body.pageSize;
  let s1 =
    'select releaseDate, deadline, name, desc from taskList where teacherId = ? order by releaseDate desc limit ?, ?';
  let obj = [submitId, (currentPage - 1) * pageSize, pageSize];
  let s2 = 'select count(?) from taskList where teacherId = ?';
  sql.sqlGetAll(s1, s2, obj, res);
});

// 删除指定当前用户的提交历史记录
router.post('/deleteTask', (req, res) => {
  let releaseDate = req.body.releaseDate;
  sql.deleteTask(releaseDate, res);
});

// 下载指定任务文件
router.get('/downloadTaskFile/:releaseDate', (req, res) => {
  let releaseDate = req.params.releaseDate;
  let s = 'select releaseDate, name from taskList where releaseDate = ?';
  // step 1、查找任务是否存在，若存在则返回任务名
  sql.sqlRead(s, [releaseDate]).then((data) => {
    if (data.length) {
      let tarCommand =
        "cd ./public/upload && zip -r task.zip '" +
        data[0]['releaseDate'] +
        '_' +
        data[0]['name'] +
        "'";
      // step2、压缩任务文件夹
      child_process.exec(tarCommand, (error, stdout, stderr) => {
        if (error) {
          console.error('任务文件夹压缩失败：' + tarCommand);
          console.log(error);
          console.log(stdout);
          return false;
        } else {
          // step 3、发送文件
          console.log('执行成功：' + tarCommand);
          res.header('Access-Control-Allow-Origin', '*');
          res.download('./public/upload/task.zip', 'task.zip', (err) => {
            if (!err) {
              //下载完成之后删除存在项目中的文件
              fs.unlinkSync('./public/upload/task.zip');
            } else {
              console.log('下载失败');
            }
          });
        }
      });
    } else {
      res.send({
        msg: '找不到该任务文件，请联系管理员',
        code: 500,
      });
    }
  });
});

module.exports = router;
