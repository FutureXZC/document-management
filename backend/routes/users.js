var express = require('express');
var router = express.Router();
const sql = require('../src/dao/sql');

// 用户登录
router.post('/login', (req, res) => {
  let formData = req.body;
  sql.login(formData, res);
});

// 用户注册
router.post('/register', (req, res) => {
  let formData = req.body;
  sql.register(formData, res);
});

module.exports = router;
