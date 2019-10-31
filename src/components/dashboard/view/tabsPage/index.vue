<template>
  <div class="tabsPage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我启动的" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="待我审理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="已审查" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="我跟踪的" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name:"tabsPage",
  data() {
    return {
      activeName: "second"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang="scss" scoped>
.tabsPage{
    width:700px;
    height:auto;
    background-color: #ccc;
}
</style>