<template>
  <div>
    <div class="bg">

    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {

}
</script>

<style scoped>
.bg{
  padding: auto;
  background: url("../assets/工业园区背景图.png") center center no-repeat;
  width: 100%;
  background-size: 100% 100%;
  height: calc(100vh - 80px);
}
</style>