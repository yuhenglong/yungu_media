<template>
  <div class="checkPlaInstall">
    <h2>查看安装单</h2>
    <div class="tabs">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form
            :inline="true"
            label-width="170px"
            class="demo-form-inline"
            :rules="baseInfoOne"
            :model="addInstallTable"
            ref="addInstallTable"
          >
            <el-form-item label="呈现方式" prop="showMode">
              <el-select v-model="addInstallTable.showMode" placeholder="选择">
                <el-option label="液晶" :value="0"></el-option>
                <el-option label="数码海报" :value="1"></el-option>
                <el-option label="电梯投影" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属部门" prop="dept">
              <el-input :readonly="true" v-model="addInstallTable.dept" placeholder></el-input>
            </el-form-item>
            <el-form-item label="项目编号" prop="projectCode">
              <el-input :readonly="true" v-model="addInstallTable.projectCode" placeholder></el-input>
            </el-form-item>
            <el-form-item :readonly="true" label="项目名称" prop="projectName">
              <el-input :readonly="true" v-model="addInstallTable.projectName" placeholder></el-input>
            </el-form-item>
            <el-form-item label="项目所在地" prop="installationAddress">
              <el-input :readonly="true" v-model="addInstallTable.installationAddress" placeholder="项目所在地"></el-input>
            </el-form-item>
            <!-- <el-form-item label="管理公司" prop="ccc">
              <el-input v-model="addInstallTable.ccc" placeholder="管理公司"></el-input>
            </el-form-item>-->
            <el-form-item label="项目属性" prop="activityStatus">
              <el-input
                :readonly="true"
                v-model="addInstallTable.activityStatus"
                placeholder="项目属性"
              ></el-input>
            </el-form-item>
            <el-form-item label="维护人员" prop="protecter">
              <el-select v-model="addInstallTable.protecter" placeholder="选择">
                <el-option label="隆" :value="0"></el-option>
                <el-option label="华" :value="1"></el-option>
                <el-option label="丽" :value="2"></el-option>
              </el-select>
              <!-- <el-input v-model="addInstallTable.protecter" placeholder="维护人员"></el-input> -->
            </el-form-item>
            <el-form-item label="维护人员电话" prop="protecterPhone">
              <el-input :readonly="true" v-model="addInstallTable.protecterPhone" placeholder="维护人员电话"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="linkman">
              <el-input :readonly="true" v-model="addInstallTable.linkman" placeholder="联系人"></el-input>
            </el-form-item>
            <!-- <el-form-item label="联系方式">
              <el-select v-model="yunguContractPayModelChild.ddd" placeholder="选择">
                <el-option label="微信" value="0"></el-option>
                <el-option label="电话" value="1"></el-option>
                <el-option label="QQ" value="2"></el-option>
              </el-select>
            </el-form-item>-->
            <el-form-item label="需安装日期" prop="installationDate">
              <el-date-picker
                v-model="addInstallTable.installationDate"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="实际联系人" prop="realUser">
              <el-input :readonly="true" v-model="addInstallTable.realUser" placeholder="实际联系人"></el-input>
            </el-form-item>
            <el-form-item label="实际联系人电话" prop="realUserPhone">
              <el-input :readonly="true" v-model="addInstallTable.realUserPhone" placeholder="实际联系人电话"></el-input>
            </el-form-item>
            <el-form-item label="实际联系人手机" prop="realUserMobile">
              <el-input :readonly="true" v-model="addInstallTable.realUserMobile" placeholder="实际联系人电话"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input :readonly="true" v-model="addInstallTable.remark" placeholder="备注"></el-input>
            </el-form-item>
            <el-form-item label="创建人" prop="creator">
              <el-input :readonly="true" v-model="addInstallTable.creator" placeholder="创建人"></el-input>
            </el-form-item>
            <el-form-item label="创建日期" prop="createDate">
              <el-date-picker
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="addInstallTable.createDate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="点位信息">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="project_name" label="项目名称" width="180"></el-table-column>
            <el-table-column prop="contract_code" label="合同编号" width="180"></el-table-column>
            <el-table-column prop="install_name" label="安装名称"></el-table-column>
            <el-table-column prop="Media_name" label="媒体名称"></el-table-column>
            <el-table-column prop="show_mode" label="呈现方式"></el-table-column>
            <el-table-column prop="equipment_name" label="计划机型"></el-table-column>
            <el-table-column prop="device_count" label="设备数量"></el-table-column>
            <el-table-column prop="is_give" label="是否赠送"></el-table-column>
            <el-table-column prop="company" label="所属公司"></el-table-column>
            <el-table-column prop="installation_result" label="安装状态"></el-table-column>
            <el-table-column prop="install_date" label="安装时间"></el-table-column>
            <el-table-column prop="lookover_result" label="巡视状态"></el-table-column>
            <el-table-column prop="equiment_code" label="设备编码"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="btn">
      <el-button
        type="primary"
        size="medium"
        @click="reGo()"
      >返回上一页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "checkPlaInstall",
  components: {},
  data() {
    return {
      addInstallTable: {
        areaProjectId: "",
        showMode: 0,
        dept: "",
        projectCode: "",
        projectName: "",
        installationAddress: "",
        activityStatus: "",
        protecter: "",
        protecterPhone: "",
        linkman: "",
        installationDate: "",
        realUser: "",
        realUserPhone: "",
        realUserMobile: "",
        remark: "",
        creator: "",
        createDate: ""
      },
      tableData:[],
      baseInfoOne: {
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ],
        projectAddress: [
          { required: true, message: "请输入项目地址", trigger: "blur" }
        ],
        developer: [
          { required: true, message: "请输入开发人员", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getTable() {
      const url =
        "/yunguInstallList/getYunguInstallListById?id=" + this.$route.query.sid;
      this.$http.get(url).then(res => {
        console.log("获取列表信息", res);
        if (res.data.meta.code == 200) {
          this.addInstallTable = res.data.data.obj.installInfo;
          this.addInstallTable.areaProjectId =
            res.data.data.obj.installInfo.area_project_id;
          this.addInstallTable.createDate =
            res.data.data.obj.installInfo.create_date;
          this.addInstallTable.installationAddress =
            res.data.data.obj.installInfo.installation_address;
          this.addInstallTable.installationDate =
            res.data.data.obj.installInfo.installation_date;
          this.addInstallTable.realUser =
            res.data.data.obj.installInfo.real_user;
          this.addInstallTable.realUserMobile =
            res.data.data.obj.installInfo.real_user_mobile;
          this.addInstallTable.realUserPhone =
            res.data.data.obj.installInfo.real_user_phone;
          this.addInstallTable.showMode =
            res.data.data.obj.installInfo.show_mode;
            // 赋值table
            this.tableData = res.data.data.obj.areaPostion;
        }
      });
    },
    reGo(){
      this.$router.go(-1);
    }
  },
  mounted() {
    this.getTable();
  }
};
</script>

<style lang="scss" scoped>
.checkPlaInstall {
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
  .el-form-item {
    width: 50%;
  }
  .el-input,
  .el-select {
    width: 400px;
  }
  .btn {
    width: 100%;
    margin: 30px 0;
    height: 100px;
    text-align: center;
  }
  .el-button {
    width: 300px;
  }
  .addAdress {
    text-align: center;
    .addAdr {
      margin: 10px 0;
    }
  }
  .el-form--inline .el-form-item {
    margin-right: 0;
  }
}
</style>
<style lang="scss">
.checkPlaInstall {
  .el-form--inline .el-form-item__label {
    width: 120px;
  }
  .linkage {
    width: 612px !important;
  }
}
</style>
