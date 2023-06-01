<!-- Approval application 申请审批 -->
<template>
  <div class="box">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="applyId"
        label="申请人ID"
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="type"
        label="申请类型"
        width="300"
        :filters="[{text: '更改方向', value: '更改方向'}, {text: '更改组别', value: '更改组别'}]"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column
        prop="reason"
        label="申请原因"
        width="240"
      >
      </el-table-column>
      <el-table-column
        prop="state"
        label="申请状态"
        width="240"
        :filters="[{text: '已通过', value: '已通过'}, {text: '申请中', value: '申请中'},{text: '已拒绝', value: '已拒绝'}]"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="passApplication(scope.$index, scope.row)"
          >同意申请</el-button>
          <el-button
            size="mini"
            @click="refuseApplication(scope.$index, scope.row)"
          >拒绝申请</el-button>
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
import { approveApplication, selectAllPostpone } from '../../api'
export default {
  mounted () {
    this.getData(this.currentPage, this.pageSize)
  },
  data () {
    return {
      // value: null,
      userId: 4,
      tableData: [],

      //当前页数
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [2, 4, 10, 20],
      // 默认每页显示的条数（可修改）
      pageSize: 10,
    }
  },
  methods: {
    getData (currentPage, pageSize) {
      selectAllPostpone(currentPage, pageSize).then((res) => {
        // console.log(res.data);
        // console.log(res.data.records);
        this.totalCount = res.data.total;
        this.tableData = res.data.records;
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].type == "CHANGE_DIRECTION") {
            this.tableData[i].type = "更改方向"
          }
          if (this.tableData[i].type == "CHANGE_GROUP") {
            this.tableData[i].type = "更改组别"
          }
          if (this.tableData[i].state == "APPLICATION") {
            this.tableData[i].state = "申请中"
          }
          if (this.tableData[i].state == "PASS") {
            this.tableData[i].state = "已通过"
          }
          if (this.tableData[i].state == "FAIL") {
            this.tableData[i].state = "已拒绝"
          }

        }
      })
    },
    filterHandler (value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    passApplication (index, row) {
      // console.log(index, row);
      // console.log('通过申请');
      let params = {
        id: row.id,
        approvalId: this.userId,
        state: 1
      }
      approveApplication(params).then((res) => {
        // console.log(res);
        this.$message({
          message: "已同意申请！",
          type: 'success'
        });
        location.reload();
      })
    },
    refuseApplication (index, row) {
      // console.log(index, row);
      // console.log('拒绝申请');
      let params = {
        id: row.id,
        approvalId: this.userId,
        state: 2
      }
      approveApplication(params).then((res) => {
        // console.log(res);
        alert("已拒绝申请")
        location.reload();
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
}

</script>

<style>
</style>