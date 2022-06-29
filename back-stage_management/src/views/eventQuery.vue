<template>
  <div>
    <el-date-picker
      v-model="date"
      type="date"
      placeholder="Pick a date"
      style="width: 30%; padding-left: 0px"
    />
    <div class="mt-4">
      <el-input
        @keydown.enter="toSearch"
        v-model="keyword"
        placeholder="通过关键词搜索↵"
        class="input-with-select"
      >
        <template #prepend>
          <el-select v-model="select" placeholder="已解决" style="width: 115px">
            <el-option label="待处理" value="待处理" />
            <el-option label="处理中" value="处理中" />
            <el-option label="事态升级" value="事态升级" />
            <el-option label="已解决" value="已解决" />
            <el-option label="不能解决" value="不能解决" />
          </el-select>
        </template>
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
    <el-table :data="event" style="width: 100%">
      <el-table-column label="事件编号" prop="id" width="80px" />
      <el-table-column label="事件类型" prop="type" width="80px" />
      <el-table-column label="事发时间" prop="startTime" />
      <el-table-column label="结束时间" prop="endTime" />
      <el-table-column label="事发地" prop="location" />
      <el-table-column label="事件等级" prop="level" width="80px" />
      <el-table-column
        label="描述"
        prop="description"
        show-overflow-tooltip="true"
      />
      <el-table-column label="上报人" prop="reporter" width="80px" />
      <el-table-column label="状态" prop="state" width="80px" />
      <el-table-column label="执行人" prop="commander" width="80px" />
      <el-table-column label="流程id" prop="flowId" width="80px" />
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
      select: "已解决", //选择的事件状态
      type: "", //用户选择的预案类型
      pageNum: 1, //用户请求的分页的页数(默认为1)
      pageSize: 10, //用户请求的数据每一页多少条数据
      total: 0, //总条数
      date: "", //时间
      keyword: "", //用户进行搜索的关键词
      event: [],
    };
  },
  created() {
    this.axios
      .get(
        "http://127.0.0.1:4523/m1/1171870-0-default/event/list?pageNum=" +
          this.pageNum +
          "&pageSize=" +
          this.pageSize +
          "&status=" +
          "待处理"
      )
      .then((res) => {
        console.log(res);
        this.event = res.data.data.list;
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