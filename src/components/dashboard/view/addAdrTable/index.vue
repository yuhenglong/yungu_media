<template>
  <div class="addAdrTable">
    <el-table :data="formData" style="width: 100%;margin-top:20px;" border>
      <el-table-column label="项目名称" width="180">
        <template>
          <span style>{{ projectName }}</span>
        </template>
      </el-table-column>
       <el-table-column label="点位名称" width="180">
        <template slot-scope="scope">
          <span style>{{ scope.row.pointName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="安装名称" width="180">
        <template slot-scope="scope">
          <span style>{{ scope.row.installName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="媒体名称" width="">
        <template slot-scope="scope">
          <span style>{{ scope.row.mediaName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="呈现方式" width="">
        <template slot-scope="scope">
          <span style>{{ scope.row.showMode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="计划机型" width="">
        <template slot-scope="scope">
          <span style>{{ scope.row.size }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备数量" width="">
        <template>
          <span style>1台</span>
        </template>
      </el-table-column>
      <el-table-column label="是否赠送" width="">
        <template slot-scope="scope">
          <span style>{{ scope.row.isGive === '0' ?'是':'否' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属公司" width="180">
        <template slot-scope="scope">
          <span style>{{ scope.row.company }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "addAdrTable",
  components: {},
  props: ["formData","projectName"],
  data() {
    return {
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
