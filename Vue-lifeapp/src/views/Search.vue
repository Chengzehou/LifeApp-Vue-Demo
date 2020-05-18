<template>
  <div>
    <vHead title="搜索" :leftbtn="true" :search="true" :clkfun="clkfun" />
    <form action="/">
      <van-search v-model="value" show-action placeholder="请输入搜索关键词" @input="onInput" />
    </form>
    <div v-for="(val,i) in search" :key="i" >
      <van-cell :title="val.productName" :value="'￥' + val.mobileCurrentPrice" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      search: [],
      show:false,
    };
  },
  methods: {
    clkfun() {
      //点击左侧按钮返回上一页
      this.$router.go(-1);
    },
    onInput(){
      this.show = true
            this.$axios
        .get(`/bdapi/ISearch/AssociationSearch?_t=1589186059&KeyWord=${this.value}`)
        .then(res => {
          this.search = res.data.data.productAssociationInfo.associationList
        });
    },
  }
};
</script>