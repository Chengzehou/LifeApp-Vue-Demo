<template>
  <div>
    <input type="file" class="fileone" ref="file" @change="uploadFile" />
    <van-image
      round
      width="100px"
      height="100px"
      :src="pic"
      class="userhead"
      @click="changeavatar"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      pic: "https://img.yzcdn.cn/vant/cat.jpeg"
    };
  },
  methods: {
    changeavatar() {
      //当点击图片是点击选择文件
      this.$refs.file.click();
    },
    uploadFile() {
      let file = this.$refs.file.files[0]; //上传多个文件中的第一个
      let data = new FormData(); //FormData 内置对象  实例化一个表单对象  (appliaction/formdata)
      data.append("avatar", file); // 配置 key  为  avatar
      this.$axios({
        //将文件发送到服务器
        url: "/nduser/uploadimg",
        method: "POST",
        data: data
      }).then(res => {
        this.pic = res.data.path.replace(/public/, "http://39.97.218.98:3000");
        // let nowuser = { path: this.pic, phone: res.data.phone };
        // localStorage.setItem("nowuser", JSON.parse(nowuser));
      });
    }
  },
  mounted() {
    if (localStorage.isLogin && localStorage.isLogin !== "false") {
      //如果用户登录了
      this.$axios.post("/nduser/getavatar").then(res => {
        if (res.data.type) {
          this.pic = res.data.result.avatar.replace(
            /public/,
            "http://39.97.218.98:3000"
          );
        } else {
          this.pic = "https://img.yzcdn.cn/vant/cat.jpeg"; // 最后使用 本地默认的统一头像
        }
      });
    }
  }
};
</script>



<style lang="scss" scoped>
.fileone {
  display: none;
}
</style>