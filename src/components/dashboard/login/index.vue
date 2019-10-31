<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">云股管理系统</span>
      </div>
      <div class="content ov">
        <div class="left">
          <img src="../../../assets/login_bg.jpg" alt />
        </div>
        <div class="right">
          <el-form
            :model="loginUser"
            :rules="rules"
            ref="loginForm"
            class="loginForm"
            label-width="80px"
          >
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="loginUser.userName" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <!-- <el-button type="primary" @keyup.enter="submitForm('loginForm')" class="submit_btn">登 录</el-button> -->
              <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登 录</el-button>
            </el-form-item>
            <div class="tiparea">
              <p>
                还没有账号？现在
                <router-link to="/register">注册</router-link>
              </p>
            </div>
          </el-form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "login",
  data() {
    return {
      loginUser: {
        userName: "test",
        password: "123456"
      },
      rules: {
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 4, max: 30, message: "长度在 4 到 30 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 用fetch请求这样避开在登录时没有token的请求
          fetch("/login", {
            method: "POST",
            body: qs.stringify(this.loginUser),
            mode: "cors",
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          })
            .then(res => {
              return res.json();
            })
            .then(json => {
              console.log(json)
              if (json.meta.code == 200) {
                localStorage.setItem("eleToken", json.data.token);
                this.$router.push("/");
              } else {
                this.$message({
                  type: "error",
                  message: `您输入的用户名或密码错误，请重新检查`
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
    con() {
      this.loginUser.username = this.$route.params.username;
      this.loginUser.password = this.$route.params.password;
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../../../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.left {
  img {
    width: 500px;
    height: auto;
  }
}

.form_container {
  width: 1000px;
  height: 500px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.content {
  margin-top: 30px;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  width: 400px;
  height: 250px;
  background-color: #fff;
  padding: 106px 40px 20px 20px;
  border-radius: 30px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
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
.ov {
  overflow: hidden;
}
.left {
  float: left;
}
.right {
  float: right;
}
</style>


