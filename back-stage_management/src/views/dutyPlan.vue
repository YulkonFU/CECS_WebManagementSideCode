<template>
  <div>
    <div class="mt-4" style="display:flex;justify-content: space-between;">
      <el-input
        style="width:50%"
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
      <el-button type="primary" round  style="margin-right:13px">导入</el-button>
    </div>
    <el-table :data="dutyPlan" style="width: 100%">
      <el-table-column label="员工编号" prop="id" />
      <el-table-column label="员工姓名" prop="name" />
      <el-table-column label="值班日期" prop="date" />
      <el-table-column label="值班地点" prop="location" />
      <el-table-column label="值班开始时间" prop="startTime" />
      <el-table-column label="值班结束时间" prop="endTime" />
      <el-table-column label="值班状态" prop="state" />
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
    <!-- 添加巡逻员 -->
    <el-dialog
      v-model="dialogFormVisible"
      title="添加巡逻员"
      append-to-body="true"
    >
      <el-form :model="form">
        <el-form-item label="人员姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="值班日期" :label-width="formLabelWidth">
          <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        />
        </el-form-item>
        <el-form-item label="值班地点" :label-width="formLabelWidth">
          <el-select v-model="form.location" placeholder="请输入值班地点">
        <el-option label="A区" value="A区" />
        <el-option label="B区" value="B区" />
        <el-option label="C区" value="C区" />
        <el-option label="D区" value="D区" />
      </el-select>
        </el-form-item>
        <el-form-item label="开始时间" :label-width="formLabelWidth">
          <el-time-picker
          v-model="form.startTime"
          placeholder="请选择开始时间"
          style="width: 100%"
        />
        </el-form-item>
        <el-form-item label="结束时间" :label-width="formLabelWidth">
          <el-time-picker
          v-model="form.endTime"
          placeholder="请选择结束时间"
          style="width: 100%"
        />
        </el-form-item>
        <el-form-item label="值班状态" :label-width="formLabelWidth">
          <el-select v-model="form.state" placeholder="请输入状态">
        <el-option label="在岗" value="在岗" />
        <el-option label="未在岗" value="未在岗" />
      </el-select>
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
      keyword:"",//关键词
      pageNum: 1, //用户请求的分页的页数(默认为1)
      pageSize: 10, //用户请求的数据每一页多少条数据
      total: 0, //总条数
      dutyPlan: [], //资源
      dialogFormVisible: false, //添加对话框显示与否
      form: {
        name: "",
        date:"",
        location:"",
        startTime:"",
        endTime:"",
        state:""
      },
    };
  },
  created() {
    this.axios
      .get(
        "http://127.0.0.1:4523/m1/1171870-0-default/dutySchedule/list?pageNum=" +
          this.pageNum +
          "&pageSize=" +
          this.pageSize
      )
      .then((res) => {
        console.log(res.data);
        this.total = res.data.data.total;
        this.dutyPlan = res.data.data.list;
      });
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
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
  },
};
</script>

<style scoped>
</style>