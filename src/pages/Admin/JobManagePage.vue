<template>
  <div>
    <template>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="title"
          label="作业标题"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="发布人"
          width="180"
        >
        </el-table-column>

          <el-table-column
          prop="date1"
          label="发布时间"
          width="180"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="date2"
          label="结束时间"
          width="180"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="state"
          label="当前状态"
          width="180"
          column-key="state"
          :filters="[{text: '进行中', value: '进行中'}, {text: '已结束', value: '已结束'}]"
          :filter-method="filterHandler"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state === '进行中' ? 'primary' : 'success'"
              disable-transitions
            >{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              size="small"
            >关闭作业</el-button>
            <el-button
              type="text"
              @click="handleEdit(scope.$index, scope.row)"
              size="small"
            >修改作业</el-button>
            <el-button
              type="text"
              @click="handlePostPone(scope.row)"
              size="small"
            >作业延期</el-button>

          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        title="作业修改"
        :visible.sync="editFormVisible"
      > 
        <el-form
          :model="editForm"
          :rules="rules"
          ref="editForm"
          label-width="150px"
          class="demo-editForm"
        >
          <el-form-item
            label="作业标题"
            prop="title"
          >
            <el-input v-model="editForm.title"></el-input>
          </el-form-item>


          <el-form-item
            label="截止时间"
            required
          >
            <el-col :span="11">
              <el-form-item prop="forecastDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editForm.forecastDate"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col
              class="line"
              :span="2"
            >&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item prop="forecastDate">
                <el-time-picker
                  placeholder="选择时间"
                  v-model="editForm.forecastDate"
                  style="width: 100%;"
                ></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item
            label="作业内容"
            prop="jobcontent"
          >
            <el-input
              type="textarea"
              v-model="editForm.jobcontent"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('editForm')"
            >立即发布</el-button>
            <el-button @click="resetForm('editForm')">重置</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>

      <div class="tabListPage">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        >
        </el-pagination>
      </div>
    </template>
  </div>
</template>


<script>
import { getAllJob,getUserInfoById,postCloseJob,postUpdateJob } from '../../../src/api/index.js'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      index:'',
      group:[],
      direction:[],
      editFormVisible: false,
      tableData: [{
        id:'',
        date1: '2022-05-01',
        name: '王小虎',
        title: '作业标题一',
        date2: '2022-05-02',
        state: '进行中'
      },
      {
        id:'',
        date1: '2022-05-02',
        name: '王小虎',
        title: '作业标题一',
        date2: '2022-05-02',
        state: '已结束'
      },
      {
        id:'',
        date1: '2022-05-03',
        name: '王小虎',
        title: '作业标题一',
        date2: '2022-05-02',
        state: '进行中'
      },
      {
        id:'',
        date1: '2022-05-04',
        name: '王小虎',
        title: '作业标题一',
        date2: '2022-05-02',
        state: '进行中'
      },
      ],
      //编辑界面数据
      editForm: {
          id:'',
          title: '',
          forecastDate: '',
          jobcontent: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入作业标题', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        direction: [
          { required: true, message: '请选择方向', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        jobcontent: [
          { required: true, message: '请填写作业内容', trigger: 'blur' }
        ]
      },
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [10, 20, 50],
      // 默认每页显示的条数（可修改）
      pageSize: 10,
    }
  },
  methods: {
    filterHandler (value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    submitForm (formtitle) {
      
      this.$refs[formtitle].validate((valid) => {
        if (valid) {
          console.log(this.editForm);
          let params = {
          id:this.editForm.id,
          title: this.editForm.title,
          url:'',
          content: this.editForm.jobcontent,
          forecastDate:this.editForm.forecastDate
        }
        console.log(params);
        postUpdateJob(params).then((res) => {
            console.log(res);
          })
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //显示编辑界面
    handleEdit (index, row) {
      this.editForm.id = this.tableData[index].id
      this.index = index
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    handlePostPone(row){
      console.log(row);
    },
    resetForm (formtitle) {
        this.$refs[formtitle].resetFields();
    },
    //获取后台数据
    getData (pageSize, currentPage) {
      
      getAllJob(currentPage, pageSize).then((res) => { 
        this.tableData = []
        console.log(res)
        let data = res.data.records
        for(let i = 0;i<data.length;i++){
        let obj = {
          id:'',
          date1: '',
          name: '',
          title: '',
          date2: '',
          state: ''
        }
         obj.date1 = dayjs(data[i].createDate)
         obj.date2 = dayjs(data[i].forecastDate)
         obj.title = data[i].title
         obj.id = data[i].id
         getUserInfoById(data[i].userId).then((res)=>{
          obj.name = res.data.name
         })
         obj.state = data[i].state=='IN'?'进行中':'已结束'
        this.tableData.push(obj)
        }
      })
    },
    //当每页大小改变时
    handleSizeChange (val) {
      // 改变每页显示的条数 
      this.pageSize = val
      // 点击每页显示的条数时，显示第一页
      this.getData(val, 1)
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },

    // 显示第几页
    handleCurrentChange (val) {
      // 改变默认的页数
      this.currentPage = val
      // 切换页码时，要获取每页显示的条数
      this.getData(this.PageSize, (val) * (this.pageSize))
    },
    handleClick(data){
    let params = {
      id:data.id
    }
    postCloseJob(params).then((res)=>{
      console.log(res);
      data.state = '已结束'
    })
  }
  },
  mounted () {
    this.getData(this.pageSize, this.currentPage)
  }
}
</script>