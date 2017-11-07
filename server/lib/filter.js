var path = require("path");
var orgPath = process.cwd();

var resHander = require(path.resolve(orgPath, "server/util/responseHander.js"));
var user = require(path.resolve(orgPath, "server/dao/userDao.js"));
var Error_Code = require(path.resolve(orgPath, 'server/conf/resCode'));

var jsonWrite = resHander.jsonWrite;

//错误
var err = function(res, text) {
    jsonWrite(res, text, true);
};

module.exports = function(req, res, next) {
    if (!req.session.user) {
        err(res, Error_Code["104"]);
    } else {
        var uid = req.session.user.ID;
        user.getUserById(uid, function(result) {
            if (!result || result.length == 0) {
                err(res, Error_Code["105"]);
            } else {
                next();
            }
        });
    }
}
