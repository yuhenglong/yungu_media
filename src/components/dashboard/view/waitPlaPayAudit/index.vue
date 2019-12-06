<template>
  <div class="waitPlaPayAudit">
    <h2>待处理的场地付款计划列表</h2>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="150px">
      <el-form-item label="合同编号">
        <el-input v-model="formInline.user" placeholder="合同编号"></el-input>
      </el-form-item>
      <el-form-item label="合同类型">
        <el-select v-model="formInline.region" placeholder="全部">
          <el-option label="维护人员一" value="shanghai"></el-option>
          <el-option label="维护人员二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="维护人员">
        <el-select v-model="formInline.region" placeholder="全部">
          <el-option label="开发一" value="shanghai"></el-option>
          <el-option label="开发二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开发人员">
        <el-select v-model="formInline.region" placeholder="全部">
          <el-option label="开发一" value="shanghai"></el-option>
          <el-option label="开发二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核阶段">
        <el-select v-model="formInline.region" placeholder="全部">
          <el-option label="开发一" value="shanghai"></el-option>
          <el-option label="开发二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="formInline.user" placeholder="项目名称"></el-input>
      </el-form-item>
      <el-form-item label="项目属性">
        <el-select v-model="formInline.region" placeholder="全部">
          <el-option label="开发一" value="shanghai"></el-option>
          <el-option label="开发二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="管理公司">
        <el-input v-model="formInline.user" placeholder="管理公司"></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-select v-model="formInline.region" placeholder="全部">
          <el-option label="部门一" value="shanghai"></el-option>
          <el-option label="部门二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="实际执行时间">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="payTableList" border style="width: 100%">
      <el-table-column fixed prop="contract_code" label="合同编号" width="150"></el-table-column>
      <el-table-column prop="project_name" label="项目名称" width="120"></el-table-column>
      <el-table-column prop="project_address" label="项目所在地区" width="120"></el-table-column>
      <el-table-column prop="project_type" label="项目属性" width="120"></el-table-column>
      <el-table-column prop="contract_type" label="合同类型" width="120"></el-table-column>
      <el-table-column prop="dept" label="部门" width="120"></el-table-column>
      <el-table-column prop="developer" label="开发人员" width="120"></el-table-column>
      <el-table-column prop="protecter" label="维护人员" width="120"></el-table-column>
      <el-table-column prop="oprator_time" label="执行期间" width="120"></el-table-column>
      <el-table-column prop="media_number" label="媒体签约数" width="120"></el-table-column>
      <el-table-column prop="activity_status" label="项目状态" width="120"></el-table-column>
      <el-table-column label="业务状态" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.verify_status == 0">审核不通过</span>
          <span v-else-if="scope.row.verify_status == 1">审核通过</span>
          <span v-else-if="scope.row.verify_status == 2">待审核</span>
          <span v-else-if="scope.row.verify_status == 3">编辑状态</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width>
        <template slot-scope="scope">
          <el-button @click="checkItemInfo(scope.row)" type="text" size="small">查看项目信息</el-button>
          <el-button @click="checkContractInfo(scope.row)" type="text" size="small">查看合同信息</el-button>
          <el-button @click="auditLogging(scope.row)" type="text" size="small">查看审核记录</el-button>
          <el-button @click="audit(scope.$index, scope.row)" type="text" size="small">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 二次封装分页插件 -->
    <pagination :total="total" @pageChange="changePage"></pagination>
    <!-- 查看审核记录 -->
    <el-dialog
      :title="title"
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
    <!-- 审核 -->
    <el-dialog
      :title="titleTwo"
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
import pagination from "@/components/dashboard/view/pagination";
export default {
  name: "waitPlaPayAudit",
  components: {
    pagination
  },
  data() {
    return {
      date: "",
      title: "查看审核记录",
      titleTwo: "审核处理",
      dialogCheckVisible: false,
      dialogAuditVisible: false,
      formCheckList: {
        identificationCode: "",
        verifyUserName: "",
        verifyResult: "",
        type: "",
        refuseReason: "",
        verifyTime: ""
      },
      checkDia: {
        verifyResult: "",
        type: 3,
        refuseReason: "",
        identificationCode: "",
        taskId: ""
      },
      formInline: {
        user: "",
        region: "",
        lastDate: ""
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      payTableList: []
    };
  },
  methods: {
    checkItemInfo(row) {
      localStorage.setItem("aid", row.aid);
      this.$router.push("/examinePage");
    },
    checkContractInfo(row) {
      console.log("每行信息 ", row);
      localStorage.setItem("contract_id", row.contract_id);
      this.$router.push("/lookConInfo");
    },
    deilDel() {
      this.dialogAuditVisible = false;
    },
    onSubmit() {},
    audit(index, row) {
      this.dialogAuditVisible = true;
      console.log(row);
      this.checkDia.identificationCode = row.contract_code;
      this.checkDia.taskId = row.task_id;
    },
    deilComfirm() {
      this.$http
        .post("/areaProjectActivity/areaProjectVerify", this.checkDia)
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
    checkDialog(index, row) {
      console.log(index, row);
      this.$http
        .post(
          "/yunguVerifyNote/getVerifyNoteListByCode",
          qs.stringify({ code: row.identification_code })
        )
        .then(res => {
          if (res.data.meta.code == 200) {
            this.dialogCheckVisible = true;
            this.formCheckList = res.data.data.obj;
            console.log(this.formCheckList);
          }
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageInfo.pageSize = val;
      this.getTableData();
    },
    examine(row) {
      this.$router.push("/examinePage");
      console.log(row);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageInfo.pageNum = val;
      this.getTableData();
    },
    auditLogging(row) {
      console.log("这是状态码", row);
      this.$http
        .post(
          "/yunguVerifyNote/getVerifyNoteListByCode",
          qs.stringify({ code: row.contract_code })
        )
        .then(res => {
          if (res.data.meta.code == 200) {
            this.dialogCheckVisible = true;
            this.formCheckList = res.data.data.obj;
            console.log(this.formCheckList);
          }
        });
    },
    changePage(item) {
      this.pageInfo = item;
      this.getTableData();
    },
    getTableData() {
      this.$http
        .post("/areaFinance/getWaitVerifyAreaPayPageList", this.pageInfo)
        .then(res => {
          console.log("财务付款数据", res);
          if (res.data.meta.code == 200) {
            this.payTableList = res.data.data.obj.data;
            this.total = res.data.data.obj.count;
          }
        });
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>

<style lang="scss" scoped>
.waitPlaPayAudit {
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
  .pagi {
    width: 100%;
    height: 100px;
  }
  .add_btn {
    text-decoration: none;
    color: #fff;
    background-color: #409eff;
  }
}
</style>
