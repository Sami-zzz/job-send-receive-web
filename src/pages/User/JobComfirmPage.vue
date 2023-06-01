<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      stripe
    >
      <el-table-column
        prop="title"
        label="作业标题"
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="发布日期"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="forecastDate"
        label="预计截止日期"
        width="200"
      >
      </el-table-column>

      <el-table-column
        prop="forecastDate"
        label="提交日期"
        width="200"
      >
      </el-table-column>

      <el-table-column
        prop="content"
        label="作业描述"
        width="200"
      > </el-table-column>

      <el-table-column
        label="作业状态"
        prop="state"
        width="200"
      >
        <template v-slot="scope">
          <!-- <el-button size="mini">{{ scope.row.state }}</el-button> -->
          <el-button
            size="mini"
            type="success"
          >{{
            scope.row.state
          }}</el-button>
        </template>
      </el-table-column>

      <el-table-column label="作业确认">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleConfirm(scope.$index, scope.row)"
          >确认</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { getAllUserJobs, getConfirmJobs } from '../../../src/api/index.js';
export default {
  data () {
    return {
      userId: 1,
      tableData: [],

    };
  },
  mounted () {
    this.getData();

  },
  methods: {
    handleConfirm (index, row) {
      row.id = row.id - 0;
      getConfirmJobs(this.userId, row.id).then((res) => {
        // console.log(res);
        location.reload();
      })

    },
    getData () {
      let params = this.userId;
      getAllUserJobs(params).then((res) => {
        console.log(res.data);
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].createDate = dayjs(res.data[i].createDate).format('YYYY-MM-DD');
          res.data[i].forecastDate = dayjs(res.data[i].forecastDate).format('YYYY-MM-DD');
          // res.data[i].state = res.data[i].state == "CONFIRMED" ? "已确认" : "未确认"
          if (res.data[i].state == "UNCONFIRMED") {
            res.data[i].state = "未确认"
          }
          if (res.data[i].state == "CONFIRMED") {
            res.data[i].state = "已确认"
          }
          if (res.data[i].state == "SUBMITTED") {
            res.data[i].state = "已提交"
          }
          if (res.data[i].state == "ENDED") {
            res.data[i].state = "已结束"
          }
        }
        this.tableData = res.data;
      })
    },

    // getConfirmJobs (this.userId,).then((res) => {

    // }

  },
};
</script>