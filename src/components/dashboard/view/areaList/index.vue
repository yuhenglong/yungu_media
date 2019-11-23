<template>
  <div class="areaList">
    <h2>场地项目列表</h2>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="合同编号">
        <el-input v-model="formInline.user" placeholder="合同编号"></el-input>
      </el-form-item>
      <el-form-item label="合同类型">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="维护人员">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开发人员">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核阶段">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
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
      <el-table-column prop="customer_id" label="管理公司" width="120"></el-table-column>
      <el-table-column prop="project_type" label="项目属性" width="120"></el-table-column>
      <el-table-column prop="activity_status" label="项目状态" width="120"></el-table-column>
      <el-table-column prop="verify_status" label="业务状态" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="examine(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="editPage(scope.$index,scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="auditLogging(scope.$index,scope.row)">审核记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagi">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.pageInfo.pageNum"
        :page-sizes="[10, 20]"
        :page-size="this.pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
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
export default {
  name: "areaList",
  components: {},
  data() {
    return {
      formInline: {
        user: "",
        region: "",
        lastDate: ""
      },
      formCheckList: {
        identificationCode: "",
        verifyUserName: "",
        verifyResult: "",
        type: "",
        refuseReason: "",
        verifyTime: ""
      },
      labelPosition: "right",
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      areaTableList: [],
      title: "编辑场地项目",
      titleTwo: "场地项目审核列表",
      dialogEditVisible: false,
      dialogCheckVisible: false,
      formRowList: {
        identification_code: "",
        project_name: "",
        project_address: "",
        protecter: "",
        dept: "",
        developer: "",
        project_type: "",
        activity_status: "",
        verify_status: ""
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageInfo.pageSize = val;
      this.getTableData();
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
    examine(row) {
      console.log(row);
      localStorage.setItem("identification_code", row.identification_code);
      localStorage.setItem("aid", row.aid);
      this.$router.push("/examinePage");
    },
    editPage(index, row) {
      localStorage.setItem("aid", row.aid);
      localStorage.setItem("identification_code", row.identification_code);
      this.$router.push("/editPlaceAudit");
    },
    getTableData() {
      this.$http
        .post("/yunguAreaProject/getYunguAreaProjectPageList", this.pageInfo)
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
.areaList {
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
