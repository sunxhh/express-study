var express = require('express');
var fs = require("fs");
var router = express.Router();
var multer = require('multer');

var path = require("path");
var orgPath = process.cwd();

var MD5 = require(path.resolve(orgPath, 'server/util/MD5.js'));
var unit = require(path.resolve(orgPath, 'server/util/util.js'));
var resHander = require(path.resolve(orgPath, 'server/util/responseHander.js'));

var createFolder = function(opath) {
    fs.exists(opath, function(exists) {
        if (!exists) {
            fs.mkdir(opath, function(err) {
                if (err) {
                    console.log(opath + "----文件夹创建失败");
                    return false;
                }
            });
        }
    });
};

var uploadFolder = 'upload/photo';

createFolder(uploadFolder);

// 通过 filename 属性定制
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadFolder); // 保存的路径，备注：需要自己创建
    },
    filename: function(req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        var str = new Date().getTime() + file.originalname;
        var fileName = MD5(str) + '.' + unit.file.getFileType(file.originalname);
        cb(null, fileName);
    }
});


var option = {
    storage: storage,
    limits: {
        //field 名字最大长度	100 bytes
        "fieldNameSize": 1024,
        //field 值的最大长度	1MB
        "fieldSize": 20 * 1024 * 1024
            //非文件 field 的最大数量	无限
            // "fields": 1,
            //在multipart表单中, 文件最大长度 (字节单位)	无限
            // "fileSize": 0,
            //在multipart表单中, 文件最大数量	无限
            // "files": 0,
            //在multipart表单中, part传输的最大数量(fields + files)	无限
            // "parts": 0,
            //For multipart forms, the max number of header key=>value pairs to parse	2000
            // "headerPairs": 0
    },
    fileFilter(req, file, cb) {

        // 这个函数应该调用 `cb` 用boolean值来
        // 指示是否应接受该文件

        // 拒绝这个文件，使用`false`, 像这样:
        // cb(null, false)

        // 接受这个文件，使用`true`, 像这样:
        cb(null, true);

        // 如果有问题，你可以总是这样发送一个错误:
        // cb(new Error('I don\'t have a clue!'))

    }
}

// 通过 dest 选项来对 上传行为 进行定制化
var upload = multer(option);

//上传
router.post('/photo', upload.single('photo'), function(req, res, next) {
    var file = req.file;
    var param = req.body;
    resHander.jsonWrite(res, "保存成功");
})


module.exports = router;
