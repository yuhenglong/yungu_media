<template>
  <div class="contractList">
    <h2>待处理的场地合同列表</h2>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="项目名称">
        <el-input v-model="formInline.user" placeholder="项目名称"></el-input>
      </el-form-item>
      <el-form-item label="合同编号">
        <el-input v-model="formInline.user" placeholder="合同编号"></el-input>
      </el-form-item>
      <el-form-item label="合同类型">
        <el-select v-model="formInline.region" placeholder="全部">
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
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%;overflow:auto;height:auto;">
      <el-table-column prop="contract_code" label="合同编号"></el-table-column>
      <el-table-column prop="project_name" label="项目名称"></el-table-column>
      <el-table-column prop="project_address" label="项目所在地区"></el-table-column>
      <el-table-column prop="project_type" label="项目属性"></el-table-column>
      <el-table-column prop="contract_type" label="合同类型"></el-table-column>
      <el-table-column prop="dept" label="部门"></el-table-column>
      <el-table-column prop="developer" label="开发人员"></el-table-column>
      <el-table-column prop="protecter" label="维护人员"></el-table-column>
      <el-table-column prop="contract_endtime" label="到期时间"></el-table-column>
      <el-table-column prop="media_number" label="媒体签约间数"></el-table-column>
      <el-table-column prop="activity_status" label="项目状态"></el-table-column>
      <el-table-column label="业务状态">
        <template slot-scope="scope">
          <span v-if="scope.row.verify_status == null">待录入合同信息</span>
          <span v-if="scope.row.verify_status == 0">未通过</span>
          <span v-if="scope.row.verify_status == 1">已通过</span>
          <span v-if="scope.row.verify_status == 2">审核中</span>
          <span v-if="scope.row.verify_status == 3">编辑状态</span>
          <span v-if="scope.row.verify_status == 4">付款计划审核中</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="examine(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="auditLogging(scope.$index,scope.row)" type="text" size="small">审核记录</el-button>
          <el-button type="text" size="small" @click="audit(scope.$index, scope.row)">审核</el-button>
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
        style="width:100%;height:100px;"
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
import qs from 'qs';
export default {
  name: "contractList",
  components: {},
  data() {
    return {
      titleTwo: "待审核场地项目列表",
      dialogCheckVisible: false,
      dialogAuditVisible: false,
      title: "审核信息",
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
      total: 0,
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      checkDia: {
        verifyResult: "",
        type: 3,
        refuseReason: "",
        identificationCode: "",
        taskId: ""
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    auditLogging(index, row) {
      this.$http
        .post(
          "/yunguVerifyNote/getVerifyNoteListByCode",
          qs.stringify({ code: row.identification_code })
        )
        .then(res => {
          if (res.status == 200) {
            this.dialogCheckVisible = true;
            console.log("查看的数据", res);
            this.formCheckList = res.data.data.obj;
          }
        });
    },
    deilDel() {
      this.dialogAuditVisible = false;
    },
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
    routerNext(row) {
      console.log("这是每行的信息", row);
      localStorage.setItem("task_id", row.task_id);
      this.$router.push("/addContract");
    },
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
    examine(row) {
      console.log('待处理',row);
      localStorage.setItem("aid", row.aid);
      this.$router.push("/checkContract");
    },
    lookConInfo(row) {
      console.log(row);
      localStorage.setItem("contract_id", row.contract_id);
    },
    getTableData() {
      this.$http
        .post(
          "/yunguareacontract/getWaitVerifyAreaContractPageList",
          this.pageInfo
        )
        .then(res => {
          console.log("合同数据", res);
          if (res.data.meta.code == 200) {
            this.tableData = res.data.data.obj.data;
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
.contractList {
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
