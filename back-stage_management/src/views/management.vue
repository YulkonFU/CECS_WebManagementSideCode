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
              :class="{ imgChange: isplay }"
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
        <div>
          <ul class="list">
            <li
              v-for="(item, index) in ulList"
              :key="item.id"
              :class="!index && play ? 'toUp' : ''"
            >
            <img src="../assets/gonggao.png"  style="width:20px;height:20px" alt="">
              {{ item.msg }}
            </li>
          </ul>
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
      isFirst: true, //是否是第一次渲染
      isplay: false, //是否播放语音
      imgUrl: require("../assets/guangbo_white.png"),
      player: new Audio(),
      username: "用户名",

      ulList: [],
      play: false,
    };
  },
  created() {
    this.axios
      .get(
        "https://v0.yiketianqi.com/api?unescape=1&version=v61&appid=76564418&appsecret=Lx8yZLGo&cityid=101130201"
      )
      .then((res) => {
        console.log(res.data);
        this.ulList.push({ msg: res.data.air_tips });
        this.ulList.push({ msg: res.data.alarm.alarm_title });
        this.ulList.push({
          msg:
            res.data.aqi.jinghuaqi +
            "," +
            res.data.aqi.kaichuang +
            "," +
            res.data.aqi.kouzhao,
        });
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
    setInterval(this.startPlay, 2000);
  },
  methods: {
    //消息轮播
    startPlay() {
      let that = this;
      that.play = true; //开始播放
      setTimeout(() => {
        that.ulList.push(that.ulList[0]); //将第一条数据塞到最后一个
        that.ulList.shift(); //删除第一条数据
        that.play = false; //暂停播放
      }, 1000);
    },
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
      text = "。A区发生火灾，请尽快部署措施";
      if (this.isFirst) {
        var mp3 =
          "https://tts.youdao.com/fanyivoice?word=" +
          text +
          "&le=zh&keyfrom=speaker-target";
        this.player = new Audio(mp3);
      }
      this.isFirst = false;
      this.isplay = !this.isplay;
      if (this.isplay == true) {
        this.imgUrl = require("../assets/guangbo_red.png");
        this.player.loop = true; //循环播放
        this.player.play(); //播放 mp3这个音频对象
      } else {
        this.imgUrl = require("../assets/guangbo_white.png");
        this.player.pause();
        this.player.load();
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
  font-size: 24px;
  cursor: default;
  color: white;
}
.menuSelect {
  font-size: 24px;
  cursor: default;
  color: #facc05;
}
.second {
  height: 30px;
  background-color: #429ec7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  color: white;
}
.el-main {
  padding: 0;
}

@keyframes scaleDraw {
  /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/

  0% {
    transform: scale(1);

    /*开始为原始大小*/
  }

  25% {
    transform: scale(1.3);

    /*放大1.1倍*/
  }

  50% {
    transform: scale(1);
  }

  75% {
    transform: scale(1.3);
  }
}
.imgChange {
  -webkit-animation-name: scaleDraw;

  /*关键帧名称*/

  -webkit-animation-timing-function: ease-in-out;

  /*动画的速度曲线*/

  -webkit-animation-iteration-count: infinite;

  /*动画播放的次数*/

  -webkit-animation-duration: 5s;

  /*动画所花费的时间*/
}
.toUp {
  margin-top: -40px;
  transition: all 0.5s;
}

.list {
  list-style: none;
  width: 100%;
  text-align: center;
  overflow: hidden;
  height: 40px;
  padding: 0;
  margin: 0;
}
li {
  height: 40px;
  line-height: 40px;
  font-size:13px;
  color: #FFCCCC;
  display: flex;
  align-items: center;
  text-align: center;
}
</style>