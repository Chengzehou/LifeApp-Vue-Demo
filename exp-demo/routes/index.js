var express = require('express');
var router = express.Router();

var multer = require("multer");

var {
  User
} = require('../utils/schema.js')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//获取用户注册手机号是否重复信息
router.post('/registerphone', function (req, res) {
  console.log(req.body);
  var body = req.body
  User.findOne({
    phone: body.phone
  }).then(result => {
    if (result) {//表明该手机号已经存在
      res.json({
        type: 1,
        code: 200,
        msg: '手机号已存在...',
        error: 0,
      })
    } else {
      res.json({
        type: 0,
        code: 200,
        msg: '手机号可以使用...',
        error: 0,
      })
    }
  })
})

//注册用户
router.post('/register', function (req, res) {
  console.log(req.body);
  var body = req.body
  body.time = new Date();
  User.insertMany(body).then(result => {
    res.json({
      type: 1,
      code: 200,
      msg: '注册成功...',
      error: 0,
    })
  })

})

//用户登录
router.post('/login', function (req, res) {
  var body = req.body
  User.findOne({
    phone: body.phone
  }).then(data => {
    if (data.password == body.password) {//数据库查询的密码与前端反馈的密码一致
      req.session.phone = data.phone;    //只要登录就session存储当前用户phone
      res.json({
        msg: "登录成功",
        code: 200,
        type: 1,
      })
    } else {
      res.json({
        msg: "登录失败,密码或者手机号不正确",
        code: 200,
        type: 0,
      })
    }
  })
})


// 选择硬盘存储
var storage = multer.diskStorage({
  destination: function (req, file, cb) {  // 上传的目录 
    cb(null, './public/upload');
  },
  filename: function (req, file, cb) {   // 上传的文件名
    cb(null, Date.now() + "vuelifeapp" + file.originalname);
  }
})

var upload = multer({ storage: storage }).any();  // 接受任何格式文件

//更换头像
router.post('/uploadimg',upload, function (req, res) {
  console.log('文件上传成功');
  if (req.files) {
    var path = req.files[0].path;
    User.updateOne({
      phone: req.session.phone    //当前用户手机号
    }, {
      $set: { //这条数据添加或修改头像地址
        avatar: path
      }
    }).then(result => {
      res.json({
        code: 200,
        msg: "头像上传成功",
        type: 1,
        path: path,
        phone: req.session.phone
      })
    })
  } else {
    res.json({
      code: 200,
      msg: "头像上传失败",
      type: 0,
    })
  }

})


// 获取头像 
router.post("/getavatar",(req,res)=>{
    User.findOne({//
        phone:req.session.phone    //找到当前登录的用户的信息
    }).then(result=>{
      console.log(result)
        if(result.avatar){  // 判断是否有头像 
            res.json({
                msg:"获取头像成功",
                code:200,
                type:1,
                result,
            })
        }else{
            res.json({
                msg:"获取头像失败",
                code:200,
                type:0
            })
        }
    })
})


var moregoods = require('../utils/moregoods.js')

//商品列表
router.post('/moregoods',function(req,res){
    res.json(moregoods)
})

var goodsinfor = require('../utils/goodsinfor.js')
//商品详情
router.post('/goodsinfor',function(req,res){
  res.json(goodsinfor)
})
module.exports = router;
