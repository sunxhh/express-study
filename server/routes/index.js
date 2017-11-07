var express = require('express');
var router = express.Router();
var parseUrl = require('parseurl');

/* GET home page. */
router.get('', function(req, res, next) {
  var a = router;
  res.redirect('/index.html');
  var path = parseUrl(req).pathname;
  //res.send('index');
});

module.exports = router;
