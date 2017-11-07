var express = require('express');
var router = express.Router();
var path = require("path");
var orgPath = process.cwd();

var userDao = require(path.resolve(orgPath, "server/dao/userDao.js"));

// id查询用户
router.get('/queryById', function(req, res, next) {
    console.log('/queryById');
    userDao.queryById(req, res, next);
});

// 查询所有用户
router.get('/queryAll', function(req, res, next) {
    console.log('/queryAll');
    userDao.queryAll(req, res, next);
});

// 删除用户
router.get('/delete', function(req, res, next) {
    console.log('/delete');
    userDao.delete(req, res, next);
});

// 添加用户
router.post('/add', function(req, res, next) {
    console.log('/add');
    userDao.add(req, res, next);
});

// 更新用户信息
router.post('/update', function(req, res, next) {
    userDao.update(req, res, next);
});

// 验证用户身份
router.post('/validity', function(req, res, next) {
    userDao.validity(req, res, next);
});

module.exports = router;
