<template>
  <div>
    <el-container>
      <el-aside width="15%" style="height:calc(100vh - 80px)">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#242f72"
          class="el-menu-vertical-demo"
          default-active="1"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1" @click="toDutyPlan">
            <span style="font-size: 20px" 
              >值班计划</span
            >
          </el-menu-item>
          <el-menu-item index="2" @click="toDutyLog">
            <span style="font-size: 20px" 
              >值班日志</span
            >
          </el-menu-item>
          <el-menu-item index="3" @click="toDutyLeave">
            <span style="font-size: 20px" 
              >值班请假</span
            >
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main style="height:calc(100vh - 80px)">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    toDutyPlan(){
      this.$router.push("/management/dutyManagement/dutyPlan")
    },
    toDutyLog(){ 
      this.$router.push("/management/dutyManagement/dutyLog")
    },
    toDutyLeave(){
      this.$router.push("/management/dutyManagement/dutyLeave")
    },
  }
}
</script>

<style scoped>
.el-menu {
  width: 200px;
  height: calc(100vh - 80px);
}
.main {
  width: 100%;
  height: 100%;
}
</style>