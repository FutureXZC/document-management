var child_process = require('child_process');

function getPath(releaseDate, taskName, fileName, originName) {
  /**
   * 获取文件后缀名
   * @param {releaseDate} 发布日期 string
   * @param {taskName} 任务名 string
   * @param {fileName} 任务需求转存的文件 string
   * @param {originName} 上传的源文件名 string
   * @returns {ext} 文件后缀名 string
   */
  // 获取文件后缀
  let ext = originName.substring(
    originName.lastIndexOf('.'),
    originName.length
  );
  // 拼接存储路径
  let desPath = [
    '.\\public\\upload\\',
    releaseDate,
    ' ',
    taskName,
    '\\',
    fileName,
    ext,
  ].join('');
  return desPath;
}

function getFileName(fieldname, originalname) {
  /**
   * 获取需求文件转存后的文件名
   * @param {fieldname} 需求文件名，提供文件名称前缀 string
   * @param {originalname} 上传的源文件名，提供文件名的后缀 string
   * @returns 拼接完成的文件名 string
   */
  // fieldname文件名格式为“发布日期_用户id_需求文件名_用户名”，因此需要做字符串提取
  // 目标的文件名前缀为“需求文件名_用户名”
  let index = 0;
  let count = 0;
  for (let i = 0; i < fieldname.length; i++) {
    if (fieldname[i] == '_') {
      count += 1;
      if (count === 2) {
        index = i + 1;
      }
    }
  }
  fieldname = fieldname.slice(index);
  // 提取originalname的文件后缀，即文件格式
  fieldname += originalname.substring(
    originalname.lastIndexOf('.'),
    originalname.length
  );
  console.log(fieldname);
  return fieldname;
}

function exec(command) {
  /**
   * 执行指定的命令
   * @param {command} 在命令行内执行的命令 string
   */
  child_process.exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('执行失败：' + command);
      console.log(error);
      return false;
    }
    console.log('执行成功：' + command);
  });
  return true;
}

module.exports = {
  getPath,
  getFileName,
  exec,
};
