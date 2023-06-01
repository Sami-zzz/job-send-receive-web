<template>
  <div>
    <template>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column
        align="center"
          prop="direction"
          label="方向"
          width="150"
          column-key="direction"
          :filters="direction"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
        align="center"
          prop="group"
          label="组别"
          width="150"
          column-key="group"
          :filters="group"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
        align="center"
          prop="name"
          label="姓名"
          width="150"
        >
        </el-table-column>
        <el-table-column
        align="center"
          prop="title"
          label="作业标题"
          width="150"
        >
        </el-table-column>
        <el-table-column
        align="center"
          prop="code"
          label="作业积分"
          width="150"
        >
        </el-table-column>

        <el-table-column
        align="center"
          prop="date"
          label="上传日期"
          width="150"
          sortable
        >
        </el-table-column>
        <el-table-column
        align="center"
          prop="state"
          label="当前状态"
          width="150"
          column-key="state"
          :filters="[{text: '未审阅', value: '未审阅'}, {text: '已审阅', value: '已审阅'}]"
          :filter-method="filterHandler"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state === '未审阅' ? 'primary' : 'success'"
              disable-transitions
            >{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              size="small"
            >下载作业</el-button>
          </template>
        </el-table-column>

        <el-table-column 
        label="评分"
        >
          <template slot-scope="scope">
            <el-rate
              v-model="scope.row.vaule"
              :colors="colors"
            >
            </el-rate>
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
    </template>
  </div>
</template>


<script>
import dayjs from 'dayjs'
import { getAllJobs } from '../../../src/api/index.js'
import { getAllDirectionTest } from "../../../src/api/index.js";
import { getAllGroupTest } from "../../../src/api/index.js";
export default {
  data () {
    return {
        group:[],
        direction:[],
        tableData: [{
        direction: '前端',
        group: '团队一',
        name: '王小虎',
        title: '作业标题一',
        date: '2022-05-01',
        state: '未审阅',
        value:null
      },
      {
        direction: '前端',
        group: '团队一',
        name: '王小虎',
        title: '作业标题一',
        date: '2022-05-01',
        state: '已审阅',
        value:null
      },
      {
        direction: '前端',
        group: '团队一',
        name: '王小虎',
        title: '作业标题一',
        date: '2022-05-01',
        state: '已审阅',
        value:null
      },
      {
        direction: '前端',
        group: '团队一',
        name: '王小虎',
        title: '作业标题一',
        date: '2022-05-01',
        state: '未审阅',
        value:null
      },
      ],
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [10, 20, 50],
      // 默认每页显示的条数（可修改）
      pageSize: 10,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
    }
  },
  mounted () {
    this.getData(this.pageSize, this.currentPage)
  },
  methods: {
    //过滤处理
    filterHandler (value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    //获取后台数据
    getData (pageSize, currentPage) {
      getAllJobs(currentPage, pageSize).then((res) => {
        console.log(res);
        let data = res.data.records
        this.tableData = []
        for(let i=0;i<data.length;i++){
          let obj = {
            direction:data[i].direction,
            group: data[i].groupName,
            name: data[i].userName,
            title: data[i].jobTitle,
            date:dayjs(data[i].deliveryTime*1).format("YYYY-MM-DD"),
            state: '未审阅',
            value:null,
            code:"1"
        }
        let g = true
        for(let i = 0;i<this.group.length;i++){
          if(this.group[i].text==data[i].groupName){
              g = false
              break
            }
        }
            if(g==true){
              let group = { 
                text : data[i].groupName,
                value : data[i].groupName
              }
              this.group.push(group)
            }

        let d = true
        for(let i = 0;i<this.direction.length;i++){
          if(this.direction[i].text==data[i].direction){
              d = false
              break
            }
        }
        if(d==true){
          let direction = { 
            text : data[i].direction,
            value : data[i].direction
          }
          this.direction.push(direction)
        }
        this.tableData.push(obj);
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
  }
}
</script>
