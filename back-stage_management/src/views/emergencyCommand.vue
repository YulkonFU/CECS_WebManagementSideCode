<template>
  <div>
    <el-container>
      <el-aside width="15%">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#242f72"
          class="el-menu-vertical-demo"
          default-active="1"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1" @click="toPlanImplementation">
            <span style="font-size: 20px" 
              >预案执行</span
            >
          </el-menu-item>
          <el-menu-item index="2" @click="toResourceScheduling">
            <span style="font-size: 20px" 
              >救援物资</span
            >
          </el-menu-item>
          <el-menu-item index="3" @click="toDispositionDeployment">
            <span style="font-size: 20px" 
              >救援组织</span
            >
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    toPlanImplementation() {
      this.$router.push("/management/emergencyCommand/planImplementation");
    },
    toResourceScheduling() {
      this.$router.push("/management/emergencyCommand/resourceScheduling");
    },
    toDispositionDeployment() {
      this.$router.push("/management/emergencyCommand/dispositionDeployment");
    },
  },
};
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