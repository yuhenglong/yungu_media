<template>
  <div class="yunguIndex">
    <div class="ov">
      <div class="chartOne" id="chartOne"></div>
      <div class="chartTwo" id="chartTwo"></div>
    </div>
    <div class="tabs">
      <el-radio-group v-model="radio" class="radi" v-on:change="changeTab">
        <el-radio-button label="我启动的"></el-radio-button>
        <el-radio-button label="待我审查"></el-radio-button>
        <el-radio-button label="我已审查"></el-radio-button>
        <el-radio-button label="我跟踪的"></el-radio-button>
      </el-radio-group>
      <div class="ta">
        <el-table class="tabl" :data="tableData" style="width: 100%" border>
          <el-table-column prop="thing" label="事项" width="180"></el-table-column>
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="bz" label="备注"></el-table-column>
        </el-table>
        <demo></demo>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import demo from "@/components/dashboard/view/demo";
import qs from "qs";
export default {
  name: "yunguIndex",
  components: {
    demo
  },
  data() {
    return {
      radio: "我启动的",
      tableData: [],
      tableDataOne: [
        {
          date: "2016-05-02",
          thing: "已通过",
          bz: "无"
        },
        {
          date: "2016-05-04",
          thing: "未通过",
          bz: "无"
        },
        {
          date: "2016-05-01",
          thing: "待审核",
          bz: "无"
        },
        {
          date: "2016-05-03",
          thing: "待上报",
          bz: "无"
        }
      ],
      tableDataTwo: [
        {
          date: "2016",
          thing: "已通过",
          bz: "无"
        },
        {
          date: "2016",
          thing: "未通过",
          bz: "无"
        },
        {
          date: "20161",
          thing: "待审核",
          bz: "无"
        },
        {
          date: "2016",
          thing: "待上报",
          bz: "无"
        }
      ],
      tableDataThr: [
        {
          date: "201dd6",
          thing: "已通过",
          bz: "无"
        },
        {
          date: "201ddd6",
          thing: "未通过",
          bz: "无"
        },
        {
          date: "201gfdg61",
          thing: "待审核",
          bz: "无"
        },
        {
          date: "20fsdaf16",
          thing: "待上报",
          bz: "无"
        }
      ],
      tableDataFou: [
        {
          date: "2fs06",
          thing: "已通过",
          bz: "无"
        },
        {
          date: "201dhjjd6",
          thing: "未通过",
          bz: "无"
        },
        {
          date: "206dfdfdf1",
          thing: "待审核",
          bz: "无"
        },
        {
          date: "2f1dsfdsfd6",
          thing: "待上报",
          bz: "无"
        }
      ]
    };
  },
  methods: {
    showEcharts() {
      this.chartLineOne = echarts.init(document.getElementById("chartOne"));
      this.chartLineTwo = echarts.init(document.getElementById("chartTwo"));
      var optionOne = {
        title: {
          text: "我处理的流程趋势12个月",
          subtext: "",
          x: "center",
          align: "center"
        },
        xAxis: {
          type: "category",
          data: [" ", " ", " ", " ", " ", " ", " "]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "我处理的流程趋势12个月",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            lineStyle: {
              normal: {
                color: "#999"
              }
            }
          }
        ]
      };
      var optionTwo = {
        title: {
          text: "我启动的流程趋势12个月",
          subtext: "",
          x: "center",
          align: "center"
        },
        xAxis: {
          type: "category",
          data: [" ", " ", " ", " ", " ", " ", " "]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "我启动的流程趋势12个月",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            lineStyle: {
              normal: {
                color: "#999"
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.chartLineOne.setOption(optionOne);
      this.chartLineTwo.setOption(optionTwo);
    },
    changeTab() {
      switch (this.radio) {
        case "我启动的":
          this.tableData = this.tableDataOne;
          break;
        case "待我审查":
          this.tableData = this.tableDataTwo;
          break;
        case "我已审查":
          this.tableData = this.tableDataThr;
          break;
        case "我跟踪的":
          this.tableData = this.tableDataFou;
          break;
      }
    },
    choose() {
      this.tableData = this.tableDataOne;
    }
  },
  mounted() {
    this.showEcharts();
    this.choose();
  }
};
</script>
<style lang="scss" scoped>
.yunguIndex {
  width: 100%;
  padding: 30px;
  height: auto;
  overflow: auto;
  .ov {
    overflow: hidden;
  }
  .chartOne,
  .chartTwo {
    float: left;
    width: 45%;
    min-width: 400px;
    height: 400px;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    margin: 10px;
    position: relative;
  }
  .chartOne:after {
    content: "已处理的文档";
    position: absolute;
    bottom: 10px;
    left: 0;
    text-align: center;
    width: 100%;
  }
  .chartTwo:after {
    content: "启动文档";
    position: absolute;
    bottom: 10px;
    left: 0;
    text-align: center;
    width: 100%;
  }
  .ta {
    width: 96%;
  }
  .tabs {
    .radi {
      margin: 0 10px;
    }
    .tabl {
      margin: 10px 0 0 10px;
    }
  }
}
</style>