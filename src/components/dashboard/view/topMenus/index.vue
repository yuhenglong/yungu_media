<template>
  <div class="topMenus">
    <breadCrumbYu></breadCrumbYu>
    <rightTopMenu></rightTopMenu>
    <!-- <button class="fon_col" @click="exit">退出系统</button> -->
  </div>
</template>
<script>
import breadCrumbYu from "@/components/dashboard/view/breadCrumbYu";
import rightTopMenu from "@/components/dashboard/view/rightTopMenu";
export default {
  name: "topMenus",
  components:{
    breadCrumbYu,
    rightTopMenu
  },
  data() {
    return {

    }
  },
  methods: {

  }
};
</script>
<style lang="scss" scoped>
.topMenus {
  width: calc(100% - 50px);
  height: 50px;
  overflow:hidden;
  .fon_col {
    display: inline-block;
    width: 10%;
    color: #333;
    text-align: center;
    font-size: 16px;
    line-height: 50px;
    text-decoration: none;
    border-right: 1px solid #ffffff;
    border-top: none;
    border-left: none;
    border-bottom: none;
    box-sizing: border-box;
    outline: none;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>