<template>
  <div class="addArea">
    <h2>场地合同添加</h2>
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
            <el-form-item label="合同类型">
              <el-select v-model="yunguAreaProjectModel.setMeal" placeholder="选择">
                <el-option label="数码海报" value="0"></el-option>
                <el-option label="电梯投影" value="1"></el-option>
                <el-option label="电梯视窗" value="2"></el-option>
                <el-option label="液晶" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="签约性质">
              <el-select v-model="yunguAreaProjectModel.setMeal" placeholder="选择">
                <el-option label="新签" value="0"></el-option>
                <el-option label="旧签" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="净签约">
              <el-select v-model="yunguAreaProjectModel.setMeal" placeholder="选择">
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开发人员">
              <el-select v-model="yunguAreaProjectModel.setMeal" placeholder="选择">
                <el-option label="隆" value="0"></el-option>
                <el-option label="华" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标准合同">
              <el-select v-model="yunguAreaProjectModel.setMeal" placeholder="选择">
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="合同到期时间">
              <el-date-picker v-model="openTimeFir" type="date" placeholder="选择日期" id="openTimeFir"></el-date-picker>
            </el-form-item>
            <el-form-item label="合同属性">
              <el-select v-model="yunguAreaProjectModel.setMeal" placeholder="选择">
                <el-option label="楼宇" value="0"></el-option>
                <el-option label="框架" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="签约主体">
              <el-select v-model="yunguAreaProjectModel.setMeal" placeholder="选择">
                <el-option label="楼宇" value="0"></el-option>
                <el-option label="框架" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="付费主体">
              <el-select v-model="yunguAreaProjectModel.setMeal" placeholder="选择">
                <el-option label="楼宇" value="0"></el-option>
                <el-option label="框架" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="yunguAreaProjectModel.projectName" placeholder="项目名称"></el-input>
            </el-form-item>
            <el-form-item label="城市区域" prop="projectAddress">
              <el-input v-model="yunguAreaProjectModel.projectAddress" placeholder="项目地址"></el-input>
            </el-form-item>
            <el-form-item label="项目属性">
              <el-input v-model="yunguAreaProjectModel.projectPosition" placeholder="位置信息"></el-input>
            </el-form-item>
            <el-form-item label="项目地址" prop="developer">
              <el-input v-model="yunguAreaProjectModel.developer" placeholder="开发人员"></el-input>
            </el-form-item>
            <el-form-item label="合同签约类别">
              <el-select v-model="yunguAreaProjectModel.setMeal" placeholder="选择">
                <el-option label="普通合同" value="0"></el-option>
                <el-option label="置换合同" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否转租">
              <el-select v-model="yunguAreaProjectModel.setMeal" placeholder="选择">
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="合同文件">
              <uploadPicture></uploadPicture>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="分区价格信息">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="签约媒体位数">
              <el-input v-model="yunguAreaProjectDetailModel.projectCount " placeholder="签约媒体位数"></el-input>
            </el-form-item>
            <el-form-item label="实际执行开始日期">
              <el-date-picker v-model="openTimeFir" type="date" placeholder="选择日期" id="openTimeFir"></el-date-picker>
            </el-form-item>
            <el-form-item label="实际执行结束日期">
              <el-date-picker v-model="openTimeFir" type="date" placeholder="选择日期" id="openTimeFir"></el-date-picker>
            </el-form-item>
            <el-form-item label="合同期限(月)">
              <el-input v-model="yunguAreaProjectDetailModel.surrounding" placeholder="合同期限(月)"></el-input>
            </el-form-item>
            <el-form-item label="免租期开始日期">
              <el-date-picker v-model="openTimeFir" type="date" placeholder="选择日期" id="openTimeFir"></el-date-picker>
            </el-form-item>
            <el-form-item label="免租期结束日期">
              <el-date-picker v-model="openTimeFir" type="date" placeholder="选择日期" id="openTimeFir"></el-date-picker>
            </el-form-item>
            <el-form-item label="免租期(月)">
              <el-date-picker v-model="openTimeFir" type="date" placeholder="选择日期" id="openTimeFir"></el-date-picker>
            </el-form-item>
            <el-form-item label="签约电梯数">
              <el-input v-model="yunguAreaProjectDetailModel.keyword" placeholder="签约电梯数"></el-input>
            </el-form-item>
            <el-form-item label="签约等候厅数">
              <el-input
                v-model="yunguAreaProjectDetailModel.trafficConditions"
                placeholder="签约等候厅数"
              ></el-input>
            </el-form-item>
            <el-form-item label="签约等候厅单价">
              <el-input v-model="yunguAreaProjectDetailModel.upCount" placeholder="签约等候厅单价"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="金额及回购">
          <h3>常规金额信息:</h3>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="租金费用总额">
              <el-input v-model="yunguAreaProjectDetailModel.transactor" placeholder="租金费用总额"></el-input>
            </el-form-item>
            <el-form-item label="管理费用总额">
              <el-input v-model="yunguAreaProjectDetailModel.transactorPhone" placeholder="管理费用总额"></el-input>
            </el-form-item>
            <el-form-item label="合同总金额">
              <el-input
                v-model="yunguAreaProjectDetailModel.transactorTelephone"
                placeholder="合同总金额"
              ></el-input>
            </el-form-item>
          </el-form>
          <h3>非回购合同信息:</h3>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="纸质合同单屏均价">
              <el-input v-model="yunguAreaProjectDetailModel.transactor" placeholder="纸质合同单屏均价"></el-input>
            </el-form-item>
            <el-form-item label="纸质合同年租金">
              <el-input v-model="yunguAreaProjectDetailModel.transactorPhone" placeholder="纸质合同年租金"></el-input>
            </el-form-item>
            <el-form-item label="其它费用总额">
              <el-input
                v-model="yunguAreaProjectDetailModel.transactorTelephone"
                placeholder="其它费用总额"
              ></el-input>
            </el-form-item>
            <el-form-item label="押金金额">
              <el-input v-model="yunguAreaProjectDetailModel.transactorPhone" placeholder="押金金额"></el-input>
            </el-form-item>
            <el-form-item label="签约媒体单价(年)">
              <el-input
                v-model="yunguAreaProjectDetailModel.transactorPhone"
                placeholder="签约媒体单价(年)"
              ></el-input>
            </el-form-item>
            <el-form-item label="签约媒体单价(月)">
              <el-input
                v-model="yunguAreaProjectDetailModel.transactorPhone"
                placeholder="签约媒体单价(月)"
              ></el-input>
            </el-form-item>
            <el-form-item label="租金包含电费">
              <el-input v-model="yunguAreaProjectDetailModel.transactorPhone" placeholder="租金包含电费"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="付款计划">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="支付主体">
              <el-select v-model="yunguAreaProjectModel.setMeal" placeholder="选择">
                <el-option label="楼宇" value="0"></el-option>
                <el-option label="框架" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支付主体编号">
              <el-input v-model="yunguAreaProjectDetailModel.straightMode" placeholder="编号"></el-input>
            </el-form-item>
            <el-form-item label="费用类别">
              <el-select v-model="yunguAreaProjectModel.setMeal" placeholder="选择">
                <el-option label="押金" value="0"></el-option>
                <el-option label="租金" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="yunguAreaProjectDetailModel.standardCharge" placeholder="备注信息"></el-input>
            </el-form-item>
            <el-form-item label="支付方式">
              <el-select v-model="yunguAreaProjectModel.setMeal" placeholder="选择">
                <el-option label="银行卡" value="0"></el-option>
                <el-option label="支付宝" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="总支付金额">
              <el-input v-model="yunguAreaProjectDetailModel.machine" placeholder="金额"></el-input>
            </el-form-item>
            <el-form-item label="是否有发票">
              <el-radio v-model="yunguAreaProjectDetailModel.isShow" label="0">是</el-radio>
              <el-radio v-model="yunguAreaProjectDetailModel.isShow" label="1">否</el-radio>
            </el-form-item>
            <el-form-item label="是否个人收款">
              <el-radio v-model="yunguAreaProjectDetailModel.isShow" label="0">是</el-radio>
              <el-radio v-model="yunguAreaProjectDetailModel.isShow" label="1">否</el-radio>
            </el-form-item>
            <el-form-item label="付款状态">
              <el-select v-model="yunguAreaProjectModel.setMeal" placeholder="选择">
                <el-option label="待支付" value="0"></el-option>
                <el-option label="已支付" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="付费开始时间">
              <el-date-picker v-model="openTimeFir" type="date" placeholder="选择日期" id="openTimeFir"></el-date-picker>
            </el-form-item>
            <el-form-item label="付费结束时间">
              <el-date-picker v-model="openTimeFir" type="date" placeholder="选择日期" id="openTimeFir"></el-date-picker>
            </el-form-item>
            <el-form-item label="计划周期">
              <el-select v-model="yunguAreaProjectModel.setMeal" placeholder="请选择">
                <el-option label="待支付" value="0"></el-option>
                <el-option label="已支付" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开户行">
              <el-select v-model="yunguAreaProjectModel.setMeal" placeholder="请选择">
                <el-option label="中国银行" value="0"></el-option>
                <el-option label="已支付" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="账号">
              <el-input v-model="yunguAreaProjectDetailModel.waitCount" placeholder="账号"></el-input>
            </el-form-item>

            <el-table
              :data="yunguPayMethodModelList_arr"
              style="width: 100%;margin-top:20px;"
              border
            >
              <el-table-column label="支付主体" width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.payText }}</span>
                </template>
              </el-table-column>
              <el-table-column label="费用类别" width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.account }}</span>
                </template>
              </el-table-column>
              <el-table-column label="支付形式" width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.bankName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="支付方式" width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.bankName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="付费开始时间" width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.bankName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="付费结束时间" width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.bankName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="是否有发票" width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.bankName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="应付金额" width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.bankName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="已付金额" width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.bankName }}</span>
                </template>
              </el-table-column>

              <el-table-column label="开户行" width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.bankName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="账号" width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.bankName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="payEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="PayDel(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="btn">
      <el-button
        type="primary"
        size="medium"
        @click="commit('yunguAreaProjectModel')"
      >提&nbsp;&nbsp;&nbsp;交</el-button>
      <el-button
        type="success"
        size="medium"
        @click="commit('yunguAreaProjectModel',true)"
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
      showModeList: [
        {
          value: "0",
          label: "3D液晶"
        },
        {
          value: "1",
          label: "2D平面"
        },
        {
          value: "2",
          label: "楼梯屏"
        }
      ],
      manageCompany: [],
      protecterList: [],
      yunguAreaProjectModelListTwo: [],
      openTimeFir: "",
      checkinTimeFir: "",
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
    getDate() {
      const openTimeSub = document.getElementById("openTimeFir").value;
      const checkinTimeSub = document.getElementById("checkinTimeFir").value;
      const detailTimeFir = openTimeSub + " 00:00:00";
      const detailTimeSec = checkinTimeSub + " 00:00:00";
      this.yunguAreaProjectDetailModel.openTime = detailTimeFir;
      this.yunguAreaProjectDetailModel.checkinTime = detailTimeSec;
    },

    commit(formName, isSave) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.getDate();
          const obj = {};
          if (isSave == true) {
            obj.proceeKey = "areaProject";
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
  h3 {
    font-size: 22px;
    line-height: 22px;
    margin: 10px 0;
  }
}
</style>
