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
                v-model="yunguAreaContractModel.contractEndtime"
                type="date"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
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
            <!-- <el-form-item label="项目地址" prop="developer">
              <el-input v-model="yunguAreaContractModel.developer" placeholder="开发人员"></el-input>
            </el-form-item>-->
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
              <el-input v-model="yunguAreaContractdetailModel.deadline" placeholder="合同期限(月)"></el-input>
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
              <el-input v-model="yunguAreaContractdetailModel.rentfree" placeholder="免租期(月)"></el-input>
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
                v-model="yunguContractPayModelChild.paySubject"
                placeholder="选择"
                @change="changeId()"
              >
                <template v-for="(item,index) in payModeList">
                  <el-option :label="item.customerName" :value="item.customerId" :key="index"></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="支付主体编号">
              <el-input
                v-model="yunguContractPayModelChild.customerCode"
                placeholder="编号"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="费用类别">
              <el-select v-model="yunguContractPayModelChild.costType" placeholder="选择">
                <el-option label="押金" value="0"></el-option>
                <el-option label="租金" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="yunguContractPayModelChild.remark" placeholder="备注信息"></el-input>
            </el-form-item>
            <el-form-item label="支付方式">
              <el-select v-model="yunguContractPayModelChild.payMode" placeholder="选择">
                <el-option label="银行卡" value="0"></el-option>
                <el-option label="支付宝" value="1"></el-option>
                <el-option label="微信" value="2"></el-option>
                <el-option label="现金" value="3"></el-option>
                <el-option label="其他" value="3"></el-option>
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
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="付费结束时间">
              <el-date-picker
                v-model="yunguContractPayModelChild.payEndtime"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="计划周期">
              <el-select
                v-model="yunguContractPayModelChild.planPeriod"
                placeholder="请选择"
                @change="chengPayPlan"
              >
                <el-option label="季结" value="0"></el-option>
                <el-option label="半年结" value="1"></el-option>
                <el-option label="年结" value="2"></el-option>
                <el-option label="一次性" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开户行">
              <el-select v-model="yunguContractPayModelChild.bankName" placeholder="请选择">
                <template v-for="(item,index) in payBank">
                  <el-option :label="item.payWay" :value="item.value" :key="index"></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="账号">
              <el-input v-model="yunguContractPayModelChild.bankAccount" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item label="付费计划详情">
              <div style="position:relative;top:0;left:150px;">
                <el-table :data="payTableDrtailData" style="width: 1001px;" border>
                  <!-- <el-table-column type="index" width="150" :index="indexDefault" label="计划序号"></el-table-column> -->
                  <el-table-column label="计划序号" width="250px">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.seq" placeholder="请输入内容" style="width:90%;"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="付款时间" width="250px">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.payTime" placeholder="请输入内容" style="width:90%;"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="付款金额" width="250px">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.payAmount"
                        placeholder="请输入内容"
                        style="width:90%;"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="付款备注" width="250px">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.payRemark"
                        placeholder="请输入内容"
                        style="width:90%;"
                      ></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-form-item>
            <div style="text-align:center;">
              <el-button @click="commitTable" type="success">添加付款计划</el-button>
            </div>
            <el-table :data="yunguContractPayModel" style="width: 100%;margin-top:20px;" border>
              <el-table-column label="支付主体">
                <template slot-scope="scope">
                  <span>{{ changePayModel(scope.row.paySubject) }}</span>
                  <!-- <span>{{ changePayModel(scope.row) }}</span> -->
                </template>
              </el-table-column>
              <el-table-column label="费用类别">
                <template slot-scope="scope">
                  <span>{{ scope.row.costType== 0?'押金':'租金' }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column label="支付形式">
                <template slot-scope="scope">
                  <span>{{ scope.row.costType }}</span>
                </template>
              </el-table-column>-->
              <el-table-column label="支付方式">
                <template slot-scope="scope">
                  <span v-if="scope.row.payMode ==0">银行卡</span>
                  <span v-if="scope.row.payMode ==1">支付宝</span>
                  <span v-if="scope.row.payMode ==2">微信</span>
                  <span v-if="scope.row.payMode ==3">现金</span>
                  <span v-if="scope.row.payMode ==4">其他</span>
                </template>
              </el-table-column>
              <el-table-column label="付费开始时间">
                <template slot-scope="scope">
                  <span>{{ scope.row.payStarttime }}</span>
                </template>
              </el-table-column>
              <el-table-column label="付费结束时间">
                <template slot-scope="scope">
                  <span>{{ scope.row.payEndtime }}</span>
                </template>
              </el-table-column>
              <el-table-column label="是否有发票">
                <template slot-scope="scope">
                  <span>{{ scope.row.isInvoice ==0?'是':'否' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="应付金额">
                <template slot-scope="scope">
                  <span>{{ scope.row.payTotal }}</span>
                </template>
              </el-table-column>
              <el-table-column label="已付金额">
                <template slot-scope="scope">
                  <span>{{ scope.row.payTotal }}</span>
                </template>
              </el-table-column>
              <el-table-column label="开户行">
                <template slot-scope="scope">
                  <span>{{ changePayWay(scope.row.bankName) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="账号">
                <template slot-scope="scope">
                  <span>{{ scope.row.bankAccount }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click="payEdit(scope.$index, scope.row)" type="success">编辑</el-button>
                  <el-button @click="PayDel(scope.$index, scope.row)" type="danger">删除</el-button>
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
        @click="commit('yunguAreaContractModel',true)"
      >提&nbsp;&nbsp;&nbsp;交</el-button>
      <el-button
        type="success"
        size="medium"
        @click="commit('yunguAreaContractModel')"
      >保&nbsp;&nbsp;&nbsp;存</el-button>
    </div>
    <router-link to="/addContract/lizi">去例子</router-link>
    <router-view></router-view>
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
      payTableDrtailData: [
        // {
        //   seq: "",
        //   payTime: "",
        //   payAmount: "",
        //   payRemark: ""
        // },
        // {
        //   seq: "",
        //   payTime: "",
        //   payAmount: "",
        //   payRemark: ""
        // },
        // {
        //   seq: "",
        //   payTime: "",
        //   payAmount: "",
        //   payRemark: ""
        // },
        // {
        //   seq: "",
        //   payTime: "",
        //   payAmount: "",
        //   payRemark: ""
        // }
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
      payBank: [
        {
          payWay: "中国银行",
          value: 0
        },
        {
          payWay: "工商银行",
          value: 1
        },
        {
          payWay: "建设银行",
          value: 2
        },
        {
          payWay: "农业银行",
          value: 3
        },
        {
          payWay: "兴业银行",
          value: 4
        },
        {
          payWay: "广发银行",
          value: 5
        },
        {
          payWay: "浦发银行",
          value: 6
        },
        {
          payWay: "平安银行",
          value: 7
        }
      ],
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
    // indexDefault(index) {
    //   return index;
    // },
    arrPush(num) {
      const stagePay = this.yunguContractPayModelChild.payTotal /num;
      for (let i = 0; i < num; i++) {
        const obj = {
          seq: i + 1,
          payTime: "",
          payAmount: stagePay +'元',
          payRemark: ""
        };
        this.payTableDrtailData.push(obj);
      }
      console.log("存进后的数组", this.payTableDrtailData);
    },
    // 获取时间间隔
    DateDiff(sDate1, sDate2) {
      var aDate, oDate1, oDate2, iDays;
      aDate = sDate1.split("-");
      oDate1 = new Date(aDate[0], aDate[1], aDate[2]); //转换为12-18-2006格式
      aDate = sDate2.split("-");
      oDate2 = new Date(aDate[0], aDate[1], aDate[2]);
      iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
      console.log("间隔", iDays);
      return iDays;
    },
    addDays(date, days, seperator = "-") {
      let oDate = new Date(date).valueOf();
      let nDate = oDate + days * 24 * 3600 * 1000;
      nDate = new Date(nDate);
      let y = nDate
        .getFullYear()
        .toString()
        .padStart(2, 0);
      let m = (nDate.getMonth() + 1).toString().padStart(2, 0);
      let d = nDate
        .getDate()
        .toString()
        .padStart(2, 0);
      console.log("N天后", `${y}${seperator}${m}${seperator}${d}`);
      return `${y}${seperator}${m}${seperator}${d}`;
    },
    chengPayPlan() {
      const timeOne = this.yunguContractPayModelChild.payStarttime.split(
        " "
      )[0];
      const timeTwo = this.yunguContractPayModelChild.payEndtime.split(" ")[0];
      // 获取时间间隔
      const dateDiff = this.DateDiff(timeOne, timeTwo);

      const setDate = this.yunguContractPayModelChild;
      if (setDate.planPeriod == 0) {
        this.payTableDrtailData = [];
        // 循环次数
        const firForTime = dateDiff / 90;
        const forTime = Math.ceil(firForTime);
        this.arrPush(forTime);
        if (forTime == 1) {
          // this.arrPush(1);
          this.payTableDrtailData[0].payTime = timeTwo;
        } else{
          for (let i = 0; i < forTime; i++) {
            const ii = i + 1;
            if (ii % 4 == 0) {
              this.payTableDrtailData[i].payTime = this.addDays(
                setDate.payStarttime,
                365 * ii
              );
            } else {
              this.payTableDrtailData[i].payTime = this.addDays(
                setDate.payStarttime,
                90 * (i + 1)
              );
            };
          }
          // 因为数字没有整除，所以要把没分配好的最后日期计算上去
          this.payTableDrtailData[this.payTableDrtailData.length -1]["payTime"] = timeTwo;
        }
      } else if (setDate.planPeriod == 1) {
        this.payTableDrtailData = [];
        // 循环次数
        const firForTime = dateDiff / 180;
        const forTime = Math.ceil(firForTime);
        console.log('向上取整',forTime);
        this.arrPush(forTime);
        if (forTime == 1) {
          // this.arrPush(1);
          this.payTableDrtailData[0].payTime = timeTwo;
        } else{
          for (let i = 0; i < forTime; i++) {
            const ii = i + 1;
            if (ii % 2 == 0) {
              this.payTableDrtailData[i].payTime = this.addDays(
                setDate.payStarttime,
                365 * ii
              );
            } else {
              this.payTableDrtailData[i].payTime = this.addDays(
                setDate.payStarttime,
                182 * (i + 1)
              );
            };
          }
          // 因为数字没有整除，所以要把没分配好的最后日期计算上去
          this.payTableDrtailData[this.payTableDrtailData.length -1]["payTime"] = timeTwo;
        }
        // this.payTableDrtailData = [];
        // this.arrPush(2);
        // this.payTableDrtailData[0].payTime = this.addDays(
        //   setDate.payStarttime,
        //   180
        // );
        // this.payTableDrtailData[1].payTime = this.addDays(
        //   setDate.payStarttime,
        //   365
        // );
      } else if (setDate.planPeriod == 2) {
        this.payTableDrtailData = [];
        this.arrPush(2);
        this.payTableDrtailData[0].payTime = this.addDays(
          setDate.payStarttime,
          365
        );
        this.payTableDrtailData[1].payTime = this.addDays(
          setDate.payStarttime,
          365 * 2
        );
      } else if (setDate.planPeriod == 3) {
        this.payTableDrtailData = [];
        this.arrPush(1);
        // 获取时间间隔
        // const dateDiff = this.DateDiff(timeOne, timeTwo);
        // this.payTableDrtailData[0].payTime = this.addDays(
        //   setDate.payStarttime,
        //   dateDiff
        // );
        this.payTableDrtailData[0].payTime = timeTwo;
      }
      // 获取时间间隔
      // this.DateDiff(timeOne, timeTwo);
      const val = this.yunguContractPayModelChild.planPeriod;
    },
    changePayModel(val) {
      const len = this.payModeList.length;
      for (let i = 0; i < len; i++) {
        if (this.payModeList[i].customerId == val) {
          return this.payModeList[i].customerName;
        }
      }
    },
    changePayWay(val) {
      const len = this.payBank.length;
      console.log(val);
      for (let i = 0; i < len; i++) {
        if (this.payBank[i].value == val) {
          return this.payBank[i].payWay;
        }
      }
    },
    getData() {
      this.$http
        .get("/yunguAreaCustomer/getYunguAreaCustomerList")
        .then(res => {
          if (res.data.meta.code == 200) {
            console.log("支付主体", res);
            this.payModeList = res.data.data.obj;
          }
        });
    },
    PayDel(index, row) {
      this.yunguContractPayModel.splice(index, 1);
    },
    changeId() {
      // console.log("id", this.yunguContractPayModelChild.paySubject);
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
      console.log("打印表格输入框内容", this.payTableDrtailData);
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
      this.yunguAreaContractModel.areaProjectId = localStorage.getItem("aid");
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
          this.yunguContractPayModel = [];
          if (res.data.meta.code == 200) {
            console.log("上传", res);
            this.$router.push("/contractList");
          }
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
