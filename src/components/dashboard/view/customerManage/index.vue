<template>
  <div class="customerManage">
    <h1 style="text-align:center;">场地客户管理</h1>
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
            <span>{{ scope.row.apply_dept }}</span>
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
              @click="handleDelete(scope.$index, scope.row)"
            >{{ scope.row.status !==0?"启用":"禁用" }}</el-button>
            <el-button
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
              v-if="scope.row.verify_stauts ==1 && scope.row.status ==1?'true':'false'"
            >编辑</el-button>
            <el-button size="mini" @click="look(scope.$index, scope.row)">查看审核记录</el-button>
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
  </div>
</template>

<script>
import linkage from "@/components/dashboard/view/linkage";
export default {
  name: "customerManage",
  components: {
    linkage
  },
  data() {
    return {
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
    onSubmit() {
      console.log("submit!");
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
  }
};
</script>

<style lang="scss" scoped>
.customerManage {
  width: 95%;
  padding: 30px 2.5%;
  height: auto;
  overflow: auto;
}
</style>
<style lang="scss">
.customerManage {
  .el-form--inline .el-select {
    width: 200px;
  }
  .el-form--inline .el-form-item__content {
    width: 220px;
  }
  .textSty{
    color:red;
  }
}
</style>