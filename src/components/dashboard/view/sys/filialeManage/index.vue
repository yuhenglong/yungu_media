<!--
    部门信息操作
 -->
<template>
<el-container style="min-height: 640px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246);border-right: 1px solid #eef1f6;">
    <el-tree :data="companyInfo" node-key="id" :props="defaultProps" class="filiale-tree" ref="tree" @node-click="handleNodeClick" default-expand-all>
        <span slot-scope="{node, data}">
        <i :class="data.icon"></i>
        <span>{{node.label}}</span>

        <!-- <span v-if="node.show">
          <el-button type="text" size="mini"><i class="el-icon-plus c-606266"></i></el-button>
        </span> -->

        </span>
    </el-tree>

  </el-aside>
  
  <el-container>
    
    <el-main>
      <div class="header-actions">
        <el-button size="medium" @click="add">新增</el-button>
      </div>
      <el-table :data="tableData" stripe>
        <el-table-column prop="dept_name" label="部门" width="120"></el-table-column>
        <el-table-column prop="code" label="编码" width="140"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
                <span :class="[scope.row.status === 1?'c-7fcc59':'c-ccc']">{{scope.row.status === 1 ? "可用" : "不可用"}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="cz" label="操作" width="300">
            <template slot-scope="scope">
                <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
                </template>
        </el-table-column>
      </el-table>

      <div class="align-r p20">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNumber"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count">
        </el-pagination>
    </div>

    
    <!-- 新增修改弹框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" center :append-to-body="true">
    <el-form :model="form">

        <el-form-item label="公司">
            <el-select v-model="form.cid" clearable placeholder="请选择" style="width:85%">
                <el-option
                v-for="item in companyPageList"
                :key="item.cid"
                :label="item.company_name"
                :value="item.cid">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="部门">
            <el-input v-model="form.deptName" style="width:85%"></el-input>
        </el-form-item>

        <el-form-item label="编码">
            <el-input v-model="form.code" :disabled="editId != '' ? true : false" style="width:85%"></el-input>
        </el-form-item>

        <el-form-item label="状态">
            <el-radio-group v-model="form.status">
            <el-radio label="1">正常</el-radio>
            <el-radio label="0">不可用</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
    </el-dialog>

    </el-main>
  </el-container>
</el-container>
</template>

<script>
  export default {
    data() {
      return {
        pageNumber: 1,
        pageSize: 10,
        count: 0,
        dialogVisible: false,
        companyInfo: [],
        defaultProps: {
          children: 'children',
          label: 'lable'
        },  
        tableData: [],
        form: {
            cid: "",
            deptName: "",
            code: "",
            status: "1"
        },
        editId: "",
        title: "新增部门",
        companyPageList: []
      }
    },
    methods: {
        add(){
            this.dialogVisible = true;
            this.form.deptName = "";
            this.form.code = "";
            this.form.status = "1";
            this.editId = "";
        },
        edit(index,row){
            this.dialogVisible = true;
            this.form.cid = row.cid;
            this.form.deptName = row.dept_name;
            this.form.code = row.code;
            this.form.status = row.status.toString();
            this.editId = row.did;
        },

        confirm(){//新增修改 确认
            if(this.editId){
                let editObj = Object.assign(this.form, {did: this.editId});
                this.$http.post("/sysDept/updateSysDept",editObj).then(res => {
                if (res.data.meta.code == 200) {
                        this.$message({
                        type: 'success',
                        message: '保存成功!'
                    });
                    this.dialogVisible = false;
                    this.getSysDeptPageList(this.form.cid);
                    }
                if(res.data.meta.code == 400){
                    this.$message.error(res.data.meta.msg);
                    }
                });
            }
            else{
                this.$http.post("/sysDept/insertSysDept", this.form).then(res => {
                if (res.data.meta.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '新增成功!'
                    });

                    this.dialogVisible = false;
                    this.getSysDeptPageList(this.form.cid);
                    }
                if(res.data.meta.code == 400){
                    this.$message.error(res.data.meta.msg);
                    }
                });
            }
            
        },

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.getSysDeptPageList(this.form.cid);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageNumber = val;
            this.getSysDeptPageList(this.form.cid);
        },

        getTreeCompany(){//获取公司信息树形菜单
            this.$http.post("/sysCompany/getTreeCompany").then(res => {
            if (res.data.meta.code == 200) {
                console.log(res.data);
                this.companyInfo = res.data.data.obj;
                this.getSysDeptPageList(res.data.data.obj[0].id);
                let cId = res.data.data.obj[0].id
                this.form.cid = cId;
                
                }
                if(res.data.meta.code == 400){
                    this.$message.error(res.data.meta.msg);
                }
            });
        },

        getSysCompanyPageList(){//获取公司信息分页菜单
            let obj = {
                pageNum: 1,
                pageSize: 100
            }
            this.$http.post("/sysCompany/getSysCompanyPageList",obj).then(res => {
            if (res.data.meta.code == 200) {
                this.companyPageList = res.data.data.obj.data;
                
                }
                if(res.data.meta.code == 400){
                    this.$message.error(res.data.meta.msg);
                }
            });
        },

        
        handleNodeClick(data,node,val2) {//点击获取当前条数据id
            console.log(node.key);
            this.getSysDeptPageList(node.key);
            this.form.cid = node.key;
        },
        getSysDeptPageList(id){//部门信息操作类分页
            let obj = {
                pageNum: this.pageNumber,
                pageSize: this.pageSize,
                cid: id
            }
            this.$http.post("/sysDept/getSysDeptPageList",obj).then(res => {
                if (res.data.meta.code == 200) {
                    console.log(res.data.data.obj);

                    this.tableData = res.data.data.obj.data;
                    this.count = res.data.data.obj.count;
                
                }
            });
        }
    },
    mounted(){
        this.getTreeCompany();
        this.getSysCompanyPageList();
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
    }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .c-606266{
    color: #606266;
  }
  .el-tree-node__content{
      height: 46px !important;
  }
  .el-tree-node .el-tree-node__content{
      height: 36px !important;
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
    .filiale-tree > .el-tree-node__content{
      height: 45px !important;
    }
    .filiale-tree > .el-tree-node .el-tree-node__content{
      height: 40px !important;
    }
</style>