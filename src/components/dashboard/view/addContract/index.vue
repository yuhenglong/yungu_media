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
            :model="yunguAreaContractModel"
            ref="yunguAreaContractModel"
          >
            <el-form-item label="合同类型">
              <el-select v-model="yunguAreaContractModel.contractType" placeholder="选择">
                <el-option label="数码海报" value="0"></el-option>
                <el-option label="电梯投影" value="1"></el-option>
                <el-option label="电梯视窗" value="2"></el-option>
                <el-option label="液晶" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="签约性质">
              <el-select v-model="yunguAreaContractModel.siginType" placeholder="选择">
                <el-option label="新签" value="0"></el-option>
                <el-option label="旧签" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="净签约">
              <el-select v-model="yunguAreaContractModel.isNewsigin" placeholder="选择">
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开发人员">
              <el-select v-model="yunguAreaContractModel.developer" placeholder="选择">
                <el-option label="隆" value="0"></el-option>
                <el-option label="华" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标准合同">
              <el-select v-model="yunguAreaContractModel.isStandard" placeholder="选择">
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="合同到期时间">
              <el-date-picker
                v-model="contractEndtime"
                type="date"
                placeholder="选择日期"
                id="openTimeFir"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="合同属性">
              <el-select v-model="yunguAreaContractModel.contractAttrubite" placeholder="选择">
                <el-option label="楼宇" value="0"></el-option>
                <el-option label="框架" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="签约主体">
              <el-select v-model="yunguAreaContractModel.signCustomer" placeholder="选择">
                <el-option label="楼宇" value="0"></el-option>
                <el-option label="框架" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="付费主体">
              <el-select v-model="yunguAreaContractModel.payCustomer" placeholder="选择">
                <el-option label="楼宇" value="0"></el-option>
                <el-option label="框架" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="yunguAreaContractModel.projectName" placeholder="项目名称"></el-input>
            </el-form-item>
            <el-form-item label="城市区域" prop="projectAddress">
              <el-input v-model="yunguAreaContractModel.projectAddress" placeholder="项目地址"></el-input>
            </el-form-item>
            <el-form-item label="项目属性">
              <el-input v-model="yunguAreaContractModel.projectPosition" placeholder="位置信息"></el-input>
            </el-form-item>
            <el-form-item label="项目地址" prop="developer">
              <el-input v-model="yunguAreaContractModel.developer" placeholder="开发人员"></el-input>
            </el-form-item>
            <el-form-item label="合同签约类型">
              <el-select v-model="yunguAreaContractModel.contractSignType" placeholder="选择">
                <el-option label="普通合同" value="0"></el-option>
                <el-option label="置换合同" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否转租">
              <el-select v-model="yunguAreaContractModel.isSublet" placeholder="选择">
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
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
              <el-input v-model="yunguAreaContractdetailModel.mediaNumber " placeholder="签约媒体位数"></el-input>
            </el-form-item>
            <el-form-item label="实际执行开始日期">
              <el-date-picker
                v-model="yunguAreaContractdetailModel.exeStarttime"
                type="date"
                placeholder="选择日期"
                id="openTimeFir"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="实际执行结束日期">
              <el-date-picker
                v-model="yunguAreaContractdetailModel.exeEndtime"
                type="date"
                placeholder="选择日期"
                id="openTimeFir"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="合同期限(月)">
              <el-input v-model="yunguAreaContractdetailModel.deadline" placeholder="合同期限(月)"></el-input>
            </el-form-item>
            <el-form-item label="免租期开始日期">
              <el-date-picker
                v-model="yunguAreaContractdetailModel.rentfreeStarttime"
                type="date"
                placeholder="选择日期"
                id="openTimeFir"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="免租期结束日期">
              <el-date-picker
                v-model="yunguAreaContractdetailModel.rentfreeEndtime"
                type="date"
                placeholder="选择日期"
                id="openTimeFir"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="免租期(月)">
              <el-date-picker
                v-model="yunguAreaContractdetailModel.rentfree"
                type="date"
                placeholder="选择日期"
                id="openTimeFir"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="签约电梯数">
              <el-input v-model="yunguAreaContractdetailModel.signNumber" placeholder="签约电梯数"></el-input>
            </el-form-item>
            <el-form-item label="签约等候厅数">
              <el-input v-model="yunguAreaContractdetailModel.signWaitnumber" placeholder="签约等候厅数"></el-input>
            </el-form-item>
            <el-form-item label="签约等候厅单价">
              <el-input v-model="yunguAreaContractdetailModel.signWaitprice" placeholder="签约等候厅单价"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="金额及回购">
          <h3>常规金额信息:</h3>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="租金费用总额">
              <el-input v-model="yunguAreaContractdetailModel.rentTotal" placeholder="租金费用总额"></el-input>
            </el-form-item>
            <el-form-item label="管理费用总额">
              <el-input v-model="yunguAreaContractdetailModel.mangerTotal" placeholder="管理费用总额"></el-input>
            </el-form-item>
            <el-form-item label="合同总金额">
              <el-input v-model="yunguAreaContractdetailModel.totalAmount" placeholder="合同总金额"></el-input>
            </el-form-item>
          </el-form>
          <h3>非回购合同信息:</h3>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="纸质合同单屏均价">
              <el-input v-model="yunguAreaContractdetailModel.paperAvg" placeholder="纸质合同单屏均价"></el-input>
            </el-form-item>
            <el-form-item label="纸质合同年租金">
              <el-input v-model="yunguAreaContractdetailModel.paperRent" placeholder="纸质合同年租金"></el-input>
            </el-form-item>
            <el-form-item label="其它费用总额">
              <el-input v-model="yunguAreaContractdetailModel.otherAmount" placeholder="其它费用总额"></el-input>
            </el-form-item>
            <el-form-item label="押金金额">
              <el-input v-model="yunguAreaContractdetailModel.depositAmount" placeholder="押金金额"></el-input>
            </el-form-item>
            <el-form-item label="签约媒体单价(年)">
              <el-input
                v-model="yunguAreaContractdetailModel.signYearprice"
                placeholder="签约媒体单价(年)"
              ></el-input>
            </el-form-item>
            <el-form-item label="签约媒体单价(月)">
              <el-input
                v-model="yunguAreaContractdetailModel.signMonthprice"
                placeholder="签约媒体单价(月)"
              ></el-input>
            </el-form-item>
            <el-form-item label="租金包含电费">
              <el-input v-model="yunguAreaContractdetailModel.total" placeholder="租金包含电费"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="付款计划">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="支付主体">
              <el-select
                v-model="yunguContractPayModelChild.payMode"
                placeholder="选择"
                @change="changeId()"
              >
                <template v-for="(item,index) in payModeList">
                  <el-option :label="item.user_name" :value="item.id" :key="index"></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="支付主体编号">
              <el-input v-model="yunguContractPayModelChild.customerCode" placeholder="编号" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="费用类别">
              <el-select v-model="yunguContractPayModelChild.costType" placeholder="选择">
                <el-option label="押金" value="0"></el-option>
                <el-option label="租金" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="yunguContractPayModelChild" placeholder="备注信息"></el-input>
            </el-form-item>
            <el-form-item label="支付方式">
              <el-select v-model="yunguContractPayModelChild.payMode" placeholder="选择">
                <el-option label="银行卡" value="0"></el-option>
                <el-option label="支付宝" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="总支付金额">
              <el-input v-model="yunguContractPayModelChild.payTotal" placeholder="金额"></el-input>
            </el-form-item>
            <el-form-item label="是否有发票">
              <el-radio v-model="yunguContractPayModelChild.isInvoice" label="0">是</el-radio>
              <el-radio v-model="yunguContractPayModelChild.isInvoice" label="1">否</el-radio>
            </el-form-item>
            <el-form-item label="是否个人收款">
              <el-radio v-model="yunguContractPayModelChild.isPersonal" label="0">是</el-radio>
              <el-radio v-model="yunguContractPayModelChild.isPersonal" label="1">否</el-radio>
            </el-form-item>
            <el-form-item label="付款状态">
              <el-select v-model="yunguContractPayModelChild.payStatus" placeholder="选择">
                <el-option label="待支付" value="0"></el-option>
                <el-option label="已支付" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="付费开始时间">
              <el-date-picker
                v-model="yunguContractPayModelChild.payStarttime"
                type="date"
                placeholder="选择日期"
                id="openTimeFir"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="付费结束时间">
              <el-date-picker
                v-model="yunguContractPayModelChild.payEndtime"
                type="date"
                placeholder="选择日期"
                id="openTimeFir"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="计划周期">
              <el-select v-model="yunguContractPayModelChild.planPeriod" placeholder="请选择">
                <el-option label="待支付" value="0"></el-option>
                <el-option label="已支付" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开户行">
              <el-select v-model="yunguContractPayModelChild.bankName" placeholder="请选择">
                <el-option label="中国银行" value="0"></el-option>
                <el-option label="已支付" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="账号">
              <el-input v-model="yunguContractPayModelChild.bankAccount" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-button @click="commitTable">添加付款计划</el-button>
            </el-form-item>
            <el-table :data="yunguContractPayModel" style="width: 100%;margin-top:20px;" border>
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
        @click="commit('yunguAreaContractModel')"
      >提&nbsp;&nbsp;&nbsp;交</el-button>
      <el-button
        type="success"
        size="medium"
        @click="commit('yunguAreaContractModel',true)"
      >保&nbsp;&nbsp;&nbsp;存</el-button>
    </div>
  </div>
</template>

<script>
import qs from 'qs';
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
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      yunguAreaContractModel: {
        areaProjectId: 0,
        contractAttrubite: 0,
        contractEndtime: "",
        contractFile: "",
        contractSignType: 0,
        contractType: 0,
        developer: 0,
        id: 0,
        identificationCode: "",
        isNewsigin: 0,
        isStandard: 0,
        isSublet: 0,
        payCustomer: 0,
        siginType: 0,
        signCustomer: 0,
        verifyStatus: 0
      },
      yunguAreaContractdetailModel: {
        accountCheck: 0,
        amortizeMode: 0,
        areaContractId: 0,
        chargeMode: 0,
        deadline: 0,
        depositAmount: 0,
        exclusiveMode: "",
        exeEndtime: "",
        exeStarttime: "",
        giveMediacount: 0,
        givePropertycount: 0,
        giveUse: 0,
        id: 0,
        intallCost: 0,
        intallNumber: 0,
        mangerTotal: 0,
        mediaNumber: 0,
        notFullscreen: 0,
        otherAmount: 0,
        paperAvg: 0,
        paperRent: 0,
        protectNumber: 0,
        remark: "",
        renewalRights: 0,
        rentRate: 0,
        rentTotal: 0,
        rentfree: 0,
        rentfreeEndtime: "",
        rentfreeStarttime: "",
        signAvgprice: 0,
        signMonthprice: 0,
        signNumber: 0,
        signPositionnumber: 0,
        signPrice: 0,
        signWaitnumber: 0,
        signWaitpositionnumber: 0,
        signWaitprice: 0,
        signYearprice: 0,
        total: 0,
        totalAmount: 0,
        useMediacount: 0,
        waitAvgprice: 0,
        yearRent: 0
      },
      yunguContractPayModel: [],
      yunguContractPayModelChild: {
        areaContractId: 0,
        bankAccount: "",
        bankName: "",
        costType: 0,
        isInvoice: 0,
        isPersonal: 0,
        payEndtime: "",
        payId: 0,
        payMode: 0,
        payStarttime: "",
        payStatus: 0,
        paySubject: 0,
        payTotal: 0,
        planPeriod: 0,
        customerCode:'',
        yunguContractPaydetailList: []
      },
      yunguContractPaydetail: {
        contractPayId: 0,
        id: 0,
        payAmount: 0,
        payRemark: "",
        payTime: "",
        seq: 0
      },
      yunguContractPaydetailList: [],
      baseInfoOne: [],
      payModeList: []
    };
  },
  methods: {
    getData() {
      this.$http
        .post("/yunguAreaCustomer/getYunguAreaCustomerList")
        .then(res => {
          if (res.data.meta.code == 200) {
            this.payModeList = res.data.data.obj;
          }
        });
    },
    changeId() {
      console.log("id", this.yunguContractPayModelChild.payMode);
      this.$http.post('/yunguAreaCustomer/getYunguAreaCustomerById',qs.stringify({id:this.yunguContractPayModelChild.payMode})).then(res=>{

        this.yunguContractPayModelChild.customerCode = res.data.data.obj.customerCode;
      })
    },
    commitTable(){
      console.log('饭局');
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
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
