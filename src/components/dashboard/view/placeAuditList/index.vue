<template>
  <div class="placeAuditList">
    <h2>场地项目审核列表</h2>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="维护人员">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开发人员">
        <el-select v-model="formInline.region" placeholder="全部">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目编号">
        <el-input v-model="formInline.user" placeholder="项目编号"></el-input>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="formInline.user" placeholder="项目名称"></el-input>
      </el-form-item>
      <el-form-item label="项目地址">
        <el-input v-model="formInline.user" placeholder="项目地址"></el-input>
      </el-form-item>
      <el-form-item label="所属部门">
        <el-select v-model="formInline.region" placeholder="选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目一级属性">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属区域">
        <linkage></linkage>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="formInline.user" placeholder="项目名称"></el-input>
      </el-form-item>
      <el-form-item label="项目属性">
        <el-select v-model="formInline.region" placeholder="全部">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="管理公司">
        <el-input v-model="formInline.user" placeholder="管理公司"></el-input>
      </el-form-item>
      <el-form-item label="部门选择">
        <el-select v-model="formInline.region" placeholder="选择部门">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="到期时间">
        <el-date-picker v-model="formInline.lastDate" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button type="primary" @click="onSubmit">导出</el-button>
        <router-link to="/addArea" class="el-button primary add_btn">新增场地</router-link>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="areaTableList" border style="width: 100%">
      <el-table-column fixed prop="identification_code" label="项目编号" width="150"></el-table-column>
      <el-table-column prop="project_name" label="项目名称" width="120"></el-table-column>
      <el-table-column prop="project_address" label="城市" width="120"></el-table-column>
      <el-table-column prop="protecter" label="维护人员" width="120"></el-table-column>
      <el-table-column prop="dept" label="所属部门" width="300"></el-table-column>
      <el-table-column prop="developer" label="管理公司" width="120"></el-table-column>
      <el-table-column prop="project_type" label="项目属性" width="120"></el-table-column>
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
          <el-button @click="examine(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="auditLogging(scope.$index,scope.row)" type="text" size="small">审核记录</el-button>
          <el-button type="text" size="small" @click="audit(scope.$index, scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 二次封装分页插件 -->
    <pagination :total="total" @pageChange="changePage"></pagination>
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
  name: "placeAuditList",
  components: {
    linkage,
    pagination,
    dialogAuditList
  },
  data() {
    return {
      title: "审核处理",
      titleTwo: "场地项目审核列表",
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
      areaTableList: []
    };
  },
  methods: {
    deilDel() {
      this.dialogAuditVisible = false;
    },
    onSubmit() {},
    audit(index, row) {
      this.dialogAuditVisible = true;
      this.checkDia.identificationCode = row.identification_code;
      console.log(this.checkDia.identificationCode, "dada");
      this.checkDia.taskId = row.task_id;
    },
    deilComfirm() {
      this.$http
        .post("/areaProjectActivity/areaProjectVerify", this.checkDia)
        .then(res => {
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

    auditLogging(index, row) {
      this.$http
        .post(
          "/yunguVerifyNote/getVerifyNoteListByCode",
          qs.stringify({ code: row.identification_code })
        )
        .then(res => {
          if (res.status == 200) {
            this.dialogCheckVisible = true;
            this.formCheckList = res.data.data.obj;
          }
        });
    },
    changePage(item) {
      this.pageInfo = item;
      this.getTableData();
    },
    getTableData() {
      this.$http
        .post(
          "/yunguAreaProject/getWaitVerifyAreaProjectPageList",
          this.pageInfo
        )
        .then(res => {
          if (res.data.meta.code == 200) {
            this.areaTableList = res.data.data.obj.data;
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
.placeAuditList {
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
