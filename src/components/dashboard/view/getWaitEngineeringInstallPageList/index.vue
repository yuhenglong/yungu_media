<template>
  <div class="getWaitEngineeringInstallPageList">
    <h2>场地项目安装单审核列表</h2>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="维护人员">
        <el-select v-model="formInline.region" placeholder="维护人员">
          <el-option label="维护人员一" value="shanghai"></el-option>
          <el-option label="维护人员二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开发人员">
        <el-select v-model="formInline.region" placeholder="开发人员">
          <el-option label="开发一" value="shanghai"></el-option>
          <el-option label="开发二" value="beijing"></el-option>
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
        <el-select v-model="formInline.region" placeholder="部门选择">
          <el-option label="部门一" value="shanghai"></el-option>
          <el-option label="部门二二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目一级属性">
        <el-select v-model="formInline.region" placeholder="项目属性">
          <el-option label="属性一" value="shanghai"></el-option>
          <el-option label="属性二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属区域">
        <linkage></linkage>
      </el-form-item>
      <el-form-item label="项目状态">
        <el-select v-model="formInline.region" placeholder="项目状态">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="管理公司">
        <el-input v-model="formInline.user" placeholder="管理公司"></el-input>
      </el-form-item>
      <el-form-item label="安装结果">
        <el-select v-model="formInline.region" placeholder="安装结果">
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
      <el-table-column fixed prop="projectCode" label="项目编号" width="150"></el-table-column>
      <el-table-column prop="projectName" label="项目名称" width="120"></el-table-column>
      <el-table-column prop="projectAddress" label="城市" width="120"></el-table-column>
      <el-table-column prop="protecter" label="维护人员" width="120"></el-table-column>
      <el-table-column prop="dept" label="所属部门" width="300"></el-table-column>
      <el-table-column prop="developer" label="管理公司" width="120"></el-table-column>
      <el-table-column prop="projectType" label="项目属性" width="120"></el-table-column>
      <el-table-column prop="activityStatus" label="项目状态" width="120"></el-table-column>
      <el-table-column label="业务状态" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.verifyStatus == 0">审核不通过</span>
          <span v-else-if="scope.row.verifyStatus == 1">审核通过</span>
          <span v-else-if="scope.row.verifyStatus == 2">待审核</span>
          <span v-else-if="scope.row.verifyStatus == 3">编辑状态</span>
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
      <!-- <el-table :data="formCheckList" border>
        <el-table-column property="identificationCode" label="序号"></el-table-column>
        <el-table-column property="verifyUserName" label="审核用户"></el-table-column>
        <el-table-column property="verifyResult" label="审核结果"></el-table-column>
        <el-table-column property="type" label="审核类型"></el-table-column>
        <el-table-column property="refuseReason" label="拒绝原因"></el-table-column>
        <el-table-column property="verifyTime" label="添加时间"></el-table-column>
      </el-table> -->
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
  name: "getWaitEngineeringInstallPageList",
  components: {
    linkage,
    pagination,
    dialogAuditList
  },
  data() {
    return {
      title: "审核处理",
      titleTwo: "场地项目单安装单审核列表",
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
        type: 6,
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
    audit(index, row) {
      console.log("每行数据", row);
      this.dialogAuditVisible = true;
      this.checkDia.identificationCode = row.installCode;
      this.checkDia.taskId = row.taskId;
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
      this.$router.push({ path: "/checkPlaInstall", query: { sid: row.sid } });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageInfo.pageNum = val;
      this.getTableData();
    },
    onSubmit() {
      console.log("submit!");
    },
    auditLogging(index, row) {
      this.$http
        .post(
          "/yunguVerifyNote/getVerifyNoteListByCode",
          qs.stringify({ code: row.installCode })
        )
        .then(res => {
          if (res.data.meta.code == 200) {
            this.dialogCheckVisible = true;
            this.formCheckList = res.data.data.obj;
            console.log("获取回来的数据", this.formCheckList);
          }
        });
    },
    handleClick(row) {
      console.log(row);
    },
    changePage(item) {
      this.pageInfo = item;
      this.getTableData();
    },
    getTableData() {
      this.$http
        .post("/yunguInstallList/getWaitManagerInstallPageList", this.pageInfo)
        .then(res => {
          console.log("数据", res);
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
.getWaitEngineeringInstallPageList {
  width: 95%;
  padding: 30px 2.5%;
  height: auto;
  overflow: auto;
  h2 {
    font-size: 26px;
    line-height: 26px;
    margin: 10px 0;
    text-align: center;
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
