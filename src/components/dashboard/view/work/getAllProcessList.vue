<template>

  <div class="all-process-com">
        <el-breadcrumb class="breadcrumb-style pt-10" separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>流程发起</el-breadcrumb-item>
        </el-breadcrumb>

        <ul class="ul">
            <li @click="toPath('/createProcessPageList')">
                <div>{{variousProcessCount ? variousProcessCount.startedCount : "0"}}</div>
                <div>启动</div>
            </li>
             <li  @click="toPath('/toDoTaskList')">
                <div>{{variousProcessCount ? variousProcessCount.toDoCount : "0"}}</div>
                <div>待审</div>
            </li>
             <li @click="toPath('/involvedProcessPageList')">
                <div>{{variousProcessCount ? variousProcessCount.involvedCount : "0"}}</div>
                <div>已审</div>
            </li>
            <li>
                <div>0</div>
                <div>废弃</div>
            </li>
        </ul>

        <div class="line"></div>

        <div class="use-flow">
            <div class="falg-after">使用的流程</div>
        </div>

        <ul class="use-flow-ul">
            <li v-for="(item,index) in allProcessList" :key="index" @mouseleave="leave(index)" @mouseenter="mouse(index)" @click="toPath(item.url)"> 
                <div>
                    <p :class="{'p-active' : newCreateIndex === index && newCreate}">{{ newCreateIndex === index && newCreate ? "新建" : item.processName}}</p>
                </div>
                <div>
                    <i class="el-icon-document"></i>
                    <span>{{item.key ? item.key : "--"}}</span>
                </div>
            </li>
            <div style="clear: both;"></div>
        </ul>
  </div>
</template>
<script>

export default {
  name: "getAllProcessList",
  data() {
      return {
          variousProcessCount: null,
          allProcessList: [],
          newCreateIndex: "",
          newCreate: false,
      }
      
  },
  methods: {
    getVariousProcessCount(){
        this.$http.get("/activity/getVariousProcessCount").then(res => {
            if (res.data.meta.code == 200) {
                this.variousProcessCount = res.data.data.data;

            }
        });
    },
     getAllProcessList(){
        this.$http.get("/activity/getAllProcessList").then(res => {
            if (res.data.meta.code == 200) {
                console.log('返回数据',res);
                this.allProcessList = res.data.data.data;
            }
        });
    },
    toPath(url){
        this.$router.push({path: url});
    },
    mouse(index){
        this.newCreateIndex = index;
        this.newCreate = true;
    },
    leave(index){
        this.newCreateIndex = index;
        this.newCreate = false;
    }
  },
  mounted() {
      this.getVariousProcessCount();
      this.getAllProcessList();
  }
};
</script>
<style lang="scss" scoped>
    .all-process-com{
        color: #666666;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        .ul{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-bottom: 20px; 
            box-sizing: border-box;
            li{
                display: flex;
                flex: 1;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                padding: 20px 0;
                margin: 10px;
                border-radius: 3px;
                transition: all .5s;
                cursor: pointer;
                & > :first-child{
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
            }
            li:nth-of-type(1){
                border: 1px solid #9e6ce5;
                & > :first-child{
                    color: #9e6ce5;
                }
            }
            li:nth-of-type(1):hover{
                background: rgba(158,108,229,.1);
                box-shadow: 0 0 10px rgba(158,108,229,.3);
            }
            li:nth-of-type(2){
                border: 1px solid #14cfbc;
                & > :first-child{
                    color: #14cfbc;
                }
            }
             li:nth-of-type(2):hover{
                background: rgba(20,207,188,.1);
                box-shadow: 0 0 10px rgba(20,207,188,.3);
            }
            li:nth-of-type(3){
                border: 1px solid #fa6f00;
                & > :first-child{
                    color: #fa6f00;
                }
            }
            li:nth-of-type(3):hover{
                background: rgba(255,110,0,.1);
                box-shadow: 0 0 10px rgba(255,110,0,.3);
            }
            li:nth-of-type(4){
                border: 1px solid #fb6e91;
                & > :first-child{
                    color: #fb6e91;
                }
            }
             li:nth-of-type(4):hover{
                background: rgba(251,110,145,.1);
                box-shadow: 0 0 10px rgba(251,110,145,.3);
            }
        }

        .line{
            height: 1px;
            background: #dcdfe6;
            margin: 0 10px 20px 10px;
        }

        .use-flow{
            .falg-after{
                position: relative;
                padding-left: 20px;
                &::after{
                    content: "";
                    height: 10px;
                    width: 2px;
                    position: absolute;
                    left: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: #4285f4;

                }
            }
        }

        .use-flow-ul{
            padding: 30px 10px;
            .el-icon-document{
                color: #4285f4;
                margin-right: 5px;
            }
            li{
                width: 200px;
                padding-top: 40px;
                float: left;
                margin: 0 10px 20px 10px;
                cursor: pointer;
                & > div:first-child{
                    width: 100%;
                    height: 20px;
                    border: 1px solid #4285f4;
                    border-bottom: 0;
                    position: relative;
                    box-sizing: border-box;
                    .p-active{
                        color: #4285f4;
                    }
                    p{
                        width: 95%;
                        height: 60px;
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        transform: translateX(-50%);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #fff;
                        border: 1px solid #dcdfe6;
                        border-bottom: 0px solid #dcdfe6;
                        padding: 10px;
                        box-sizing: border-box;
                        border-radius: 2px 2px 0 0;
                    }
                }
                & > div:last-child{
                    width: 100%;
                    height: 30px;
                    border: 1px solid #4285f4;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 10px;
                    box-sizing: border-box;
                    span{
                        overflow: hidden;    
                        text-overflow:ellipsis;    
                        white-space: nowrap;
                    }
                     
                }
            }
        }
        
    }

</style>
