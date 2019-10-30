<template>
  <div class="yunguIndex">
    <div class="chartOne" id="chartOne">

    </div>
    <div class="chartTwo" id="chartTwo">
 
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import qs from "qs";
export default {
  name: "yunguIndex",
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
    getLogin(){
        const param = {
            userName:"test",
            password:"123456"
        };
        this.$http({
          method:"post",
          url:"/api/login",
          data:qs.stringify(param),
          headers:{
              "Content-Type":"application/x-www-form-urlencoded"
          }
      }).then(res =>{
          console.log(res.data);
      })
    }
  },
  created(){
      this.getLogin();
  },
  mounted() {
    this.showEcharts();
  }
};
</script>
<style lang="scss" scoped>
.yunguIndex {
  width: 100%;
  padding: 30px;
  background-color: #ccc;
  .chartOne,
  .chartTwo {
    float: left;
    width: 48%;
    min-width:500px;
    height: 400px;
    background-color: #fff;
    border-radius:10px;
    padding:20px;
    box-sizing:border-box;
    margin:10px;
    position:relative;
  }
  .chartOne:after{
      content:'已处理的文档';
      position:absolute;
      bottom:10px;
      left:0;
      text-align:center;
      width: 100%;
  }
  .chartTwo:after{
      content:'启动文档';
      position:absolute;
      bottom:10px;
      left:0;
      text-align:center;
      width: 100%;
  }
}
</style>