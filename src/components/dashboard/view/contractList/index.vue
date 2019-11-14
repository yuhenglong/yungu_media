<template>
  <div class="contractList">
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
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="contract_code" label="合同编号"></el-table-column>
      <el-table-column prop="project_name" label="项目名称" width="120"></el-table-column>
      <el-table-column prop="project_address" label="项目所在地区"></el-table-column>
      <el-table-column prop="project_type" label="项目属性"></el-table-column>
      <el-table-column prop="contract_type" label="合同类型" width="120"></el-table-column>
      <el-table-column prop="dept" label="部门" width="120"></el-table-column>
      <el-table-column prop="developer" label="开发人员" width="120"></el-table-column>
      <el-table-column prop="protecter" label="维护人员" width="120"></el-table-column>
      <el-table-column prop="contract_endtime" label="到期时间"></el-table-column>
      <el-table-column prop="media_number" label="媒体签约间数" width="120"></el-table-column>
      <el-table-column prop="activity_status" label="项目状态" width="120"></el-table-column>
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
          <el-button @click="examine(scope.row)" type="text" size="small">查看项目信息</el-button>
          <el-button
            @click="lookConInfo(scope.row)"
            v-if="scope.row.verify_status !== null"
            type="text"
            size="small"
          >查看合同信息</el-button>
          <el-button
            type="text"
            size="small"
            v-if="scope.row.contract_code == null || scope.row.contract_code == ''"
          >录入</el-button>
          <el-button type="text" size="small" v-else>编辑</el-button>
          <el-button
            @click="handleClick(scope.row)"
            type="text"
            size="small"
            v-if="!scope.row.verify_status == null"
          >查看审核记录</el-button>
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
  </div>
</template>

<script>
export default {
  name: "contractList",
  components: {},
  data() {
    return {
      formInline: {
        user: "",
        region: "",
        lastDate: ""
      },
      total: 0,
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      tableData: []
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageInfo.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageInfo.pageNum = val;
    },
    onSubmit() {
      console.log("submit!");
    },
    examine(row) {
      console.log(row);
      localStorage.setItem("aid", row.aid);
      this.$router.push("/examinePage");
    },
    lookConInfo(row) {
      console.log(row);
      localStorage.setItem('contract_id',row.contract_id);
      
    },
    getTableData() {
      this.$http
        .post("/yunguareacontract/getAreaContractPageList", this.pageInfo)
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
}
</style>
