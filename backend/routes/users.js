var express = require('express');
var router = express.Router();
const sha1 = require('js-sha1');
const sql = require('../src/dao/sql');

// 用户登录
router.post('/login', (req, res) => {
  let formData = req.body;
  formData['pwd'] = sha1(formData['pwd']).slice(0, 18);
  console.log(formData);
  sql.login(formData, res);
});

// 用户注册
router.post('/register', (req, res) => {
  let formData = req.body;
  formData['pwd'] = sha1(formData['pwd']).slice(0, 18);
  sql.register(formData, res);
});

module.exports = router;
