<template>
  <div>
    <vHead title="登录 | 注册" :leftbtn="true" :login="true" :clkfun="clkfun" />
    <van-tabs v-model="active">
      <van-tab title="登录">
        <van-form @submit="onSubmit">
          <van-field
            v-model="userphone"
            name="phone"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit" size="small">登录</van-button>
          </div>
        </van-form>
      </van-tab>
      <van-tab title="注册">
        <van-form validate-first @submit="subregister">
          <!-- 通过 pattern 进行正则校验 -->
          <van-field
            v-model="value1"
            name="phone"
            label="手机号"
            placeholder="请输入手机号"
            :rules="[{ validator:asyncValidator, message: phonemsg ,pattern:pattern0}]"
          />
          <van-field
            v-model="value2"
            name="username"
            label="昵称"
            placeholder="请输入昵称"
            :rules="[{ pattern:pattern1, message: '请输入正确昵称' }]"
          />
          <van-field
            v-model="value3"
            name="password"
            label="密码"
            placeholder="请设置6-18位密码"
            :rules="[{ pattern:pattern2, message: '请输入6-18位密码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">注册</van-button>
          </div>
        </van-form>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      userphone: "",
      password: "",
      value1: "",
      value2: "",
      value3: "",
      //phonemsg: "格式错误",
      pattern0: /^([1][3,4,5,6,7,8,9])\d{9}$/,
      pattern1: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/, //中文、英文、数字包括下划线
      pattern2: /^.{6,18}$/, //6-18任意字符
      flag: true
    };
  },
  methods: {
    phonemsg(value, rule) {
      if (this.flag) {
        return "格式错误";
      } else {
        return "手机号已经存在";
      }
    },
    clkfun() {
      //点击左侧按钮返回上一页
      this.$router.go(-1);
    },
    asyncValidator(val) {
      let axios = this.$axios;
      return new Promise(resolve => {
        axios.post("/nduser/registerphone", { phone: val }).then(res => {
          //检查手机号是否注册
          if (res.data.type === 1) {
            this.flag = false;
            resolve(false);
          }
        });
      });
    },
    onSubmit(val) {
      this.$axios.post("/nduser/login", val).then(res => {
        if (res.data.type === 1) {
          localStorage.userphone = val.phone;
          localStorage.isLogin = true;
          this.$router.push({ name: "home" });
        }
      });
    },
    subregister(val) {
      //这里的val为表单注册数据
      this.$axios.post("/nduser/register", val).then(res => {
        if (res.data.type) {
          (this.active = 0), (this.userphone = val.phone);
        }
      });
    }
  }
};
</script>