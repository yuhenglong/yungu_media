<template>
  <div class="topMenus">
    <button class="fon_col" >分公司管理</button>
    <button class="fon_col" >客户管理</button>
    <button class="fon_col" >场地项目管理</button>
    <button class="fon_col" >广告项目合同</button>
    <button class="fon_col" >合同管理</button>
    <button class="fon_col" >财务管理</button>
    <button class="fon_col" >设备管理</button>
    <button class="fon_col" >系统管理</button>
    <button class="fon_col" >日志管理</button>
    <button class="fon_col" @click="exit">退出系统</button>
  </div>
</template>
<script>
export default {
  name: "topMenus",
  dat(){

  },
  methods:{
    exit(){
      localStorage.removeItem('eleToken');
      this.$router.replace('/login');
    }
  }
};
</script>
<style lang="scss" scoped>
.topMenus {
    width:calc(100% - 50px);
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
      border-top:none;
      border-left:none;
      border-bottom:none;
      box-sizing:border-box;
      outline:none;
      &:hover{
        cursor:pointer;
      }
    }
}
</style>