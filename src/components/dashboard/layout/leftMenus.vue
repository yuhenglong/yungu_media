<template>
  <div class="leftMenus">
    <headPortrait></headPortrait>
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :router="true"
      :unique-opened="true"
    >
      <template v-for="(item,index) in menusTree">
        <el-submenu :index="item.icon" :key="index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <template v-for="(itemb,indexb) in item.subList">
            <el-menu-item-group :key="indexb">
              <el-menu-item :index="itemb.url" @click="changeRouter(itemb.url,itemb.name)">{{itemb.name}}</el-menu-item>
            </el-menu-item-group>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import headPortrait from "@/components/dashboard/view/headPortrait";
export default {
  name: "leftMenus",
  components: {
    headPortrait
  },
  data() {
    return {
      menusTree: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    getMenus() {
      this.$http.post("/sysUser/getAuthorityResourceByUid").then(res => {
        // console.log("带token请求回来的数据", res);
        if (res.data.meta.code == 200) {
          // console.log(res.data.data.obj);
          this.menusTree = res.data.data.obj;
        }
      });
    },
    changeRouter(url,name){
      const that = this;
      const obj ={
        name:name,
        path:url,
        title:name,
      };
      this.$store.dispatch("addVisitedViews", obj);
    }
  },
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse;
    }
  },
  created() {
    this.getMenus();
  }
};
</script>
<style lang="scss">
.leftMenus {
  width: auto;
  height: 100%;
  background-color: #fff;
  border-right: 1px solid #e6e6e6;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  .el-menu {
    border-right: none;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
  }
  .el-menu-item-group .el-menu-item-group__title {
    padding: 0;
  }
}
</style>