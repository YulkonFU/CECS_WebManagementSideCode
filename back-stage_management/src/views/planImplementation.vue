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
          <el-select v-model="status" placeholder="状态选择" @change="getByStatus" style="width: 115px">
            <el-option label="待处理" value=0 />
            <el-option label="响应升级" value=2 />
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
      <el-table-column label="事件编号" prop="eventId" width="80px" />
      <el-table-column label="事件类型" prop="type" width="80px" />
      <el-table-column label="事发时间" prop="startTime" />
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
        title="调度救援与物资"
        append-to-body="true"
      >
        <el-cascader
          :options="options"
          v-model="name"
          style="margin-right: 10px"
          :show-all-levels="false"
          placeholder="请选择救援人员和物资"
        />
        <el-input
          v-model="number"
          type="number"
          style="width: 30%; margin-right: 10px"
          placeholder="请输入数量"
        />
        <el-button @click="addItem">添加</el-button>
        <el-table :data="tableData" style="width: 100%" max-height="250">
          <el-table-column fixed prop="name" label="名称" width="150" />
          <el-table-column prop="category" label="类型" width="120" />
          <el-table-column prop="number" label="数量" width="120" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click.prevent="deleteRow(scope.$index)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" plain @click="pushResource">部署</el-button>
      </el-dialog>
      <el-drawer
        v-model="drawer"
        title="应急预案"
        append-to-body="true"
        show-close
      >
        <p>标题:{{plan.title}}</p>
        <p>作者:{{plan.author}}</p>
        <p>类型:{{plan.category}}</p>
        <p>内容：{{plan.content}}</p>
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
      pageNum: 1, //用户请求的分页的页数(默认为1)
      pageSize: 10, //用户请求的数据每一页多少条数据
      total: 0, //总条数
      keyword: "", //用户进行搜索的关键词
      dialogTableVisible: false, //控制弹出框的显示与隐藏
      status: "0", //选择的事件状态
      drawer: false, //是否显示抽屉
      event: [],
      name: "", //级联选择器选择的物资名称
      number: null, //资源数量
      eventId:null,//执行的事件的id
      plan:{
        author:"",//作者
        category:"",//类型
        content:"",//内容
        id:null,//id
        title:null//id
      },
      options: [
        //级联选择器
        {
          value: "救援人力",
          label: "救援人力",
          children: [
            {
              value: "消防人员",
              label: "消防人员",
            },
            {
              value: "警务人员",
              label: "警务人员",
            },
            {
              value: "医护人员",
              label: "医护人员",
            },
          ],
        },
        {
          value: "消防物资",
          label: "消防物资",
          children: [
            {
              value: "消防车",
              label: "消防车",
            },
            {
              value: "灭火器",
              label: "灭火器",
            },
            {
              value: "防烟面罩",
              label: "防烟面罩",
            },
          ],
        },
        {
          value: "警用物资",
          label: "警用物资",
          children: [
            {
              value: "喷雾驱散器",
              label: "喷雾驱散器",
            },
            {
              value: "红外热像仪",
              label: "红外热像仪",
            },
            {
              value: "防爆盾",
              label: "防爆盾",
            },
          ],
        },
        {
          value: "医疗物资",
          label: "医疗物资",
          children: [
            {
              value: "防护服",
              label: "防护服",
            },
            {
              value: "防毒面具",
              label: "防毒面具",
            },
            {
              value: "医疗箱",
              label: "医疗箱",
            },
          ],
        },
      ],
      tableData: [],
    };
  },
  created() {
    this.getEventList(this.pageNum,this.pageSize,this.keyword,this.status)
  },
  methods: {
    //用于执行预案
    implement() {},
    //每页页数变化
    handleSizeChange(val) {
      this.pageSize = val;
      this.getEventList(this.pageNum,this.pageSize,this.keyword,this.status)
    },
    //切换页数
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getEventList(this.pageNum,this.pageSize,this.keyword,this.status)
    },
    //通过关键词搜索
    toSearch() {
      console.log("搜索成功");
      this.getEventList(this.pageNum,this.pageSize,this.keyword,this.status)
    },
    //通过状态查询
    getByStatus(val){
      console.log(val);
      this.getEventList(this.pageNum,this.pageSize,this.keyword,val)
    },
    //弹窗执行
    execute(index, row) {
      console.log(index, row);
      row=JSON.parse(JSON.stringify(row));
      this.eventId=row.eventId;
      this.dialogTableVisible = true;
    },
    //抽屉显示
    handleShow(index, row) {
      console.log(row.planId);
      this.plan={
        author:"",//作者
        category:"",//类型
        content:"",//内容
        id:null,//id
        title:null//id
      }
      this.axios.get("http://127.0.0.1/plan/"+row.planId)
      .then(res=>{
        this.plan=res.data.data;
      })
      this.drawer = true;
    },
    //将选中的物资添加进数组
    addItem() {
      if (this.name != null && this.number != null) {
        var item = {
          name: JSON.parse(JSON.stringify(this.name))[1],
          category: JSON.parse(JSON.stringify(this.name))[0],
          number: this.number,
        };
        this.tableData.push(item);
        (this.name = null), (this.number = null);
      } else {
        ElMessage({
          message: "请检查是否输入内容",
          type: "error",
        });
      }
    },
    //删除已选资源
    deleteRow(index) {
      this.tableData.splice(index, 1);
    },
    //提交所需资源
    pushResource() {
      console.log(this.eventId);
      this.axios
        .request({
          url: "http://127.0.0.1/events/processing",
          method: "post",
          data:{eventId:this.eventId,tableData:JSON.stringify(this.tableData)},
        })
        .then((res) => {
          console.log(res)
          if(res.data){
            ElMessage({
              message:"部署成功",
              type:"success"
            })
            this.dialogTableVisible=false;
            this.tableData=[]
            this.getEventList(this.pageNum,this.pageSize,this.keyword,this.status)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //查找事件列表
    getEventList(pageNum,pageSize,keyword,status){
      console.log(status);
      if(status!=null){
        status=Number(status)
      }else{
        status=""
      }
      this.axios.get("http://127.0.0.1/events/list?pageNum="+ pageNum +"&pageSize=" +pageSize +"&keywords=" +keyword
      +"&status="+status)
      .then(res=>{
        console.log(res);
        this.event=res.data.data.list;
        this.total=res.data.data.total
      })
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