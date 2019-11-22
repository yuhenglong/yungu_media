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
      breadListIm: [
        {
          path: "/addContract",
          name: "添加合同"
        },
        {
          path: "/lizi",
          name: "例子测试"
        }
      ],
      breadListLast: []
    };
  },
  methods: {
    loadChange() {
      this.breadListLast = [];
      console.log("这是路由历史", this.$route.path);
      // this.breadListLast = this.$route.path.split("/");
      // this.breadListLast.splice(0, 1);
      // for(let item in this.breadListLast){
      //     item = '/'+ item;
      // }
      this.breadListLast.push(this.$route.path);
      console.log(this.breadListLast);
    }
  },
  watch: {
    $route(to, from) {
      this.loadChange();
      // console.log(to.path);
    }
  },
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
