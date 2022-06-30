<template v-slot:dropdown>
  <div>
    <div>
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
        <div class="menu" @click="toDataVisualization">
          <span :class="[menuIndex == 0 ? 'menuSelect' : 'menu']"
            >综合态势</span
          >
        </div>
        <div class="menu" @click="toEmergencyCommand">
          <span :class="[menuIndex == 1 ? 'menuSelect' : 'menu']"
            >应急指挥</span
          >
        </div>
        <div class="menu" @click="toDutyManagement">
          <span :class="[menuIndex == 2 ? 'menuSelect' : 'menu']"
            >值班管理</span
          >
        </div>
        <div class="menu" @click="toEventManagement">
          <span :class="[menuIndex == 3 ? 'menuSelect' : 'menu']"
            >事件管理</span
          >
        </div>
        <div>
          <el-tooltip content="应急通知" placement="bottom" effect="light">
            <img
              :src="imgUrl"
              style="width: 30px; height: 30px; margin-right: 20px"
              @click="playVoice"
              alt=""
            />
          </el-tooltip>
        </div>
        <div>
          <el-dropdown
            @command="handleCommand"
            style="
              display: flex;
              align-items: center;
              color: white;
              margin-right: 30px;
            "
          >
            <span>欢迎，{{ username }}</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="a" @click="loginOut"
                  >退出</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="second">
        <div>
          <span
            style="
              margin-right: 10px;
              border-right: solid 1px white;
              font-size: 15px;
            "
            >地点：克拉玛依石化工业园区
          </span>
          <span style="font-size: 20px">{{ menu[menuIndex] }}</span>
        </div>
        <div
          style="
            margin-right: 20px;
            font-size: 15px;
            display: flex;
            align-items: center;
          "
        >
          <img
            src="../assets/tianqi.png"
            style="width: 20px; height: 20px; margin-right: 10px"
            alt=""
          />
          <span style="margin-right: 10px">{{ nowTmp }}℃</span>
          <span style="margin-right: 10px">{{ wea }}</span>
          <span style="margin-right: 10px">{{ week }}</span>
          <span>{{ nowTime }}</span>
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
  data() {
    return {
      menuIndex: 0, //当前选择的菜单栏
      menu: ["综合态势", "应急指挥/资源调度", "值班管理", "事件管理"],
      nowTmp: 0, //当前温度
      wea: "", //当前天气情况
      week: "", //当前星期几
      nowTime: "", //当前时间
      isFirst:true,//是否是第一次渲染
      isplay: false, //是否播放语音
      imgUrl:require('../assets/guangbo_white.png'),
      player: new Audio(),
      username: "用户名",
    };
  },
  created() {
    this.axios
      .get(
        "https://v0.yiketianqi.com/api?unescape=1&version=v61&appid=76564418&appsecret=Lx8yZLGo&cityid=101130201"
      )
      .then((res) => {
        console.log(res.data);
        this.nowTmp = res.data.tem;
        this.wea = res.data.wea;
        this.week = res.data.week;
      });
  },
  mounted() {
    this.getCurrentTime();
    let that = this;
    setInterval(function () {
      that.getCurrentTime();
    }, 1000);
    this.username = localStorage.getItem("username");
  },
  methods: {
    //退出
    loginOut() {
      this.$router.push("/login");
    },
    //综合态势
    toDataVisualization() {
      this.menuIndex = 0;
      this.$router.push("/management/dataVisualization");
    },
    //应急指挥
    toEmergencyCommand() {
      this.menuIndex = 1;
      this.$router.push("/management/emergencyCommand");
    },
    //值班管理
    toDutyManagement() {
      this.menuIndex = 2;
      this.$router.push("/management/dutyManagement");
    },
    //事件管理
    toEventManagement() {
      this.menuIndex = 3;
      this.$router.push("/management/eventManagement");
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
    playVoice(text) {
      text="地震来了，请大家寻找安全位置躲避"
      if (this.isFirst) {
        var mp3 =
          "https://tts.youdao.com/fanyivoice?word=" +
          text +
          "&le=zh&keyfrom=speaker-target";
        this.player = new Audio(mp3);
      }
      this.isFirst=false;
      this.isplay=!this.isplay
      if (this.isplay == true) {
        this.imgUrl=require('../assets/guangbo_red.png')
        this.player.loop = true; //循环播放
        this.player.play(); //播放 mp3这个音频对象
      } else {
        this.imgUrl=require('../assets/guangbo_white.png')
        this.player.pause();
        this.player.load()
      }
    },
  },
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
.menu {
  font-size: 25px;
  cursor: default;
  color: white;
}
.menuSelect {
  font-size: 25px;
  cursor: default;
  color: #06fae4;
}
.second {
  height: 30px;
  background-color: #429ec7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}
.el-main {
  padding: 0;
}
</style>