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
      <el-table-column label="媒体名称">
        <template slot-scope="scope">
          <span style>{{ scope.row.mediaName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="呈现方式">
        <template slot-scope="scope">
          <span v-if="scope.row.showMode ==0">3D液晶</span>
          <span v-if="scope.row.showMode ==1">2D平面</span>
          <span v-if="scope.row.showMode ==2">楼梯屏</span>
        </template>
      </el-table-column>
      <el-table-column label="计划机型">
        <template slot-scope="scope">
          <span v-if="scope.row.size == 1">新机</span>
          <span v-if="scope.row.size == 2">裸眼3D</span>
          <span v-if="scope.row.size == 3">归属感</span>
          <span v-if="scope.row.size == 4">ces</span>
        </template>
      </el-table-column>
      <el-table-column label="设备数量">
        <template>
          <span style>1台</span>
        </template>
      </el-table-column>
      <el-table-column label="是否赠送">
        <template slot-scope="scope">
          <span style>{{ scope.row.isGive === '0' ?'是':'否' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属公司" width="180">
        <template slot-scope="scope" v-for="item in companyList">
          <span v-if="item.customerId == scope.row.company">{{item.customerName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          <!-- <el-button size="mini" type="danger" @click="addAreaDel(scope.$index, scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "addAdrTable",
  components: {},
  props: ["formData", "projectName", "companyList"],
  data() {
    return {};
  },
  methods: {
    handleEdit(index, row) {
      console.log("暂时不能编辑");
    },
    addAreaDel(index, row) {
      console.log(index, row);
      this.$emit("delParentData", index);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
