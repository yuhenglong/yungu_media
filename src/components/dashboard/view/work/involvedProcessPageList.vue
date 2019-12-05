<template>
  <div class="involvedProcessPageList">
    <!-- <el-breadcrumb class="breadcrumb-style" separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>已办流程</el-breadcrumb-item>
    </el-breadcrumb>-->
    <h2>已办流程</h2>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="processName" label="流程名称"></el-table-column>
      <el-table-column prop="startUser" label="申请人"></el-table-column>
      <el-table-column prop="handleTime" label="审批时间"></el-table-column>
      <el-table-column prop="projectCode" label="项目编号"></el-table-column>
      <el-table-column prop="projectName" label="项目名称"></el-table-column>
      <el-table-column prop="verifyStatus" label="流程状态"></el-table-column>
    </el-table>
    <!-- 二次封装分页插件 -->
    <pagination :total="total" @pageChange="changePage"></pagination>
  </div>
</template>
<script>
import pagination from "@/components/dashboard/view/pagination";
export default {
  name: "involvedProcessPageList",
  components: {
    pagination
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageInfo.pageSize = val;
      this.getPage();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageInfo.pageNum = val;
      this.getPage();
    },
    changePage(item) {
      this.pageInfo = item;
      this.getPage();
    },
    getPage() {
      this.$http
        .post("/activity/getMyInvolvedProcessPageList", this.pageInfo)
        .then(res => {
          console.log("带token请求回来的数据", res);
          if (res.data.meta.code == 200) {
            console.log(res.data.data.obj);

            this.tableData = res.data.data.data.data;
            this.total = res.data.data.data.count;
          }
        });
    }
  },
  mounted() {
    this.getPage();
  }
};
</script>
<style lang="scss" scoped>
.involvedProcessPageList {
  width: 95%;
  padding: 30px 2.5%;
  height: auto;
  overflow: auto;
  h2 {
    text-align: center;
    font-size: 26px;
    line-height: 26px;
    margin-bottom: 10px;
    text-align: center;
  }
  .header-actions {
    border: 1px solid #ebeef5;
    background: #fafafa;
    padding: 5px;
    box-sizing: border-box;
  }
  .el-table {
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    border-top: 1px solid #ebeef5;
  }
  .box {
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
  }
  .c-7fcc59 {
    color: #7fcc59;
  }
  .c-ccc {
    color: #ccc;
  }
  .align-r {
    text-align: right;
  }
  .p20 {
    padding: 20px;
  }
}
</style>
<style>
.form-com > .el-form-item > .el-form-item__label {
  width: 52px !important;
}
</style>
