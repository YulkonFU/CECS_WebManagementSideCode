<template>
  <div>
    <el-table :data="source" style="width: 100%">
      <el-table-column label="资源编号" prop="id" />
      <el-table-column label="资源名称" prop="name" />
      <el-table-column label="资源类型" prop="category" />
      <el-table-column label="资源数量" prop="inventory" />
      <el-table-column align="right">
        <template #header>
          <el-button type="primary" plain @click="dialogFormVisible = true,add()">
            添加
          </el-button>
        </template>
        <template #default="scope">
          <el-button
            size="small"
            @click="
              handleEdit(scope.$index, scope.row), (dialogFormVisible1 = true)
            "
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
    </el-table>
    <!-- 添加资源对话框 -->
    <el-dialog
      v-model="dialogFormVisible"
      title="添加资源"
      style="width: 30%"
      append-to-body="true"
    >
      <el-form :model="form">
        <el-form-item label="资源名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="资源类型" :label-width="formLabelWidth">
          <el-input v-model="form.category" />
        </el-form-item>
        <el-form-item label="资源数量" :label-width="formLabelWidth">
          <el-input v-model="form.inventory" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 修改资源对话框 -->
    <el-dialog
      v-model="dialogFormVisible1"
      title="修改资源"
      style="width: 30%"
      append-to-body="true"
    >
      <el-form :model="form">
        <el-form-item label="资源名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="资源类型" :label-width="formLabelWidth">
          <el-input v-model="form.category" />
        </el-form-item>
        <el-form-item label="资源数量" :label-width="formLabelWidth">
          <el-input v-model="form.inventory" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible1 = false"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
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
      source: [], //资源
      dialogFormVisible: false, //添加对话框显示与否
      dialogFormVisible1: false, //修改对话框显示与否
      form: {
        name: "",
        category: "",
        inventory: null,
      },
    };
  },
  created() {
    this.axios
      .get(
        "http://127.0.0.1:4523/m1/1171870-0-default/supply?pageNum=" +
          this.pageNum +
          "&pageSize=" +
          this.pageSize
      )
      .then((res) => {
        console.log(res.data);
        this.total = res.data.data.total;
        this.source = res.data.data.list;
      });
  },
  methods: {
    //添加
    add(){
      this.form={
        name: "",
        category: "",
        inventory: null,
      }
    },
    //修改
    handleEdit(index, row) {
      console.log(index, row);
      this.form=row;
    },
    //删除
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
  },
};
</script>

<style scoped>
</style>