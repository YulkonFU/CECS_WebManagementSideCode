<template>
  <div>
    <!-- 1.输入用户名2.输入邮箱号3.输入验证码4.重置密码 -->
    <el-steps :active="index" align-center>
      <el-step title="Step 1" description="输入用户名" />
      <el-step title="Step 2" description="输入邮箱号" />
      <el-step title="Step 3" description="输入验证码" />
      <el-step title="Step 4" description="重置密码" />
    </el-steps>
    <div class="input">
      <el-form
        :model="form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          v-if="index==0"
          label="用户名："
        >
          <el-input
            placeholder="请输入您的用户名"
            v-model.number="form.username"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          v-if="index==1"
          label="邮箱："
        >
          <el-input
            placeholder="请输入您的邮箱号"
            v-model.number="form.email"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          v-if="index==2"
          label="验证码："
        >
          <el-input
            placeholder="请输入您的验证码"
            v-model.number="form.check"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          v-if="index==3"
          label="新密码："
        >
          <el-input
            placeholder="请输入您的新密码号"
            v-model.number="form.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
          @click="index<4 ? index+=1 :backLogin()"
            >下一步</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 0, //步骤条index
      form:{
        username:"",
        email:"",
        check:"",
        password:""
      }
    };
  },
  methods:{
    backLogin(){
      alert("返回登录")
    }
  }
};
</script>

<style scoped>
.input {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 30%;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}
</style>