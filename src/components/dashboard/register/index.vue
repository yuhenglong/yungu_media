<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">云股管理系统</span>
      </div>
      <el-form
        :model="registerUser"
        :rules="rules"
        class="registerForm"
        ref="registerForm"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="realName">
          <el-input v-model="registerUser.realName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="username">
          <el-input v-model="registerUser.username" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="registerUser.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="registerUser.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerUser.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input v-model="registerUser.password2" placeholder="请确认密码" type="password"></el-input>
        </el-form-item>
        <!-- <el-form-item label="选择身份">
          <el-select v-model="registerUser.identity" placeholder="请选择身份">
            <el-option label="管理员" value="manager"></el-option>
            <el-option label="员工" value="employee"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注 册</el-button>
        </el-form-item>
        <div class="tiparea">
          <p>
            返回
            <router-link to="/Login">登录</router-link>
          </p>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
import qs from "qs"
export default {
  name: "register",
  data() {
    var validatePhoneNumber = (rule, value, callback) => {
      if (!/^1[34578]\d{9}$/.test(value) || value === "") {
        callback(new Error("请输入正确手机号"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 传送后端的对象属性
      registerUser: {
        username: "",
        realName: "",
        email: "",
        phone: "",
        password: "",
        password2: "",
        createWhere: "1",
        createTime: "",
        sex: "",
        status: "1",
        updateTime: "2019-10-12",
        uid: "0",
        createWhere: "1"
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "change" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        realName: [
          { required: true, message: "用户名不能为空", trigger: "change" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { validator: validatePhoneNumber, trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ],
        password2: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "长度在 6 到 30 个字符",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 赋值给createTime
          this.getDate();
          // fetch的方法请求数据
          fetch("/register", {
            method: "POST",
            body: qs.stringify(this.registerUser),
            mode: "cors",
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          })
            .then(res => {
              return res.json();
            })
            .then(json => {
              console.log("这是fetch的请求", json);
              // 注册成功3秒返回到登录页面
              if (json.meta.code == 200) {
                
              }
            })
            .catch(err => {
              console.log("请求错误", err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      this.registerUser.createTime = currentdate;
    }
  }
};
</script>


<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../../../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 400px;
  height: 700px;
  position: absolute;
  display:block;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 40px 40px 30px 20px;
  border-radius: 30px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.el-select {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
  text-decoration: none;
}
.star .el-form-item__label::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>



