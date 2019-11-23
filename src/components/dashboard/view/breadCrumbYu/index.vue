<template>
  <div class="breadCrumbYu">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in breadListLast" :to="item.path" :key="item.path">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "breadCrumbYu",
  components: {},
  data() {
    return {
      breadListIm: {},
      breadListLast: []
    };
  },
  methods: {
    async loadChange() {
      this.breadListLast = [];
      await this.getRouterList();
      this.breadListLast.push(this.$route.path);
      console.log("这是啥", this.breadListIm);
      // for(let item in this.breadListIm){
      //     if(item.url == this.breadListLast[0]){
      //       console.log('大水货');
      //     }
      // }
    },
    getRouterList() {
      this.$http.get("/sysResource/getUrlNotNullAllList").then(res => {
        console.log("dongxi", res);
        if (res.data.meta.code == 200) {
          this.breadListIm = res.data.data.obj;
        }
      });
    }
  },
  watch: {
    $route(to, from) {
      this.loadChange();
      // console.log(to.path);
    }
  },
  // created() {
  //   this.getRouterList();
  // },
  mounted() {
    this.loadChange();
  }
};
</script>

<style lang="scss" scoped>
.breadCrumbYu {
  display: inline-block;
  float: left;
  margin-left: 5px;
  .el-breadcrumb {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    display: inline-block;
  }
}
</style>
