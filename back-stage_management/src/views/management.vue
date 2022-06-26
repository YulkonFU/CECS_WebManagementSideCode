<template v-slot:dropdown>
  <div>
    <div class="home">
      <div class="header">
        <div
          style="
            margin-left: 20px;
            cursor: pointer;
            color: white;
            font-size: 30px;
          "
          @click="toMain"
        >
          <span style="color: #facc05">园区应急</span>指挥系统
        </div>
        <div class="menu"  @click="toDataVisualization">
          <span  :class="[menuIndex==0?'menuSelect':'menu']">综合态势</span>
        </div>
        <div class="menu"  @click="toEmergencyCommand">
          <span :class="[menuIndex==1?'menuSelect':'menu']">应急指挥</span>
        </div>
        <div class="menu"  @click="toDutyManagement">
          <span :class="[menuIndex==2?'menuSelect':'menu']">值班管理</span>
        </div>
        <div class="menu"  @click="toEventManagement">
          <span :class="[menuIndex==3?'menuSelect':'menu']">事件管理</span>
        </div>
        <div>
          <el-tooltip content="我的消息" placement="bottom" effect="light">
            <img src="../assets/msg.png" style="width: 30px; height: 30px;margin-right:20px" alt="">
          </el-tooltip>
          <el-dropdown @command="handleCommand">
            <span
              style="
                display: inline-flex;
                justify-content: center;
                align-items: center;
                color: white;
                font-size: 20px;
                margin-right: 15px;
              "
              ><img
                src="../assets/yonghu.png"
                style="width: 30px; height: 30px; margin-right: 15px"
                alt=""
              />yonghu</span
            >
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="a">注销</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="second">
        <div>
          <span style="margin-right:10px;border-right:solid 1px white;font-size:15px">地点：克拉玛依石化工业园区 </span>
          <span style="font-size:20px">{{menu[menuIndex]}}</span>
        </div>
        <div style="margin-right:20px;font-size:15px;display:flex;align-items:center">
          <img src="../assets/tianqi.png" style="width:20px;height:20px;margin-right:10px;" alt="">
          <span style="margin-right:10px">{{nowTmp}}℃</span>
          <span style="margin-right:10px">{{wea}}</span>
          <span style="margin-right:10px">{{week}}</span>
          <span>{{nowTime}}</span>
        </div>
      </div>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      menuIndex:0,//当前选择的菜单栏
      menu:["综合态势","应急指挥","值班管理","事件管理"],
      nowTmp:0,//当前温度
      wea:"",//当前天气情况
      week:"",//当前星期几
      nowTime:""//当前时间
    }
  },
  created(){
    // this.axios.get("https://v0.yiketianqi.com/api?unescape=1&version=v61&appid=76564418&appsecret=Lx8yZLGo&cityid=101130201")
    // .then(res=>{
    //   console.log(res.data)
    //   this.nowTmp=res.data.tem;
    //   this.wea=res.data.wea;
    //   this.week=res.data.week;
    // })
  },
  mounted() {
    this.getCurrentTime();
    let that = this;
    setInterval(function () {
      that.getCurrentTime();
    }, 1000);
  },
  methods:{
    //综合态势
    toDataVisualization(){
      this.menuIndex=0;
      console.log(this.menuIndex)
    },
    //应急指挥
    toEmergencyCommand(){
      this.menuIndex=1;
      console.log(this.menuIndex)
    },
    //值班管理
    toDutyManagement(){
      this.menuIndex=2;
      console.log(this.menuIndex)
    },
    //事件管理
    toEventManagement(){
      this.menuIndex=3;
      console.log(this.menuIndex)
    },
    getCurrentTime() {
      //获取当前时间并打印
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      _this.gettime = yy + "/" + mm + "/" + dd + " " + hh + ":" + mf + ":" + ss;
      this.nowTime = _this.gettime;
    },
  }
};
</script>

<style scoped>
.header {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #242f72;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.menu{
  font-size:25px;
  cursor: default;
  color:white
}
.menuSelect{
  font-size:25px;
  cursor: default;
  color:#06FAE4
}
.second{
  height: 30px;
  background-color: #429ec7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}
.el-main{
  padding: 0;
}
</style>