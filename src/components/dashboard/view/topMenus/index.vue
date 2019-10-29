<template>
  <div class="topMenus">
    <router-link class="fon_col" to="#">分公司管理</router-link>
    <router-link class="fon_col" to="#">客户管理</router-link>
    <router-link class="fon_col" to="#">场地项目管理</router-link>
    <router-link class="fon_col" to="#">广告项目合同</router-link>
    <router-link class="fon_col" to="#">合同管理</router-link>
    <router-link class="fon_col" to="#">财务管理</router-link>
    <router-link class="fon_col" to="#">设备管理</router-link>
    <router-link class="fon_col" to="#">系统管理</router-link>
    <router-link class="fon_col" to="#">日志管理</router-link>
    <router-link class="fon_col" to="#">退出系统</router-link>
  </div>
</template>
<script>
export default {
  name: "topMenus"
};
</script>
<style lang="scss" scoped>
.topMenus {
    width:calc(100% - 50px);
    background-color: #ccc;
    height:50px;
    float:left;
    .fon_col{
      display:inline-block;
      width:10%;
      color:#333;
      text-align:center;
      font-size:16px;
      line-height:50px;
      text-decoration: none;
      border-right:1px solid #ffffff;
      box-sizing:border-box;
    }
}
</style>