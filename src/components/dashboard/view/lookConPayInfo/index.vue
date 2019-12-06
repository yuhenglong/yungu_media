<template>
  <div class="lookConPayInfo">
    <h2>付款计划</h2>
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
            <el-form-item label="支付主体">
              <el-select disabled v-model="yunguAreaContractModel.paySubject" placeholder="选择">
                <el-option :label="数码海报" :value="0"></el-option>
                <el-option :label="电梯投影" :value="1"></el-option>
                <el-option :label="电梯视窗" :value="2"></el-option>
                <el-option :label="液晶" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="费用类别">
              <el-select disabled v-model="yunguAreaContractModel.costType" placeholder="选择">
                <el-option label="数码海报" :value="0"></el-option>
                <el-option label="电梯投影" :value="1"></el-option>
                <el-option label="电梯视窗" :value="2"></el-option>
                <el-option label="液晶" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支付形式">
              <el-select disabled v-model="yunguAreaContractModel.payMode" placeholder="选择">
                <el-option label="数码海报" :value="0"></el-option>
                <el-option label="电梯投影" :value="1"></el-option>
                <el-option label="电梯视窗" :value="2"></el-option>
                <el-option label="液晶" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支付方式">
              <el-select disabled v-model="yunguAreaContractModel.payStatus" placeholder="选择">
                <el-option label="数码海报" :value="0"></el-option>
                <el-option label="电梯投影" :value="1"></el-option>
                <el-option label="电梯视窗" :value="2"></el-option>
                <el-option label="液晶" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="付费开始时间">
              <el-input
                :readonly="true"
                v-model="yunguAreaContractModel.payStarttime"
                placeholder="项目名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="付费结束时间">
              <el-input
                :readonly="true"
                v-model="yunguAreaContractModel.payEndtime"
                placeholder="项目名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否有发票">
              <el-select disabled v-model="yunguAreaContractModel.isInvoice" placeholder="选择">
                <el-option :label="是" :value="0"></el-option>
                <el-option :label="否" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="应付金额">
              <el-input
                :readonly="true"
                v-model="yunguAreaContractModel.planPeriod"
                placeholder="金额"
              ></el-input>
            </el-form-item>
            <el-form-item label="已付金额">
              <el-input :readonly="true" v-model="yunguAreaContractModel.payTotal" placeholder="金额"></el-input>
            </el-form-item>
            <el-form-item label="合同到期时间">
              <el-date-picker
                disabled
                v-model="yunguAreaContractModel.contractEndtime"
                type="date"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="开户行">
              <el-select disabled v-model="yunguAreaContractModel.bankName" placeholder="选择">
                <el-option :label="楼宇" :value="0"></el-option>
                <el-option :label="框架" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="账号">
              <el-input
                :readonly="true"
                v-model="yunguAreaContractModel.bankAccount"
                placeholder="金额"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="付款计划">
          <el-form :inline="true" class="demo-form-inline">
            <el-table :data="payList" style="width: 100%;margin-top:20px;" border>
              <el-table-column label="计划序号">
                <template slot-scope="scope">
                  <span>{{ scope.row.seq }}</span>
                </template>
              </el-table-column>
              <el-table-column label="付款时间">
                <template slot-scope="scope">
                  <span>{{ scope.row.payTime }}</span>
                </template>
              </el-table-column>
              <el-table-column label="付款金额">
                <template slot-scope="scope">
                  <span>{{ scope.row.payAmount }}</span>
                </template>
              </el-table-column>
              <el-table-column label="付款备注">
                <template slot-scope="scope">
                  <span>{{ scope.row.payRemark }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="btn">
      <el-button type="success" size="medium" @click="giveUp()">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "lookConPayInfo",
  data() {
    return {
      yunguAreaContractModel: {},
      payList: []
    };
  },
  methods: {
    giveUp() {
      this.$router.go(-1);
    },
    getData() {
      this.yunguAreaContractModel = this.$route.query.obj;
      this.payList = this.$route.query.obj.payDetails;
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
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
.lookConPayInfo {
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
.lookConPayInfo {
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
