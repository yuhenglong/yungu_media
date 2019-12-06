<template>
  <div class="planPayDetail">
    <h2>计划支付</h2>
    <div class="tabs">
      <el-tabs type="border-card">
        <el-tab-pane label="付费计划列表">
          <el-form :inline="true" label-width="170px" class="demo-form-inline" :model="obj">
            <el-form-item label="支付主体">
              <el-input :readonly="true" v-model="obj.payMode" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="支付主体编号">
              <el-input :readonly="true" v-model="obj.payId" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="费用类别" prop="protecter">
              <el-select disabled v-model="obj.costType" placeholder="请选择">
                <el-option :label="押金" :value="0"></el-option>
                <el-option :label="现金" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="developer">
              <el-input :readonly="true" v-model="obj.remark" placeholder="开发人员"></el-input>
            </el-form-item>
            <el-form-item label="支付方式">
              <el-select disabled v-model="obj.payStatus" placeholder="请选择">
                <el-option :label="现金" :value="0"></el-option>
                <el-option :label="支票" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支付总金额" prop="developer">
              <el-input :readonly="true" v-model="obj.payTotal" placeholder="开发人员"></el-input>
            </el-form-item>
            <el-form-item label="是否有发票" prop="protecter">
              <el-select disabled v-model="obj.isInvoice" placeholder="请选择">
                <el-option :label="是" :value="0"></el-option>
                <el-option :label="否" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否个人收款" prop="protecter">
              <el-select disabled v-model="obj.isPersonal" placeholder="请选择">
                <el-option :label="是" :value="0"></el-option>
                <el-option :label="否" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="付款状态" prop="dept">
              <el-select disabled v-model="obj.payStatus" placeholder="所属部门">
                <el-option :label="待支付" :value="0"></el-option>
                <el-option :label="已支付" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="付费开始时间">
              <el-input :readonly="true" v-model="obj.payStarttime" placeholder></el-input>
            </el-form-item>
            <el-form-item label="付费结束时间">
              <el-input :readonly="true" v-model="obj.payEndtime" placeholder></el-input>
            </el-form-item>
            <el-form-item label="计划周期" prop="dept">
              <el-select disabled v-model="obj.planPeriod" placeholder>
                <el-option :label="年结" :value="0"></el-option>
                <el-option :label="月结" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开户行" prop="dept">
              <el-select disabled v-model="obj.bankName" placeholder>
                <el-option :label="建设" :value="0"></el-option>
                <el-option :label="工行" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="账号">
              <el-input :readonly="true" v-model="obj.bankAccount " placeholder></el-input>
            </el-form-item>
            <el-form-item label="付款计划详情">
              <el-table :data="obj.payDetails" border>
                <el-table-column prop="contract_pay_id" label="计划序号" width="150px"></el-table-column>
                <el-table-column prop="pay_time" label="付款时间" width="150px"></el-table-column>
                <el-table-column prop="pay_amount" label="付款金额" width="100px"></el-table-column>
                <el-table-column prop="pay_remark" label="付款备注" width="150px"></el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="btn">
      <el-button type="primary" size="medium" @click="goBack()">返回列表页</el-button>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "planPayDetail",
  components: {},
  data() {
    return {
      obj: {}
    };
  },
  methods: {
    getData() {
      this.obj = this.$route.query;
      this.obj.costType = parseInt(this.obj.costType);
      console.log("传参",this.obj);
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
.planPayDetail {
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
.planPayDetail {
  .el-form--inline .el-form-item__label {
    width: 120px;
  }
  // .linkage {
  //   width: 612px !important;
  // }
}
</style>
