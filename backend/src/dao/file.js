const sql = require('./sql');
const fileTools = require('../utils/fileTools');
const timeTools = require('../utils/timeTools');

function upload(fileList, res) {
  //   取出发布时间
  let releaseDate = fileList[0]['fieldname'].split('_')[0];
  let id = fileList[0]['fieldname'].split('_')[1];
  //   将formData的key改为真实的文件名，便于后续遍历时的存储
  let s = 'select name from taskList where releaseDate = ?';
  sql.sqlRead(s, [releaseDate]).then((taskName) => {
    // 查询得到任务名
    taskName = taskName[0]['name'];
    console.log(releaseDate, taskName, id);
    let toDoList = [];
    // step 1、将所有上传的文件移动到任务文件夹内
    for (let i = 0; i < fileList.length; i++) {
      let fileName = fileTools.getFileName(
        fileList[i]['fieldname'],
        fileList[i]['originalname']
      );
      let command =
        'mv ' +
        fileList[i]['path'] +
        ' ' +
        "public/upload/'" +
        releaseDate +
        '_' +
        taskName +
        "'/" +
        fileName;
      console.log(command);
      toDoList.push(fileTools.exec(command));
    }
    // step 2、将提交记录到数据库中
    toDoList.push(sql.addHistory(timeTools.getCurDate(), releaseDate, id));
    // 执行toDoList，并获取执行结果
    Promise.all(toDoList).then((result) => {
      console.log(result);
      let flag = true;
      for (let i = 0; i < result.length; i++) {
        flag = flag && result[i];
      }
      // 根据上述所有操作是否执行成功进行返回
      if (flag) {
        res.status(200).render('index', { msg: '提交成功！' });
      } else {
        res.status(500).reder('index', {
          msg:
            '提交失败，请检查网络连接后重试！若多次重试依然失败，请联系管理员。',
        });
      }
    });
  });
}

module.exports = {
  upload,
};
