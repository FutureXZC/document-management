var jwt = require('jsonwebtoken');
var signkey = 'cre9yMQQAyTtFAPG'; //密钥

//设置token
exports.setToken = function (username) {
  return new Promise((resolve, reject) => {
    var token = jwt.sign(
      {
        username: username,
      },
      signkey,
      {
        expiresIn: 60 * 60 * 3, // token有效期3小时
      }
    );
    resolve(token);
  });
};

//验证token
exports.verToken = function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, signkey, (error, decoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(decoded);
      }
    });
  });
};
