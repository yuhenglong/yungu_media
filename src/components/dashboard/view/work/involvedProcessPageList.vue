<template>
  <div class="box">
      <el-breadcrumb class="breadcrumb-style" separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>已办流程</el-breadcrumb-item>
        </el-breadcrumb>

    <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="processName" label="流程名称" width="180"></el-table-column>
          <el-table-column prop="startUser" label="发起人"></el-table-column>
          <el-table-column prop="startTime" label="创建时间" width="300"></el-table-column>
        <!-- <el-table-column prop="cz" label="操作" width="300">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleView(scope.$index, scope.row)">编辑</el-button>
                </template>
        </el-table-column> -->
    </el-table>
    <div class="align-r p20">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count">
        </el-pagination>
    </div>

  </div>
</template>
<script>

import echarts from "echarts";
import qs from "qs";
export default {
  name: "sys-user-controller",
  data() {
      return {
        pageNum: 1,
        pageSize: 10,
        count:0,
        tableData: [],
      }
  },
  methods: {
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getPage();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageNum = val;
        this.getPage();
      },
    
    getPage(){//获取分页
        let obj = {
            pageNum: this.pageNum,
            pageSize: this.pageSize
        }

        this.$http.post("/activity/getMyInvolvedProcessPageList",obj).then(res => {
            console.log("带token请求回来的数据", res);
            if (res.data.meta.code == 200) {
                console.log(res.data.data.obj);

                this.tableData = res.data.data.data.data;
                this.count = res.data.data.data.count;
            
            }
        });
        },
    
  },
  mounted() {
      this.getPage();
  }
};
</script>
<style lang="scss" scoped>
    .header-actions{
        border: 1px solid #ebeef5;   
        background: #fafafa;
        padding: 5px;
        box-sizing: border-box;
    }
    .el-table{
        border-left: 1px solid #ebeef5;   
        border-right: 1px solid #ebeef5;   
        border-top: 1px solid #ebeef5;   
    }
    .box{
        width: 100%;
        padding: 10px 20px;
        box-sizing: border-box;
    }
    .c-7fcc59{
        color: #7fcc59;
    }
    .c-ccc{
        color: #ccc;
    }
    .align-r{
        text-align: right;
    } 
    .p20{
        padding: 20px;
    }
</style>
<style>
    .form-com > .el-form-item > .el-form-item__label{
        width: 52px !important;
    }
</style>
