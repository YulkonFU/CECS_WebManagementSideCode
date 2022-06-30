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
          <el-dropdown style="color:black">
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
          <el-table :data="user" style="width: 100%">
            <el-table-column label="编号" prop="id" />
            <el-table-column label="用户名" prop="username" />
            <el-table-column label="姓名" prop="name" />
            <el-table-column label="年龄" prop="age" />
            <el-table-column label="性别" prop="sex" />
            <el-table-column label="创建时间" prop="createTime" />
            <el-table-column label="状态" prop="status" />
            <el-table-column label="电话号码" prop="phoneNumber" />
            <el-table-column label="邮箱" prop="email" />
            <el-table-column align="right">
              <template #header>
                <el-input
                  v-model="search"
                  size="small"
                  placeholder="Type to search"
                />
              </template>
              <template #default="scope">
                <el-button
                  size="small"
                  @click="handleEdit(scope.$index, scope.row)"
                  >Edit</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >Delete</el-button
                >
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
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: [], //用于存放用户列表
      pageNum: 1, //用户请求的分页的页数(默认为1)
      pageSize: 10, //用户请求的数据每一页多少条数据
      total: 0, //总条数
      administrators: "", //管理员用户名
    };
  },
  created() {
    this.axios
      .get(
        "http://127.0.0.1:4523/m1/1171870-0-default/user/list?pageNum=" +
          this.pageNum +
          "&pageSize=" +
          this.pageSize
      )
      .then((res) => {
        console.log(res.data);
        this.user = res.data.data.list;
        this.total = res.data.data.total;
      });
    this.administrators = localStorage.getItem("username");
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.form = row;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //每页页数变化
    handleSizeChange(val) {
      console.log(`每页 ${val}条`);
      this.pageSize = val;
    },
    //切换页数
    handleCurrentChange(val) {
      console.log(`当前页 ${val}条`);
      this.pageNum = val;
    },
    //退出
    loginOut(){
      this.$router.push("/login")
    }
  },
};
</script>

<style scoped>
.el-header {
  background-color: #38a28a;
}
</style>
