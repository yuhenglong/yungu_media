<template> 
 <div class="leftDetaiMenus">
<el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <!-- <el-submenu index="1"> -->
        <!-- <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">个人办公</span>
        </template> -->
        <!-- <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu> -->
      <!-- </el-submenu> -->
       <el-menu-item index="1">
        <i class="el-icon-location"></i>
        <span slot="title">个人办公</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">流程发起</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">待办流程</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">已办流程</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">我发起的</span>
      </el-menu-item>
    </el-menu>

 </div>
</template>
<script>
export default {
  name: "leftDetaiMenus",
  data() {
    return {
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed:{
    isCollapse(){
      return this.$store.state.isCollapse
    }
  }
}
</script>
<style lang="scss" scoped>
.leftDetaiMenus {
  width: auto;
  height: 100%;
  background-color: #fff;
  border-right:1px solid #e6e6e6;
  position: fixed;
  top:0;
  left: 0;
  z-index: 99;
}
.el-menu{
  border-right:none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%; 
}
</style>