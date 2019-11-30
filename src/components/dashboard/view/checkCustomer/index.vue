<template>
  <div class="checkCustomer">
    <h1 style="text-align:center;">场地客户审核列表</h1>
    <div style="margin-top:30px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="客户管理" style="width:290px;">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="所属区域">
          <linkage></linkage>
        </el-form-item>
        <el-form-item label="所属部门" style="width:290px;">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户类型" style="width:290px;">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否禁用" style="width:290px;">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width:70px;">
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tab">
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
        <el-table-column label="联系电话">
          <template slot-scope="scope">
            <span>{{ scope.row.contact_phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请人">
          <template slot-scope="scope">
            <span>{{ scope.row.user_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属部门" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.apply_dept }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <span :class="scope.row.status ==1?'textSty':''">{{ scope.row.status ==0?"启用":"禁用" }}</span>
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
            <el-button size="mini" @click="audit(scope.$index, scope.row)">审核</el-button>
            <el-button size="mini" @click="lookInfo(scope.$index, scope.row)">查看审核记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 二次封装分页插件 -->
      <pagination :total="total" @pageChange="changePage"></pagination>
    </div>
    <!-- 查看弹窗 -->
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
          <el-input v-model="formRowList.apply_dept" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="status_two" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-input v-model="verify_stauts_two" :readonly="true"></el-input>
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

    <!-- 编辑审查记录 -->
    <el-dialog
      :title="titleThr"
      :visible.sync="dialogEditVisible"
      width="800px"
      center
      :append-to-body="true"
    >
      <el-form :label-position="labelPosition" label-width="80px" :model="formRowList">
        <el-form-item label="客户代码">
          <el-input v-model="formRowList.customer_code"></el-input>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="formRowList.customer_name"></el-input>
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
          <el-input v-model="formRowList.user_name"></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input v-model="formRowList.apply_dept"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="status_two"></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-input v-model="verify_stauts_two"></el-input>
        </el-form-item>
        <el-form-item class="checkEditCheckBtn" label-width="0">
          <el-button type="primary" @click="editConfirm()">更新</el-button>
          <el-button type="danger" @click="cancel()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 审核 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogAuditVisible"
      width="800px"
      center
      :append-to-body="true"
    >
      <el-form ref="form" :model="checkDia" label-width="80px">
        <el-form-item label="处理方式">
          <el-radio v-model="checkDia.verifyResult" label="1">通过</el-radio>
          <el-radio v-model="checkDia.verifyResult" label="0">拒绝</el-radio>
        </el-form-item>
        <el-form-item label="备注原由">
          <el-input type="textarea" v-model="checkDia.refuseReason"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="deilComfirm">确定</el-button>
          <el-button type="success" @click="deilDel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
import linkage from "@/components/dashboard/view/linkage";
import pagination from "@/components/dashboard/view/pagination";
import dialogAuditList from "@/components/dashboard/view/dialogAuditList";
export default {
  name: "checkCustomer",
  components: {
    linkage,
    pagination,
    dialogAuditList
  },
  data() {
    return {
      diaTextArea: "",
      temporaryArr: [],
      title: "当前客户信息",
      labelPosition: "right",
      formRowList: {
        customer_code: "",
        customer_name: "",
        province_id: "",
        city_id: "",
        town_id: "",
        contact_phone: "",
        user_name: "",
        apply_dept: "",
        status: "",
        verify_stauts: ""
      },
      checkDia: {
        verifyResult: "",
        type: 2,
        refuseReason: "",
        identificationCode: ""
      },
      dialogVisible: false,
      dialogCheckVisible: false,
      dialogEditVisible: false,
      dialogAuditVisible: false,
      titleTwo: "场地客户审核列表",
      titleThr: "编辑客户数据",
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
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    audit(index, row) {
      this.dialogAuditVisible = true;
      this.checkDia.identificationCode = row.customer_code;
    },
    deilComfirm() {
      this.$http
        .post("/yunguVerifyNote/customerVerify", this.checkDia)
        .then(res => {
          console.log("这是保存信息的", res);
          if (res.data.meta.code == 200) {
            this.$message({
              type: "success",
              message: `处理成功！`
            });
            this.dialogAuditVisible = false;
            this.getTableData();
          } else {
            this.$message({
              type: "error",
              message: `处理失败！请重新提交。`
            });
          }
        });
    },
    deilDel() {
      this.dialogAuditVisible = false;
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
    cancel() {
      window.location.reload();
      // this.customerTable = this.temporaryArr;
      // console.log("这是customerTable", this.customerTable);
      this.dialogEditVisible = false;
    },
    editDialog(index, row) {
      this.dialogEditVisible = true;
      // this.temporaryArr = this.customerTable;
      // console.log("这是table", this.temporaryArr);
      this.formRowList = row;
    },
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
            console.log(this.formCheckList);
          }
        });
    },
    checkRow(index, row) {
      this.dialogVisible = true;
      this.formRowList = row;
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
        .post(
          "/yunguAreaCustomer/getYunguAreaCustomerAwaitStatusPageList",
          this.pageInfo
        )
        .then(res => {
          console.log("列表数组", res);
          if (res.data.meta.code == 200) {
            this.customerTable = res.data.data.obj.data;
            this.total = res.data.data.obj.count;
          }
        });
    }
  },
  created() {
    this.getTableData();
  }
};
</script>

<style lang="scss" scoped>
.checkCustomer {
  width: 95%;
  padding: 30px 2.5%;
  height: auto;
  overflow: auto;
}
</style>
<style lang="scss">
.checkCustomer {
  .el-form--inline .el-select {
    width: 200px;
  }
  .el-form--inline .el-form-item__content {
    width: 220px;
  }
  .textSty {
    color: red;
  }
}
.checkEditCheckBtn {
  text-align: center !important;
}
</style>