<template>
  <div>
    <div class="mt-4">
      <el-input
        @keydown.enter="toSearch"
        v-model="keyword"
        placeholder="通过关键词搜索↵"
        class="input-with-select"
      >
        <template #prepend>
          <el-select v-model="select" placeholder="待处理" style="width: 115px">
            <el-option label="处理中" value="1" />
            <el-option label="待处理" value="2" />
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
      <el-table-column label="事发时间" prop="occurDate" />
      <el-table-column label="处理时间" prop="handleDate" />
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
      <el-table-column label="操作">
        <template #default="scope">
          <div style="display: flex; justify-content: center">
            <el-button size="small" @click="execute(scope.$index, scope.row)"
              >执行</el-button
            >
            <el-button size="small" @click="handleShow(scope.$index, scope.row)"
              >查看预案</el-button
            >
          </div>
        </template>
      </el-table-column>
      <!-- 弹出预案表格用于选择 -->
      <el-dialog
        v-model="dialogTableVisible"
        title="请选择合适的预案"
        append-to-body="true"
      >
        <el-table :data="gridData">
          <el-table-column lable="选择" width="60px" fixed>
            <template #default="scope">
              <el-radio
                :label="scope.$index"
                v-model="selectIndex"
                @change.enter="getCurrentRow(scope.row)"
              >
                {{ " " }}
              </el-radio>
            </template>
          </el-table-column>
          <el-table-column property="date" label="Date" width="150" />
          <el-table-column property="name" label="Name" width="200" />
          <el-table-column property="address" label="Address" />
        </el-table>
        <div style="display: flex; justify-content: center">
          <el-button
            type="primary"
            @click="selectPlan"
            plain
            style="margin: 10px"
            >启动</el-button
          >
          <el-button type="primary" @click="rest" plain style="margin: 10px"
            >重置</el-button
          >
        </div>
      </el-dialog>
      <el-drawer
        v-model="drawer"
        title="应急预案"
        append-to-body="true"
        show-close
      >
        <span>Hi there!</span>
      </el-drawer>
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
      selectRow: null, //选择的预案包含的信息,
      selectIndex: null, //选择预案序号
      select: null, //选择的事件状态
      drawer:false,//是否显示抽屉
      event: [],
      gridData: [
        {
          date: "2016-05-02",
          name: "John Smith",
          address: "No.1518,  Jinshajiang Road, Putuo District",
        },
        {
          date: "2016-05-04",
          name: "John Smith",
          address: "No.1518,  Jinshajiang Road, Putuo District",
        },
        {
          date: "2016-05-01",
          name: "John Smith",
          address: "No.1518,  Jinshajiang Road, Putuo District",
        },
        {
          date: "2016-05-03",
          name: "John Smith",
          address: "No.1518,  Jinshajiang Road, Putuo District",
        },
      ],
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
    //当前选择的预案
    getCurrentRow(row) {
      this.selectRow = JSON.parse(JSON.stringify(row));
      console.log(this.selectRow);
    },
    //选择预案存入事件表中
    selectPlan() {
      if (this.selectRow != null) {
        this.dialogTableVisible = false;
      } else {
        ElMessage({
          message: "请选择预案",
          type: "warning",
        });
      }
    },
    //重置
    rest() {
      this.selectIndex = null;
      this.selectRow = null;
    },
    //弹窗执行
    execute(index, row) {
      console.log(index, row);
      this.dialogTableVisible = true;
    },
    //抽屉显示
    handleShow(index, row) {
      console.log(index, row);
      console.log(this.drawer)
      this.drawer = true;
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
  font-size: 25px;
}
</style>