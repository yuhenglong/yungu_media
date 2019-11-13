<template>
  <div class="addNewEquip">
    <h2>设备信息修改</h2>
    <el-form
      :model="equipTable"
      :rules="rules"
      ref="equipTable"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="设备名称" prop="equipmentName">
        <el-input v-model="equipTable.equipmentName"></el-input>
      </el-form-item>
      <el-form-item label="设备ID" prop="eid">
        <el-input v-model="equipTable.eid"></el-input>
      </el-form-item>
      <el-form-item label="设备型号" prop="equipmentNumber">
        <el-input v-model="equipTable.equipmentNumber"></el-input>
      </el-form-item>
      <el-form-item label="设备详情" prop="equipmentDetail">
        <el-input v-model="equipTable.equipmentDetail"></el-input>
      </el-form-item>
      <el-form-item label="库存总数量" prop="equipmentCount">
        <el-input v-model="equipTable.equipmentCount"></el-input>
      </el-form-item>
      <el-form-item label="设备尺寸" prop="euqipmentSize">
        <el-input v-model="equipTable.euqipmentSize"></el-input>
      </el-form-item>
      <el-form-item label="设备状态" prop="euqipmentStatus">
        <el-radio-group v-model="equipTable.euqipmentStatus">
          <el-radio :label="0">启用</el-radio>
          <el-radio :label="1">禁止</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="安装单编号" prop="intallonNumber">
        <el-input v-model="equipTable.intallonNumber"></el-input>
      </el-form-item>
      <el-form-item label="调整原因" prop="adjustReason">
        <el-input v-model="equipTable.adjustReason"></el-input>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="saveAdd('equipTable')">确定新增</el-button>
        <el-button @click="resetForm('equipTable')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "addNewEquip",
  components: {},
  data() {
    return {
      equipTable: {
        adjustReason: "",
        eid: "",
        equipmentCount: "",
        equipmentDetail: "",
        equipmentName: "",
        equipmentNumber: "",
        euqipmentSize: "",
        euqipmentStatus: "",
        intallonNumber: ""
      },
      rules: {
        equipmentName: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        eid: [{ required: true, message: "请输入", trigger: "blur" }],
        equipmentNumber: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        equipmentDetail: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        equipmentCount: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        euqipmentSize: [{ required: true, message: "请输入", trigger: "blur" }],
        euqipmentStatus: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        intallonNumber: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        adjustReason: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  methods: {
    getRouterData() {
      this.equipTable = this.$route.query;
      console.log(this.$route.query);
    },
    saveAdd(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$http
            .post("/yunguEquipment/insertYunguEquipment", this.equipTable)
            .then(res => {
              console.log("上传回调", res);
              if (res.data.meta.code == 200) {
                this.$message({
                  type: "success",
                  message: "新增信息成功，即将返回列表页。"
                });
                setTimeout(() => {
                  this.$router.push("/equipList");
                }, 2000);
              }
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
.addNewEquip {
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
