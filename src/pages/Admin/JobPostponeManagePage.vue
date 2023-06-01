<template>
  <div>
    <template>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="direction"
          label="方向"
          width="100"
          align="center"
          column-key="direction"
          :filters="direction"
          :filter-method="filterHandler">
        </el-table-column>
        <el-table-column
        align="center"
          prop="group"
          label="组别"
          width="100"
          column-key="group"
          :filters="group"
          :filter-method="filterHandler">
        </el-table-column>
        <el-table-column
        align="center"
          prop="name"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="title"
          align="center"
          label="作业标题"
          width="180">
        </el-table-column>
         <el-table-column
         align="center"
          prop="reason"
          label="延期原因"
          width="180">
        </el-table-column>
         <el-table-column
          prop="day"
          align="center"
          label="延期时间(天)"
          width="150">
        </el-table-column>
         <el-table-column
         align="center"
          prop="date"
          label="申请时间"
          width="180"
          sortable>
        </el-table-column>
        <el-table-column
        align="center"
          prop="state"
          label="当前状态"
          width="180"
          column-key="state"
          :filters="[{text: '未审批', value: '未审批'}, {text: '已通过', value: '已通过'},{text:'未通过',value:'未通过'}]"
          :filter-method="filterHandler">
          <template slot-scope="scope">
            <el-tag
            :type="scope.row.state === '未审批' ? 'primary' : (scope.row.state=='已通过' ? 'success':'danger') "
            disable-transitions>{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
        align="center"
          label="操作"
          >
            <template    slot-scope="scope">
              <el-button @click="handleClick(scope.row, 'true')" type="success" size="mini">通过</el-button>
              <el-button @click="handleClick(scope.row, 'false')" type="warning" size="mini">不通过</el-button>
            </template>
        </el-table-column>
      </el-table>

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

    <el-dialog
        :visible.sync="editFormVisible"
      >
        <el-form
          label-position="top"
          :model="editForm"
          ref="editForm"
          label-width="150px"
          class="demo-editForm"
        >
          <el-form-item
            prop="content"
            label="建议"
          >
            <el-input
              type="textarea"
              
              v-model="editForm.content"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('editForm')"
            >确定</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>
    </template>

  </div>

  
</template>



<script>
import { userJobPostpone,getAllDirectionTest,getAllGroupTest,postUserPostpone } from '../../../src/api/index.js';
import dayjs from 'dayjs'
  export default {
    data() {
      return {
        editFormVisible:false,
        direction:[],
        group:[],
        tableData: [],
          editForm: {
          content: '',
          userJobId:'',
          state:''
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
    methods:{
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      getData(currentPage, pageSize){
        userJobPostpone(currentPage, pageSize).then((res)=>{
          let data = res.data.records
          console.log(data);
          this. tableData = [];
          for(let i=0;i<data.length;i++){
            let obj = {
            userJobId:data[i].userJobId,
            day:data[i].day,
            direction: data[i].direction,
            group: data[i].groupName,
            name: data[i].userName,      
            title: data[i].jobTitle,
            reason: data[i].reason,
            date: dayjs(data[i].createDate).format("YYYY-MM-DD"),
            state:data[i].state=='APPLICATION' ? '未审批' :(data[i]=='PASS' ? '已通过':'未通过' )
          }
          this.tableData.push(obj)
          }
        })
      },
      handleClick(row,isTrue){
        console.log(isTrue);
        console.log(row);
        this.editFormVisible = true
        if(isTrue=='true'){
          row.state='已通过'
        } else {
          row.state='未通过'
        }
        this.editForm.state=row.state
        this.editForm.userJobId=row.userJobId
      },
                //当每页大小改变时
    handleSizeChange (val) {
      // 改变每页显示的条数 
      this.pageSize = val
      // 点击每页显示的条数时，显示第一页
      this.getData(1, val)
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
    submitForm(editForm){
      console.log(this.editForm);
      let params = {
        approvalId:localStorage.getItem('username'),
        suggest:this.editForm.content,
         state:this.editForm.state=="已通过"?'PASS':'FAIL',
         userJobId:this.editForm.userJobId,

      }
      console.log(params);
      postUserPostpone(params).then((res)=>{
          console.log(res);
      })
    }
    },
    mounted() {
    this.getData(this.currentPage,this.pageSize)
    getAllGroupTest().then((res)=>{
              let group = res.data
              for(let j=0;j<group.length;j++){
                      let obj = {
                        text:group[j].name,
                        value:group[j].name
                      }
                      this.group.push(obj)
                }
            })
    getAllDirectionTest().then((res)=>{

              let direction = res.data
              for(let j=0;j<direction.length;j++){
                      let obj = {
                        text:direction[j].name,
                        value:direction[j].name
                      }
                      this.direction.push(obj)
                }
    })
  }

  }
</script>
