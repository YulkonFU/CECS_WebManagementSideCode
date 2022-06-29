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
      <el-table-column label="状态" prop="status" width="80px" />
      <el-table-column label="执行人" prop="commander" width="80px" />
      <el-table-column label="流程id" prop="processId" width="80px" />
      <el-table-column label="操作">
        <template #default="scope">
          <div style="display: flex; justify-content: center">
            <el-button
              size="small"
              @click="termination(scope.$index, scope.row)"
              >终止</el-button
            >
          </div>
        </template>
      </el-table-column>
      <!-- 弹出预案表格用于选择 -->
      <el-dialog
        v-model="dialogTableVisible"
        title="终止原因"
        append-to-body="true"
      >
        <el-select v-model="value" class="m-2" placeholder="已解决" >
          <el-option label="已解决" value="已解决" />
          <el-option label="无法解决" value="无法解决" />
        </el-select>
        <el-input
        style="margin-top:10px"
          v-model="reason"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="请输入事件终止的原因"
        />
        <div style="display: flex; justify-content: center">
          <el-button type="primary" @click="commit" plain style="margin: 10px"
            >终止</el-button
          >
          <el-button type="primary" @click="rest" plain style="margin: 10px"
            >重置</el-button
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
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      type: "", //用户选择的预案类型
      pageNum: 1, //用户请求的分页的页数(默认为1)
      pageSize: 10, //用户请求的数据每一页多少条数据
      total: 0, //总条数
      keyword: "", //用户进行搜索的关键词
      dialogTableVisible: false, //控制弹出框的显示与隐藏
      value: "已解决", //选择的事件终止状态
      reason:"",//事件终止的原因
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
    //用于执行预案
    implement() {},
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
    //终止
    termination(index, row) {
      console.log(index, row);
      this.dialogTableVisible = true;
    },
    //重置
    rest(){
      this.reason=""
    }
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