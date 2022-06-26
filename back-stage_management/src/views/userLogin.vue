<template>
  <div>
    <div id="background">
      <h1 style="color:white;text-align:center;padding-top:60px;padding-left:40px;letter-spacing:40px;font-size:50px">园区应急指挥系统</h1>
      <div class="container">
        <form action="">
          <h1 style="letter-spacing:10px">登录</h1>
          <div class="form">
            <div class="item">
              <label>用户名：</label
              >
              <el-input style="height:80%;width:60%;margin-right: 20%;" v-model="name" placeholder="请输入用户名" clearable  />
              <!-- v-model把输入的值传输给name变量 -->
              <br />
            </div>
            <div class="item">
              <label>密码：</label
              >
              <el-input style="height:80%;width:60%;margin-right: 15%;" v-model="password" type="password" show-password placeholder="请输入密码" clearable />
              <br />
            </div>
          </div>
        </form>
        <el-button type="primary" @click="toManagement" style="margin:20px 30px 0 30px">登录</el-button>
        <el-button type="primary" @click="toGetPassword" style="margin:20px 0 0 30px;">找回密码</el-button>
        <router-view></router-view>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data(){
    return{
      name:"",
      password:""
    }
  },
  methods:{
    toManagement(){
      this.$router.push({name:"management"})
    }
  }
};
</script>

<style scoped>
  #background{
    width: 100%;
    height: 100%;
    background: url("../assets/背景图.jpg");
    background-size:100% 100%;
    position: fixed;
    top: 0;
    left: 0;
}

.container{
  width: 480px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background:#00000090;
  text-align: center;
  border-radius: 20px;
  margin-top: 10px;
  overflow: hidden
}
.container h1{
  color: aliceblue;
  margin-left: 20px;
}
.item {
  color: white;
  margin-left: 15%;
  margin-top: 35px;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  justify-content:center;
}

</style>