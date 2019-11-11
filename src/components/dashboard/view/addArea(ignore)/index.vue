<template>
  <div class="addArea">
    <h2>场地项目添加</h2>
    <div class="adderessInfo">
      <h3>点位信息选择</h3>
      <el-form
        :model="addArea"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-form-inline"
        :inline="true"
      >
        <el-form-item label="点位名称" prop="name">
          <el-input v-model="addArea.addAreaName"></el-input>
        </el-form-item>
        <el-form-item label="安装名称" prop="installName">
          <el-input v-model="addArea.installName"></el-input>
        </el-form-item>
        <el-form-item label="具体安装位置" prop="detInstall">
          <el-input v-model="addArea.detInstall"></el-input>
        </el-form-item>
        <el-form-item label="媒体位名称" prop="mediaName">
          <el-input v-model="addArea.mediaName"></el-input>
        </el-form-item>
        <div>
          <el-form-item label="呈现方式" prop="appearWay">
            <el-select v-model="addArea.appearWay" placeholder="请选择">
              <el-option label="液晶" value="shanghai"></el-option>
              <el-option label="平面" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所属公司" prop="company">
            <el-select v-model="addArea.company" placeholder="请选择">
              <el-option label="云股总部" value="shanghai"></el-option>
              <el-option label="云股深圳" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
        <el-form-item label="设备规格" prop="equ">
          <el-select v-model="addArea.equ" placeholder="请选择">
            <el-option label="裸眼3D显示屏" value="shanghai"></el-option>
            <el-option label="2D屏" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否赠品" prop="complim">
          <el-select v-model="addArea.complim" placeholder="请选择">
            <el-option label="是" value="yes"></el-option>
            <el-option label="否" value="no"></el-option>
          </el-select>
        </el-form-item>
        </div>
        <div>
        <el-form-item label="点位图片">
          <uploadPicture></uploadPicture>
        </el-form-item>
        </div>
        <div>
        <el-form-item  label=" ">
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button type="success">返回</el-button>
        </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import uploadPicture from "@/components/dashboard/view/uploadPicture";
export default {
  name: "addArea",
  components: {
    uploadPicture
  },
  data() {
    return {
      addArea: {
        addAreaName: ""
      },
      formInline: {
        user: "",
        region: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style lang="scss" scoped>
.addArea {
  width: 100%;
  padding: 30px;
  h2 {
    text-align: center;
    font-size: 26px;
    line-height: 26px;
    margin-bottom: 20px;
  }
  h3{
      margin-bottom:30px;
  }
  .adderessInfo {
    padding: 10px;
    .el-form-item__content {
      .el-input {
        width: 400px;
      }
    }
  }
}
</style>
<style lang="scss">
 .el-form--inline .el-form-item__content{
        width: 400px;
    }
</style>