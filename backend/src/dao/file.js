var fs = require('fs');
var path = require('path');
const sqlTools = require('./sql');
const fileTools = require('../utils/fileTools');

function upload(formData) {
  //   console.log(formData);
  let files = Object.keys(formData);
  console.log(files);
  let releaseDate = files[0].split('_')[0];
  for (let i = 0; i < files.length; i++) {
    files[i] = files[i].slice(files[i].indexOf('_') + 1);
  }
  console.log(releaseDate, files);
  let sql = 'select name from taskList where releaseDate = ?';
  sqlTools.sqlRead(sql, [releaseDate]).then((taskName) => {
    taskName = taskName[0]['name'];
    console.log(taskName);
    //   for (let i = 0; i < formData['fileList'].length; i++) {
    //     fs.readFile(formData['fileList'][i][0].path, function (err, data) {
    //       // 存放路径;
    //       let desPath = fileTools.getPath(
    //         releaseDate,
    //         formData[i][0].name,
    //         taskName,
    //         user
    //       );
    //       console.log(desPath);
    //       fs.writeFile(des_file, data, function (err) {
    //         if (err) {
    //           console.log(err);
    //         } else {
    //           console.log('success');
    //         }
    //       });
    //     });
    //   }
  });
}

module.exports = {
  upload,
};
