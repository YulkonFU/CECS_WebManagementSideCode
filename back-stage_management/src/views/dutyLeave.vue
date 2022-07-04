<template>
  <div>
    <div class="mt-4" style="display: flex; justify-content: space-between">
      <el-input
        style="width: 50%"
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
    <el-table :data="dutyLeave" style="width: 100%">
      <el-table-column label="编号" prop="recordId" />
      <el-table-column label="值班编号" prop="applicant" />
      <el-table-column label="总控编号" prop="verifier" />
      <el-table-column label="请假日期" prop="leaveDate" />
      <el-table-column label="请假开始" prop="leaveStartTime" />
      <el-table-column label="请假结束" prop="leaveEndTime" />
      <el-table-column label="请假理由" prop="leaveMatter" />
      <el-table-column label="审核状态" prop="status" />
      <el-table-column label="审核理由" prop="auditReason" />
      <el-table-column align="right">
        <template #default="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row), (dialogFormVisible = true)"
            >审核</el-button
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
        <el-form-item label="是否通过" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="是否通过" @change="getByStatus" style="width: 115px">
            <el-option label="通过" value=1 />
            <el-option label="不通过" value=2 />
          </el-select>
        </el-form-item>
        <el-form-item label="审核意见" :label-width="formLabelWidth">
          <el-input v-model="form.auditReason" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="(dialogFormVisible = false), commit()"
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
      keyword: "", //关键词
      pageNum: 1, //用户请求的分页的页数(默认为1)
      pageSize: 10, //用户请求的数据每一页多少条数据
      total: 0, //总条数
      dutyLeave: [], //请假表
      dialogFormVisible: false, //控制dialog
      date: "", //选择的时间
      form: {
        applicant: null,
        auditReason: "",
        deleted: null,
        leaveDate: "",
        leaveEndTime: "",
        leaveMatter: "",
        leaveStartTime: "",
        recordId: null,
        status: null,
        verifier: null,
      },
    };
  },
  created() {
    this.getDutyLeaveList(this.pageNum, this.pageSize, this.keyword);
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.form=row
    },
    commit(){
      this.axios.put("http://127.0.0.1/leaveRecord/modification",this.form)
      .then(res=>{
        console.log(res);
      })
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
    //获取请假表信息
    getDutyLeaveList(pageNum, pageSize, keyword) {
      this.axios
        .get(
          "http://127.0.0.1/leaveRecord/list?pageNum=" +
            pageNum +
            "&pageSize=" +
            pageSize +
            "&str=" +
            keyword
        )
        .then((res) => {
          console.log(res);
          this.dutyLeave = res.data.data.list;
          this.total = res.data.data.total;
        });
    },
    toSearch() {
      this.getDutyLeaveList(this.pageNum, this.pageSize, this.keyword);
    },
  },
};
</script>

<style scoped>
</style>