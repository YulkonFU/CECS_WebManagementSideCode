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
          <span style="color: white; font-size: 25px">管理员后台系统</span>
        </div>
        <div>
          <el-dropdown style="color: black">
            欢迎,{{ administrators }}
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="loginOut">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-main>
          <el-button
            type="primary"
            size="small"
            plain
            style="float: right; margin-right: 13px"
            @click="(dialogFormVisible = true), add()"
            >添加</el-button
          >
          <el-table :data="user" style="width: 100%">
            <el-table-column label="编号" prop="id" />
            <el-table-column label="用户名" prop="username" />
            <el-table-column label="姓名" prop="name" />
            <el-table-column label="年龄" prop="age" />
            <el-table-column label="性别" prop="sex" />
            <el-table-column label="创建时间" prop="createTime" />
            <el-table-column label="权限" prop="roleName" />
            <el-table-column label="电话号码" prop="phoneNumber" />
            <el-table-column label="邮箱" prop="email" />
            <el-table-column align="right">
              <template #header>
                <el-input
                  v-model="search"
                  size="small"
                  placeholder="请输入姓名搜索↵"
                  @keydown.enter="toSearch"
                />
              </template>
              <template #default="scope">
                <el-button
                  size="small"
                  @click="
                    handleEdit(scope.$index, scope.row),
                      (dialogFormVisible1 = true)
                  "
                  >修改</el-button
                >

                <el-popconfirm title="是否删除" @confirm="handleDelete(scope.$index, scope.row)">
                  <template #reference>
                    <el-button
                      size="small"
                      type="danger"
                      >删除</el-button
                    >
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="block">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[10, 20, 50, 100]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
          <!-- 弹出预案表格用于添加 -->
          <el-dialog
            v-model="dialogFormVisible"
            title="添加用户"
            append-to-body="true"
          >
            <el-form
              :label-position="labelPosition"
              label-width="100px"
              :rules="rules"
              :model="form"
              style="max-width: 100%"
            >
              <el-form-item label="姓名">
                <el-input v-model="form.name" />
              </el-form-item>
              <el-form-item label="用户名">
                <el-input v-model="form.username" />
              </el-form-item>
              <el-form-item label="密码">
                <el-input type="password" v-model="form.password" />
              </el-form-item>
              <el-form-item label="年龄">
                <el-input v-model="form.age" />
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="form.sex" class="m-2" placeholder="性别">
                  <el-option label="男" value="1" />
                  <el-option label="女" value="2" />
                </el-select>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="form.email" />
              </el-form-item>
              <el-form-item label="电话号码">
                <el-input v-model="form.phoneNumber" />
              </el-form-item>
              <el-form-item label="权限">
                <el-select
                  v-model="form.roleName"
                  class="m-2"
                  placeholder="权限"
                >
                  <el-option label="总控人员" value="总控人员" />
                  <el-option label="值班人员" value="值班人员" />
                </el-select>
              </el-form-item>
            </el-form>
            <div style="display: flex; justify-content: center">
              <el-button
                type="primary"
                @click="addUser()"
                plain
                style="margin: 10px"
                >添加</el-button
              >
            </div>
          </el-dialog>
          <!-- 弹出预案表格用于修改 -->
          <el-dialog
            v-model="dialogFormVisible1"
            title="修改用户"
            append-to-body="true"
          >
            <el-form
              :label-position="labelPosition"
              label-width="100px"
              :rules="rules"
              :model="form"
              style="max-width: 100%"
            >
              <el-form-item label="姓名">
                <el-input v-model="form.name" />
              </el-form-item>
              <el-form-item label="用户名">
                <el-input v-model="form.username" />
              </el-form-item>
              <el-form-item label="年龄">
                <el-input v-model="form.age" />
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="form.status" class="m-2" placeholder="性别">
                  <el-option label="男" value="1" />
                  <el-option label="女" value="2" />
                </el-select>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="form.email" />
              </el-form-item>
              <el-form-item label="电话号码">
                <el-input v-model="form.phoneNumber" />
              </el-form-item>
              <el-form-item label="权限">
                <el-select
                  v-model="form.roleName"
                  class="m-2"
                  placeholder="权限"
                >
                  <el-option label="总控人员" value="总控人员" />
                  <el-option label="值班人员" value="值班人员" />
                </el-select>
              </el-form-item>
            </el-form>
            <div style="display: flex; justify-content: center">
              <el-button
                type="primary"
                @click="editUser(), (dialogFormVisible1 = false)"
                plain
                style="margin: 10px"
                >修改</el-button
              >
            </div>
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      user: [], //用于存放用户列表
      pageNum: 1, //用户请求的分页的页数(默认为1)
      pageSize: 10, //用户请求的数据每一页多少条数据
      total: 0, //总条数
      administrators: "", //管理员用户名
      search: "", //通过用户名搜索
      dialogFormVisible: false, //控制添加弹窗
      dialogFormVisible1: false, //控制修改弹窗
      form: {
        age: null,
        email: "",
        name: "",
        phoneNumber: "",
        password: "",
        roleName: "",
        sex: null,
        username: "",
      },
    };
  },
  created() {
    this.findUser();
    this.administrators = localStorage.getItem("username");
  },
  methods: {
    //查找用户
    findUser() {
      this.axios
        .get("http://127.0.0.1/users/list?pageNum="+ this.pageNum +"&pageSize=" +this.pageSize +"&name=" +this.search)
        .then((res) => {
          console.log(res);
          this.user = res.data.data.list;
          this.total = res.data.data.total;
        });
    },
    //添加用户
    addUser() {
      this.axios
        .post("http://127.0.0.1/users", this.form)
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage({
              message: "添加成功",
              type: "success",
            });
            (this.dialogFormVisible = false), this.findUser();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      this.form=row
    },
    //修改
    editUser(){
      let user=JSON.parse(JSON.stringify(this.form))
      this.axios.put("http://127.0.0.1/users/"+user.id,user)
      .then(res=>{
        console.log(res);
        this.findUser()
      })
      .catch(err=>{
        console.log(err);
      })
    },
    handleDelete(index, row) {
      let user=JSON.parse(JSON.stringify(row))
      this.axios.delete("http://127.0.0.1/users/"+user.id)
      .then(res=>{
        console.log(res);
        this.findUser()
      })
      .catch(err=>{
        console.log(err);
      })
    },
    //每页页数变化
    handleSizeChange(val) {
      this.pageSize = val;
      this.findUser();
    },
    //切换页数
    handleCurrentChange(val) {
      this.pageNum = val;
      this.findUser();
    },
    //退出
    loginOut() {
      this.$router.push("/login");
    },
    //通过姓名搜索
    toSearch() {
      this.findUser();
    },
    //添加用户
    add() {
      this.form = {
        age: null,
        email: "",
        name: "",
        phoneNumber: "",
        role: "",
        sex: null,
        status: null,
        username: "",
      };
    },
  },
};
</script>

<style scoped>
.el-header {
  background-color: #38a28a;
}
</style>
