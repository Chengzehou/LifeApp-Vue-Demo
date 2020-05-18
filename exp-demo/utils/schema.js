// 路由里面需要 操作数据库   
const mongoose = require("mongoose");
const Schema = mongoose.Schema;   // 构造函数  Schema
const user_schema = new Schema({   // 定义表结构 
    phone:String,
    username : String,
    password :String,
    avatar:String,
    time:Date,
});  

exports.User = mongoose.model("user",user_schema)  //表结构模型 英语复数   users

