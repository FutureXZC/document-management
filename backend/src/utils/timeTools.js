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

function joinTime(date1, date2) {
  /**
   * 拼接两个时间，提取date1的年月日和date2的时分秒
   * @param {date1} 提供日期（年月日）的时间对象 Date
   * @param {date2} 提供时间（时分秒）的时间对象 Date
   * @returns {joinTime} 提取后的时间，格式：yyyy-mm-dd hh:mm:ss string
   */
  console.log(date1, date2);
  let joinTime = date1.slice(0, 10) + ' ' + date2.slice(11, 19);
  console.log(joinTime);
  return joinTime;
}

module.exports = {
  getCurDate,
  joinTime,
};
