<template>
  <div class="box">
    <div slot="header-actions" class="header-actions">
      <el-button size="medium" @click="add">新增</el-button>
    </div>

    <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="dept_name" label="部门"></el-table-column>
        <el-table-column prop="real_name" label="昵称"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="user_name" label="用户名称"></el-table-column>
        <el-table-column prop="phone" label="手机" width="150"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
        <el-table-column prop="sex" label="性别" width="60">
             <template slot-scope="scope">
                 {{scope.row.sex == 1 ? "男" : "女"}}
             </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="60">
            <template slot-scope="scope">
                <span :class="[scope.row.status === 1?'c-7fcc59':'c-ccc']">{{scope.row.status === 1 ? "正常" : "不可用"}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column prop="cz" label="操作" width="300">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleView(scope.$index, scope.row)">编辑</el-button>
                </template>
        </el-table-column>
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


    <!-- 新增修改弹框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" center :append-to-body="true">
    <el-form :model="form" class="form-com" :rules="rules" ref="rulesForm">
        <el-form-item label="用户" prop="userName">
            <el-input v-model="form.userName" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="realName">
            <el-input v-model="form.realName" style="width:85%"></el-input>
        </el-form-item>
         <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
            <el-input v-model="form.phone" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" style="width:85%"></el-input>
        </el-form-item>

        <el-form-item  label="部门"  prop="did">
        <el-select v-model="form.did" placeholder="请选择" style="width:85%">
            <el-option-group
                v-for="group in CompanyDepListSelect"
                :key="group.label"
                :label="group.label">
                <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-option-group>
            </el-select>
        </el-form-item>

        <el-form-item label="角色" prop="roleId">
        <el-select v-model="form.roleId" clearable placeholder="请选择" style="width:85%">
                <el-option
                v-for="item in rolePageList"
                :key="item.rid"
                :label="item.role_name"
                :value="item.rid">
                </el-option>
            </el-select>
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

  </div>
</template>
<script>

import echarts from "echarts";
import qs from "qs";
export default {
  name: "sys-user-controller",
  data() {
      var validatePhoneNumber = (rule, value, callback) => {
      if (!/^1[34578]\d{9}$/.test(value) || value === "") {
        callback(new Error("请输入正确手机号"));
      } else {
        callback();
      }
    };
      return {
        pageNum: 1,
        pageSize: 10,
        count:0,
        tableData: [],
        dialogVisible: false,
        editId: "",
        form: {
            did: "",
            realName: "",
            userName: "",
            phone: "",
            email: "",
            password:"",
            sex: "1",
            status: "1",
            roleId: ""
        },
        rules: {
            did: [
                { required: true, message: "请选择部门", trigger: "blur" },
            ],
            realName: [
                { required: true, message: "昵称不能为空", trigger: "blur" },
            ],
            roleId: [
                { required: true, message: "角色不能为空", trigger: "blur" },
            ],
            userName: [
                { required: true, message: "用户名不能为空", trigger: "blur" },
            ],
            email: [
                {type: "email", required: true, message: "邮箱格式不正确", trigger: "blur" }
            ],
            phone: [
                { required: true, message: "手机号不能为空", trigger: "blur" },
                { validator: validatePhoneNumber, trigger: "blur" }
            ],
            password: [
                { required: true, message: "密码不能为空", trigger: "blur" }
            ]
        },
        title: "新增用户",
        CompanyDepListSelect: [],
        rolePageList: []
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
      add(){//新增
          this.dialogVisible = true;
          this.editId = "";
          this.title = "新增用户";

          this.form.did = "";
          this.realName = "";
          this.roleId = "";
          this.userName = "";
          this.phone = "";
          this.email = "";
          this.sex = "1";
          this.status = "1";
          this.password = ""
      },
      handleView(index,row){//修改
        this.dialogVisible = true;
        this.title = "修改用户";
        console.log(row);

        let obj = {
            did: row.did.toString(),
            realName: row.real_name,
            userName: row.user_name,
            phone: row.phone,
            email: row.email,
            password: row.password,
            sex: row.sex.toString(),
            status: row.status.toString(),
            roleId: row.role_id
        }
        this.editId = row.uid;
        this.form = obj;
    },
    
    confirm(){//新增,修改 确认
        if(this.editId){
            let editObj = Object.assign(this.form,{uid: this.editId})
            this.$http.post("/sysUser/updateSysUser",editObj).then(res => {//用户修改
            if (res.data.meta.code == 200) {
                console.log(res.data.data.obj);
                this.$message({
                    type: 'success',
                    message: '保存成功!'
                });
                this.getPage();
                this.dialogVisible = false;
                }else if(res.data.meta.code == 400){
                    console.log(res.data.meta.msg);
                     this.$message.error(res.data.meta.msg);
                    return;
                }
            });
        }
        else{
            this.$http.post("/sysUser/insertSysUser",this.form).then(res => {//用户新增
            if (res.data.meta.code == 200) {
                console.log(res.data.data.obj);
                this.$message({
                    type: 'success',
                    message: '新增成功!'
                });
                this.getPage();
                this.dialogVisible = false;
                }else if(res.data.meta.code == 400){
                    console.log(res.data.meta.msg);
                     this.$message.error(res.data.meta.msg);
                    return;
                }
            });
        }
        
    },
    getCompanyDepListSelect(){
        this.$http.post("/sysDept/getCompanyDepListSelect").then(res => {
            if (res.data.meta.code == 200) {
                this.CompanyDepListSelect = res.data.data.obj;
            }
        });
    },
    getPage(){//获取分页
        let obj = {
            pageNum: this.pageNum,
            pageSize: this.pageSize
        }

        this.$http.post("/sysUser/getSysUserPageList",obj).then(res => {
            console.log("带token请求回来的数据", res);
            if (res.data.meta.code == 200) {
                console.log(res.data.data.obj);

                this.tableData = res.data.data.obj.data;
                this.count = res.data.data.obj.count;
            
            }
        });
        },
         getSysRolePageList(){//获取角色分页菜单 下拉框
            let obj = {
                pageNum: 1,
                pageSize: 100,
                status: 1
            }
            this.$http.post("/sysRole/getSysRolePageList",obj).then(res => {
            if (res.data.meta.code == 200) {
                this.rolePageList = res.data.data.obj.data;
                
                }
                if(res.data.meta.code == 400){
                    this.$message.error(res.data.meta.msg);
                }
            });
        },
    
  },
  mounted() {
      this.getPage();
      this.getCompanyDepListSelect();
      this.getSysRolePageList();
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
<style>
    .form-com > .el-form-item > .el-form-item__label{
        width: 52px !important;
    }
</style>
