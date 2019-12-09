<template>
  <div class="addArea">
    <h2>添加安装单</h2>
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
              <el-input v-model="addInstallTable.projectName" placeholder></el-input>
            </el-form-item>
            <el-form-item label="项目所在地" prop="installationAddress">
              <el-input v-model="addInstallTable.installationAddress" placeholder="项目所在地"></el-input>
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
                <template v-for="(item,index) in protecterList">
                  <el-option :label="item.real_name" :value="item.user_name" :key="index"></el-option>
                </template>
              </el-select>
              <!-- <el-input v-model="addInstallTable.protecter" placeholder="维护人员"></el-input> -->
            </el-form-item>
            <el-form-item label="维护人员电话" prop="protecterPhone">
              <el-input v-model="addInstallTable.protecterPhone" placeholder="维护人员电话"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="linkman">
              <el-input v-model="addInstallTable.linkman" placeholder="联系人"></el-input>
            </el-form-item>
            <!-- <el-form-item label="联系方式">
              <el-select v-model="yunguContractPayModelChild.ddd" placeholder="选择">
                <el-option label="微信" value="0"></el-option>
                <el-option label="手机" value="1"></el-option>
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
              <el-input v-model="addInstallTable.realUser" placeholder="实际联系人"></el-input>
            </el-form-item>
            <el-form-item label="实际联系人电话" prop="realUserPhone">
              <el-input v-model="addInstallTable.realUserPhone" placeholder="实际联系人电话"></el-input>
            </el-form-item>
            <el-form-item label="实际联系人手机" prop="realUserMobile">
              <el-input v-model="addInstallTable.realUserMobile" placeholder="实际联系人电话"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="addInstallTable.remark" placeholder="备注"></el-input>
            </el-form-item>
            <el-form-item label="创建人" prop="creator">
              <el-input v-model="addInstallTable.creator" placeholder="创建人"></el-input>
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
      </el-tabs>
    </div>
    <div class="btn">
      <el-button
        type="primary"
        size="medium"
        @click="commit('addInstallTable')"
      >提&nbsp;&nbsp;&nbsp;交</el-button>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "areaManage",
  components: {},
  data() {
    return {
      protecterList: [],
      addInstallTable: {
        areaProjectId: "",
        showMode: "",
        dept: "",
        projectCode: "",
        projectName: "",
        installationAddress: "",
        activityStatus: "",
        protecter: "",
        protecterPhone: "",
        linkman: "",
        installationDate: "",
        installationAddress: "",
        realUser: "",
        realUserPhone: "",
        realUserMobile: "",
        remark: "",
        creator: "",
        createDate: ""
      },
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
        // dept: [{ required: true, message: "请选择所属部门", trigger: "change" }]
      }
    };
  },
  methods: {
    getCompanyCode() {
      this.$http
        .post(
          "/yunguDataDictionary/getDictionaryFormRedis",
          qs.stringify({
            code: "look_result"
          })
        )
        .then(res => {
          console.log("下拉列表", res);
        });
    },
    getTable() {
      this.addInstallTable = this.$route.query;
      this.addInstallTable.areaProjectId = this.$route.query.aid;
    },
    // 获取维护人员列表
    getPersonOptions() {
      this.$http
        .post("/sysUser/getSysUserPageList", { roleStatus: 1, status: 1 })
        .then(res => {
          if (res.data.meta.code == 200) {
            console.log("维护人员", res);
            this.protecterList = res.data.data.obj.data;
          } else {
            console.log("选项列表获取错误");
          }
        });
    },
    commit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          delete this.addInstallTable.creator;
          delete this.addInstallTable.createDate;
          this.$http
            .post(
              "/yunguInstallList/insertYunguInstallList",
              this.addInstallTable
            )
            .then(res => {
              if (res.data.meta.code == 200) {
                this.$message({
                  type: "success",
                  message: "新增安装单成功，即将返回列表页。"
                });
                setTimeout(() => {
                  this.$router.go(-1);
                }, 3000);
              }
            });
        } else {
          console.log("error!");
        }
      });
    }
  },
  mounted() {
    this.getTable();
    this.getCompanyCode();
    this.getPersonOptions();
  }
};
</script>

<style lang="scss" scoped>
.addArea {
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
.addArea {
  .el-form--inline .el-form-item__label {
    width: 120px;
  }
  .linkage {
    width: 612px !important;
  }
}
</style>
