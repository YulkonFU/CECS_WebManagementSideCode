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
    <el-table :data="dutyPlan" style="width: 100%">
      <el-table-column label="编号" prop="id" />
      <el-table-column label="员工编号" prop="userid" />
      <el-table-column label="值班日期" prop="dutyDate" />
      <el-table-column label="值班地点" prop="dutyPlace" />
      <el-table-column label="值班开始时间" prop="startTime" />
      <el-table-column label="值班结束时间" prop="endTime" />
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
    <!-- 添加巡逻员 -->
    <el-dialog
      v-model="dialogFormVisible"
      title="添加排班"
      append-to-body="true"
    >
      <el-form :model="form">
        <el-form-item label="人员ID" :label-width="formLabelWidth">
          <el-input v-model="form.userid" />
        </el-form-item>
        <el-form-item label="值班日期" :label-width="formLabelWidth">
          <el-input v-model="form.dutyDate" />
        </el-form-item>
        <el-form-item label="值班地点" :label-width="formLabelWidth">
          <el-select v-model="form.dutyPlace" placeholder="请输入值班地点">
            <el-option label="A区" value="A区" />
            <el-option label="B区" value="B区" />
            <el-option label="C区" value="C区" />
            <el-option label="D区" value="D区" />
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" :label-width="formLabelWidth">
          <el-input v-model="form.startTime" />
        </el-form-item>
        <el-form-item label="结束时间" :label-width="formLabelWidth">
          <el-input v-model="form.endTime" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="(dialogFormVisible = false),addDutySchedule()"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 修改排班 -->
    <el-dialog
      v-model="dialogFormVisible1"
      title="修改排班"
      append-to-body="true"
    >
      <el-form :model="form">
        <el-form-item label="人员ID" :label-width="formLabelWidth">
          <el-input v-model="form.userid" />
        </el-form-item>
        <el-form-item label="值班日期" :label-width="formLabelWidth">
          <el-input v-model="form.dutyDate" />
        </el-form-item>
        <el-form-item label="值班地点" :label-width="formLabelWidth">
          <el-select v-model="form.dutyPlace" placeholder="请输入值班地点">
            <el-option label="A区" value="A区" />
            <el-option label="B区" value="B区" />
            <el-option label="C区" value="C区" />
            <el-option label="D区" value="D区" />
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" :label-width="formLabelWidth">
          <el-input v-model="form.startTime" />
        </el-form-item>
        <el-form-item label="结束时间" :label-width="formLabelWidth">
          <el-input v-model="form.endTime" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取消</el-button>
          <el-button type="primary" @click="(dialogFormVisible1 = false),editDutySchedule()"
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
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      keyword: "", //关键词
      pageNum: 1, //用户请求的分页的页数(默认为1)
      pageSize: 10, //用户请求的数据每一页多少条数据
      total: 0, //总条数
      dutyPlan: [], //资源
      dialogFormVisible: false, //添加对话框显示与否
      dialogFormVisible1: false, //修改对话框显示与否
      form: {
        userid: "",
        dutyDate: "",
        dutyPlace: "",
        startTime: "",
        endTime: "",
      },
    };
  },
  created() {
    this.getDutyScheduleList(this.pageNum,this.pageSize,this.keyword)
  },
  methods: {
    add() {
      this.form = {
        userID: "",
        date: "",
        place: "",
        startTime: "",
        endTime: "",
      };
    },
    //添加新纪录
    addDutySchedule(){
      this.axios.post("http://127.0.0.1/dutySchedule/newDutySchedule",this.form)
      .then(res=>{
        if(res.data){
          ElMessage({
            message:"添加成功",
            type:"success"
          })
          this.getDutyScheduleList(this.pageNum,this.pageSize,this.keyword)
        }
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.form = row;
    },
    editDutySchedule(){
      this.axios.put("http://127.0.0.1/dutySchedule/modification",this.form)
      .then(res=>{
        if(res.data){
          ElMessage({
            message:"修改成功",
            type:"success"
          })
          this.getDutyScheduleList(this.pageNum,this.pageSize,this.keyword)
        }
      })
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.axios.delete("http://127.0.0.1/dutySchedule/?id="+row.id)
      .then(res=>{
        console.log(res);
        if(res.data){
          ElMessage({
            message:"删除成功",
            type:"success"
          })
          this.getDutyScheduleList(this.pageNum,this.pageSize,this.keyword)
        }
      })
    },
    //每页页数变化
    handleSizeChange(val) {
      console.log(`每页 ${val}条`);
      this.pageSize = val;
      this.getDutyScheduleList(this.pageNum,this.pageSize,this.keyword)
    },
    //切换页数
    handleCurrentChange(val) {
      console.log(`当前页 ${val}条`);
      this.pageNum = val;
      this.getDutyScheduleList(this.pageNum,this.pageSize,this.keyword)
    },
    //获取值班表
    getDutyScheduleList(pageNum,pageSize,keyword){
      this.axios.get("http://127.0.0.1/dutySchedule/list?pageNum=" +
          pageNum +
          "&pageSize=" +
          pageSize+
          "&str"+
          keyword)
          .then(res=>{
            if(res.data.code==200){
              console.log(res);
              this.dutyPlan=res.data.data.list
            }
          })
    },
    //关键词搜索
    toSearch(){
      this.getDutyScheduleList(this.pageNum,this.pageSize,this.keyword)
    }
  },
};
</script>

<style scoped>

</style>