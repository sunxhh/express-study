// 数据库对应字段map
var userMap = {
	id:'id',
	username:'username',
	password:'password',
	age:'age'
};

var user = {
	//插入数据
	insert:function(obj){
		var keyList = [];
		var valueList = [];
		delete obj.id;
		for(var id in obj){
			var dbKey = userMap[id];
			if(dbKey){
				keyList.push(dbKey);
				valueList.push(('"' + obj[id]) + '"');
			}
		}
		console.log(('insert into user (' + keyList.join(",") + ') values (' +  valueList.join(",") + ')'));
		return ('insert into user (' + keyList.join(",") + ') values (' +  valueList.join(",") + ')');
	},
	//更新数据
	update:function(obj){
		var idvalue = obj.id;
		delete obj.id;

		var list = [];
		for(var key in obj){
			var dbKey = userMap[key];
			if(dbKey){
				list.push(dbKey + "='" + obj[key] + "'");
			}
		}
		console.log(("update user set " + list.join(",") + " where " + userMap.id + "=" + idvalue));
		return ("update user set " + list.join(",") + " where " + userMap.id + "=" + idvalue);
	},
	//删除数据
	delete:function(obj){
		var ids = obj.ids;
		var query = 'delete from user where id in(' + ids + ')';
		console.log(query);
		return query;
	},
	//获取单条用户信息
	queryById:'select * from user where id=?',
	//获取所有用户数据
	queryAll:'select * from user',
	//根据用户名密码判断获取用户信息
	validity:'select * from user where username=?',
	
};

module.exports = user;