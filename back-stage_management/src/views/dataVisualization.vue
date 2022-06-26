<template>
  <div>
    <div class="bg">
      <div style="display: flex; justify-content: space-between">
        <div id="pie" style="margin: 10px 10px 10px 10px"></div>
        <div style="color:white;margin-top:10px">
          <div style="display: flex;justify-content: flex-start;align-items: center;">
            <img src="../assets/安全.png" style="width:40px;height:40px" alt="">
          </div>
          <div style="text-align: center;margin-left:-16px;margin-top:10px;color:#1afa29;font-size:15px">
            稳定运行{{1}}天
          </div>
        </div>
        <div style="color:white;margin-top:10px">
          <div style="display: flex;justify-content: flex-start;align-items: center;">
            <img src="../assets/shebeiquyufenbu.png" style="width:40px;height:40px" alt="">
          </div>
          <div style="text-align: center;margin-left:-16px;margin-top:10px;color:#1296db;font-size:15px">
          监控区域{{5}}个
          </div>
        </div>
        <div style="color:white;margin-top:10px">
          <div style="display: flex;justify-content: flex-start;align-items: center;">
            <img src="../assets/puhuoduiwu.png" style="width:40px;height:40px" alt="">
          </div>
          <div style="text-align: center;margin-left:-16px;margin-top:10px;color:#d81e06;font-size:15px">
            救援队伍{{5}}支
          </div>
        </div>
        <div style="color:white;margin-top:10px">
          <div style="display: flex;justify-content: flex-start;align-items: center;">
            <img src="../assets/wodezhiban.png" style="width:40px;height:40px" alt="">
          </div>
          <div style="text-align: center;margin-left:-16px;margin-top:10px;color:#f4ea2a;font-size:15px">
            值班人数{{15}}人
          </div>
        </div>
        <div id="line" style="margin: 10px 10px 10px 10px"></div>
      </div>
      <div style="display: flex; justify-content: space-between">
        <div id="bar" style="margin: 10px 10px 10px 10px"></div>
        <div id="source" style="margin: 10px 10px 10px 10px"></div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    this.pieChart();
    this.lineChart();
    this.barChart();
    this.sourceChart();
  },
  methods: {
    //饼图，包含各个事件的发生次数
    pieChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("pie"), null, {
        width: 300,
        height: 300,
      });
      // 绘制图表
      myChart.setOption({
        backgroundColor: "#429ec7",
        title: {
          text: "各事件发生次数",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          top: "bottom",
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            data: [
              { value: 2, name: "泄露" },
              { value: 15, name: "火灾" },
              { value: 2, name: "爆炸" },
              { value: 20, name: "治安" },
              { value: 30, name: "设备故障" },
              { value: 30, name: "自然灾害" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
      //防抖
      let timer;
      window.onresize = function () {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          myChart.resize();
        }, 500);
      };
    },
    //折线图，表示每天每个事件发生的次数
    lineChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("line"), null, {
        width: 300,
        height: 300,
      });
      // 绘制图表
      myChart.setOption({
        backgroundColor: "#429ec7",
        title: {
          text: "最近一周各事件发生的次数",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          show: true,
          top: "6%", //与上方的距离 可百分比% 可像素px
          data: ["泄露", "火灾", "爆炸", "中毒", "治安", "设备故障"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "泄露",
            type: "line",
            stack: "Total",
            data: [0, 1, 0, 2, 0, 0, 1],
          },
          {
            name: "火灾",
            type: "line",
            stack: "Total",
            data: [0, 1, 0, 0, 1, 0, 2],
          },
          {
            name: "爆炸",
            type: "line",
            stack: "Total",
            data: [0, 0, 0, 0, 0, 1, 0],
          },
          {
            name: "中毒",
            type: "line",
            stack: "Total",
            data: [0, 0, 0, 0, 1, 1, 0],
          },
          {
            name: "治安",
            type: "line",
            stack: "Total",
            data: [10, 9, 2, 7, 3, 4, 3],
          },
          {
            name: "设备故障",
            type: "line",
            stack: "Total",
            data: [20, 15, 2, 10, 3, 5, 7],
          },
        ],
      });
      //防抖
      let timer;
      window.onresize = function () {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          myChart.resize();
        }, 500);
      };
    },
    barChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("bar"), null, {
        width: 300,
        height: 300,
      });
      // 绘制图表
      myChart.setOption({
        backgroundColor: "#429ec7",
        title: {
          text: "事件高发时段",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["0~3点", "4~7点", "8~11点", "12~15点", "16~19点", "20~23点"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "总数",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220],
          },
        ],
      });
      //防抖
      let timer;
      window.onresize = function () {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          myChart.resize();
        }, 500);
      };
    },
    sourceChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("source"), null, {
        width: 300,
        height: 300,
      });
      // 绘制图表
      myChart.setOption({
        backgroundColor: "#429ec7",
        title: {
          text: "各种资源余量",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: [
            "灭火器",
            "救护车",
            "防护服",
            "待命人员",
            "医疗用品",
            "应急物资",
          ],
          axisLabel: {
            // ***x轴 文字竖排显示***
            interval: 0,
            formatter: function (value) {
              return value.split("").join("\n");
            },
            //******x轴 文字倾斜***************
            // interval:0,
            // rotate:15
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      });
      //防抖
      let timer;
      window.onresize = function () {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          myChart.resize();
        }, 500);
      };
    },
  },
};
</script>

<style scoped>
.bg {
  padding: auto;
  background: url("../assets/工业园区背景图.png") center center no-repeat;
  width: 100%;
  background-size: cover;
  height: calc(100vh - 80px);
  overflow: hidden;
}
</style>