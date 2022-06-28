<template>
  <div>
    <div class="mt-4" style="display:flex;justify-content: space-between;">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="Pick a date"
          style="width: 30%;padding-left:0px;"
        />
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
    </div>
    <el-table :data="dutyLeave" style="width: 100%">
      <el-table-column label="编号" prop="recordID" />
      <el-table-column label="值班编号" prop="applicant" />
      <el-table-column label="总控编号" prop="verifier" />
      <el-table-column label="请假日期" prop="leaveDate" />
      <el-table-column label="请假开始" prop="leaveStartTime" />
      <el-table-column label="请假结束" prop="leaveEndTime" />
      <el-table-column label="请假理由" prop="leaveMatter" />
      <el-table-column label="审核状态" prop="status" />
      <el-table-column label="审核理由" prop="auditReason" />
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
      keyword:"",//关键词
      pageNum: 1, //用户请求的分页的页数(默认为1)
      pageSize: 10, //用户请求的数据每一页多少条数据
      total: 0, //总条数
      dutyLeave: [], //请假表
      date:"",//选择的时间
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
        "http://127.0.0.1:4523/m1/1171870-0-default/dutyLeave/list?pageNum=" +
          this.pageNum +
          "&pageSize=" +
          this.pageSize
      )
      .then((res) => {
        console.log(res.data);
        this.total = res.data.data.total;
        this.dutyLeave = res.data.data.list;
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