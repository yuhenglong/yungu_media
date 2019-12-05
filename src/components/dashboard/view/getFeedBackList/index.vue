<template>
  <div class="getFeedBackList">
    <h2>场地项目安装反馈列表</h2>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="维护人员">
        <el-select v-model="formInline.region" placeholder="维护人员">
          <el-option label="维护人员一" value="shanghai"></el-option>
          <el-option label="维护人员二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开发人员">
        <el-select v-model="formInline.region" placeholder="开发人员">
          <el-option label="开发一" value="shanghai"></el-option>
          <el-option label="开发二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="项目编号">
        <el-input v-model="formInline.user" placeholder="项目编号"></el-input>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="formInline.user" placeholder="项目名称"></el-input>
      </el-form-item>
      <el-form-item label="项目地址">
        <el-input v-model="formInline.user" placeholder="项目地址"></el-input>
      </el-form-item>
      <el-form-item label="所属部门">
        <el-select v-model="formInline.region" placeholder="部门选择">
          <el-option label="部门一" value="shanghai"></el-option>
          <el-option label="部门二二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目一级属性">
        <el-select v-model="formInline.region" placeholder="项目属性">
          <el-option label="属性一" value="shanghai"></el-option>
          <el-option label="属性二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属区域">
        <linkage></linkage>
      </el-form-item>
      <el-form-item label="项目状态">
        <el-select v-model="formInline.region" placeholder="项目状态">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="管理公司">
        <el-input v-model="formInline.user" placeholder="管理公司"></el-input>
      </el-form-item>
      <el-form-item label="安装结果">
        <el-select v-model="formInline.region" placeholder="安装结果">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="到期时间">
        <el-date-picker v-model="formInline.lastDate" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button type="primary" @click="onSubmit">导出</el-button>
        <router-link to="/addArea" class="el-button primary add_btn">新增场地</router-link>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="areaTableList" border style="width: 100%">
      <el-table-column fixed prop="projectCode" label="项目编号" width="180"></el-table-column>
      <el-table-column prop="projectName" label="项目名称" width="120"></el-table-column>
      <el-table-column prop="projectAddress" label="城市" width="120"></el-table-column>
      <el-table-column prop="protecter" label="维护人员" width="120"></el-table-column>
      <el-table-column prop="dept" label="所属部门" width="300"></el-table-column>
      <el-table-column prop="developer" label="管理公司" width="120"></el-table-column>
      <el-table-column prop="projectType" label="项目属性" width="120"></el-table-column>
      <el-table-column prop="activityStatus" label="项目状态" width="120"></el-table-column>
      <el-table-column label="业务状态" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.verifyStatus == 0">审核不通过</span>
          <span v-else-if="scope.row.verifyStatus == 1">审核通过</span>
          <span v-else-if="scope.row.verifyStatus == 2">待审核</span>
          <span v-else-if="scope.row.verifyStatus == 3">编辑状态</span>
          <span v-else-if="scope.row.verifyStatus == 5">承接安装单操作</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width>
        <template slot-scope="scope">
          <el-button
            @click="accept(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.type ==1"
          >接单</el-button>
          <el-button
            @click="reject(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.type ==1"
          >拒绝</el-button>
          <el-button
            @click="feedback(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.type ==2"
          >反馈</el-button>
          <el-button
            @click="endOrder(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.type ==3"
          >结单</el-button>
          <el-button
            @click="checkInstallInfo(scope.$index, scope.row)"
            type="text"
            size="small"
          >查看安装单信息</el-button>
          <el-button @click="auditLogging(scope.$index,scope.row)" type="text" size="small">查看审核记录</el-button>
          <!-- <el-button type="text" size="small" @click="audit(scope.$index, scope.row)">审核</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 二次封装分页插件 -->
    <pagination :total="total" @pageChange="changePage"></pagination>
    <el-dialog
      :title="titleTwo"
      :visible.sync="dialogCheckVisible"
      width="1000px"
      center
      :append-to-body="true"
    >
      <dialogAuditList :formCheckArray="formCheckList"></dialogAuditList>
      <!-- <el-table :data="formCheckList" border>
        <el-table-column property="identificationCode" label="序号"></el-table-column>
        <el-table-column property="verifyUserName" label="审核用户"></el-table-column>
        <el-table-column property="verifyResult" label="审核结果"></el-table-column>
        <el-table-column property="type" label="审核类型"></el-table-column>
        <el-table-column property="refuseReason" label="拒绝原因"></el-table-column>
        <el-table-column property="verifyTime" label="添加时间"></el-table-column>
      </el-table>-->
    </el-dialog>
    <!-- 拒绝 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogAuditVisible"
      width="800px"
      center
      :append-to-body="true"
    >
      <el-form ref="form" :model="checkDia" label-width="80px">
        <el-form-item label="拒绝理由">
          <el-input type="textarea" v-model="checkDia.refuseReason"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="deilComfirm">确定</el-button>
          <el-button type="success" @click="deilDel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 反馈 -->
    <el-dialog
      :title="titleThr"
      :visible.sync="dialogFeedbackVisible"
      width="1200px"
      center
      :append-to-body="true"
    >
      <el-table :data="feedbackList" border>
        <el-table-column property="identification_code" label="点位编号"></el-table-column>
        <el-table-column property="install_name" label="安装名称"></el-table-column>
        <el-table-column property="Media_name" label="媒体位名称"></el-table-column>
        <el-table-column property="equipment_name" label="机型"></el-table-column>
        <el-table-column label="设备编号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.equiment_code" placeholder="编号"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="安装结果">
          <template slot-scope="scope">
            <el-select v-model="scope.row.installation_result" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="巡视结果">
          <template slot-scope="scope">
            <el-select v-model="scope.row.lookover_result" placeholder="请选择">
              <el-option
                v-for="item in optionsTwo"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center;width: 100%;margin: 20px 0 0;">
        <el-button type="primary" size="medium" @click="commit()">提&nbsp;&nbsp;&nbsp;交</el-button>
        <el-button type="warning" size="medium" @click="giveUp()">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
import linkage from "@/components/dashboard/view/linkage";
import pagination from "@/components/dashboard/view/pagination";
import dialogAuditList from "@/components/dashboard/view/dialogAuditList";
export default {
  name: "getFeedBackList",
  components: {
    linkage,
    pagination,
    dialogAuditList
  },
  data() {
    return {
      options: [
        {
          value: "1",
          label: "未安装"
        },
        {
          value: "2",
          label: "已安装"
        },
        {
          value: "3",
          label: "报损"
        },
        {
          value: "4",
          label: "临时拆机"
        },
        {
          value: "5",
          label: "安装中"
        },
        {
          value: "6",
          label: "拆除中"
        },
        {
          value: "7",
          label: "临时拆机后拆除中"
        },
        {
          value: "8",
          label: "已拆除"
        },
        {
          value: "9",
          label: "已拆除后再安装中"
        }
      ],
      optionsTwo: [
        {
          value: "1",
          label: "异常"
        },
        {
          value: "2",
          label: "正常"
        },
        {
          value: "3",
          label: "点位未安装"
        }
      ],
      title: "拒绝处理",
      titleTwo: "场地项目安装反馈列表",
      titleThr: "反馈安装单",
      dialogCheckVisible: false,
      dialogAuditVisible: false,
      dialogFeedbackVisible: false,
      feedbackList: [],
      formCheckList: {
        identificationCode: "",
        verifyUserName: "",
        verifyResult: "",
        type: "",
        refuseReason: "",
        verifyTime: ""
      },
      checkDia: {
        verifyResult: "",
        type: 1,
        refuseReason: "",
        identificationCode: "",
        taskId: ""
      },
      formInline: {
        user: "",
        region: "",
        lastDate: ""
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      areaTableList: [],
      installCode: "",
      taskId: ""
    };
  },
  methods: {
    endOrder(row) {
      localStorage.setItem("task_id", row.taskId);
      this.$router.push({
        path: "/endOrdercInstall",
        query: { sid: row.sid }
      });
    },
    accept(row) {
      console.log(row);
      this.$confirm("确认接单吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          this.checkDia.verifyResult = 1;
          this.checkDia.identificationCode = row.installCode;
          this.checkDia.taskId = row.taskId;
          this.$http
            .post("/areaProjectActivity/handleInstallVerify", this.checkDia)
            .then(res => {
              if (res.data.meta.code == 200) {
                this.$message({
                  type: "success",
                  message: "接单成功。"
                });
                this.dialogAuditVisible = false;
                this.getTableData();
              } else {
                this.$message({
                  type: "error",
                  message: "接单出错，请重试。"
                });
                this.dialogAuditVisible = false;
              }
            });
        })
        .catch(() => {});
    },
    giveUp() {
      this.dialogFeedbackVisible = false;
    },
    feedback(row) {
      this.dialogFeedbackVisible = true;
      this.installCode = row.installCode;
      this.taskId = row.taskId;
      const url = "/activityDevice/getProjectPostionList?aid=" + row.aid;
      this.$http.get(url).then(res => {
        console.log("返回数据", res);
        if (res.data.meta.code == 200) {
          this.feedbackList = res.data.data.obj;
        }
      });
    },
    reject(row) {
      this.dialogAuditVisible = true;
      this.checkDia.verifyResult = 0;
      this.checkDia.identificationCode = row.installCode;
      this.checkDia.taskId = row.taskId;
    },
    deilDel() {
      this.dialogAuditVisible = false;
    },
    audit(index, row) {
      this.dialogAuditVisible = true;
      this.checkDia.identificationCode = row.customer_code;
      this.checkDia.taskId = row.task_id;
    },
    checkInstallInfo(index, row) {
      this.$router.push({
        path: "/checkPlaInstall",
        query: { sid: row.sid }
      });
    },
    deilComfirm() {
      this.$http
        .post("/areaProjectActivity/handleInstallVerify", this.checkDia)
        .then(res => {
          if (res.data.meta.code == 200) {
            this.$message({
              type: "success",
              message: "拒绝成功。"
            });
            this.getTableData();
          } else {
            this.$message({
              type: "error",
              message: "拒绝出错，请重试。"
            });
          }
        })
        .catch(() => {});
    },
    checkDialog(index, row) {
      console.log(index, row);
      this.$http
        .post(
          "/yunguVerifyNote/getVerifyNoteListByCode",
          qs.stringify({ code: row.identification_code })
        )
        .then(res => {
          if (res.data.meta.code == 200) {
            this.dialogCheckVisible = true;
            this.formCheckList = res.data.data.obj;
            console.log(this.formCheckList);
          }
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageInfo.pageSize = val;
      this.getTableData();
    },
    commit(row) {
      // console.log("上传数据", this.feedbackList);
      const objArr = [];
      for (let i = 0; i < this.feedbackList.length; i++) {
        const obj = {};
        obj.installCode = this.installCode;
        obj.taskId = this.taskId;
        obj.id = this.feedbackList[i].id;
        obj.equimentCode = this.feedbackList[i].equiment_code;
        obj.installationResult = this.feedbackList[i].installation_result;
        obj.lookoverResult = this.feedbackList[i].lookover_result;
        objArr.push(obj);
      }
      // console.log('循环后的对象数组',objArr);
      this.$http
        .post("/areaProjectActivity/updatePostionInfo", objArr)
        .then(res => {
          // console.log("提交", res);
          if (res.data.meta.code == 200) {
            this.$message({
              type: "success",
              message: "提交成功！"
            });
            this.dialogFeedbackVisible = false;
            this.getTableData();
          } else {
            this.$message({
              type: "error",
              message: "提交失败！请重试。"
            });
          }
        });
    },
    examine(row) {
      this.$router.push("/examinePage");
      console.log(row);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageInfo.pageNum = val;
      this.getTableData();
    },
    onSubmit() {
      console.log("submit!");
    },
    auditLogging(index, row) {
      this.$http
        .post(
          "/yunguVerifyNote/getVerifyNoteListByCode",
          qs.stringify({ code: row.identification_code })
        )
        .then(res => {
          if (res.data.meta.code == 200) {
            this.dialogCheckVisible = true;
            this.formCheckList = res.data.data.obj;
            console.log(this.formCheckList);
          }
        });
    },
    handleClick(row) {
      console.log(row);
    },
    changePage(item) {
      this.pageInfo = item;
      this.getTableData();
    },
    getTableData() {
      this.$http
        .post("/yunguInstallList/installFeeBackPageList", this.pageInfo)
        .then(res => {
          console.log("反馈数据", res);
          if (res.data.meta.code == 200) {
            this.areaTableList = res.data.data.obj.data;
            this.total = res.data.data.obj.count;
          }
        });
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>

<style lang="scss" scoped>
.getFeedBackList {
  width: 95%;
  padding: 30px 2.5%;
  height: auto;
  overflow: auto;
  h2 {
    font-size: 26px;
    line-height: 26px;
    text-align: center;
    margin: 10px 0;
  }

  .pagi {
    width: 100%;
    height: 100px;
  }
  .add_btn {
    text-decoration: none;
    color: #fff;
    background-color: #409eff;
  }
}
</style>
