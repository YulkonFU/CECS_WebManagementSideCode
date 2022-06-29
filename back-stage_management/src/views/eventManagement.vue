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
          <el-menu-item index="1" @click="toEventAudit">
            <span style="font-size: 20px" 
              >事件终止</span
            >
          </el-menu-item>
          <el-menu-item index="2" @click="toEventQuery">
            <span style="font-size: 20px" 
              >事件查询</span
            >
          </el-menu-item>
          <el-menu-item index="3" @click="toPlanManagement">
            <span style="font-size: 20px" 
              >预案管理</span
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
    toEventAudit(){
      this.$router.push("/management/eventManagement/eventTermination")
    },
    toEventQuery(){
      this.$router.push("/management/eventManagement/eventQuery")
    },
    toPlanManagement(){
      this.$router.push("/management/eventManagement/planManagement")      
    }
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