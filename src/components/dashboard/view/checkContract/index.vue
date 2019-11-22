<template>
  <div class="addArea">
    <h2>场地合同查看</h2>
    <div class="tabs">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form
            :inline="true"
            label-width="170px"
            class="demo-form-inline"
            :model="yunguAreaContractModel"
            ref="yunguAreaContractModel"
          >
            <el-form-item label="合同类型">
              <el-select disabled v-model="yunguAreaContractModel.contractType" placeholder="选择">
                <el-option label="数码海报" :value="0"></el-option>
                <el-option label="电梯投影" :value="1"></el-option>
                <el-option label="电梯视窗" :value="2"></el-option>
                <el-option label="液晶" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="签约性质">
              <el-select disabled v-model="yunguAreaContractModel.siginType" placeholder="选择">
                <el-option label="新签" :value="0"></el-option>
                <el-option label="旧签" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="净签约">
              <el-select disabled v-model="yunguAreaContractModel.isNewsigin" placeholder="选择">
                <el-option label="是" :value="0"></el-option>
                <el-option label="否" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开发人员">
              <el-select disabled v-model="yunguAreaContractModel.developer" placeholder="选择">
                <el-option label="隆" :value="0"></el-option>
                <el-option label="华" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标准合同">
              <el-select disabled v-model="yunguAreaContractModel.isStandard" placeholder="选择">
                <el-option label="是" :value="0"></el-option>
                <el-option label="否" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="合同到期时间">
              <el-date-picker
                v-model="yunguAreaContractModel.contractEndtime"
                type="date"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="合同属性">
              <el-select disabled v-model="yunguAreaContractModel.contractAttrubite" placeholder="选择">
                <el-option label="楼宇" :value="0"></el-option>
                <el-option label="框架" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="签约主体">
              <el-select disabled v-model="yunguAreaContractModel.signCustomer" placeholder="选择">
                <el-option label="楼宇" :value="0"></el-option>
                <el-option label="框架" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="付费主体">
              <el-select disabled v-model="yunguAreaContractModel.payCustomer" placeholder="选择">
                <el-option label="楼宇" :value="0"></el-option>
                <el-option label="框架" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目名称" prop="projectName">
              <el-input :readonly="true" v-model="yunguAreaContractModel.projectName" placeholder="项目名称"></el-input>
            </el-form-item>
            <el-form-item label="城市区域" prop="projectAddress">
              <el-input :readonly="true" v-model="yunguAreaContractModel.projectAddress" placeholder="项目地址"></el-input>
            </el-form-item>
            <el-form-item label="项目属性">
              <el-input :readonly="true" v-model="yunguAreaContractModel.projectPosition" placeholder="位置信息"></el-input>
            </el-form-item>
            <el-form-item label="项目地址" prop="developer">
              <el-input :readonly="true" v-model="yunguAreaContractModel.developer" placeholder="开发人员"></el-input>
            </el-form-item>
            <el-form-item label="合同签约类型">
              <el-select disabled v-model="yunguAreaContractModel.contractSignType" placeholder="选择">
                <el-option label="普通合同" value="0"></el-option>
                <el-option label="置换合同" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否转租">
              <el-select disabled v-model="yunguAreaContractModel.isSublet" placeholder="选择">
                <el-option label="是" :value="0"></el-option>
                <el-option label="否" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="合同文件">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="分区价格信息">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="签约媒体位数">
              <el-input :readonly="true" v-model="yunguAreaContractdetailModel.mediaNumber " placeholder="签约媒体位数"></el-input>
            </el-form-item>
            <el-form-item label="实际执行开始日期">
              <el-date-picker
                v-model="yunguAreaContractdetailModel.exeStarttime"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="实际执行结束日期">
              <el-date-picker
                v-model="yunguAreaContractdetailModel.exeEndtime"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="合同期限(月)">
              <el-input :readonly="true" v-model="yunguAreaContractdetailModel.deadline" placeholder="合同期限(月)"></el-input>
            </el-form-item>
            <el-form-item label="免租期开始日期">
              <el-date-picker
                v-model="yunguAreaContractdetailModel.rentfreeStarttime"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="免租期结束日期">
              <el-date-picker
                v-model="yunguAreaContractdetailModel.rentfreeEndtime"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="免租期(月)">
              <el-input :readonly="true" v-model="yunguAreaContractdetailModel.rentfree" placeholder="免租期(月)"></el-input>
            </el-form-item>
            <el-form-item label="签约电梯数">
              <el-input :readonly="true" v-model="yunguAreaContractdetailModel.signNumber" placeholder="签约电梯数"></el-input>
            </el-form-item>
            <el-form-item label="签约等候厅数">
              <el-input :readonly="true" v-model="yunguAreaContractdetailModel.signWaitnumber" placeholder="签约等候厅数"></el-input>
            </el-form-item>
            <el-form-item label="签约等候厅单价">
              <el-input :readonly="true" v-model="yunguAreaContractdetailModel.signWaitprice" placeholder="签约等候厅单价"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="金额及回购">
          <h3>常规金额信息:</h3>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="租金费用总额">
              <el-input :readonly="true" v-model="yunguAreaContractdetailModel.rentTotal" placeholder="租金费用总额"></el-input>
            </el-form-item>
            <el-form-item label="管理费用总额">
              <el-input :readonly="true" v-model="yunguAreaContractdetailModel.mangerTotal" placeholder="管理费用总额"></el-input>
            </el-form-item>
            <el-form-item label="合同总金额">
              <el-input :readonly="true" v-model="yunguAreaContractdetailModel.totalAmount" placeholder="合同总金额"></el-input>
            </el-form-item>
          </el-form>
          <h3>非回购合同信息:</h3>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="纸质合同单屏均价">
              <el-input :readonly="true" v-model="yunguAreaContractdetailModel.paperAvg" placeholder="纸质合同单屏均价"></el-input>
            </el-form-item>
            <el-form-item label="纸质合同年租金">
              <el-input :readonly="true" v-model="yunguAreaContractdetailModel.paperRent" placeholder="纸质合同年租金"></el-input>
            </el-form-item>
            <el-form-item label="其它费用总额">
              <el-input :readonly="true" v-model="yunguAreaContractdetailModel.otherAmount" placeholder="其它费用总额"></el-input>
            </el-form-item>
            <el-form-item label="押金金额">
              <el-input :readonly="true" v-model="yunguAreaContractdetailModel.depositAmount" placeholder="押金金额"></el-input>
            </el-form-item>
            <el-form-item label="签约媒体单价(年)">
              <el-input :readonly="true"
                v-model="yunguAreaContractdetailModel.signYearprice"
                placeholder="签约媒体单价(年)"
              ></el-input>
            </el-form-item>
            <el-form-item label="签约媒体单价(月)">
              <el-input :readonly="true"
                v-model="yunguAreaContractdetailModel.signMonthprice"
                placeholder="签约媒体单价(月)"
              ></el-input>
            </el-form-item>
            <el-form-item label="租金包含电费">
              <el-input :readonly="true" v-model="yunguAreaContractdetailModel.total" placeholder="租金包含电费"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="付款计划">
          <h3 style="text-align:center;">付款计划</h3>
          <el-table :data="yunguContractPayModel" style="width: 100%;margin-top:20px;" border>
            <el-table-column label="支付主体">
              <template slot-scope="scope">
                <span>{{ scope.row.pay_mode }}</span>
              </template>
            </el-table-column>
            <el-table-column label="费用类别">
              <template slot-scope="scope">
                <span>{{ scope.row.cost_type }}</span>
              </template>
            </el-table-column>
            <el-table-column label="支付形式">
              <template slot-scope="scope">
                <span>{{ scope.row.pay_mode }}</span>
              </template>
            </el-table-column>
            <el-table-column label="支付方式">
              <template slot-scope="scope">
                <span>{{ scope.row.pay_status }}</span>
              </template>
            </el-table-column>
            <el-table-column label="付费开始时间">
              <template slot-scope="scope">
                <span>{{ scope.row.pay_starttime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="付费结束时间">
              <template slot-scope="scope">
                <span>{{ scope.row.pay_endtime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="是否有发票">
              <template slot-scope="scope">
                <span>{{ scope.row.is_invoice ==0?'是':'否' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="应付金额">
              <template slot-scope="scope">
                <span>{{ scope.row.plan_period }}</span>
              </template>
            </el-table-column>
            <el-table-column label="已付金额">
              <template slot-scope="scope">
                <span>{{ scope.row.bank_account }}</span>
              </template>
            </el-table-column>

            <el-table-column label="开户行">
              <template slot-scope="scope">
                <span>{{ scope.row.bank_name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="账号">
              <template slot-scope="scope">
                <span>{{ scope.row.bank_account }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="checkPayList(scope.row)" type="primary">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- </el-form> -->
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import addAdrTable from "@/components/dashboard/view/addAdrTable";
import uploadPicture from "@/components/dashboard/view/uploadPicture";
export default {
  name: "areaManage",
  components: {
    uploadPicture,
    addAdrTable
  },
  data() {
    return {
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      yunguAreaContractModel: {
        areaProjectId: null,
        contractAttrubite: null,
        contractEndtime: "",
        contractFile: "",
        contractSignType: null,
        contractType: null,
        developer: null,
        id: null,
        identificationCode: "",
        isNewsigin: null,
        isStandard: null,
        isSublet: null,
        payCustomer: null,
        siginType: null,
        signCustomer: null,
        verifyStatus: null
      },
      yunguAreaContractdetailModel: {
        accountCheck: null,
        amortizeMode: null,
        areaContractId: null,
        chargeMode: null,
        deadline: null,
        depositAmount: null,
        exclusiveMode: "",
        exeEndtime: "",
        exeStarttime: "",
        id: null,
        intallCost: null,
        intallNumber: null,
        mangerTotal: null,
        mediaNumber: null,
        notFullscreen: null,
        otherAmount: null,
        paperAvg: null,
        paperRent: null,
        protectNumber: null,
        remark: "",
        renewalRights: null,
        rentRate: null,
        rentTotal: null,
        rentfree: null,
        rentfreeEndtime: "",
        rentfreeStarttime: "",
        signAvgprice: null,
        signMonthprice: null,
        signNumber: null,
        signPositionnumber: null,
        signPrice: null,
        signWaitnumber: null,
        signWaitpositionnumber: null,
        signWaitprice: null,
        signYearprice: null,
        total: null,
        totalAmount: null,
        useMediacount: null,
        waitAvgprice: null,
        yearRent: null
      },
      yunguContractPayModel: [],
      yunguContractPayModelChild: {
        remark: "",
        areaContractId: null,
        bankAccount: "",
        bankName: "",
        costType: null,
        isInvoice: null,
        isPersonal: null,
        payEndtime: "",
        payId: null,
        payMode: null,
        payStarttime: "",
        payStatus: null,
        paySubject: null,
        payTotal: null,
        planPeriod: null,
        customerCode: "",
        yunguContractPaydetailList: []
      },
      yunguContractPaydetail: {
        contractPayId: null,
        id: null,
        payAmount: 0,
        payRemark: "",
        payTime: "2019-12-12 00:00:00",
        seq: 0
      },
      yunguContractPaydetailList: [],
      baseInfoOne: [],
      payModeList: []
    };
  },
  methods: {
    getData() {
      const id = localStorage.getItem("aid");
      this.$http
        .post(
          "/yunguareacontract/getYunguAreaContractById",
          qs.stringify({ id: id })
        )
        .then(res => {
          if (res.data.meta.code == 200) {
            console.log("查看的数据", res);
            this.yunguAreaContractModel = res.data.data.obj.contract;
            this.yunguAreaContractdetailModel =
              res.data.data.obj.contractdetail;
            this.yunguAreaContractdetailModel.mediaNumber =
              res.data.data.obj.contractdetail.media_number;
            this.yunguAreaContractdetailModel.signNumber =
              res.data.data.obj.contractdetail.sign_number;
            this.yunguAreaContractdetailModel.signWaitnumber =
              res.data.data.obj.contractdetail.sign_waitnumber;
            this.yunguAreaContractdetailModel.signWaitprice =
              res.data.data.obj.contractdetail.sign_waitprice;
            this.yunguAreaContractdetailModel.rentTotal =
              res.data.data.obj.contractdetail.rent_total;
            this.yunguAreaContractdetailModel.mangerTotal =
              res.data.data.obj.contractdetail.manger_total;
            this.yunguAreaContractdetailModel.totalAmount =
              res.data.data.obj.contractdetail.total_amount;
            this.yunguAreaContractdetailModel.paperAvg =
              res.data.data.obj.contractdetail.paper_avg;
            this.yunguAreaContractdetailModel.paperRent =
              res.data.data.obj.contractdetail.paper_rent;
            this.yunguAreaContractdetailModel.otherAmount =
              res.data.data.obj.contractdetail.other_amount;
            this.yunguAreaContractdetailModel.depositAmount =
              res.data.data.obj.contractdetail.deposit_amount;
            this.yunguAreaContractdetailModel.signYearprice =
              res.data.data.obj.contractdetail.sign_yearprice;
            this.yunguAreaContractdetailModel.signMonthprice =
              res.data.data.obj.contractdetail.sign_monthprice;
            this.yunguContractPayModel = res.data.data.obj.payList;
          }
        });
    },
    checkPayList(row){
      console.log(row);
      this.$router.push({
        name:'planPayDetail',
        query:row
      })
    },
    changeId() {
      console.log("id", this.yunguContractPayModelChild.paySubject);
      this.$http
        .post(
          "/yunguAreaCustomer/getYunguAreaCustomerById",
          qs.stringify({ id: this.yunguContractPayModelChild.paySubject })
        )
        .then(res => {
          if (res.data.meta.code == 200) {
            this.yunguContractPayModelChild.customerCode =
              res.data.data.obj.customerCode;
          }
        });
    },
    commitTable() {
      this.yunguContractPayModel.push(this.yunguContractPayModelChild);
      this.yunguContractPayModelChild = {
        remark: "",
        areaContractId: null,
        bankAccount: "",
        bankName: "",
        costType: null,
        isInvoice: null,
        isPersonal: null,
        payEndtime: "",
        payId: null,
        payMode: null,
        payStarttime: "",
        payStatus: null,
        paySubject: null,
        payTotal: null,
        planPeriod: null,
        customerCode: "",
        yunguContractPaydetailList: []
      };
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    commit(check, isSave) {
      this.yunguContractPayModelChild.yunguContractPaydetailList.push(
        this.yunguContractPaydetail
      );
      this.yunguContractPayModel.push(this.yunguContractPayModelChild);
      const obj = {};
      if (isSave) {
        obj.taskId = localStorage.getItem("task_id");
      }
      obj.yunguAreaContractModel = this.yunguAreaContractModel;
      obj.yunguAreaContractdetailModel = this.yunguAreaContractdetailModel;
      obj.yunguContractPayModel = this.yunguContractPayModel;
      this.$http
        .post("/yunguareacontract/insertYunguAreaContract", obj)
        .then(res => {
          console.log("上传", res);
        });
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  },
  mounted() {
    this.getData();
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
  .el-table {
    .el-button {
      width: 80px;
    }
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
