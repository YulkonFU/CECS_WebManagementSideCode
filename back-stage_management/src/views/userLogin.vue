<template>
  <div>
    <div id="background">
      <h1
        style="
          color: white;
          text-align: center;
          padding-top: 60px;
          padding-left: 40px;
          letter-spacing: 40px;
          font-size: 50px;
        "
      >
        园区应急指挥系统
      </h1>
      <div class="container">
        <form action="">
          <h1 style="letter-spacing: 10px">登录</h1>
          <div class="form">
            <div class="item">
              <label>用户名：</label>
              <el-input
                style="height: 80%; width: 60%; margin-right: 20%"
                v-model="username"
                placeholder="请输入用户名"
                clearable
              />
              <!-- v-model把输入的值传输给name变量 -->
              <br />
            </div>
            <div class="item">
              <label>密码：</label>
              <el-input
                style="height: 80%; width: 60%; margin-right: 15%"
                v-model="password"
                type="password"
                show-password
                placeholder="请输入密码"
                clearable
              />
              <br />
            </div>
            <span class="getPassword">找回密码</span>
          </div>
          <el-button
            type="primary"
            @click="toManagement"
            style="margin-top: 20px"
            >登录</el-button
          >
        </form>

        <router-view></router-view>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    toManagement() {
      if (this.username == "" || this.password == "") {
        ElMessage({
          message: "用户名和密码不能为空",
          type: "error",
        });
      } else {
        axios
          .post("http://127.0.0.1:4523/m1/1171870-0-default/user/login", {
            username: this.username,
            password: this.password,
          })
          .then((res) => {
            console.log(res);
            if (res.status == 200) {
              localStorage.setItem("token", res.data.data.token);
              localStorage.setItem("username", res.data.data.username);
              localStorage.setItem("id", res.data.data.id);
              ElMessage({
                message: "登录成功",
                type: "success",
              });
              this.$router.push({ name: "management" });
            } else {
              ElMessage({
                message: "请检查用户名和密码是否正确",
                type: "error",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            ElMessage({
              message: "请检查网络连接",
              type: "error",
            });
          });
      }
    },
  },
};
</script>

<style scoped>
#background {
  width: 100%;
  height: 100%;
  background: url("../assets/背景图.jpg");
  background-size: 100% 100%;
  position: fixed;
  top: 0;
  left: 0;
}

.container {
  width: 480px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #00000090;
  text-align: center;
  border-radius: 20px;
  margin-top: 10px;
  overflow: hidden;
}
.container h1 {
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
  justify-content: center;
}
.getPassword {
  color: blue;
  margin-left: 50%;
  cursor: pointer;
  font-size: 15px;
}
.getPassword:hover{
  color: white;
}
</style>