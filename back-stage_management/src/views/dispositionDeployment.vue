<template>
  <div>
    <el-table :data="organization" style="width: 100%">
      <el-table-column label="救援编号" prop="id" />
      <el-table-column label="救援单位" prop="organization" />
      <el-table-column label="可用人力" prop="manpower" />
      <el-table-column label="类型" prop="category" />
      <el-table-column label="电话号码" prop="phoneNumber" />
      <el-table-column label="距离" prop="distance" />
      <el-table-column align="right">
        <template #header>
          <el-button type="primary" plain @click="dialogFormVisible = true">
            添加
          </el-button>
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
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
      title="添加组织"
      append-to-body="true"
    >
      <el-form :model="form">
        <el-form-item label="组织名称" :label-width="formLabelWidth">
          <el-input v-model="form.organization" />
        </el-form-item>
        <el-form-item label="组织类型" :label-width="formLabelWidth">
          <el-input v-model="form.category" />
        </el-form-item>
        <el-form-item label="可用人力" :label-width="formLabelWidth">
          <el-input v-model="form.manpower" />
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth">
          <el-input v-model="form.phoneNumber" />
        </el-form-item>
        <el-form-item label="救援距离" :label-width="formLabelWidth">
          <el-input v-model="form.distance" />
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
      organization: [], //救援组织
      dialogFormVisible: false, //添加对话框显示与否
      form: {
        name: "",
        category: "",
        manpower:"",
        phoneNumber:"",
        distance:""
      },
    };
  },
  created() {
    this.axios
      .get(
        "http://127.0.0.1:4523/m1/1171870-0-default/rescue?pageNum=" +
          this.pageNum +
          "&pageSize=" +
          this.pageSize
      )
      .then((res) => {
        console.log(res.data);
        this.total = res.data.data.total;
        this.organization = res.data.data.list;
      });
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>

<style scoped>
</style>