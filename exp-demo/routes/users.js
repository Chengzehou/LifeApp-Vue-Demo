var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



//获取用户注册信息
router.post('/register',function(req,res){
  console.log('传输成功');
  res.json({
      type:0
  })
})
module.exports = router;
