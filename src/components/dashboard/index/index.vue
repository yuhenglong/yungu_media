<template>
  <div class="index" :class="classObj">
    <leftMenus></leftMenus>
    <headNav></headNav>
    <el-container class="rightView">
        <router-view></router-view>
    </el-container>
  </div>
</template>
<script>
import headNav from "@/components/dashboard/layout/headNav";
import leftMenus from "@/components/dashboard/layout/leftMenus";
export default {
  name: "idnex",
  components: {
    headNav,
    leftMenus
  },
  computed: {
    classObj() {
      return {
        open: !this.$store.state.isCollapse,
        slide: this.$store.state.isCollapse
      };
    }
  }
};
</script>
<style lang="scss">
.index {
  width: 100%;
  min-height: 100%;
  position: relative;
}
.open {
  .rightView {
    width: calc(100% - 200px);
    left: 200px;
    transition: left 0.28s;
  }
}
.slide {
  .rightView {
    width: calc(100% - 64px);
    left: 64px;
    transition: left 0.5s;
  }
}
.rightView {
  position: fixed;
  height:100%;
  top: 85px;
}
</style>
