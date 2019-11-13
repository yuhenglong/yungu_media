<template>
  <div class="equipList">
    <h2>设备列表</h2>
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
        <el-button type="primary" @click="serch">搜索</el-button>
        <el-button type="primary" @click="addNewEquip">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="equipTable" border style="width: 100%">
      <el-table-column fixed prop="eid" label="设备序号" width="150"></el-table-column>
      <el-table-column prop="equipment_name" label="设备名称" width="120"></el-table-column>
      <el-table-column prop="equipment_detail" label="设备型号" width="120"></el-table-column>
      <el-table-column prop="euqipment_size" label="设备尺寸" width="120"></el-table-column>
      <el-table-column prop="equipment_count" label="设备总数量" width="300"></el-table-column>
      <el-table-column prop="intallon_number" label="使用中的设备数量" width="120"></el-table-column>
      <el-table-column prop="equipment_number" label="撤回设备数量" width="120"></el-table-column>
      <el-table-column label="设备状态" width="120">
        <template slot-scope="scope">
          <span
            :class="scope.row.euqipment_status == 0?'':'textSty'"
          >{{ scope.row.euqipment_status == 0?'启用':'禁止' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="zip" label="入库时间" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="checkTable(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="editTable(scope.row)" type="text" size="small">编辑</el-button>
          <el-button
            @click="saveEdit(scope.row)"
            type="text"
            size="small"
          >{{scope.row.euqipment_status == 1?'启用':'禁止'}}</el-button>
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
      equipTable: []
    };
  },
  methods: {
    serch(){

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
    addNewEquip() {
      this.$router.push('/addNewEquip');
    },
    checkTable(row) {
      console.log(row);
      this.$router.push({
        name: "checkEquipTable",
        query: row
      });
    },
    saveEdit(row) {
      const obj = {
        adjustReason: row.adjust_reason,
        eid:row.eid,
        equipmentCount: row.equipment_count,
        equipmentDetail: row.equipment_detail,
        equipmentName: row.equipment_name,
        equipmentNumber: row.equipment_number,
        euqipmentSize: row.euqipment_size,
        euqipmentStatus: row.euqipment_status == 0?'1':'0',
        intallonNumber: row.intallon_number
      };
      this.$http.post("/yunguEquipment/updateYunguEquipment", obj).then(res => {
        console.log("上传回调", res);
        if (res.data.meta.code == 200) {
          window.location.reload();
        }
      });
    },
    editTable(row) {
      this.$router.push({
        name: "editEquipTable",
        query: row
      });
    },
    getTableData() {
      this.$http
        .post("/yunguEquipment/getYunguEquipmentPageList", this.pageInfo)
        .then(res => {
          console.log("数据", res);
          if (res.data.meta.code == 200) {
            this.equipTable = res.data.data.obj.data;
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
  h2 {
    font-size: 26px;
    line-height: 26px;
    margin: 10px 0;
  }
  .textSty {
    color: red;
  }
}
</style>
