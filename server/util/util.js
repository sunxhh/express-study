var unit = {};

// 复制对象
unit.extend = function(target, source, flag) {
    for (var key in source) {
        if (source.hasOwnProperty(key))
            flag ?
            (target[key] = source[key]) :
            (target[key] === void 0 && (target[key] = source[key]));
    }
    return target;
}

unit.file = {
    getFileType: function(fileName) {
        let list = fileName.split(".");
        if (list.length <= 1) {
            return "";
        } else {
            return list.slice(-1);
        }
    }
}

module.exports = unit;
