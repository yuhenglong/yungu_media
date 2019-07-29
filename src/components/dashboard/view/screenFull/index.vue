<template>
  <div class="screenFull">
    <i :class="isFullscreen?'el-icon-copy-document':'el-icon-full-screen'" @click.stop="fullScreen"></i>
  </div>
</template>
 <script>
import screenfull from "screenfull";
export default {
  name: "screenFull",
  data() {
    return {
      isFullscreen: false
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    fullScreen() {
      screenfull.toggle();
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on("change", this.change);
      }
    }
  },
  destroy() {
    if (screenfull.enabled) {
      screenfull.off("change", this.change);
    }
  }
};
</script>
<style lang="scss" scoped>
.screenFull {
  display: inline-block;
  padding: 17px 10px;
}
.screenFull:hover {
  cursor: pointer;
}
</style>
