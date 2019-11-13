<template>
  <div class="editEquipTable">
    <h2>设备信息修改</h2>
    <el-form
      :model="equipTable"
      :rules="rules"
      ref="equipTable"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="设备名称" prop="equipment_name">
        <el-input v-model="equipTable.equipment_name"></el-input>
      </el-form-item>
      <el-form-item label="设备详情" prop="equipment_detail">
        <el-input v-model="equipTable.equipment_detail"></el-input>
      </el-form-item>
      <el-form-item label="库存总数量" prop="equipment_count">
        <el-input v-model="equipTable.equipment_count"></el-input>
      </el-form-item>
      <el-form-item label="设备型号" prop="adjust_reason">
        <el-input v-model="equipTable.adjust_reason"></el-input>
      </el-form-item>
      <el-form-item label="设备尺寸" prop="euqipment_size">
        <el-input v-model="equipTable.euqipment_size"></el-input>
      </el-form-item>
      <el-form-item label="设备状态" prop="euqipment_status">
        <el-radio-group v-model="equipTable.euqipment_status">
          <el-radio :label="0">启用</el-radio>
          <el-radio :label="1">禁止</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="saveEdit()">保存编辑</el-button>
        <el-button type="primary" @click="cancel()">取消并返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "editEquipTable",
  components: {},
  data() {
    return {
      equipTable: {
        adjust_reason: "",
        eid: 0,
        equipment_count: 0,
        equipment_detail: "",
        equipment_name: "",
        equipment_number: "",
        euqipment_size: "",
        euqipment_status: 0,
        intallon_number: 0
      },
      rules: {
        // name: [
        //   { required: true, message: "请输入活动名称", trigger: "blur" },
        //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        // ]
      }
    };
  },
  methods: {
    getRouterData() {
      this.equipTable = this.$route.query;
      console.log(this.$route.query);
    },
    saveEdit() {
      const obj = {
        adjustReason: this.equipTable.adjust_reason,
        eid: this.equipTable.eid,
        equipmentCount: this.equipTable.equipment_count,
        equipmentDetail: this.equipTable.equipment_detail,
        equipmentName: this.equipTable.equipment_name,
        equipmentNumber: this.equipTable.equipment_number,
        euqipmentSize: this.equipTable.euqipment_size,
        euqipmentStatus: this.equipTable.euqipment_status,
        intallonNumber: this.equipTable.intallon_number
      };
      this.$http.post("/yunguEquipment/updateYunguEquipment", obj).then(res => {
        console.log("上传回调", res);
        if (res.data.meta.code == 200) {
          this.$message({
            type: "success",
            message: "设备信息修改成功，即将返回列表页。"
          });
          setTimeout(() => {
            this.$router.push("/equipList");
          }, 2000);
        }
      });
    },
    cancel() {
      this.$router.push("/equipList");
    }
  },
  mounted() {
    this.getRouterData();
  }
};
</script>

<style lang="scss" scoped>
.editEquipTable {
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
