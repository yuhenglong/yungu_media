<template>
  <div class="settingInfo">
    <el-tabs v-model="activeName" :tab-position="tabPosition" style="height: auto;">
      <el-tab-pane label="信息修改" name="info">
        <el-form ref="userInfoForm" :model="userInfoForm" :rules="rules" label-width="80px" :label-position="labelPosition" class="infoForm">
          <el-form-item label="昵称" prop="realName">
            <el-input v-model="userInfoForm.realName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="userInfoForm.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userInfoForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="userInfoForm.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateInfo('userInfoForm')">修改信息</el-button>
            <el-button type="button" @click="initForm('userInfoForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="密码修改" name="password">
        <el-form :model="updatePwdForm" :rules="rules" ref="updatePwdForm" label-width="80px" :label-position="labelPosition" class="infoForm">
          <el-form-item label="旧密码" prop="oldPwd">
            <el-input type="password" v-model="updatePwdForm.oldPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input type="password" v-model="updatePwdForm.newPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPwd">
            <el-input type="password" v-model="updatePwdForm.checkPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('updatePwdForm')">修改密码</el-button>
            <el-button @click="resetForm('updatePwdForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="登录日志" name="loginRecord">
        <el-table :data="loginRecordData" style="width: 100%" :row-class-name="tableRowClassName" class="loginRecordTable">
            <el-table-column prop="log_name" label="日志属性"></el-table-column>
            <el-table-column prop="succeed" label="日志状态">
               <template slot-scope="scope">
                    {{scope.row.succeed == 1 ? "成功" : "失败"}}
                </template>
            </el-table-column>
            <el-table-column prop="message" label="日志消息"></el-table-column>
            <el-table-column prop="ip" label="操作地IP"></el-table-column>
            <el-table-column prop="create_time" label="日志时间"></el-table-column>
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang="scss">
.loginRecordTable, .el-table__row.warning-row {
  background:oldlace;
}
.settingInfo {
  width: 100%;
  padding: 20px;
  height: auto;
  overflow: auto;
}
.infoForm {
  width: 20%;
}
</style>
<script>
  import qs from "qs";
  export default {
    data() {
      var checkPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.updatePwdForm.newPwd) {
          callback(new Error('与新密码输入不一致!'));
        } else {
          callback();
        }
      };
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
        tabPosition: 'top',
        labelPosition:'top',
        activeName: 'info',
        loginRecordData: [],
        updatePwdForm: {
          oldPwd: null,
          newPwd: null,
          checkPwd: null
        },
        userInfoForm: {
          realName:'',
          phone:'',
          email:'',
          sex:''
        },
        rules: {
          realName:[
            { required: true, message: '请输入昵称', trigger: 'blur' }
          ],
          phone:[
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { validator: validatePhoneNumber, trigger: "blur" }
          ],
          email:[
            {type: "email",required: true, message: '邮箱格式不正确', trigger: 'blur' }
          ],
          sex:[
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          oldPwd: [
            { required: true, message: '请输入旧密码', trigger: 'blur' }
          ],
          newPwd: [
            { required: true, message: '请输入新密码', trigger: 'blur' }
          ],
          checkPwd: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: checkPwd, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val;
        this.getPage();
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.getPage();
      },
      tableRowClassName({row, rowIndex}) {
        if (row.succeed === 0) {
          return 'warning-row';
        }
        return '';
      },
      initForm(formName){
        this.$refs[formName].clearValidate();
        this.getCureentUserInfo();
        return false;
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getCureentUserInfo(){
        this.$http.get("/getUserInfo").then(res => {
            if (res.data.meta.code == 200) {
                this.userInfoForm.realName = res.data.data.obj.realName;
                this.userInfoForm.sex = res.data.data.obj.sex;
                this.userInfoForm.phone = res.data.data.obj.phone;
                this.userInfoForm.email = res.data.data.obj.email;
            }
        });
      },
      updateInfo(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post("/userInfo/updateUserInfo",this.userInfoForm).then(res => {
                console.log("带token请求回来的数据", res);
                if (res.data.meta.code == 200) {
                  this.$message({
                    type: "success",
                    message: res.data.meta.msg
                  });
                }else{
                  this.$message({
                    type: "error",
                    message: res.data.meta.msg
                  });
                }
            });
          }
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let obj = {
                oldPwd: this.updatePwdForm.oldPwd,
                newPwd: this.updatePwdForm.newPwd
            }
            this.$http.post("/userInfo/updatePwd",qs.stringify(obj)).then(res => {
                console.log("带token请求回来的数据", res);
                if (res.data.meta.code == 200) {
                  this.$message({
                    type: "success",
                    message: res.data.meta.msg
                  });
                }else{
                  this.$message({
                    type: "error",
                    message: res.data.meta.msg
                  });
                }
            });
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getPage(){//获取分页
        let obj = {
            pageNum: this.pageNum,
            pageSize: this.pageSize
        }
        this.$http.post("/sysLog/getMyAccountLogPageList",obj).then(res => {
            console.log("带token请求回来的数据", res);
            if (res.data.meta.code == 200) {
                console.log(res.data.data.obj);
                this.loginRecordData = res.data.data.obj.data;
                this.count = res.data.data.obj.count;
            }
        });
      }
    },
    mounted() {
      this.getCureentUserInfo();
      this.getPage();
    }
  };
</script>