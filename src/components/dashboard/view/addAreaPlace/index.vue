<template>
  <div class="addArea">
    <h2>新增项目</h2>
    <div class="tabs">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form
            :inline="true"
            label-width="170px"
            class="demo-form-inline"
            :rules="baseInfoOne"
            :model="yunguAreaProjectModel"
            ref="yunguAreaProjectModel"
          >
            <el-form-item label="项目编号" prop="projectNumber">
              <el-input v-model="yunguAreaProjectModel.projectName" placeholder="项目编号"></el-input>
            </el-form-item>
            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="yunguAreaProjectModel.projectName" placeholder="项目名称"></el-input>
            </el-form-item>
            <el-form-item label="城市" prop="projectcity">
              <el-input v-model="yunguAreaProjectModel.projectName" placeholder="城市"></el-input>
            </el-form-item>
            <el-form-item label="项目所在地" prop="projectAddress">
              <el-input v-model="yunguAreaProjectModel.projectAddress" placeholder="项目所在地"></el-input>
            </el-form-item>
            <el-form-item label="项目状态" prop="projectStatus">
              <el-input v-model="yunguAreaProjectModel.projectAddress" placeholder="项目状态"></el-input>
            </el-form-item>
            <el-form-item label="所属部门" prop="projectStatus">
              <el-input v-model="yunguAreaProjectModel.projectAddress" placeholder="所属部门"></el-input>
            </el-form-item>
            <el-form-item label="管理公司" prop="projectStatus">
              <el-input v-model="yunguAreaProjectModel.projectAddress" placeholder="管理公司"></el-input>
            </el-form-item>
            <el-form-item label="项目属性" prop="projectStatus">
              <el-input v-model="yunguAreaProjectModel.projectAddress" placeholder="项目属性"></el-input>
            </el-form-item>
            <el-form-item label="维护人员" prop="projectStatus">
              <el-input v-model="yunguAreaProjectModel.projectAddress" placeholder="维护人员"></el-input>
            </el-form-item>
            <el-form-item label="维护人员电话" prop="projectStatus">
              <el-input v-model="yunguAreaProjectModel.projectAddress" placeholder="维护人员电话"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="projectStatus">
              <el-input v-model="yunguAreaProjectModel.projectAddress" placeholder="联系人"></el-input>
            </el-form-item>
            <el-form-item label="联系人号码" prop="projectStatus">
              <el-input v-model="yunguAreaProjectModel.projectAddress" placeholder="联系人号码"></el-input>
            </el-form-item>
            <el-form-item label="实际联系人" prop="projectStatus">
              <el-input v-model="yunguAreaProjectModel.projectAddress" placeholder="实际联系人"></el-input>
            </el-form-item>
            <el-form-item label="实际联系人电话" prop="projectStatus">
              <el-input v-model="yunguAreaProjectModel.projectAddress" placeholder="实际联系人电话"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="projectStatus">
              <el-input v-model="yunguAreaProjectModel.projectAddress" placeholder="备注"></el-input>
            </el-form-item>
            <el-form-item label="创建人" prop="projectStatus">
              <el-input v-model="yunguAreaProjectModel.projectAddress" placeholder="创建人"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="projectStatus">
              <el-input v-model="yunguAreaProjectModel.projectAddress" placeholder="备注"></el-input>
            </el-form-item>
            <el-form-item label="创建日期" prop="projectStatus">
              <el-input v-model="yunguAreaProjectModel.projectAddress" placeholder="创建日期"></el-input>
            </el-form-item>
            <el-form-item label="开发人员" prop="developer">
              <el-input v-model="yunguAreaProjectModel.developer" placeholder="开发人员"></el-input>
            </el-form-item>
                <el-option
                  v-for="(item,index) in protecterList"
                  :key="item.index"
                  :label="item.real_name"
                  :value="item.did"
                ></el-option>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        </el-tabs>
    </div>
    <div class="btn">
      <el-button
        type="primary"
        size="medium"
        @click="commit('yunguAreaProjectModel',true)"
      >提&nbsp;&nbsp;&nbsp;交</el-button>
      <el-button
        type="success"
        size="medium"
        @click="commit('yunguAreaProjectModel')"
      >保&nbsp;&nbsp;&nbsp;存</el-button>
    </div>
  </div>
</template>

<script>
import addAdrTable from "@/components/dashboard/view/addAdrTable";
import uploadPicture from "@/components/dashboard/view/uploadPicture";
import linkage from "@/components/dashboard/view/linkage";
export default {
  name: "areaManage",
  components: {
    linkage,
    uploadPicture,
    addAdrTable
  },
  data() {
    return {
      manageCompany: [],
      protecterList: [],
      yunguAreaProjectModelListTwo: [],
      yunguAreaPostionModelList: {
        company: "",
        installName: "",
        installPosition: "",
        isBody: "0",
        isGive: "0",
        pointName: "",
        positionPicture: "",
        showMode: "",
        size: ""
      },
      yunguAreaProjectDetailModel: {
        publicityWay: "0",
        projectCount: "",
        surrounding: "",
        keyword: "",
        trafficConditions: "",
        upCount: "",
        otherMedia: "",
        banIndustry: "",
        forbidKeyword: "",
        isvaluePublicity: "0",
        audiences: "",
        businessArea: "",
        isownersCommittee: "0",
        principalPhone: "",
        principalTelephone: "",
        principals: "",
        transactor: "",
        transactorPhone: "",
        transactorTelephone: "",
        projectman: "",
        projectmanPhone: "",
        projectmanTelephone: "",
        openTime: "",
        lowfloorCount: "",
        heightfloorCount: "",
        checkinTime: "",
        propertyCost: "",
        rentAvg: "",
        rentHight: "",
        unitTotal: "",
        householdsAvg: "",
        householdsTotal: "",
        occupancyTotal: "",
        occupancyRate: "",
        ownerIncome: "",
        matchFacility: "",
        coverCount: "",
        coverPassengers: "",
        coverGoods: "",
        isStraight: "0",
        straightMode: "",
        standardCharge: "",
        isMachinestation: "0",
        machinestationName: "",
        houseNumber: "",
        descript: "",
        undergroundCount: "",
        waitCount: "",
        wellCompany: "",
        downtown: "",
        specialKeyword: "",
        specialOwner: "",
        isShow: "0",
        showCost: "",
        receiptStatus: "0"
      },
      yunguAreaProjectModel: {
        projectArea: "",
        projectName: "",
        projectAddress: "",
        projectPosition: "",
        developer: "",
        protecter: "",
        dept: "",
        projectType: "",
        mediaName: "",
        isSave: "0"
      },
      yunguPayMethodModelList_arr: [],
      yunguPayMethodModelList: {
        payName: "",
        payText: "",
        account: "",
        bankName: ""
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
        ],
        protecter: [
          { required: true, message: "请选择所属部门", trigger: "change" }
        ],
        dept: [{ required: true, message: "请选择所属部门", trigger: "change" }]
      }
    };
  },
  methods: {
    chooseDept() {
      this.yunguAreaProjectModel.dept = this.yunguAreaProjectModel.protecter;
    },
    delTable(index) {
      this.yunguAreaProjectModelListTwo.splice(index, 1);
    },
    addPayTable() {
      this.yunguPayMethodModelList.payText = document.getElementById(
        "payText"
      ).value;
      this.yunguPayMethodModelList_arr.push(this.yunguPayMethodModelList);
      this.yunguPayMethodModelList = {
        payName: "",
        payText: "",
        account: "",
        bankName: ""
      };
    },
    PayDel(index, row) {
      console.log(index, row);
      this.yunguPayMethodModelList_arr.splice(index, 1);
    },
    payEdit() {
      console.log("暂时不能编辑");
    },
    addTable() {
      this.yunguAreaProjectModelListTwo.push(this.yunguAreaPostionModelList);
      this.yunguAreaPostionModelList = {
        company: "",
        installName: "",
        installPosition: "",
        isBody: "",
        isGive: "",
        pointName: "",
        positionPicture: "",
        showMode: "",
        size: ""
      };
    },
    // getDate() {
    //   const openTimeSub = document.getElementById("openTimeFir").value;
    //   const checkinTimeSub = document.getElementById("checkinTimeFir").value;
    //   const detailTimeFir = openTimeSub + " 00:00:00";
    //   const detailTimeSec = checkinTimeSub + " 00:00:00";
    //   this.yunguAreaProjectDetailModel.openTime = detailTimeFir;
    //   this.yunguAreaProjectDetailModel.checkinTime = detailTimeSec;
    // },

    commit(formName, isSave) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const obj = {};
          if (isSave == true) {
            obj.processKey = "areaProject";
          }
          obj.yunguAreaPostionModelList = [];
          obj.yunguPayMethodModelList = [];
          obj.yunguAreaPostionModelList = this.yunguAreaProjectModelListTwo;
          obj.yunguAreaProjectDetailModel = this.yunguAreaProjectDetailModel;
          obj.yunguAreaProjectModel = this.yunguAreaProjectModel;
          obj.yunguPayMethodModelList = this.yunguPayMethodModelList_arr;
          this.$http
            .post("/yunguAreaProject/insertYunguAreaProject", obj)
            .then(res => {
              this.$message({
                type: "success",
                message: "新增场地成功，即将跳转列表页。"
              });
              setTimeout(() => {
                this.$router.push("/areaList");
              }, 3000);
              console.log("这是上传", res);
            });
        } else {
          console.log("error!");
        }
      });
    },
    // 子传父
    proectAreaChild(childValue) {
      this.yunguAreaProjectModel.projectArea = childValue;
    },
    // 获取部门列表
    getDepartOptions() {
      this.$http.get("/sysDept/getDeptListByStatus?status=1").then(res => {
        if (res.data.meta.code == 200) {
          console.log("所属部门", res);
          this.manageCompany = res.data.data.obj;
        } else {
          console.log("选项列表获取错误");
        }
      });
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
    }
  },
  created() {
    this.getDepartOptions();
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
