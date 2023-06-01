<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      stripe
    >
      <el-table-column
        prop="jobId"
        label="作业ID"
        width="200"
      >
      </el-table-column>

      <el-table-column
        prop="content"
        label="作业标题"
        width="200"
      >
      </el-table-column>

      <el-table-column
        prop="confirmDate"
        label="确认日期"
        width="300"
      >
      </el-table-column>
      <el-table-column
        prop="deliveryDate"
        label="提交日期"
        width="300"
      >
      </el-table-column>
      <el-table-column
        label="作业评分"
        prop="level"
      >
        <template slot-scope="scope">
          <el-rate
            v-model="scope.row.level"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          >
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column label="作业下载">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleDownLoad(scope.$index, scope.row)"
          >下载</el-button>
        </template>
      </el-table-column>
    </el-table>

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

<script>
import dayjs from 'dayjs';
import { selectJobs } from '../../../src/api/index.js';
export default {
  mounted () {
    this.getData(this.currentPage, this.pageSize);

  },
  data () {
    return {
      userId: 1,
      tableData: [],

      //当前页数
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [2, 4, 10, 20],
      // 默认每页显示的条数（可修改）
      pageSize: 10,

    };
  },
  methods: {
    handleDownLoad (index, row) {
      console.log(index, row);
    },
    getData (currentPage, pageSize) {
      selectJobs(currentPage, pageSize).then((res) => {
        console.log(res.data);
        this.totalCount = res.data.total;
        this.tableData = res.data.records;
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].confirmDate = dayjs(this.tableData[i].confirmDate).format('YYYY-MM-DD');
          this.tableData[i].deliveryDate = dayjs(this.tableData[i].deliveryDate).format('YYYY-MM-DD');
        }
      })
    },
    // 每页显示的条数
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`);
      // 改变每页显示的条数
      this.pageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
      this.getData(this.currentPage, this.pageSize)
    },
    // 显示第几页
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`);
      // 改变默认的页数
      this.currentPage = val;
      this.getData(this.currentPage, this.pageSize)
    }
  },
};
</script>