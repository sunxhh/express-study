// 数据库对应字段map
var userMap = {
	id: 'ID',
	name: 'Name',
	password: 'Password',
	age: 'Age',
	role: "Role",
	isValid: "IsValid"
};

var user = {
	//插入数据
	insert: function (obj) {
		var keyList = [];
		var valueList = [];
		delete obj.id;
		for (var id in obj) {
			var dbKey = userMap[id];
			if (dbKey) {
				keyList.push(dbKey);
				valueList.push(('"' + obj[id]) + '"');
			}
		}
		console.log(('insert into M_User (' + keyList.join(",") + ') values (' + valueList.join(",") + ')'));
		return ('insert into M_User (' + keyList.join(",") + ') values (' + valueList.join(",") + ')');
	},
	//更新数据
	update: function (obj) {
		var idvalue = obj.id;
		delete obj.id;

		var list = [];
		for (var key in obj) {
			var dbKey = userMap[key];
			if (dbKey) {
				list.push(dbKey + "='" + obj[key] + "'");
			}
		}
		console.log(("update M_User set " + list.join(",") + " where " + userMap.id + "=" + idvalue));
		return ("update M_User set " + list.join(",") + " where " + userMap.id + "=" + idvalue);
	},
	//删除数据
	delete: function (obj) {
		var ids = obj.ids;
		var query = 'delete from M_User where ID in(' + ids + ')';
		console.log(query);
		return query;
	},
	//获取单条用户信息
	queryById: 'select * from M_User where ID=?',
	//获取所有用户数据
	queryAll: 'select * from M_User',
	//根据用户名密码判断获取用户信息
	validity: 'select * from M_User where Name=?',

};

module.exports = user;