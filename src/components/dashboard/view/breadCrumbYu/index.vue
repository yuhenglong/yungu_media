<template>
  <div class="breadCrumbYu">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="breadList.url">{{breadList.path}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "breadCrumbYu",
  components: {},
  data() {
    return {
      breadListIm: [],
      breadListLast: '',
      breadList:{}
    };
  },
  methods: {
    loadChange() {
      this.breadListLast = '';
      this.breadList = {};
      this.breadListLast=this.$route.path;
      this.getRouterList();
    },
    getRouterList() {
      this.$http.get("/sysResource/getUrlNotNullAllList").then(res => {
        if (res.data.meta.code == 200) {
        this.breadListIm = res.data.data.obj;
        }
      }).then(json =>{
        for(let i = 0;i<this.breadListIm.length;i++){
          if(this.breadListIm[i].url == this.breadListLast){
            this.breadList = this.breadListIm[i];
          }
        }
      }
      )
    }
  },
  watch: {
    $route(to, from) {
      this.loadChange();
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
