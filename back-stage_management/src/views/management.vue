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
        <div class="menu" tabindex="-1">
          <span style="font-size:30px;color:white">综合态势</span>
        </div>
        <div class="menu" tabindex="-1">
          <span style="font-size:30px;color:white">应急指挥</span>
        </div>
        <div class="menu" tabindex="-1">
          <span style="font-size:30px;color:white">值班管理</span>
        </div>
        <div class="menu" tabindex="-1">
          <span style="font-size:30px;color:white">事件管理</span>
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
      <el-container>
        <el-main>
          <router-view> </router-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
export default {};
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

</style>