<template>
  <div>
    <el-table :data="organization" style="width: 100%">
      <el-table-column label="救援编号" prop="id" />
      <el-table-column label="救援名称" prop="name" />
      <el-table-column label="地址" prop="location" />
      <el-table-column label="可用人力" prop="number" />
      <el-table-column label="类型" prop="type" />
      <el-table-column label="电话号码" prop="phoneNumber" />
      <el-table-column label="距离" prop="distance" />
      <el-table-column align="right">
        <template #header>
          <el-button
            type="primary"
            plain
            @click="(dialogFormVisible = true), add()"
          >
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
    <!-- 添加组织对话框 -->
    <el-dialog
      v-model="dialogFormVisible"
      title="添加组织"
      append-to-body="true"
    >
      <el-form :model="form">
        <el-form-item label="组织名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.location" />
        </el-form-item>
        <el-form-item label="可用人力" :label-width="formLabelWidth">
          <el-input v-model="form.number" />
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="form.type" />
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
          <el-button type="primary" @click="(dialogFormVisible = false),addNewOriganization()"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 修改组织对话框 -->
    <el-dialog
      v-model="dialogFormVisible1"
      title="修改组织"
      append-to-body="true"
    >
      <el-form :model="form">
        <el-form-item label="组织名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.location" />
        </el-form-item>
        <el-form-item label="可用人力" :label-width="formLabelWidth">
          <el-input v-model="form.number" />
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="form.type" />
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
          <el-button @click="dialogFormVisible1 = false">取消</el-button>
          <el-button type="primary" @click="(dialogFormVisible1 = false),editOriganization()"
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
      dialogFormVisible1: false, //修改对话框显示与否
      form: {
        distance: null,
        id: null,
        location: "",
        name: "",
        number: null,
        phoneNumber: "",
        type: null,
      },
    };
  },
  created() {
    this.getOriganizationList(this.pageNum, this.pageSize);
  },
  methods: {
    add() {
      this.form = {
        distance: null,
        id: null,
        location: "",
        name: "",
        number: null,
        phoneNumber: "",
        type: null,
      };
    },
    addNewOriganization(){
      this.axios.post("http://127.0.0.1/humanResource/newHumanResource",this.form)
      .then(res=>{
        console.log(res);
        this.getOriganizationList(this.pageNum, this.pageSize);
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.form = row;
    },
    editOriganization(){
      this.axios.put("http://127.0.0.1/humanResource/modification",this.form)
      .then(res=>{
        console.log(res);
        this.getOriganizationList(this.pageNum, this.pageSize);
      })
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.axios.delete("http://127.0.0.1/humanResource/?id="+row.id)
      .then(res=>{
        console.log(res);
        this.getOriganizationList(this.pageNum, this.pageSize);
      })
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
    //获取组织表单
    getOriganizationList(pageNum, pageSize) {
      this.axios
        .get(
          "http://127.0.0.1/humanResource/list?pageNum=" +
            pageNum +
            "&pageSize=" +
            pageSize
        )
        .then((res) => {
          console.log(res);
          this.organization = res.data.data.list;
          this.total = res.data.data.total;
        });
    },
  },
};
</script>

<style scoped>
</style>