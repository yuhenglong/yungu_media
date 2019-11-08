<template>
  <div class="advertiserList">
    <h1>广告客户管理</h1>
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
        <el-table-column label="产品名称" width="180">
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
        <el-table-column label="联系人" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.contact_phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请人" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.contact_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属部门" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.apply_dept }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剩余保护天数" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.apply_dept }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.verify_stauts }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">禁用</el-button>
            <el-button
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
              v-if="scope.row.verify_stauts == 2?true:false"
            >审核</el-button>
            <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" v-else>审核记录</el-button>
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
  </div>
</template>

<script>
import linkage from "@/components/dashboard/view/linkage";
export default {
  name: "advertiserList",
  components: {
    linkage
  },
  data() {
    return {
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
        .post("/yunguAdCustomer/getYunguAdCustomerPageList", this.pageInfo)
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
.advertiserList {
  width: 95%;
  padding: 30px 2.5%;
  height: auto;
  overflow: auto;
}
</style>
<style lang="scss">
.advertiserList {
  .el-form--inline .el-select {
    width: 200px;
  }
  .el-form--inline .el-form-item__content {
    width: 220px;
  }
}
</style>