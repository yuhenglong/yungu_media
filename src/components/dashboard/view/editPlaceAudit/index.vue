<template>
  <div class="editPlaceAudit">
    <h2>场地项目编辑</h2>
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
            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="yunguAreaProjectModel.projectName" placeholder="项目名称"></el-input>
            </el-form-item>
            <el-form-item label="项目地址" prop="projectAddress">
              <el-input v-model="yunguAreaProjectModel.projectAddress" placeholder="项目地址"></el-input>
            </el-form-item>
            <el-form-item label="位置信息">
              <el-input v-model="yunguAreaProjectModel.projectPosition" placeholder="位置信息"></el-input>
            </el-form-item>
            <el-form-item label="开发人员" prop="developer">
              <!-- <el-input v-model="yunguAreaProjectModel.developer" placeholder="开发人员"></el-input> -->
              <el-select v-model="yunguAreaProjectModel.developer" placeholder="请选择">
                <el-option
                  v-for="item in protecterList"
                  :key="item.index"
                  :label="item.real_name"
                  :value="item.did"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="维护人员" prop="protecter">
              <el-select v-model="yunguAreaProjectModel.protecter" placeholder="请选择">
                <el-option
                  v-for="item in protecterList"
                  :key="item.index"
                  :label="item.real_name"
                  :value="item.did"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属部门" prop="dept">
              <el-select v-model="yunguAreaProjectModel.dept" placeholder="所属部门">
                <el-option
                  v-for="item in manageCompanyTwo"
                  :key="item.name"
                  :label="item.name"
                  :value="item.did"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="一级属性">
              <el-select v-model="yunguAreaProjectModel.projectType" placeholder="一级属性">
                <el-option label="写字楼" value="0"></el-option>
                <el-option label="停车场" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属地区">
              <linkage @childFn="proectAreaChild"></linkage>
            </el-form-item>
            <el-form-item label="套餐赠送">
              <el-select v-model="yunguAreaProjectModel.setMeal" placeholder="套餐赠送">
                <el-option label="套餐一" value="0"></el-option>
                <el-option label="套餐二" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否备案">
              <el-radio v-model="yunguAreaProjectModel.isSave" :label="0">是</el-radio>
              <el-radio v-model="yunguAreaProjectModel.isSave" :label="1">否</el-radio>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="项目属性一">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目规模">
              <el-input v-model="yunguAreaProjectDetailModel.projectCount " placeholder="项目规模"></el-input>
            </el-form-item>
            <el-form-item label="周围环境">
              <el-input v-model="yunguAreaProjectDetailModel.surrounding" placeholder="周围环境"></el-input>
            </el-form-item>
            <el-form-item label="环境关键字">
              <el-input v-model="yunguAreaProjectDetailModel.keyword" placeholder="环境关键字"></el-input>
            </el-form-item>
            <el-form-item label="交通特征">
              <el-input v-model="yunguAreaProjectDetailModel.trafficConditions" placeholder="交通特征"></el-input>
            </el-form-item>
            <el-form-item label="地上停车位">
              <el-input v-model="yunguAreaProjectDetailModel.upCount" placeholder="地上停车位"></el-input>
            </el-form-item>
            <el-form-item label="共存媒体">
              <el-input v-model="yunguAreaProjectDetailModel.otherMedia" placeholder="共存媒体"></el-input>
            </el-form-item>
            <el-form-item label="禁忌行业">
              <el-input v-model="yunguAreaProjectDetailModel.banIndustry" placeholder="禁忌行业"></el-input>
            </el-form-item>
            <el-form-item label="禁忌关键词">
              <el-input v-model="yunguAreaProjectDetailModel.forbidKeyword" placeholder="禁忌关键词"></el-input>
            </el-form-item>
            <el-form-item label="是否有偿宣传">
              <el-radio v-model="yunguAreaProjectDetailModel.isvaluePublicity" :label="0">是</el-radio>
              <el-radio v-model="yunguAreaProjectDetailModel.isvaluePublicity" :label="1">否</el-radio>
            </el-form-item>
            <el-form-item label="接受宣传形式">
              <el-radio v-model="yunguAreaProjectDetailModel.publicityWay" :label="0">是</el-radio>
              <el-radio v-model="yunguAreaProjectDetailModel.publicityWay" :label="1">否</el-radio>
            </el-form-item>
            <el-form-item label="受众人群">
              <el-input v-model="yunguAreaProjectDetailModel.audiences" placeholder="受众人群"></el-input>
            </el-form-item>
            <el-form-item label="商圈">
              <el-input v-model="yunguAreaProjectDetailModel.businessArea" placeholder="商圈"></el-input>
            </el-form-item>
            <el-form-item label="是否有委员会">
              <el-radio v-model="yunguAreaProjectDetailModel.isownersCommittee" :label="0">是</el-radio>
              <el-radio v-model="yunguAreaProjectDetailModel.isownersCommittee" :label="1">否</el-radio>
            </el-form-item>
            <el-form-item label="委会负责人手机">
              <el-input v-model="yunguAreaProjectDetailModel.principalPhone" placeholder="业委会负责人手机"></el-input>
            </el-form-item>
            <el-form-item label="委会负责人电话">
              <el-input
                v-model="yunguAreaProjectDetailModel.principalTelephone"
                placeholder="业委会负责人电话"
              ></el-input>
            </el-form-item>
            <el-form-item label="委会负责人">
              <el-input v-model="yunguAreaProjectDetailModel.principals" placeholder="业委会负责人"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="项目属性二">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目经办人">
              <el-input v-model="yunguAreaProjectDetailModel.transactor" placeholder="项目经办人"></el-input>
            </el-form-item>
            <el-form-item label="项目经办人手机">
              <el-input v-model="yunguAreaProjectDetailModel.transactorPhone" placeholder="项目经办人手机"></el-input>
            </el-form-item>
            <el-form-item label="项目经办人电话">
              <el-input
                v-model="yunguAreaProjectDetailModel.transactorTelephone"
                placeholder="项目经办人电话"
              ></el-input>
            </el-form-item>
            <el-form-item label="项目负责人姓名">
              <el-input v-model="yunguAreaProjectDetailModel.projectman" placeholder="项目负责人姓名"></el-input>
            </el-form-item>
            <el-form-item label="项目负责人手机">
              <el-input v-model="yunguAreaProjectDetailModel.projectmanPhone" placeholder="项目负责人手机"></el-input>
            </el-form-item>
            <el-form-item label="项目负责人电话">
              <el-input
                v-model="yunguAreaProjectDetailModel.projectmanTelephone"
                placeholder="项目负责人电话"
              ></el-input>
            </el-form-item>
            <el-form-item label="开盘时间">
              <el-date-picker v-model="openTimeFir" type="date" placeholder="选择日期" id="openTimeFir"></el-date-picker>
            </el-form-item>
            <el-form-item label="最低层数">
              <el-input v-model="yunguAreaProjectDetailModel.lowfloorCount" placeholder="最低层数"></el-input>
            </el-form-item>
            <el-form-item label="最高层数">
              <el-input v-model="yunguAreaProjectDetailModel.heightfloorCount" placeholder="最高层数"></el-input>
            </el-form-item>
            <el-form-item label="社区入住时间">
              <el-date-picker
                v-model="checkinTimeFir"
                type="date"
                placeholder="选择日期"
                id="checkinTimeFir"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="物业费">
              <el-input v-model="yunguAreaProjectDetailModel.propertyCost" placeholder="物业费（元/平米）"></el-input>
            </el-form-item>
            <el-form-item label="现在均价">
              <el-input v-model="yunguAreaProjectDetailModel.rentAvg" placeholder="现在均价（元/平米）"></el-input>
            </el-form-item>
            <el-form-item label="租金(最高)">
              <el-input
                v-model="yunguAreaProjectDetailModel.rentHight"
                placeholder="租金(最高)(元/平米/天)"
              ></el-input>
            </el-form-item>
            <el-form-item label="总单元数">
              <el-input v-model="yunguAreaProjectDetailModel.unitTotal" placeholder="总单元数"></el-input>
            </el-form-item>
            <el-form-item label="平均每单元户数">
              <el-input v-model="yunguAreaProjectDetailModel.householdsAvg" placeholder="平均每单元户数"></el-input>
            </el-form-item>
            <el-form-item label="总户数">
              <el-input v-model="yunguAreaProjectDetailModel.householdsTotal" placeholder="总户数"></el-input>
            </el-form-item>
            <el-form-item label="入住总户数">
              <el-input v-model="yunguAreaProjectDetailModel.occupancyTotal" placeholder="入住总户数"></el-input>
            </el-form-item>
            <el-form-item label="入住率">
              <el-input v-model="yunguAreaProjectDetailModel.occupancyRate" placeholder="入住率"></el-input>
            </el-form-item>
            <el-form-item label="业主收入水平">
              <el-input v-model="yunguAreaProjectDetailModel.ownerIncome" placeholder="业主收入水平"></el-input>
            </el-form-item>
            <el-form-item label="覆盖电梯间数">
              <el-input v-model="yunguAreaProjectDetailModel.coverCount" placeholder="覆盖电梯间数"></el-input>
            </el-form-item>
            <el-form-item label="覆盖客梯数">
              <el-input v-model="yunguAreaProjectDetailModel.coverPassengers" placeholder="覆盖客梯数"></el-input>
            </el-form-item>
            <el-form-item label="覆盖货梯数">
              <el-input v-model="yunguAreaProjectDetailModel.coverGoods" placeholder="覆盖货梯数"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="项目属性三">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="配套设施">
              <el-input v-model="yunguAreaProjectDetailModel.matchFacility" placeholder="配套设施"></el-input>
            </el-form-item>
            <el-form-item label="是否可直投">
              <el-radio v-model="yunguAreaProjectDetailModel.isStraight" :label="0">是</el-radio>
              <el-radio v-model="yunguAreaProjectDetailModel.isStraight" :label="1">否</el-radio>
            </el-form-item>
            <el-form-item label="直投方式">
              <el-input v-model="yunguAreaProjectDetailModel.straightMode" placeholder="直投方式"></el-input>
            </el-form-item>
            <el-form-item label="宣传收费标准">
              <el-input v-model="yunguAreaProjectDetailModel.standardCharge" placeholder="宣传收费标准"></el-input>
            </el-form-item>
            <el-form-item label="有无电信机站">
              <el-radio v-model="yunguAreaProjectDetailModel.isMachinestation" :label="0">是</el-radio>
              <el-radio v-model="yunguAreaProjectDetailModel.isMachinestation" :label="1">否</el-radio>
            </el-form-item>
            <el-form-item label="电信机站名称">
              <el-input
                v-model="yunguAreaProjectDetailModel.machinestationName"
                placeholder="电信机站名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="项目数棟数">
              <el-input v-model="yunguAreaProjectDetailModel.houseNumber" placeholder="项目数棟数"></el-input>
            </el-form-item>
            <el-form-item label="楼盘荣誉描述">
              <el-input v-model="yunguAreaProjectDetailModel.descript" placeholder="楼盘荣誉(亮点):描述"></el-input>
            </el-form-item>
            <el-form-item label="地下室层数">
              <el-input v-model="yunguAreaProjectDetailModel.undergroundCount" placeholder="地下室层数"></el-input>
            </el-form-item>
            <el-form-item label="等候厅数">
              <el-input v-model="yunguAreaProjectDetailModel.waitCount" placeholder="等候厅数"></el-input>
            </el-form-item>
            <el-form-item label="知名企业">
              <el-input v-model="yunguAreaProjectDetailModel.wellCompany" placeholder="知名企业"></el-input>
            </el-form-item>
            <el-form-item label="所属商业区">
              <el-input v-model="yunguAreaProjectDetailModel.downtown" placeholder="所属商业区"></el-input>
            </el-form-item>
            <el-form-item label="特许关键字">
              <el-input v-model="yunguAreaProjectDetailModel.specialKeyword" placeholder="特许关键字"></el-input>
            </el-form-item>
            <el-form-item label="特许业主">
              <el-input v-model="yunguAreaProjectDetailModel.specialOwner" placeholder="特许业主"></el-input>
            </el-form-item>
            <el-form-item label="是否可以楼秀">
              <el-radio v-model="yunguAreaProjectDetailModel.isShow" :label="0">是</el-radio>
              <el-radio v-model="yunguAreaProjectDetailModel.isShow" :label="1">否</el-radio>
            </el-form-item>
            <el-form-item label="楼秀费用">
              <el-input v-model="yunguAreaProjectDetailModel.showCost" placeholder="楼秀费用(元/天)"></el-input>
            </el-form-item>
            <el-form-item label="回票情况">
              <el-radio v-model="yunguAreaProjectDetailModel.receiptStatus" :label="0">有</el-radio>
              <el-radio v-model="yunguAreaProjectDetailModel.receiptStatus" :label="1">无</el-radio>
            </el-form-item>
            <div class="pay">
              <h3
                style="padding-left:100px;margin-bottom:20px;font-size:22px;line-height:22px;"
              >支付管理：</h3>
              <el-form-item label="支付方式">
                <el-select v-model="yunguPayMethodModelList.payName" placeholder="名称：" id="payText">
                  <el-option label="银行卡" value="0"></el-option>
                  <el-option label="支付宝" value="1"></el-option>
                  <el-option label="微信" value="2"></el-option>
                  <el-option label="现金" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="账号">
                <el-input v-model="yunguPayMethodModelList.account" placeholder="账号"></el-input>
              </el-form-item>
              <el-form-item label="银行名称">
                <el-input v-model="yunguPayMethodModelList.bankName" placeholder="银行名称"></el-input>
              </el-form-item>
            </div>
            <div class="addAdress">
              <el-button type="primary" class="addAdr" plain @click="addPayTable">增加支付方式</el-button>
            </div>
            <el-table
              :data="yunguPayMethodModelList_arr"
              style="width: 100%;margin-top:20px;"
              border
            >
              <el-table-column label="支付方式" width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.payText }}</span>
                </template>
              </el-table-column>
              <el-table-column label="支付方式" width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.account }}</span>
                </template>
              </el-table-column>
              <el-table-column label="支付方式" width="180">
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
        <el-tab-pane label="点位信息">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="管理公司">
              <el-select v-model="yunguAreaPostionModelList.company" placeholder="管理公司">
                <el-option
                  v-for="item in companyList"
                  :key="item.customerId"
                  :label="item.customerName"
                  :value="item.customerId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="安装名称">
              <el-input v-model="yunguAreaPostionModelList.installName" placeholder="联系人名称"></el-input>
            </el-form-item>
            <el-form-item label="具体安装位置">
              <el-input v-model="yunguAreaPostionModelList.installPosition" placeholder="联系人名称"></el-input>
            </el-form-item>
            <el-form-item label="是否有机身贴">
              <el-radio v-model="yunguAreaPostionModelList.isBody" :label="0">是</el-radio>
              <el-radio v-model="yunguAreaPostionModelList.isBody" :label="1">否</el-radio>
            </el-form-item>
            <el-form-item label="是否赠品">
              <el-radio v-model="yunguAreaPostionModelList.isGive" :label="0">是</el-radio>
              <el-radio v-model="yunguAreaPostionModelList.isGive" :label="1">否</el-radio>
            </el-form-item>
            <el-form-item label="媒体名称" prop="mediaName">
              <el-input v-model="yunguAreaPostionModelList.mediaName" placeholder="媒体名称"></el-input>
            </el-form-item>
            <el-form-item label="点位名称" prop="pointName">
              <el-input v-model="yunguAreaPostionModelList.pointName" placeholder="点位名称"></el-input>
            </el-form-item>
            <el-form-item label="点位图片" prop="positionPicture">
              <uploadPicture></uploadPicture>
            </el-form-item>
            <el-form-item label="呈现方式" prop="showMode">
              <el-select v-model="yunguAreaPostionModelList.showMode" placeholder="请选择">
                <el-option
                  v-for="item in showModeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备规格" prop="size">
              <el-input v-model="yunguAreaPostionModelList.size" placeholder="设备规格"></el-input>
            </el-form-item>
            <div class="addAdress">
              <el-button type="primary" class="addAdr" plain @click="addTable">增加场地点位</el-button>
            </div>
          </el-form>
          <!-- 不封装的table -->
          <div class="addAdrTable">
            <el-table
              :data="yunguAreaProjectModelListTwo"
              style="width: 100%;margin-top:20px;"
              border
            >
              <el-table-column label="项目名称" width="180">
                <template>
                  <span style>{{ yunguAreaProjectModel.projectName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="点位名称" width="180">
                <template slot-scope="scope">
                  <span style>{{ scope.row.pointName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="安装名称" width="180">
                <template slot-scope="scope">
                  <span style>{{ scope.row.installName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="媒体名称">
                <template slot-scope="scope">
                  <span style>{{ scope.row.mediaName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="呈现方式">
                <template slot-scope="scope">
                  <span v-if="scope.row.showMode ==0">3D液晶</span>
                  <span v-if="scope.row.showMode ==1">2D平面</span>
                  <span v-if="scope.row.showMode ==2">楼梯屏</span>
                </template>
              </el-table-column>
              <el-table-column label="计划机型">
                <template slot-scope="scope">
                  <span v-if="scope.row.size == 1">新机</span>
                  <span v-if="scope.row.size == 2">裸眼3D</span>
                  <span v-if="scope.row.size == 3">归属感</span>
                  <span v-if="scope.row.size == 4">ces</span>
                </template>
              </el-table-column>
              <el-table-column label="设备数量">
                <template>
                  <span style>1台</span>
                </template>
              </el-table-column>
              <el-table-column label="是否赠送">
                <template slot-scope="scope">
                  <span style>{{ scope.row.isGive === '0' ?'是':'否' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="所属公司" width="180">
                <template slot-scope="scope">
                  <span>{{companytwo(scope.row.company)}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="addAreaDel(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="btn">
      <el-button type="primary" size="medium" @click="commit()">提交修改</el-button>
      <el-button @click="waiveCommit()" type="info">放弃修改</el-button>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import addAdrTable from "@/components/dashboard/view/addAdrTable";
import uploadPicture from "@/components/dashboard/view/uploadPicture";
import linkage from "@/components/dashboard/view/linkage";
export default {
  name: "editPlaceAudit",
  components: {
    linkage,
    uploadPicture,
    addAdrTable
  },
  data() {
    return {
      companyList: [],
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
        isBody: "",
        isGive: "",
        pointName: "",
        positionPicture: "",
        showMode: "",
        size: ""
      },
      yunguAreaProjectDetailModel: {
        projectCount: "",
        surrounding: "",
        keyword: "",
        trafficConditions: "",
        upCount: "",
        otherMedia: "",
        banIndustry: "",
        forbidKeyword: "",
        isvaluePublicity: "",
        audiences: "",
        businessArea: "",
        isownersCommittee: "",
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
        isStraight: "",
        straightMode: "",
        standardCharge: "",
        isMachinestation: "",
        machinestationName: "",
        houseNumber: "",
        descript: "",
        undergroundCount: "",
        waitCount: "",
        wellCompany: "",
        downtown: "",
        specialKeyword: "",
        specialOwner: "",
        isShow: "",
        showCost: "",
        receiptStatus: ""
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
        isSave: ""
      },
      yunguPayMethodModelList_arr: [],
      yunguPayMethodModelList: {
        identificationCode: "",
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
    companytwo(val) {
      // 方法一
      // const len = this.companyList.length;
      // for (let i = 0; i < len; i++) {
      //   if (this.companyList[i].customerId == val) {
      //     return this.companyList[i].customerName;
      //   }
      // }
      // 方法二
      const arr = this.companyList.filter(item =>{
        return item.customerId == val
      })
      return arr[0]['customerName'];
    },
    changeText(val, row) {
      return val == row;
    },
    handleEdit(index, row) {
      console.log("暂时不能编辑");
    },
    addAreaDel(index, row) {
      console.log(index, row);
      this.yunguAreaProjectModelListTwo.splice(index, 1);
    },
    getSelectData() {
      this.yunguAreaProjectModel.developer = localStorage.getItem(
        "sysUserName"
      );
      this.$http
        .get("/yunguAreaCustomer/getYunguAreaCustomerList")
        .then(res => {
          if (res.data.meta.code == 200) {
            console.log("dadad", res);
            this.companyList = res.data.data.obj;
          }
        });
      this.$http.get("/yunguEquipment/getStatusEquipmentList").then(res => {
        if (res.data.meta.code == 200) {
          this.equipList = res.data.data.obj;
          // this.equitList = res.data.data.obj;
        }
      });
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
      console.log("打印", this.yunguAreaProjectModelListTwo);
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
    commit() {
      this.yunguPayMethodModelList.identificationCode = localStorage.getItem(
        "identification_code"
      );
      const obj = {};
      obj.code = localStorage.getItem("identification_code");
      obj.projectId = localStorage.getItem("aid");
      obj.yunguAreaPostionModelList = this.yunguAreaProjectModelListTwo;
      obj.yunguAreaProjectDetailModel = this.yunguAreaProjectDetailModel;
      obj.yunguAreaProjectModel = this.yunguAreaProjectModel;
      obj.yunguPayMethodModelList = this.yunguPayMethodModelList_arr;
      console.log("这是obj", obj);
      this.$http
        .post("/yunguAreaProject/updateYunguAreaProject", obj)
        .then(res => {
          console.log("修改更新", res);
          if (res.data.meta.code == 200) {
            this.$message({
              type: "success",
              message: "信息修改成功！"
            });
            this.$router.push("/areaList");
          }
        });
    },
    computed() {},
    waiveCommit() {
      this.$router.push("/areaList");
    },
    // 子传父
    proectAreaChild(childValue) {
      this.yunguAreaProjectModel.projectArea = childValue;
    },
    // 获取部门列表
    getDepartOptions() {
      this.$http.get("/sysDept/getDeptListByStatus?status=1").then(res => {
        if (res.data.meta.code == 200) {
          console.log("管理公司", res);
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
            this.protecterList = res.data.data.obj.data;
          } else {
            console.log("选项列表获取错误");
          }
        });
    },
    getAidData() {
      const aid = localStorage.getItem("aid");
      this.$http
        .post(
          "/yunguAreaProject/getYunguAreaProjectById",
          qs.stringify({ id: aid })
        )
        .then(res => {
          if (res.data.meta.code == 200) {
            console.log("这是table数据", res);
            // this.yunguAreaPostionModelList =
            //   res.data.data.obj.areaPostionList[0];
            this.yunguAreaProjectModelListTwo =
              res.data.data.obj.areaPostionList;
            this.yunguPayMethodModelList_arr = res.data.data.obj.paymethodList;
            this.yunguAreaProjectModel = res.data.data.obj.areaProject;
            this.yunguAreaProjectDetailModel =
              res.data.data.obj.areaProjectDetail;
          } else {
            console.log("回调出错了");
          }
        });
    }
  },
  computed: {
    manageCompanyTwo() {
      const that = this;
      const num = that.yunguAreaProjectModel.protecter;
      return that.manageCompany.filter(item => {
        return item.did == num;
      });
    }
  },
  created() {
    this.getAidData();
    this.getDepartOptions();
    this.getPersonOptions();
    this.getSelectData();
  }
};
</script>

<style lang="scss" scoped>
.editPlaceAudit {
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
    .el-button {
      width: 300px;
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
.editPlaceAudit {
  .el-form--inline .el-form-item__label {
    width: 120px;
  }
  .linkage {
    width: 612px !important;
  }
}
</style>
