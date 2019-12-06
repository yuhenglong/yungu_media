<template>
  <div class="customerManage">
    <h2>场地客户管理</h2>
    <div style="margin-top:30px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="客户管理" style>
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>

        <el-form-item label="所属部门" style>
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户类型" style>
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否禁用" style>
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属区域" style="width:900px;">
          <linkage></linkage>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tab">
      <div class="ov">
        <el-button type="primary" @click="openAddCustomer" class="fr mar_add" plain>新增</el-button>
      </div>
      <el-table :data="customerTable" style="width: 100%;" border>
        <el-table-column label="客户代码" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.customer_code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="客户名称" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.customer_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="省份" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.province_id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="城市" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.city_id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="行政区" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.town_id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.contact_phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请人" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.user_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属部门">
          <template slot-scope="scope">
            <span>{{ scope.row.dept_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <span :class="scope.row.status == 1?'textSty':''">{{ scope.row.status ==0?'启用':'禁用' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.verify_stauts == 0">审核未通过</span>
            <span v-else-if="scope.row.verify_stauts == 1">审核通过</span>
            <span v-else>审核中</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="400">
          <template slot-scope="scope">
            <el-button size="mini" @click="checkRow(scope.$index, scope.row)">查看</el-button>
            <el-button
              size="mini"
              @click="startFor(scope.$index, scope.row)"
            >{{ scope.row.status !==0?"启用":"禁用" }}</el-button>
            <el-button
              size="mini"
              @click="editDialog(scope.$index, scope.row)"
              v-if="scope.row.verify_stauts ==1 && scope.row.status ==1?'true':'false'"
            >编辑</el-button>
            <el-button size="mini" @click="lookInfo(scope.$index, scope.row)">查看审核记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 二次封装分页插件 -->
      <pagination :total="total" @pageChange="changePage"></pagination>
    </div>
    <!-- 查看 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="800px"
      center
      :append-to-body="true"
    >
      <el-form :label-position="labelPosition" label-width="80px" :model="formRowList">
        <el-form-item label="客户代码">
          <el-input v-model="formRowList.customer_code" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="formRowList.customer_name" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="省份">
          <el-input v-model="formRowList.province_id" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="formRowList.city_id" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="行政区">
          <el-input v-model="formRowList.town_id" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="formRowList.contact_phone" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="申请人">
          <el-input v-model="formRowList.user_name" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input v-model="formRowList.dept_name" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="status_two" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-input v-model="verify_stauts_two" :readonly="true"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      :title="titleThr"
      :visible.sync="dialogEditVisible"
      width="800px"
      center
      :append-to-body="true"
    >
      <el-form :label-position="labelPosition" label-width="80px" :model="formRowList">
        <el-form-item label="客户代码">
          <el-input v-model="formRowList.customer_code" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="formRowList.customer_name"></el-input>
        </el-form-item>
        <el-form-item label="客户电话">
          <el-input v-model="formRowList.companyPhone"></el-input>
        </el-form-item>
        <el-form-item label="客户通讯">
          <el-input v-model="formRowList.contactCommunication"></el-input>
        </el-form-item>
        <el-form-item label="省份">
          <el-input v-model="formRowList.province_id"></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="formRowList.city_id"></el-input>
        </el-form-item>
        <el-form-item label="行政区">
          <el-input v-model="formRowList.town_id"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="formRowList.contact_phone"></el-input>
        </el-form-item>
        <el-form-item label="申请人">
          <!-- <el-input v-model="formRowList.apply_name"></el-input> -->
          <el-select v-model="formRowList.apply_name" placeholder="请选择" @change="chooseDept">
            <el-option
              v-for="item in protecterList"
              :key="item.index"
              :label="item.real_name"
              :value="item.uid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门">
          <!-- <el-input v-model="formRowList.apply_dept"></el-input> -->
          <el-select v-model="formRowList.apply_dept" placeholder="所属部门">
            <el-option
              v-for="item in manageCompany"
              :key="item.name"
              :label="item.name"
              :value="item.did"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="checkEditCheckBtn" label-width="0">
          <el-button type="primary" @click="editConfirm()">更新</el-button>
          <el-button type="danger" @click="cancel()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新增用户 -->
    <el-dialog
      :title="titleFour"
      :visible.sync="dialogAddVisible"
      width="1000px"
      center
      :append-to-body="true"
    >
      <el-form :label-position="labelPosition" label-width="180px" :model="addCustomerObj">
        <h2 style="font-size:18px;line-height:18px;">客户信息</h2>
        <el-form-item label="客户名称">
          <el-input v-model="addCustomerObj.customerName"></el-input>
        </el-form-item>
        <el-form-item label="客户公司电话">
          <el-input v-model="addCustomerObj.companyPhone"></el-input>
        </el-form-item>
        <el-form-item label="客户联系人部门">
          <el-input v-model="addCustomerObj.contactDept"></el-input>
        </el-form-item>
        <el-form-item label="客户联系人即时通讯">
          <el-input v-model="addCustomerObj.contactCommunication"></el-input>
        </el-form-item>
        <el-form-item label="客户联系人邮箱">
          <el-input v-model="addCustomerObj.contactEmail"></el-input>
        </el-form-item>
        <el-form-item label="客户联系人级别">
          <el-input v-model="addCustomerObj.contactLevel"></el-input>
        </el-form-item>
        <el-form-item label="客户联系人姓名">
          <el-input v-model="addCustomerObj.contactName"></el-input>
        </el-form-item>
        <el-form-item label="客户联系人手机">
          <el-input v-model="addCustomerObj.contactPhone"></el-input>
        </el-form-item>
        <el-form-item label="客户联系人角色">
          <el-input v-model="addCustomerObj.contactRole"></el-input>
        </el-form-item>
        <el-form-item label="客户联系人性别">
          <el-radio v-model="addCustomerObj.contactSex" label="0">男</el-radio>
          <el-radio v-model="addCustomerObj.contactSex" label="1">女</el-radio>
        </el-form-item>
        <!-- <el-form-item label="客户代码">
          <el-input v-model="addCustomerObj.customerCode" :readonly="true"></el-input>
        </el-form-item>-->
        <el-form-item label="客户地址">
          <el-input v-model="addCustomerObj.customerAddress"></el-input>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="addCustomerObj.customerName"></el-input>
        </el-form-item>
        <el-form-item label="客户性质">
          <el-input v-model="addCustomerObj.customerNature"></el-input>
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
        <!-- <el-form-item label="场地客户ID">
          <el-input v-model="addCustomerObj.id"></el-input>
        </el-form-item>-->
        <el-form-item label="是否主动联系">
          <el-input v-model="addCustomerObj.isContact"></el-input>
        </el-form-item>
        <el-form-item label="省份">
          <el-input v-model="addCustomerObj.provinceId"></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="addCustomerObj.cityId"></el-input>
        </el-form-item>
        <el-form-item label="行政区">
          <el-input v-model="addCustomerObj.townId"></el-input>
        </el-form-item>
        <!-- <el-form-item label="禁用状态">
          <el-input v-model="addCustomerObj.status"></el-input>
        </el-form-item>-->
        <el-form-item label="纳税性质">
          <el-input v-model="addCustomerObj.taxableNature"></el-input>
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
        <el-form-item class="checkEditCheckBtn" label-width="0">
          <el-button type="primary" @click="addComfirm()">确定</el-button>
          <el-button type="danger" @click="addCancel()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 查看审核记录 -->
    <el-dialog
      :title="titleTwo"
      :visible.sync="dialogCheckVisible"
      width="1000px"
      center
      :append-to-body="true"
    >
      <dialogAuditList :formCheckArray="formCheckList"></dialogAuditList>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
import linkage from "@/components/dashboard/view/linkage";
import pagination from "@/components/dashboard/view/pagination";
import dialogAuditList from "@/components/dashboard/view/dialogAuditList";
export default {
  name: "customerManage",
  components: {
    linkage,
    pagination,
    dialogAuditList
  },
  data() {
    return {
      customerList: [
        {
          type: "开发中",
          val: "0"
        },
        {
          type: "有意向",
          val: "1"
        },
        {
          type: "确定意向",
          val: "2"
        },
        {
          type: "确定资源",
          val: "3"
        }
      ],
      companyScale: [
        {
          population: "1-20人",
          val: "0"
        },
        {
          population: "21-50人",
          val: "1"
        },
        {
          population: "51-200人",
          val: "2"
        },
        {
          population: "200人以上",
          val: "3"
        }
      ],
      manageCompany: [],
      protecterList: [],
      title: "当前客户信息",
      titleTwo: "场地客户审核列表",
      titleThr: "编辑客户数据",
      titleFour: "添加客户数据",
      labelPosition: "right",
      dialogEditVisible: false,
      dialogCheckVisible: false,
      dialogAddVisible: false,
      formRowList: {
        customer_code: "",
        customer_name: "",
        province_id: "",
        city_id: "",
        town_id: "",
        contact_phone: "",
        user_name: "",
        apply_dept: "",
        apply_name: "",
        status: "",
        verify_stauts: "",
        companyPhone: "",
        contactCommunication: ""
      },
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
      },
      formCheckList: {
        id: 0,
        identificationCode: "",
        verifyUserName: "",
        verifyResult: 0,
        type: 0,
        refuseReason: "",
        verifyTime: "",
        taskId: ""
      },
      dialogVisible: false,
      formInline: {
        user: "",
        region: ""
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      customerTable: [],
      total: 0
    };
  },
  methods: {
    defaultChoose() {
      this.addCustomerObj.applyName = parseInt(localStorage.getItem("uid"));
      this.addCustomerObj.applyDept = this.addCustomerObj.applyName;
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
    cancel() {
      window.location.reload();
      this.dialogEditVisible = false;
    },
    openAddCustomer() {
      this.$router.push("/addCustomer");
      // this.dialogAddVisible = true;
    },
    // addComfirm() {
    //   this.$http
    //     .post("/yunguAreaCustomer/insertYunguAreaCustomer", this.addCustomerObj)
    //     .then(res => {
    //       console.log("这是新增对象", res);
    //       if (res.data.meta.code == 200) {
    //         this.$message({
    //           type: "success",
    //           message: "添加客户成功！"
    //         });
    //         this.dialogAddVisible = false;
    //         window.location.reload();
    //       }
    //     });
    // },
    // addCancel() {
    //   this.dialogAddVisible = false;
    // },
    lookInfo(index, row) {
      this.$http
        .post(
          "/yunguVerifyNote/getVerifyNoteListByCode",
          qs.stringify({ code: row.customer_code })
        )
        .then(res => {
          this.dialogCheckVisible = true;
          if (res.data.meta.code == 200) {
            this.formCheckList = res.data.data.obj;
          }
        });
    },
    editConfirm() {
      const obj = {
        applyDept: this.formRowList.apply_dept,
        applyName: this.formRowList.apply_name,
        cityId: this.formRowList.city_id,
        companyPhone: this.formRowList.company_phone,
        contactCommunication: this.formRowList.contact_communication,
        contactDept: this.formRowList.contact_dept,
        contactEmail: this.formRowList.contact_email,
        contactLevel: this.formRowList.contact_level,
        contactName: this.formRowList.contact_name,
        contactPhone: this.formRowList.contact_phone,
        contactRole: this.formRowList.contact_role,
        contactSex: this.formRowList.contact_sex,
        customerAddress: this.formRowList.customer_address,
        customerCode: this.formRowList.customer_code,
        customerName: this.formRowList.customer_name,
        customerNature: this.formRowList.customer_nature,
        customerType: this.formRowList.customer_type,
        id: this.formRowList.id,
        isContact: this.formRowList.is_contact,
        provinceId: this.formRowList.province_id,
        status: this.formRowList.status,
        taxableNature: this.formRowList.taxable_nature,
        townId: this.formRowList.town_id,
        verifyStauts: this.formRowList.verify_stauts
      };
      this.$http
        .post("/yunguAreaCustomer/updateYunguAreaCustomer", obj)
        .then(res => {
          if (res.data.meta.code == 200) {
            console.log("更新", res);
            window.location.reload();
          }
        });
    },
    editDialog(index, row) {
      this.dialogEditVisible = true;
      this.formRowList = row;
      this.formRowList.apply_name = row.apply_name;
      console.log(
        "这是数据",
        this.formRowList.apply_name,
        typeof this.formRowList.apply_name
      );
    },
    onSubmit() {
      console.log("submit!");
    },
    startFor(index, row) {
      console.log(index, row);
      const obj = {
        id: row.id,
        status: row.status == 0 ? 1 : 0
      };
      this.$http
        .post("/yunguAreaCustomer/updateAreaCustomerStatus", qs.stringify(obj))
        .then(res => {
          if (res.data.meta.code == 200) {
            this.$message({
              message: "启/禁操作成功，即将更新！",
              type: "success"
            });
            window.location.reload();
          }
        });
    },
    checkRow(index, row) {
      this.dialogVisible = true;
      this.formRowList = row;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageInfo.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageInfo.pageNum = val;
    },
    changePage(item) {
      this.pageInfo = item;
      this.getTableData();
    },
    getTableData() {
      this.$http
        .post("/yunguAreaCustomer/getYunguAreaCustomerPageList", this.pageInfo)
        .then(res => {
          console.log("列表数组", res);
          if (res.data.meta.code == 200) {
            this.customerTable = res.data.data.obj.data;
            this.total = res.data.data.obj.count;
          }
        });
    }
  },
  computed: {
    status_two() {
      return this.formRowList.status == 0 ? "启用" : "禁用";
    },
    verify_stauts_two() {
      switch (this.formRowList.verify_stauts) {
        case 0:
          return "审核未通过";
          break;
        case 1:
          return "审核通过";
          break;
        case 2:
          return "审核中";
          break;
      }
    }
  },
  created() {
    this.getTableData();
    this.getDepartOptions();
    this.getPersonOptions();
    this.defaultChoose();
  }
};
</script>

<style lang="scss" scoped>
.customerManage {
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
}
</style>
<style lang="scss">
.customerManage {
  // .el-form--inline .el-select {
  //   width: 200px;
  // }
  // .el-form--inline .el-form-item__content {
  //   width: 220px;
  // }
  .textSty {
    color: red;
  }
  .mar_add {
    margin: 10px;
  }
}
</style>