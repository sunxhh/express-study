var express = require('express');
var router = express.Router();
var path = require("path");
var orgPath = process.cwd();

var loginDao = require(path.resolve(orgPath, "server/dao/loginDao.js"));


router.all('/', function(req, res, next) {
    loginDao.login(req, res, next);
});

router.all('/signout', function(req, res, next) {
    loginDao.loginout(req, res, next);
});

module.exports = router;
