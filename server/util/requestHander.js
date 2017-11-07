/**
 * 获取请求参数
 * 总结一下， 是不是应该就三种：
 * req.params.xxxxx 从path中的变量
 * req.query.xxxxx 从get中的?xxxx=中
 * req.body.xxxxx 从post中的变量
 */
module.exports.getRequestParam = function(req) {
    var method = req.method.toLowerCase();
    if (method == "get") {
        return req.query;
    }

    if (method == "post") {
        return req.body;
    }
}
