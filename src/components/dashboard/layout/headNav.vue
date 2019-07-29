<template>
  <div class="headNav">
    <div class="shaw ov">
      <div class="leftNav fl">
        <i @click="togalClick" :class="icon" class="pad_i"></i>
        <breadcrumb></breadcrumb>
      </div>
      <div class="rightNav fr">
        <headerSearch></headerSearch>
        <screenFull></screenFull>
      </div>
    </div>
    <!-- <el-button @click="setParams">传参</el-button> -->
  </div>
</template>

<script>
import breadcrumb from "@/components/dashboard/view/breadcrumb";
import headerSearch from "@/components/dashboard/view/headerSearch";
import screenFull from "@/components/dashboard/view/screenFull";
export default {
  name: "headNav",
  components: {
    breadcrumb,
    headerSearch,
    screenFull
  },
  data() {
    return {
      togel: false,
      icon: "el-icon-s-fold",
      id: "yuhenglongid",
      person: "yuyu"
    };
  },
  methods: {
    togalClick() {
      this.$store.dispatch("setIsCollapse");
      this.togel = !this.togel;
      if (this.togel) {
        this.icon = "el-icon-s-unfold";
      } else {
        this.icon = "el-icon-s-fold";
      }
    },
    setParams() {
      this.$router.push({
        name: "yunguIndex",
        params: {
          id: this.id,
          person: this.person
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.headNav {
  display: inline-block;
  box-sizing: border-box;
  height: 70px;
  background-color: #fff;
  -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  .leftNav,
  .rightNav {
    display: inline;
  }
  .pad_i {
    padding: 17px;
    background-color: #fff;
    cursor: pointer;
  }
  .shaw {
    -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  }
  .pad_i:hover {
    background-color: #e6e6e696;
  }
  .mar-left {
    margin-left: 0;
  }
}
.slide {
  .headNav {
    width: calc(100% - 64px);
    transition: margin-left 0.5s;
    margin-left: 64px;
  }
}
.open {
  .headNav {
    width: calc(100% - 200px);
    margin-left: 200px;
    transition: margin-left 0.28s;
  }
}
</style>
