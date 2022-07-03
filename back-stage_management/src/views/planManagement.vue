<template>
  <div>
    <div class="mt-4">
      <el-input
        @keydown.enter="toSearch"
        v-model="keyword"
        placeholder="通过关键词搜索↵"
        class="input-with-select"
      >
        <template #append>
          <img
            src="../assets/sousuo.png"
            style="width: 30px; height: 30px; cursor: pointer"
            alt=""
            @click="toSearch"
          />
        </template>
      </el-input>
    </div>
    <el-table :data="plans" style="width: 100%">
      <el-table-column label="编号" prop="id" width="80px" />
      <el-table-column label="名称" prop="title" />
      <el-table-column label="类型" prop="category" />
      <el-table-column label="作者" prop="author" />
      <el-table-column
        label="内容"
        prop="content"
        show-overflow-tooltip="true"
      />
      <el-table-column label="操作">
        <template #header>
          <el-button type="primary" plain @click="(dialogFormVisible = true),add()">
            添加
          </el-button>
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row),(dialogFormVisible1 = true)"
            >修改</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
      <!-- 弹出预案表格用于添加 -->
      <el-dialog
        v-model="dialogFormVisible"
        title="添加预案"
        append-to-body="true"
      >
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="plan"
          style="max-width: 100%"
        >
          <el-form-item label="名称">
            <el-input v-model="plan.name" />
          </el-form-item>
          <el-form-item label="预案类型">
            <el-input v-model="plan.category" />
          </el-form-item>
          <el-form-item label="预案作者">
            <el-input v-model="plan.author" />
          </el-form-item>
          <el-form-item label="内容">
            <el-input
              v-model="plan.content"
              :autosize="{ minRows: 2, maxRows: 8 }"
              type="textarea"
              placeholder="请输入预案内容"
            />
          </el-form-item>
        </el-form>
        <div style="display: flex; justify-content: center">
          <el-button
            type="primary"
            @click="selectPlan,(dialogFormVisible = false)"
            plain
            style="margin: 10px"
            >添加</el-button
          >
        </div>
      </el-dialog>
      <!-- 弹出预案表格用于修改 -->
      <el-dialog
        v-model="dialogFormVisible1"
        title="修改预案"
        append-to-body="true"
      >
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="plan"
          style="max-width: 100%"
        >
          <el-form-item label="名称">
            <el-input v-model="plan.title" />
          </el-form-item>
          <el-form-item label="预案类型">
            <el-input v-model="plan.category" />
          </el-form-item>
          <el-form-item label="预案作者">
            <el-input v-model="plan.author" />
          </el-form-item>
          <el-form-item label="内容">
            <el-input
              v-model="plan.content"
              :autosize="{ minRows: 2, maxRows: 8 }"
              type="textarea"
              placeholder="请输入预案内容"
            />
          </el-form-item>
        </el-form>
        <div style="display: flex; justify-content: center">
          <el-button
            type="primary"
            @click="selectPlan,(dialogFormVisible1 = false)"
            plain
            style="margin: 10px"
            >修改</el-button
          >
        </div>
      </el-dialog>
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
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageNum: 1, //用户请求的分页的页数(默认为1)
      pageSize: 10, //用户请求的数据每一页多少条数据
      total: 0, //总条数
      keyword: "", //用户进行搜索的关键词
      dialogFormVisible: false, //控制弹出框的显示与隐藏
      dialogFormVisible1:false,//控制弹出框的显示与隐藏
      plans: [], //预案
      plan: {
        title: "",
        category: "",
        author: "",
        content: "",
      },
    };
  },
  created() {
    this.axios
      .get(
        "http://127.0.0.1:4523/m1/1171870-0-default/plans?pageNum=" +
          this.pageNum +
          "&pageSize=" +
          this.pageSize +
          "&status=" +
          "待处理"
      )
      .then((res) => {
        console.log(res);
        this.plans = res.data.data.list;
        this.total = res.data.data.total;
      });
  },
  methods: {
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
    //通过关键词搜索
    toSearch() {
      console.log("点击了搜索");
    },
    add(){
      this.plan={
        title: "",
        category: "",
        author: "",
        content: "",
      }
    },
    handleEdit(index,row) {
      this.plan=row;
    },
    handleDelete() {},
  },
};
</script>

<style scoped>
.input-with-select {
  float: left;
  width: 50%;
}
</style>
<style lang="scss">
// 修改表格提示框的宽度
.el-popper {
  max-width: 50%;
}
</style>