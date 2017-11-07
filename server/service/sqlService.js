var mysql = require('mysql');
var path = require("path");
var orgPath = process.cwd();

var conf = require(path.resolve(orgPath, 'server/conf/db.js'));
var util = require(path.resolve(orgPath, 'server/util/util.js'));
var resHander = require(path.resolve(orgPath, 'server/util/responseHander.js'));
var reqHander = require(path.resolve(orgPath, 'server/util/requestHander.js'));

var jsonWrite = resHander.jsonWrite;

var pool = mysql.createPool(util.extend({}, conf.mysql));

var getRequestParam = reqHander.getRequestParam;


function getConnect(fn) {
    pool.getConnection(function(err, connection) {
        fn(err, connection);
    });
}

module.exports = function(param, success, fail) {
    getConnect(function(err, connection) {
        if (err) {
            jsonWrite(res, err, true);
            return;
        }
        // {
        //     sql: 'SELECT * FROM `books` WHERE `author` = ?',
        //     timeout: 40000, // 40s
        //     values: ['David']
        // }
        connection.query(param, function(err, result) {
            if (err) {
                if (fail) {
                    fail(err);
                } else {
                    jsonWrite(res, err, true);
                }
            } else {
                success(result);
            }
            // 释放连接
            connection.release();
        });
    });
}
