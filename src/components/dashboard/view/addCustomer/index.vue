<template>
  <div class="addCustomer">
    <h2>新增客户信息</h2>
    <el-tabs type="border-card">
      <el-tab-pane label="客户信息">
        <el-form :label-position="labelPosition" label-width="180px" :model="addCustomerObj">
          <el-form-item label="客户名称">
            <el-input v-model="addCustomerObj.customerName"></el-input>
          </el-form-item>
          <el-form-item label="所属地区">
            <linkage></linkage>
          </el-form-item>
          <el-form-item label="申请人">
            <!-- <el-input v-model="addCustomerObj.applyName"></el-input> -->
            <el-select v-model="addCustomerObj.applyName" placeholder="请选择" @change="chooseDept">
              <el-option
                v-for="item in protecterList"
                :key="item.index"
                :label="item.real_name"
                :value="item.uid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属部门">
            <!-- <el-input v-model="addCustomerObj.applyDept"></el-input> -->
            <el-select v-model="addCustomerObj.applyDept" placeholder="所属部门">
              <el-option
                v-for="item in manageCompany"
                :key="item.name"
                :label="item.name"
                :value="item.did"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户类型">
            <!-- <el-input v-model="addCustomerObj.customerType"></el-input> -->
            <el-select v-model="addCustomerObj.customerType" placeholder="请选择" @change="chooseDept">
              <el-option
                v-for="item in customerList"
                :key="item.val"
                :label="item.type"
                :value="item.val"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="公司规模">
            <!-- <el-input v-model="addCustomerObj.customerType"></el-input> -->
            <el-select v-model="addCustomerObj.companySize" placeholder="请选择" @change="chooseDept">
              <el-option
                v-for="item in companyScale"
                :key="item.val"
                :label="item.population"
                :value="item.val"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="公司电话">
            <el-input v-model="addCustomerObj.companyPhone"></el-input>
          </el-form-item>
          <el-form-item label="客户地址">
            <el-input v-model="addCustomerObj.customerAddress"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="addCustomerObj.companyPhone"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="客户联系人信息">
        <el-form :label-position="labelPosition" label-width="180px" :model="addCustomerObj">
          <el-form-item label="姓名">
            <el-input v-model="addCustomerObj.contactName"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="addCustomerObj.contactSex" label="0">男</el-radio>
            <el-radio v-model="addCustomerObj.contactSex" label="1">女</el-radio>
          </el-form-item>
          <el-form-item label="联系方式">
            <!-- <el-input v-model="addCustomerObj.applyDept"></el-input> -->
            <el-select v-model="addCustomerObj.applyDept" placeholder="请选择">
              <el-option
                v-for="item in contactWay"
                :key="item.val"
                :label="item.way"
                :value="item.val"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系号码">
            <el-input v-model="addCustomerObj.contactPhone"></el-input>
          </el-form-item>
          <el-form-item label="传真">
            <el-input v-model="addCustomerObj.contactRole"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="addCustomerObj.contactEmail"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-input v-model="addCustomerObj.contactRole"></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-input v-model="addCustomerObj.contactCommunication"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="addCustomerObj.contactCommunication"></el-input>
          </el-form-item>
          <el-form-item label="即时通讯">
            <el-input v-model="addCustomerObj.contactCommunication"></el-input>
          </el-form-item>

          <el-form-item label="客户联系人级别">
            <el-input v-model="addCustomerObj.contactLevel"></el-input>
          </el-form-item>

          <!-- <el-form-item label="客户代码">
          <el-input v-model="addCustomerObj.customerCode" :readonly="true"></el-input>
          </el-form-item>-->

          <!-- <el-form-item label="场地客户ID">
          <el-input v-model="addCustomerObj.id"></el-input>
          </el-form-item>-->
          <el-form-item label="是否主动联系">
            <el-radio v-model="addCustomerObj.isContact" label="0">是</el-radio>
            <el-radio v-model="addCustomerObj.isContact" label="1">否</el-radio>
          </el-form-item>
          <el-form-item label="纳税性质">
            <el-input v-model="addCustomerObj.taxableNature"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div class="checkEditCheckBtn">
      <el-button type="primary" @click="addComfirm()">确定</el-button>
      <el-button type="danger" @click="addCancel()">取消</el-button>
    </div>
  </div>
</template>

<script>
import linkage from "@/components/dashboard/view/linkage";
export default {
  name: "addCustomer",
  components: {
    linkage
  },
  data() {
    return {
      contactWay: [
        {
          way: "微信",
          val: 0
        },
        {
          way: "手机",
          val: 1
        },
        {
          way: "QQ",
          val: 2
        }
      ],
      customerList: [
        {
          type: "开发中",
          val: 0
        },
        {
          type: "有意向",
          val: 1
        },
        {
          type: "确定意向",
          val: 2
        },
        {
          type: "确定资源",
          val: 3
        }
      ],
      companyScale: [
        {
          population: "1-20人",
          val: 0
        },
        {
          population: "21-50人",
          val: 1
        },
        {
          population: "51-200人",
          val: 2
        },
        {
          population: "200人以上",
          val: 3
        }
      ],
      labelPosition: "right",
      protecterList: [],
      manageCompany: [],
      addCustomerObj: {
        companySize: "",
        customerName: "",
        companyPhone: "",
        contactDept: "",
        contactCommunication: "",
        contactEmail: "",
        contactLevel: "",
        contactName: "",
        contactPhone: "",
        contactRole: "",
        contactSex: "",
        customerCode: "",
        customerAddress: "",
        customerName: "",
        customerNature: "",
        customerType: "",
        id: "",
        isContact: "",
        provinceId: "",
        cityId: "",
        townId: "",
        status: "",
        taxableNature: "",
        applyDept: "",
        applyName: ""
      }
    };
  },
  methods: {
    addComfirm() {
      this.$http
        .post("/yunguAreaCustomer/insertYunguAreaCustomer", this.addCustomerObj)
        .then(res => {
          console.log("这是新增对象", res);
          if (res.data.meta.code == 200) {
            this.$message({
              type: "success",
              message: "添加客户成功！"
            });
            this.dialogAddVisible = false;
            window.location.reload();
          }
        });
    },
    addCancel() {
      this.dialogAddVisible = false;
    },
    chooseDept() {
      this.addCustomerObj.applyDept = this.addCustomerObj.applyName;
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
    },
    defaultChoose() {
      this.addCustomerObj.applyName = parseInt(localStorage.getItem("uid"));
      this.addCustomerObj.applyDept = this.addCustomerObj.applyName;
    }
  },
  created() {
    this.getDepartOptions();
    this.getPersonOptions();
    this.defaultChoose();
  }
};
</script>
<style lang="scss" scoped>
.addCustomer {
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
  .checkEditCheckBtn {
    width: 100%;
    height: 150px;
    margin-top: 10px;
  }
}
</style>