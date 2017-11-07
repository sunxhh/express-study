var express = require('express');
var router = express.Router();
var path = require("path");
var orgPath = process.cwd();

var resHander = require(path.resolve(orgPath, "server/util/responseHander"));

/* GET home page. */
router.get('', function(req, res, next) {
    res.redirect('/no404.html');
});

router.all('/api/', function(req, res, next) {
    resHander.jsonWrite(res, "请求接口不存在！");
});

module.exports = router;
