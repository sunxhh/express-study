var mysql = require('mysql');
var path = require("path");
var orgPath = process.cwd();


var conf = require(path.resolve(orgPath, 'server/conf/db.js'));
var util = require(path.resolve(orgPath, 'server/util/util.js'));
var sql = require(path.resolve(orgPath, 'server/sqlMap/userSqlMap'));

var jsonWrite = util.jsonWrite;
var pool = mysql.createPool(util.extend({}, conf.mysql));
var getRequestParam = util.getRequestParam;
module.exports = {
    // 添加
    add: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            //获取前台传过来的参数
            var param = getRequestParam(req);
            //简历连接
            connection.query(sql.insert(param), function(err, result) {
                if (result) {
                    result = {
                        code: 200,
                        msg: '增加成功'
                    };
                }

                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);
                // 释放连接 
                connection.release();
            });
        });
    },
    //修改
    update: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            var param = getRequestParam(req);

            connection.query(sql.update(param), function(err, result) {
                if (result) {
                    result = {
                        code: 200,
                        msg: '修改成功'
                    };
                }
                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);
                // 释放连接 
                connection.release();
            });
        });
    },
    //删除
    delete: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            var param = getRequestParam(req);
            connection.query(sql.delete(param), function(err, result) {
                if (result) {
                    result = {
                        code: 200,
                        msg: '删除成功'
                    };
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },

    //获取单人信息
    queryById: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            var param = getRequestParam(req);

            connection.query(sql.queryById, [param.id], function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    //获取所有人信息
    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query(sql.queryAll, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    //根据用户名密吗获取用户信息
    validity: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            //获取前台传过来的参数
            var param = getRequestParam(req);
            connection.query(sql.validity, [param.username], function(err, result) {
                console.log(result);
                if (!result || result.length == 0) {
                    result = {
                        code: 0,
                        msg: '用户不存在'
                    };
                } else {
                    if (result[0].password != param.password) {
                        result = {
                            code: 0,
                            msg: '用户名或密码不对'
                        };
                    }
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    //获取用户信息
    getUserById: function(id, callback) {
        pool.getConnection(function(err, connection) {
            connection.query(sql.queryById, [id], function(err, result) {
                callback(result);
                connection.release();
            });
        });
    }
};
