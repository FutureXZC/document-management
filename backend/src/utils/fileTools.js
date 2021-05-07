function getPath(releaseDate, fileName, taskName, user) {
  /**
   * 获取文件后缀名
   * @param {releaseDate} 发布日期 string
   * @param {fileName} 文件名 string
   * @param {taskName} 任务名 string
   * @param {user} 用户名 string
   * @returns {ext} 文件后缀名 string
   */
  // 获取文件后缀
  let first = fileName.lastIndexOf('.');
  let namelength = fileName.length;
  let ext = fileName.substring(first, namelength);
  // 拼接存储路径
  let desPath = [
    './public/upload/',
    releaseDate,
    ' ',
    taskName,
    '/',
    taskName,
    '-',
    user,
    ext,
  ].join('');
  return desPath;
}

module.exports = {
  getPath,
};
