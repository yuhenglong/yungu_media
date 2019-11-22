<template>
  <div class="checkEquipTable">
    <h2>设备信息查看</h2>
    <el-form
      :model="equipTable"
      :rules="rules"
      ref="equipTable"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="设备名称" prop="equipment_name">
        <el-input :disabled="true" v-model="equipTable.equipment_name"></el-input>
      </el-form-item>
      <el-form-item label="设备详情" prop="equipment_detail">
        <el-input :disabled="true" v-model="equipTable.equipment_detail"></el-input>
      </el-form-item>
      <el-form-item label="库存总数量" prop="equipment_count">
        <el-input :disabled="true" v-model="equipTable.equipment_count"></el-input>
      </el-form-item>
      <el-form-item label="设备型号" prop="adjust_reason">
        <el-input :disabled="true" v-model="equipTable.adjust_reason"></el-input>
      </el-form-item>
      <el-form-item label="设备尺寸" prop="euqipment_size">
        <el-input :disabled="true" v-model="equipTable.euqipment_size"></el-input>
      </el-form-item>
      <el-form-item label="设备状态" prop="euqipment_status">
        <el-input :disabled="true" v-model="equipTable.euqipment_status==0?'启用':'暂停'"></el-input>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="cancel()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "checkEquipTable",
  components: {},
  data() {
    return {
      equipTable: {},
      rules: {
      }
    };
  },
  methods: {
    getRouterData() {
      this.equipTable = this.$route.query;
      console.log(this.$route.query);
    },
    cancel() {
      this.$router.push('/equipList');
    }
  },
  created() {
    this.getRouterData();
  }
};
</script>

<style lang="scss" scoped>
.checkEquipTable {
  width: 95%;
  padding: 30px 2.5%;
  height: auto;
  overflow: auto;
  h2 {
    font-size: 26px;
    line-height: 26px;
    margin: 10px 0;
  }
  .el-form-item {
    width: 700px;
  }
}
</style>
