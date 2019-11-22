<template>
  <div class="breadCrumbYu">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "breadCrumbYu",
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.breadCrumbYu {
  display: inline-block;
  float:left;
  margin-left:5px;
  .el-breadcrumb {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    display: inline-block;
  }
}
</style>
