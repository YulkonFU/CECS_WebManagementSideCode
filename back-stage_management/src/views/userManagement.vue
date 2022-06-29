<template>
  <div class="common-layout">
    <el-container>
      <el-header
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div>
          <span style="color:white;font-size:25px">管理员后台系统</span>
        </div>
        <div>欢迎,{{ 54454 }}</div>
      </el-header>
      <el-container>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.el-header {
  background-color: #38A28A;
}
.el-side {
  background-color: blue;
}
.el-main {
  background-color: pink;
}
</style>
