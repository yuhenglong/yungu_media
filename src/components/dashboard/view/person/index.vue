<template>
  <div class="person">
    <el-dropdown trigger="hover">
      <span class="el-dropdown-link userinfo-inner">
        <img :src="this.sysUserAvatar" />
        {{sysUserName}}
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>我的消息</el-dropdown-item>
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "person",
  components: {},
  data() {
    return {
      sysUserName: "",
      sysUserAvatar: ""
    };
  },
  methods: {
    getInfo() {
      this.$http.get("/getUserInfo").then(res => {
        if (res.data.meta.code == 200) {
          this.sysUserName = res.data.data.obj.realName;
          localStorage.setItem("sysUserName", this.sysUserName);
          localStorage.setItem("uid", res.data.data.obj.uid);
          this.sysUserAvatar = res.data.data.obj.photo;
        }
      });
    },
    logout() {
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          localStorage.removeItem("eleToken");
          // window.location.reload();
          this.$router.push("/login");
        })
        .catch(() => {});
    }
  },
  created() {
    this.getInfo();
  }
};
</script>

<style lang="scss" scoped>
.person {
  text-align: right;
  padding-right: 35px;
  float: right;
  margin: 0 5px;
  .userinfo-inner {
    font-size: 16px;
    line-height: 50px;
    cursor: pointer;
    color: #3a8ee6;

    img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      margin: 10px 0px 10px 10px;
      float: right;
    }
  }
}
</style>
