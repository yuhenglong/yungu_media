<template>
  <div class="pendEquList">
    <h2>设备列表</h2>
    <div style="margin-top:30px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="设备序号">
          <el-input v-model="formInline.project_code" placeholder="序号"></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="formInline.project_name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="设备型号">
          <el-input v-model="formInline.user" placeholder="型号"></el-input>
        </el-form-item>
        <el-form-item label="设备尺寸">
          <el-input v-model="formInline.user" placeholder="尺寸"></el-input>
        </el-form-item>
        <el-form-item label="设备状态">
          <el-select v-model="formInline.region" placeholder="全部">
            <el-option label="已使用" :value="0"></el-option>
            <el-option label="已禁用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editConfirm()">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tab">
      <el-table :data="customerTable" style="width: 100%;" border>
        <el-table-column label="项目编号">
          <template slot-scope="scope">
            <span>{{ scope.row.project_code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目名称">
          <template slot-scope="scope">
            <span>{{ scope.row.project_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目地址">
          <template slot-scope="scope">
            <span>{{ scope.row.project_address }}</span>
          </template>
        </el-table-column>
        <el-table-column label="合同编号">
          <template slot-scope="scope">
            <span>{{ scope.row.contract_code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="安装单编号">
          <template slot-scope="scope">
            <span>{{ scope.row.install_code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="500px;">
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
    <!-- 查看 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="1100px"
      center
      :append-to-body="true"
    >
      <el-table :data="equipTableData" style="width: 100%" border>
        <el-table-column prop="contract_code" label="合同编号" width="180"></el-table-column>
        <el-table-column prop="project_code" label="项目编号" width="180"></el-table-column>
        <el-table-column prop="project_name" label="项目名称"></el-table-column>
        <el-table-column prop="project_address" label="项目地址"></el-table-column>
        <el-table-column prop="install_position" label="具体安装位置"></el-table-column>
        <el-table-column prop="Media_name" label="媒体位名称"></el-table-column>
        <el-table-column prop="show_mode" label="呈现方式"></el-table-column>
        <el-table-column prop="equipment_name" label="设备型号"></el-table-column>
        <el-table-column prop="device_count" label="设备数量"></el-table-column>
      </el-table>
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
    <!-- 查看审核记录 -->
    <el-dialog
      :title="titleTwo"
      :visible.sync="dialogCheckVisible"
      width="1000px"
      center
      :append-to-body="true"
    >
      <el-table :data="formCheckList" border>
        <el-table-column property="identificationCode" label="序号"></el-table-column>
        <el-table-column property="verifyUserName" label="审核用户"></el-table-column>
        <el-table-column property="verifyResult" label="审核结果"></el-table-column>
        <el-table-column property="type" label="审核类型"></el-table-column>
        <el-table-column property="refuseReason" label="拒绝原因"></el-table-column>
        <el-table-column property="verifyTime" label="添加时间"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
import pagination from "@/components/dashboard/view/pagination";
export default {
  name: "pendEquList",
  components: {
    pagination
  },
  data() {
    return {
      title: "设备信息查看",
      titleTwo: "拒绝记录列表",
      labelPosition: "right",
      dialogEditVisible: false,
      dialogCheckVisible: false,
      dialogAddVisible: false,
      dialogAuditVisible: false,
      equipTableData: [],
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
        verify_stauts: "",
        companyPhone: "",
        contactCommunication: ""
      },
      addCustomerObj: {
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
      total: 0,
      checkDia: {
        verifyResult: "",
        taskId:'',
        type: 2,
        refuseReason: "",
        identificationCode: ""
      }
    };
  },
  methods: {
    deilComfirm() {
      this.$http
        .post("/areaProjectActivity/waitDeviceVerify", this.checkDia)
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
    cancel() {
      window.location.reload();
      this.dialogEditVisible = false;
    },
    openAddCustomer() {
      this.dialogAddVisible = true;
    },
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
    lookInfo(index, row) {
      console.log("这行信息", row);
      this.$http
        .post(
          "/yunguVerifyNote/getVerifyNoteListByCode",
          qs.stringify({ code: row.install_code })
        )
        .then(res => {
          this.dialogCheckVisible = true;
          if (res.data.meta.code == 200) {
            this.formCheckList = res.data.data.obj;
            console.log(this.formCheckList);
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
      const url = "/activityDevice/getProjectPostionList?aid=" + row.aid;
      this.$http.get(url).then(res => {
        if (res.data.meta.code == 200) {
          console.log("这是啥", res);
          this.equipTableData = res.data.data.obj;
        }
      });
    },
    audit(index, row) {
      this.dialogAuditVisible = true;
      this.checkDia.identificationCode = row.install_code;
      this.checkDia.taskId = row.task_id;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    changePage(item) {
      this.pageInfo = item;
      this.getTableData();
    },
    getTableData() {
      this.$http
        .post("/activityDevice/getWaitVerifyDeviceList", this.pageInfo)
        .then(res => {
          console.log("出库设备列表", res);
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
  }
};
</script>

<style lang="scss" scoped>
.pendEquList {
  width: 95%;
  padding: 30px 2.5%;
  height: auto;
  overflow: auto;
  h2 {
    font-size: 26px;
    line-height: 26px;
    text-align: center;
    margin: 10px 0;
  }
}
</style>
<style lang="scss">
.pendEquList {
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