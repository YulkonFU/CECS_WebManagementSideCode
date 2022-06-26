<template>
  <div>
    <div>
      <div class="mt-4">
        <el-input
          v-model="input"
          placeholder="Please input"
          class="input-with-select"
        >
          <template #prepend>
            <el-select
              v-model="select"
              placeholder="Select"
              style="width: 115px"
            >
              <el-option label="火灾" value="1" />
              <el-option label="治安" value="2" />
              <el-option label="设备维修" value="3" />
            </el-select>
          </template>
          <template #append>
            <img src="../assets/sousuo.png" style="width:30px;height:30px;cursor: pointer;" @click="toSearch" alt="">
          </template>
        </el-input>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  data(){
    return{
      input:"",
      select:""
    }
  }
};
</script>

<style scoped>
.input-with-select{
  float: left;
  width: 50%;
}
</style>