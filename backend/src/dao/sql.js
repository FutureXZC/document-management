const timeTools = require('../utils/timeTools');
const sqlModel = require('../model/sqlDb');
let db = sqlModel.db;
let tokenTools = require('../token/token');

function login(formData, res) {
  /**
   * 用户登录
   * @param {formData} 包含用户的id、和密码，object
   * @returns {isSuccess} 是否登录成功的标志，boolean
   */
  let sql = 'SELECT name FROM USERS WHERE id = ? AND pwd = ?';
  let obj = [formData['id'], formData['pwd']];
  sqlRead(sql, obj).then((username) => {
    if (username != '') {
      // 用户名和密码正确，向客户端发送一个token
      tokenTools.setToken(username[0]['name']).then((token) => {
        console.log(username[0]['name'] + '登录成功！');
        res.send({
          username: username[0]['name'],
          msg: '登录成功！',
          code: 200,
          token: token,
        });
      });
    } else {
      console.log('登录失败！账号或密码错误！');
      res.send({
        msg: '账号或密码错误！',
        code: 500,
      });
    }
  });
}

function register(formData) {
  /**
   * 用户注册，将新用户信息填入数据库中的users表中
   * @param {formData} 包含用户的id、用户名和密码，object
   * @returns {username} 是否注册成功的标志，boolean
   */
  let isSuccess = true;
  let sql = 'INSERT INTO `users`(`id`, `name`, `pwd`) VALUES (?, ?, ?)';
  let obj = [formData['id'], formData['name'], formData['pwd']];
  db.run(sql, obj, (err) => {
    if (err) {
      isSuccess = false;
      console.log(err);
      console.log('用户注册失败，请重试！');
    } else {
      console.log('用户注册成功！');
    }
  });
  return isSuccess;
}

function addTask(formData) {
  /**
   * 创建任务，将任务的所有相关信息写入taskList和taskInfo表中
   * @param {formData} 包含任务的发布日期、截止日期、任务名称、任务描述、发布教师和需求文件列表，object
   * @returns {isSuccess} 是否成功创建任务的标志，boolean
   */
  let isSuccess = true;
  let releaseDate = timeTools.getCurDate();
  let deadline = timeTools.joinTime(formData['date1'], formData['date2']);
  // 记录任务列表
  db.serialize(function () {
    let sql =
      'INSERT INTO taskList(`releaseDate`, `deadline`, `name`, `desc`, `teacher`) VALUES (?, ?, ?, ?, ?)';
    let obj = [
      releaseDate,
      deadline,
      formData['name'],
      formData['desc'],
      formData['teacher'],
    ];
    db.run(sql, obj, (err) => {
      if (err) {
        isSuccess = false;
        console.log(err);
        console.log('任务创建失败，请重试！');
        return;
      } else {
        console.log('任务创建成功！');
      }
    });
    // 记录任务详细信息表（需求文件列表）
    if (isSuccess) {
      sql = 'INSERT INTO `taskInfo`(`releaseDate`, `filename`) VALUES (?, ?)';
      obj = formData['fileList'];
      // 每一步都必须保证前一步执行成功，否则不能继续执行
      for (let i = 0; i < obj.length && isSuccess; i++) {
        db.run(sql, [releaseDate, obj[i]], (err) => {
          if (err) {
            isSuccess = false;
            console.log(err);
            console.log('任务需求的文件列表记录失败，请重试！');
          } else {
            console.log('任务需求的文件列表记录成功！');
          }
        });
      }
    } else {
      console.log('任务需求的文件列表记录失败，请重试！');
    }
  });
  return isSuccess;
}

function deleteHistory(submitData) {
  /**
   * 删除任务提交的历史记录
   * @param {submitData} 提交日期，string
   * @returns {isSuccess} 是否删除成功的标志，boolean
   */
  let isSuccess = true;
  let sql = 'DELETE FROM history WHERE submitDate = ?';
  db.run(sql, [submitData], (err) => {
    if (err) {
      isSuccess = false;
      console.log('删除历史记录失败！请重试！');
      console.log(err);
    } else {
      console.log('删除历史记录成功！');
    }
  });
  return isSuccess;
}

function addHistory(submitDate, releaseDate, id) {
  /**
   * 将操作记录到历史记录
   * @param {submitDate} 提交日期，string
   * @param {releaseDate} 发布日期，string
   * @param {id} 提交者的id，string
   */
  let isSuccess = true;
  let sql =
    'INSERT INTO `history`(`submitDate`, `releaseDate`,`id`) VALUES (?, ?, ?)';
  let obj = [submitDate, releaseDate, id];
  db.run(sql, obj, (err) => {
    if (err) {
      isSuccess = false;
      console.log(err);
      console.log('历史记录添加失败，请重试！');
    } else {
      console.log('历史记录添加成功！');
    }
  });
  return isSuccess;
}

function sqlRun(sql, params) {
  /**
   * 执行sql语句
   * @param {sql} 将要执行的sql语句，string
   * @param {params} sql语句的参数列表，array
   */
  return new Promise(function (resolve, reject) {
    db.all(sql, params, function (err, rows) {
      if (err) reject('数据读取错误：' + err.message);
      else {
        resolve(rows);
      }
    });
  });
}

async function sqlGetAll(sql1, sql2, params, res) {
  /**
   * 解析sqlRun函数执行sql语句的结果，并通过res将执行结果返回给前端
   * @param {sql1} 将要执行查询的sql语句，string
   * @param {sql2} 用于统计数量的sql语句，string
   * @param {params} 将要执行的sql语句的参数列表，array
   * @param {res} 响应体对象，object
   */
  // 获取查询数据
  let data = await sqlRun(sql1, params);
  data = data || [];
  // 获取数据总量，若参数列表内仅有分页信息，则不传额外参数
  let totalCount;
  if (params.length > 2) {
    totalCount = await sqlRun(sql2, [params[0], params[0]]);
    totalCount = totalCount[0]['count(?)'];
  } else {
    totalCount = await sqlRun(sql2, []);
    console.log(totalCount);
    totalCount = totalCount[0]['count(*)'];
  }

  res.send({
    data: data,
    length: data.length,
    totalCount: totalCount,
  });
}

async function sqlRead(sql, params) {
  /**
   * 解析sqlRun函数执行sql语句的结果
   * @param {sql} 将要执行的sql语句，string
   * @param {params} sql语句的参数列表，array
   */
  let data = await sqlRun(sql, params);
  return data;
}

module.exports = {
  login,
  register,
  addTask,
  deleteHistory,
  addHistory,
  sqlGetAll,
  sqlRead,
};
