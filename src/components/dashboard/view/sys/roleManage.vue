<!-- 
    角色
-->
<template>
  <div class="box">
    <div slot="header-actions" class="header-actions">
      <el-button size="medium" @click="add">新增</el-button>
    </div>

    <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="role_name" label="角色" width="180"></el-table-column>
        <el-table-column prop="status" label="状态" width="180">
            <template slot-scope="scope">
                <span :class="[scope.row.status === 1?'c-7fcc59':'c-ccc']">{{scope.row.status === 1 ? "可用" : "不可用"}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column prop="cz" label="操作" width="300">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleView(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="primary" @click="permissions(scope.$index, scope.row)">权限</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        <el-form-item label="名称">
            <el-input v-model="form.roleName" style="width:85%"></el-input>
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

    <!-- 赋予权限弹框 -->
    <el-dialog title="给角色赋予菜单权限" :visible.sync="permissionsVisible" width="30%" center :append-to-body="true">
        <el-tree
            :data="resourceList"
            show-checkbox
            node-key="id"
            default-expand-all
            ref="tree"
            :default-checked-keys="defaultCheckedKeys"
            :props="defaultProps">
        </el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button @click="permissionsVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmPermissions">确 定</el-button>
        </div>

    </el-dialog>
  </div>
</template>
<script>

import echarts from "echarts";
import qs from "qs";
export default {
  name: "sys-user-controller",
  data() {
      return {
      pageNumber: 1,
      pageSize: 10,
      count: 0,
      tableData: [],
      dialogVisible: false,
      permissionsVisible: false,//权限弹框
      currentRow: "",//权限 当前行信息
      defaultCheckedKeys: [],
      resourceList: [],
      defaultProps: {
          children: 'children',
          label: 'label'
        },
      editId: "",
      form: {
        roleName: "",
        status: "1"
      },
      title: "新增角色"
      }
  },
  computed: {
    currentPage(){
        return this.count/this.pageSize;
    }   
  },
  methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.get();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageNumber = val;
        this.get();
      },

      permissions(index,row){
          this.permissionsVisible = true;
          this.currentRow = row;
                
            if (this.$refs.tree) {
                this.$refs.tree.setCheckedKeys([]);
            }

            this.$http.post("/sysRole/getResourceByRoleId",qs.stringify({"roleId": row.rid})).then(res => {
            if (res.data.meta.code == 200) {
                this.defaultCheckedKeys = res.data.data.obj;
                }
                if(res.data.meta.code == 400){
                    this.$message.error(res.data.meta.msg);
                }
            });

      },
      confirmPermissions(){//赋予权限确定
          let key = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
          let obj = {
              resourceIds: key.join(","),
              roleId: this.currentRow.rid
          }

           this.$http.post("/sysRole/grantResourceToRole",qs.stringify(obj)).then(res => {
            if (res.data.meta.code == 200) {
                this.resourceList = res.data.data.obj;
                this.$message({
                    type: 'success',
                    message: '赋予权限成功!'
                });
                this.get();
                this.permissionsVisible = false;
                }
                if(res.data.meta.code == 400){
                    this.$message.error(res.data.meta.msg);
                }
            });
      },
      getAllResourceList(){//获取权限列表
        this.$http.post("/sysResource/getAllResourceList").then(res => {
            if (res.data.meta.code == 200) {
                this.resourceList = res.data.data.obj;
            }
        });
      },
      add(){//新增
          this.dialogVisible = true;
          this.editId = "";
          this.form.roleName = "";
          this.form.status = "1";
          this.title = "新增角色";
      },
      handleView(index,row){//修改
        this.dialogVisible = true;
        this.title = "修改角色";


        this.$http.post("/sysRole/getSysRoleById",qs.stringify({"id": row.rid})).then(res => {
            if (res.data.meta.code == 200) {
                    this.form.roleName = res.data.data.obj.roleName;
                    this.form.status = res.data.data.obj.status === 0 ? "0" : "1";
                    this.editId = res.data.data.obj.rid;
                }
            if(res.data.meta.code == 400){
                this.$message.error(res.data.meta.msg);
            }
        });

    },
    
    confirm(){//新增修改 确认
        if(this.editId){
            let editObj = {
                roleName: this.form.roleName,
                status: this.form.status,
                rid: this.editId 
            }

            this.$http.post("/sysRole/updateSysRole",editObj).then(res => {
            if (res.data.meta.code == 200) {
                    this.$message({
                    type: 'success',
                    message: '保存成功!'
                });
                this.form.roleName = "";
                this.form.status = "1";
                this.editId = "";
                this.get();
                this.dialogVisible = false;
                }
            if(res.data.meta.code == 400){
                this.$message.error(res.data.meta.msg);
                }
            });
        }
        else{
            this.$http.post("/sysRole/insertSysRole",this.form).then(res => {
            if (res.data.meta.code == 200) {
                   this.$message({
                    type: 'success',
                    message: '新增成功!'
                });
                this.form.roleName = "";
                this.form.status = "1";
                this.editId = ""
                this.get();
                this.dialogVisible = false;
                }
            if(res.data.meta.code == 400){
                this.$message.error(res.data.meta.msg);
                }
            });
        }
        
    },
    
    handleDelete(index,row){//删除
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

            this.$http.post("/sysRole/deleteSysRoleByIds",qs.stringify({"ids":row.rid})).then(res => {
            if (res.data.meta.code == 200) {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
               this.get();
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
    get(){
        let obj = {
            pageNum: this.pageNumber,
            pageSize: this.pageSize
        }

        this.$http.post("/sysRole/getSysRolePageList",obj).then(res => {
            if (res.data.meta.code == 200) {
                console.log(res.data.data.obj);

                this.tableData = res.data.data.obj.data;
                this.count = res.data.data.obj.count;
            
            }
        });
        }
    
  },
  mounted() {
      this.get();
      this.getAllResourceList();
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
    .box{
        width: 100%;
        padding: 10px;
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