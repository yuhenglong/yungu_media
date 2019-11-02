<template>
  <div class="areaManage">
    <h2>场地项目添加</h2>
    <div class="tabs">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form :inline="true" :model="BaseInfo" class="demo-form-inline">
            <el-form-item label="项目名称">
              <el-input v-model="BaseInfo.name" placeholder="项目名称"></el-input>
            </el-form-item>
            <el-form-item label="项目地址">
              <el-input v-model="BaseInfo.address" placeholder="项目地址"></el-input>
            </el-form-item>
            <el-form-item label="位置信息">
              <el-input v-model="BaseInfo.addressInfo" placeholder="位置信息"></el-input>
            </el-form-item>
            <el-form-item label="开发人员">
              <el-input v-model="BaseInfo.developer" placeholder="开发人员"></el-input>
            </el-form-item>
            <el-form-item label="维护人员">
              <el-input v-model="BaseInfo.maintainer" placeholder="维护人员"></el-input>
            </el-form-item>
            <el-form-item label="所属部门">
              <el-select v-model="BaseInfo.department" placeholder="所属部门">
                <el-option label="总经办" value="zjb"></el-option>
                <el-option label="技术部" value="jsb"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="一级属性">
              <el-select v-model="BaseInfo.stairOne" placeholder="一级属性">
                <el-option label="写字楼" value="xzl"></el-option>
                <el-option label="停车场" value="tcc"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="二级属性">
              <el-select v-model="BaseInfo.stairTwo" placeholder="二级属性">
                <el-option label="总经办" value="zjb"></el-option>
                <el-option label="技术部" value="jsb"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属地区">
              <linkage></linkage>
            </el-form-item>
            <el-form-item label="管理公司">
              <el-select v-model="BaseInfo.manageCom" placeholder="管理公司">
                <el-option label="广州海云投资信息咨询有限公司" value="zxgs"></el-option>
                <el-option label="停车场" value="tcc"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目联系">
              <el-input v-model="BaseInfo.person" placeholder="联系人名称"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="BaseInfo.iphone" placeholder="联系电话"></el-input>
            </el-form-item>
            <el-form-item label="套餐赠送">
              <el-select v-model="BaseInfo.give" placeholder="套餐赠送">
                <el-option label="套餐一" value="tcy"></el-option>
                <el-option label="套餐二" value="tce"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否备案">
              <el-select v-model="BaseInfo.record" placeholder="是否备案">
                <el-option label="是" value="yes"></el-option>
                <el-option label="否" value="no"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="项目属性一">
          <el-form :inline="true" :model="BaseInfo" class="demo-form-inline">
            <el-form-item label="竞争对手">
              <el-input v-model="BaseInfo.competitor" placeholder="竞争对手"></el-input>
            </el-form-item>
            <el-form-item label="覆盖梯数">
              <el-input v-model="BaseInfo.elevatorNum" placeholder="覆盖梯数"></el-input>
            </el-form-item>
            <el-form-item label="项目规模">
              <el-input v-model="BaseInfo.projectScale " placeholder="项目规模"></el-input>
            </el-form-item>
            <el-form-item label="周围环境">
              <el-input v-model="BaseInfo.environment" placeholder="周围环境"></el-input>
            </el-form-item>
            <el-form-item label="关键字">
              <el-input v-model="BaseInfo.keyword" placeholder="环境关键字"></el-input>
            </el-form-item>
            <el-form-item label="交通特征">
              <el-input v-model="BaseInfo.trafficChar" placeholder="交通特征"></el-input>
            </el-form-item>
            <el-form-item label="地上停车位">
              <el-input v-model="BaseInfo.floorParking" placeholder="地上停车位"></el-input>
            </el-form-item>
            <el-form-item label="地下停车位">
              <el-input v-model="BaseInfo.underParking" placeholder="地下停车位"></el-input>
            </el-form-item>
            <el-form-item label="共存媒体">
              <el-input v-model="BaseInfo.coexistMedia" placeholder="共存媒体"></el-input>
            </el-form-item>
            <el-form-item label="禁忌行业">
              <el-input v-model="BaseInfo.tabooBusiness" placeholder="禁忌行业"></el-input>
            </el-form-item>
            <el-form-item label="禁忌关键词">
              <el-input v-model="BaseInfo.tabooKeyword" placeholder="禁忌关键词"></el-input>
            </el-form-item>
            <el-form-item label="是否有偿宣传">
              <el-select v-model="BaseInfo.compensation" placeholder="是否有偿">
                <el-option label="是" value="yes"></el-option>
                <el-option label="否" value="no"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="接受宣传形式">
              <el-select v-model="BaseInfo.modality" placeholder=" ">
                <el-option label="是" value="yes"></el-option>
                <el-option label="否" value="no"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="受众人群">
              <el-input v-model="BaseInfo.crowd" placeholder="受众人群"></el-input>
            </el-form-item>
            <el-form-item label="商圈">
              <el-input v-model="BaseInfo.tradingArea" placeholder="商圈"></el-input>
            </el-form-item>
            <el-form-item label="是否有委员会">
              <el-select v-model="BaseInfo.committee" placeholder=" ">
                <el-option label="是" value="yes"></el-option>
                <el-option label="否" value="no"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="项目属性二">
          <el-form :inline="true" :model="BaseInfo" class="demo-form-inline">
            <el-form-item label="项目负责人姓名">
              <el-input v-model="BaseInfo.projectName" placeholder="项目负责人姓名"></el-input>
            </el-form-item>
            <el-form-item label="项目负责人手机">
              <el-input v-model="BaseInfo.projectPhone" placeholder="项目负责人手机"></el-input>
            </el-form-item>
            <el-form-item label="开盘时间">
              <el-input v-model="BaseInfo.startTime" placeholder="开盘时间"></el-input>
            </el-form-item>
            <el-form-item label="最低层数">
              <el-input v-model="BaseInfo.lastPlies" placeholder="最低层数"></el-input>
            </el-form-item>
            <el-form-item label="最高层数">
              <el-input v-model="BaseInfo.topPlies" placeholder="最高层数"></el-input>
            </el-form-item>
            <el-form-item label="社区入住时间">
              <el-input v-model="BaseInfo.occupancyTime" placeholder="社区入住时间"></el-input>
            </el-form-item>
            <el-form-item label="现在均价">
              <el-input v-model="BaseInfo.averagePrice" placeholder="现在均价（元/平米）"></el-input>
            </el-form-item>
            <el-form-item label="租金(最高)">
              <el-input v-model="BaseInfo.rent" placeholder="租金(最高)(元/平米/天)"></el-input>
            </el-form-item>
            <el-form-item label="总单元数">
              <el-input v-model="BaseInfo.total" placeholder="总单元数"></el-input>
            </el-form-item>
            <el-form-item label="平均每单元户数">
              <el-input v-model="BaseInfo.averageCount" placeholder="平均每单元户数"></el-input>
            </el-form-item>
            <el-form-item label="总户数">
              <el-input v-model="BaseInfo.totalCount" placeholder="总户数"></el-input>
            </el-form-item>
            <el-form-item label="入住总户数">
              <el-input v-model="BaseInfo.occupancyTotal" placeholder="入住总户数"></el-input>
            </el-form-item>
            <el-form-item label="入住率">
              <el-input v-model="BaseInfo.occupancyRate" placeholder="入住率"></el-input>
            </el-form-item>
            <el-form-item label="特殊业主">
              <el-input v-model="BaseInfo.specialPer" placeholder="特殊业主"></el-input>
            </el-form-item>
            <el-form-item label="业主收入水平">
              <el-input v-model="BaseInfo.lastPlies" placeholder="业主收入水平"></el-input>
            </el-form-item>
            <el-form-item label="配套设施">
              <el-input v-model="BaseInfo.topPlies" placeholder="配套设施"></el-input>
            </el-form-item>
            <el-form-item label="覆盖客梯数">
              <el-input v-model="BaseInfo.occupancyTime" placeholder="覆盖客梯数"></el-input>
            </el-form-item>
            <el-form-item label="覆盖货梯数">
              <el-input v-model="BaseInfo.averagePrice" placeholder="覆盖货梯数"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="项目属性三">
          <el-form :inline="true" :model="BaseInfo" class="demo-form-inline">
            <el-form-item label="是否可直投">
              <el-select v-model="BaseInfo.committee" placeholder=" ">
                <el-option label="是" value="yes"></el-option>
                <el-option label="否" value="no"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="直投方式">
              <el-input v-model="BaseInfo.total" placeholder="直投方式"></el-input>
            </el-form-item>
            <el-form-item label="宣传收费标准">
              <el-input v-model="BaseInfo.averageCount" placeholder="宣传收费标准"></el-input>
            </el-form-item>
            <el-form-item label="有无电信机站">
              <el-select v-model="BaseInfo.committee" placeholder=" ">
                <el-option label="是" value="yes"></el-option>
                <el-option label="否" value="no"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="电信机站名称">
              <el-input v-model="BaseInfo.totalCount" placeholder="电信机站名称"></el-input>
            </el-form-item>
            <el-form-item label="项目数棟数">
              <el-input v-model="BaseInfo.totalCount" placeholder="项目数棟数"></el-input>
            </el-form-item>
            <el-form-item label="楼盘荣誉描述">
              <el-input v-model="BaseInfo.totalCount" placeholder="楼盘荣誉(亮点):描述"></el-input>
            </el-form-item>
            <el-form-item label="地下室层数">
              <el-input v-model="BaseInfo.totalCount" placeholder="地下室层数"></el-input>
            </el-form-item>
            <el-form-item label="等候厅数">
              <el-input v-model="BaseInfo.totalCount" placeholder="等候厅数"></el-input>
            </el-form-item>
            <el-form-item label="知名企业">
              <el-input v-model="BaseInfo.totalCount" placeholder="知名企业"></el-input>
            </el-form-item>
            <el-form-item label="所属商业区">
              <el-input v-model="BaseInfo.totalCount" placeholder="所属商业区"></el-input>
            </el-form-item>
            <el-form-item label="是否可以楼秀">
              <el-select v-model="BaseInfo.committee" placeholder=" ">
                <el-option label="是" value="yes"></el-option>
                <el-option label="否" value="no"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="楼秀费用">
              <el-input v-model="BaseInfo.totalCount" placeholder="楼秀费用(元/天)"></el-input>
            </el-form-item>
            <el-form-item label="回票情况">
              <el-select v-model="BaseInfo.committee" placeholder=" ">
                <el-option label="有发票" value="yes"></el-option>
                <el-option label="无发票" value="no"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支付方式">
              <el-select v-model="BaseInfo.committee" placeholder="银行：">
                <el-option label="工商银行" value="yes"></el-option>
                <el-option label="建设银行" value="no"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="账号">
              <el-input v-model="BaseInfo.totalCount" placeholder="账号"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="btn">
      <el-button type="primary" size="medium">提&nbsp;&nbsp;&nbsp;交</el-button>
    </div>
  </div>
</template>

<script>
import linkage from "@/components/dashboard/view/linkage";
export default {
  name: "areaManage",
  components: {
    linkage
  },
  data() {
    return {
      BaseInfo: {
        name: "",
        address: "",
        addressInfo: "",
        developer: "",
        maintainer: "",
        department: "",
        stairOne: "",
        stairTwo: "",
        manageCom: "",
        person: "",
        iphone: "",
        give: "",
        record: "",
        competitor: "",
        elevatorNum: "",
        projectScale: "",
        environment: "",
        keyword: "",
        trafficChar: "",
        floorParking: "",
        underParking: "",
        coexistMedia: "",
        tabooBusiness: "",
        tabooKeyword: "",
        compensation: "",
        modality: "",
        crowd: "",
        tradingArea: "",
        committee: "",
        projectName: "",
        projectPhone: "",
        startTime: "",
        lastPlies: "",
        topPlies: "",
        occupancyTime: "",
        averagePrice: "",
        rent: "",
        total: "",
        averageCount: "",
        totalCount: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    setAddress() {
      console.log("这是地址");
    }
  }
};
</script>

<style lang="scss" scoped>
.areaManage {
  width: 100%;
  padding: 30px;
  h2 {
    text-align: center;
    font-size: 26px;
    line-height: 26px;
    margin-bottom: 10px;
  }
  .el-form-item {
    width: 49%;
  }
  .el-input,
  .el-select {
    width: 400px;
  }
  .btn {
    width: 100%;
    margin: 30px 0;
    text-align: center;
  }
  .el-button {
    width: 300px;
  }
}
</style>
<style lang="scss">
.areaManage {
  .el-form--inline .el-form-item__label {
    width: 120px;
  }
  .area-select.large span {
    width: 100%;
    line-height: 20px;
  }
}
</style>
