<template>
  <div class="equipList">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="设备序号">
        <el-input v-model="formInline.user" placeholder="设备序号"></el-input>
      </el-form-item>
      <el-form-item label="设备名称">
        <el-input v-model="formInline.user" placeholder="设备名称"></el-input>
      </el-form-item>
      <el-form-item label="设备总数">
        <el-input v-model="formInline.user" placeholder="设备总数"></el-input>
      </el-form-item>
      <el-form-item label="设备尺寸">
        <el-input v-model="formInline.user" placeholder="设备尺寸"></el-input>
      </el-form-item>
      <el-form-item label="设备状态">
        <el-select v-model="formInline.region" placeholder="全部">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button type="primary" @click="onSubmit">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="date" label="设备序号" width="150"></el-table-column>
      <el-table-column prop="name" label="设备名称" width="120"></el-table-column>
      <el-table-column prop="province" label="设备型号" width="120"></el-table-column>
      <el-table-column prop="city" label="设备尺寸" width="120"></el-table-column>
      <el-table-column prop="address" label="设备总数量" width="300"></el-table-column>
      <el-table-column prop="zip" label="使用中的设备数量" width="120"></el-table-column>
      <el-table-column prop="zip" label="撤回设备数量" width="120"></el-table-column>
      <el-table-column prop="zip" label="设备状态" width="120"></el-table-column>
      <el-table-column prop="zip" label="入库时间" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">禁用</el-button>
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
  name: "equipList",
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
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
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
    handleClick(row) {
      console.log(row);
    },
    getTableData() {
      this.$http
        .post("/yunguareacontract/getAreaContractPageList", this.pageInfo)
        .then(res => {
          console.log("数据", res);
          if (res.data.meta.code == 200) {
            this.customerTable = res.data.data.obj.data;
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
.equipList {
  width: 95%;
  padding: 30px 2.5%;
  height: auto;
  overflow: auto;
}
</style>
