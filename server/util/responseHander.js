// 错误编号
var ERR_CODE = 300;
// 成功编号
var SUCCESS_CODE = 0;
var unit = {
    errCode: ERR_CODE,
    sucCode: SUCCESS_CODE
}

// 向前台返回JSON方法的简单封装
unit.jsonWrite = function(res, ret, isErr) {
    var type = typeof ret;
    if (type == 'undefined') {
        ret = {
            code: ERR_CODE,
            data: '操作失败'
        }
    }
    if (!ret.code && ret.code != SUCCESS_CODE) {
        ret = {
            data: ret,
            code: isErr ? ERR_CODE : SUCCESS_CODE
        }
    }
    res.json(ret);
}

module.exports = unit;
