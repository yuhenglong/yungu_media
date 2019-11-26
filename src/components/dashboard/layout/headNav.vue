<template>
  <div class="headNav">
    <div class="shaw">
      <div class="leftNav ov">
        <i @click="togalClick" :class="icon" class="pad_i"></i>
        <topMenus></topMenus>
      </div>
    </div>
    <tabsView></tabsView>
  </div>
</template>

<script>
import topMenus from "@/components/dashboard/view/topMenus";
import tabsView from "@/components/dashboard/view/tabsView";
export default {
  name: "headNav",
  components: {
    topMenus,
    tabsView
  },
  data() {
    return {
      togel: false,
      icon: "el-icon-s-fold"
    };
  },
  methods: {
    togalClick() {
      this.$store.dispatch("setIsCollapse");
      this.togel = !this.togel;
      if (this.togel) {
        this.icon = "el-icon-s-unfold";
      } else {
        this.icon = "el-icon-s-fold";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.headNav {
  display: inline-block;
  box-sizing: border-box;
  height:50px;
  background-color: #fff;
  -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  .leftNav,
  .rightNav {
    display: inline;
  }
  .pad_i {
    float: left;
    padding: 16px;
    background-color: #fff;
    cursor: pointer;
  }
  .shaw {
    -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  }
  .pad_i:hover {
    background-color: #e6e6e696;
  }
  .mar-left {
    margin-left: 0;
  }
}
.slide {
  .headNav {
    width: calc(100% - 64px);
    transition: margin-left 0.5s;
    margin-left: 64px;
  }
}
.open {
  .headNav {
    width: calc(100% - 200px);
    margin-left: 200px;
    transition: margin-left 0.28s;
  }
}
</style>
