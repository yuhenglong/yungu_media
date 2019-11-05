<template>
<el-container class="resource-con" style="min-height: 640px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246);border-right: 1px solid #eef1f6;">
    <el-tree :data="companyInfo" node-key="id" :props="defaultProps" class="resource-tree" ref="tree" @node-click="handleNodeClick" default-expand-all>
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
        <el-table-column prop="seq" label="排序" width="50"></el-table-column>
        <el-table-column prop="icon" label="图标名称" width="120">
          <template slot-scope="scope">
            {{scope.row.icon ? scope.row.icon : "--"}}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="资源名称" width="120">
          <template slot-scope="scope">
            <icon :class="scope.row.icon" v-if="scope.row.icon"></icon>
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="60">
          <template slot-scope="scope">
            {{scope.row.type == 1 ? "菜单" : "功能"}}
          </template>
        </el-table-column>
        <el-table-column prop="description" label="资源描述" width="140">
          <template slot-scope="scope">
            {{scope.row.description ? scope.row.description : "--"}}
          </template>
        </el-table-column>

        <el-table-column prop="url" label="URL链接" width="140"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
                <span :class="[scope.row.status === 1?'c-7fcc59':'c-ccc']">{{scope.row.status === 1 ? "可用" : "不可用"}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="cz" label="操作" width="200">
            <template slot-scope="scope">
                <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
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
    <el-form :model="form" class="resource-form-com" :rules="rules" ref="rulesForm">

        <el-form-item label="资源名称" prop="name"> 
            <el-input v-model="form.name" style="width:75%"></el-input>
        </el-form-item>

        <el-form-item label="图标名称" prop="icon">
            <el-input v-model="form.icon" style="width:75%"></el-input>
        </el-form-item>

        <el-form-item label="URL链接" prop="url" v-if="form.type != 1">
            <el-input v-model="form.url" style="width:75%"></el-input>
        </el-form-item>

        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" clearable placeholder="请选择" style="width:75%" @change="changeSelect">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

         <el-form-item label="排序" prop="seq">
            <el-input v-model="form.seq" type="number" style="width:75%"></el-input>
        </el-form-item>

        <el-form-item label="描述">
            <el-input v-model="form.description" type="textarea" :rows="2" placeholder="请输入资源描述" style="width:75%"></el-input>
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
  import qs from "qs";
  export default {
    data() {
      return {
        pageNumber: 1,
        pageSize: 10,
        count: 0,
        companyInfo: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },  
        tableData: [],
        dialogVisible: false,
        title: "新增",
        form: {
          type: "1",
          name: "",
          icon: "",
          url: "", 
          seq: "",
          description: "",
          status: "1"
        },
        rules: {
            name: [ 
                { required: true, message: "请输入资源名称", trigger: "blur" },
            ],
            icon: [  
                { required: true, message: "请输入图标名称", trigger: "blur" },
            ],
            url: [
                { required: true, message: "请输入URL链接", trigger: "blur" },
            ],
            seq: [
                { required: true, message: "请输入排序号", trigger: "blur" },
            ],
            type: [
              { required: true, message: "请输入选中类型", trigger: "blur" },
            ]
        },
        parentId: "",
        editId: "",
        options: [{
          value: '1',
          label: '菜单'
        }, {
          value: '2',
          label: '功能'
        }],
      }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.getSysDeptPageList();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageNumber = val;
            this.getSysDeptPageList();
        },
        changeSelect(val){
          if(val == 1){
            this.form.url = "";
          }
        },

        add(){
          this.dialogVisible = true;
          this.title = "新增";
          let formObj = {
            type: "1",
            name: "",
            icon: "",
            url: "", 
            seq: "",
            description: "",
            status: "1"
          };

          this.form = formObj;
        },
        edit(index,row){
          this.dialogVisible = true;
          this.title = "修改";

          let formObj = {
            type: row.type.toString(),
            name: row.name,
            icon: row.icon,
            url: row.url,
            seq: row.seq, 
            description: row.description,
            status: row.status.toString()
          };
          this.editId = row.id;
          this.form = formObj;
        },
        del(index,row){
        
          this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {

            this.$http.post("/sysResource/deleteSysResourceByIds",qs.stringify({"ids":row.id})).then(res => {
              if (res.data.meta.code == 200) {
                  this.$message({
                      type: 'success',
                      message: '删除成功!'
                  });
                this.getSysDeptPageList(this.parentId);
              }
              if(res.data.meta.code == 400){
                  this.$message.error(res.data.meta.msg);
              }
            });

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });

        },
        confirm(){//新增修改 确认

            if(this.editId){

                let formData = Object.assign(this.form,{id: this.editId,parentId: this.parentId});
                this.$http.post("/sysResource/updateSysResource",formData).then(res => {
                if (res.data.meta.code == 200) {
                        this.$message({
                        type: 'success',
                        message: '保存成功!'
                    });
                    this.getSysDeptPageList(this.parentId);
                    this.dialogVisible = false;
                    }
                if(res.data.meta.code == 400){
                    this.$message.error(res.data.meta.msg);
                    }
                });
            }
            else{
                let formData = Object.assign(this.form,{parentId: this.parentId}); 
                this.$http.post("/sysResource/insertSysResource",formData).then(res => {
                if (res.data.meta.code == 200) {
                      this.$message({
                        type: 'success',
                        message: '新增成功!'
                    });
                    this.getSysDeptPageList(this.parentId);
                    this.dialogVisible = false;
                    }
                if(res.data.meta.code == 400){
                    this.$message.error(res.data.meta.msg);
                    }
                });
            }
            
        },

        getTreeCompany(){//获取公司信息树形菜单
            this.$http.post("/sysResource/getAllResourceList").then(res => {
            if (res.data.meta.code == 200) {
                console.log(res.data);
                this.companyInfo = res.data.data.obj;
                let pId = res.data.data.obj[0].id;
                this.getSysDeptPageList(pId);
                this.parentId = pId;
                }
                if(res.data.meta.code == 400){
                    this.$message.error(res.data.meta.msg);
                }
            });
        },
        
        handleNodeClick(data,node,val2) {
            console.log(node.key);
            this.getSysDeptPageList(node.key);
            this.parentId = node.key;
            
        },
        getSysDeptPageList(id){//部门信息操作类分页
            let obj = {
                pageNum: this.pageNumber,
                pageSize: this.pageSize,
                parentId: id
            }
            this.$http.post("/sysResource/getSysResourcePageList",obj).then(res => {
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
    .resource-form-com > .el-form-item > .el-form-item__label{
        width: 80px !important;
    }
     
    .resource-tree > .el-tree-node__content{
      height: 45px !important;
    }
    .resource-tree > .el-tree-node .el-tree-node__content{
      height: 35px !important;
    }
</style>