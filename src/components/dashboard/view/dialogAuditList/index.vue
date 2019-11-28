<template>
  <div class="dialogAuditList">
      <el-table :data="formCheckArray" border>
        <el-table-column property="identificationCode" label="序号"></el-table-column>
        <el-table-column property="verifyUserName" label="审核用户"></el-table-column>
        <el-table-column label="审核结果">
          <template slot-scope="scope">
            <span v-if="scope.row.verifyResult ==1">通过</span>
            <span v-if="scope.row.verifyResult ==0">不通过</span>
          </template>
        </el-table-column>
        <el-table-column property="type" label="审核类型">
          <template slot-scope="scope">
            <span v-if="scope.row.type ==1">广告客户类型</span>
            <span v-if="scope.row.type ==2">场地客户类型</span>
            <span v-if="scope.row.type ==3">场地项目审核</span>
            <span v-if="scope.row.type ==4">场地项目合同审核</span>
            <span v-if="scope.row.type ==5">场地项目财务审核</span>
            <span v-if="scope.row.type ==6">安装单审核</span>
            <span v-if="scope.row.type ==7">待出库设备审核</span>
            <span v-if="scope.row.type ==8">安装单操作记录</span>
          </template>
        </el-table-column>
        <el-table-column property="refuseReason" label="拒绝原因"></el-table-column>
        <el-table-column property="verifyTime" label="添加时间"></el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  name: "dialogAuditList",
  props: ["formCheckArray"],
  components: {},
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
</style>
