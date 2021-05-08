function getCurDate() {
  /**
   * 获取当前时间
   * @returns {timeCur} 当前时间，格式：yyyy-mm-dd hh:mm:ss string
   */
  let cur = new Date();
  let timeArr = [
    cur.getFullYear(),
    cur.getMonth() + 1,
    cur.getDate(),
    cur.getHours(),
    cur.getMinutes(),
    cur.getSeconds(),
  ];
  for (let i = 1; i < 6; i++) {
    if (timeArr[i] < 10) {
      timeArr[i] = '0' + timeArr[i];
    }
  }
  let timeCur =
    timeArr[0] +
    '-' +
    timeArr[1] +
    '-' +
    timeArr[2] +
    ' ' +
    timeArr[3] +
    ':' +
    timeArr[4] +
    ':' +
    timeArr[5];
  return timeCur;
}

module.exports = {
  getCurDate,
};
