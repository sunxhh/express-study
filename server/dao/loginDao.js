var path = require("path");
var orgPath = process.cwd();

var sqlService = require(path.resolve(orgPath, 'server/service/sqlService.js'));
var util = require(path.resolve(orgPath, 'server/util/util.js'));
var resHander = require(path.resolve(orgPath, 'server/util/responseHander.js'));
var reqHander = require(path.resolve(orgPath, 'server/util/requestHander.js'));
var sql = require(path.resolve(orgPath, 'server/sqlMap/userSqlMap'));
var Error_Code = require(path.resolve(orgPath, 'server/conf/resCode'));

var jsonWrite = resHander.jsonWrite;

var getRequestParam = reqHander.getRequestParam;

var exportObj = {};

//登出
exportObj.loginout = function(req, res, next) {
    var param = req.session.user;

    if (param) {
        //删除session
        delete req.session.user;
        //保存一下修改后的Session
        req.session.save();
    }
    jsonWrite(res, "退出成功", false);
};

//登录
exportObj.login = function(req, res, next) {
    //获取前台传过来的参数
    var param = getRequestParam(req);
    var sqlParam = {
        sql: sql.validity,
        values: [param.name]
    };
    sqlService(sqlParam, function(result) {
        var isErr = false;
        var reqInfo = "";
        if (!result || result.length == 0) {
            reqInfo = Error_Code["101"];
            isErr = true;
        } else {
            var user = result[0];
            if (user.Password != param.password) {
                reqInfo = Error_Code["102"];
                isErr = true;
            } else {
                //设置session
                req.session.user = user;
                reqInfo = user;
                //保存一下修改后的Session
                req.session.save();
            }
        }
        jsonWrite(res, reqInfo, isErr);
    });
};

module.exports = exportObj;
