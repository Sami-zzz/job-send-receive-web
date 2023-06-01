
<!-- 超管进行人员评价 -->
<template>
  <div class="box">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="code"
        label="CODE"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="userDirectionId"
        label="方向"
        width="160"
        column-key="direction"
        :filters="[{text: '前端', value: '前端'}, {text: '后端', value: '后端'}]"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column
        prop="userGroupId"
        label="组别"
        width="160"
        column-key="group"
        :filters="[{text: '团队一', value: '1'}, {text: '团队二', value: '2'}]"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      >
      </el-table-column>

      <el-table-column
        prop="userRoleId"
        label="权限"
        width="160"
        :filters="[{text: '管理员', value: '管理员'}, {text: '用户', value: '用户'}]"
        :filter-method="filterHandler"
      >
      </el-table-column>

      <el-table-column label="综合评价">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleTransparentEvaluation(scope.$index, scope.row)"
          >透明评价</el-button>
          <el-button
            size="mini"
            @click="handleHiddenEvaluation(scope.$index, scope.row)"
          >隐藏评价</el-button>
          <el-button
            size="mini"
            @click="getEvaluation(scope.$index, scope.row)"
          >查询评价</el-button>

        </template>
      </el-table-column>

    </el-table>

    <el-dialog
      title="透明评价"
      :visible.sync="dialogEvaluationVisible"
    >
      <el-form :model="assessForm">
        <el-form-item
          label="总体评分"
          :label-width="formLabelWidth"
        >
          <el-rate v-model="assessForm.value"></el-rate>
        </el-form-item>
        <el-form-item
          label="评价内容"
          :label-width="formLabelWidth"
        >
          <el-input
            type="textarea"
            v-model="assessForm.content"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogEvaluationVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitEvaluate(assessForm)"
        >提交评价</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="隐藏评价"
      :visible.sync="dialogHideEvaluationVisible"
    >
      <el-form :model="hideAssessForm">
        <el-form-item
          label="总体评分"
          :label-width="formLabelWidth"
        >
          <el-rate v-model="hideAssessForm.value"></el-rate>
        </el-form-item>
        <el-form-item
          label="评价内容"
          :label-width="formLabelWidth"
        >
          <el-input
            type="textarea"
            v-model="hideAssessForm.content"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogHideEvaluationVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitHideEvaluate(hideAssessForm)"
        >提交评价</el-button>
      </div>
    </el-dialog>

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
import { addAssessment, addHideAssessment, getAssessment, getUserInfo } from '../../api'
export default {
  mounted () {
    this.getData(this.currentPage, this.pageSize)
  },
  data () {
    return {
      dialogEvaluationVisible: false,
      dialogHideEvaluationVisible: false,
      assessForm: {
        userId: null,
        value: null,
        content: '',
        commentId: null,
      },
      hideAssessForm: {
        userId: null,
        value: null,
        content: '',
        commentId: null,
      },
      formLabelWidth: '120px',

      assessOptions: [],

      //当前页数
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [2, 4, 10, 20],
      // 默认每页显示的条数（可修改）
      pageSize: 10,
      value: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      tableData: []
    }
  },
  methods: {
    getData (currentPage, pageSize) {
      getUserInfo(currentPage, pageSize).then((res) => {
        // console.log(res.data);
        // console.log(res.data.records);
        this.totalCount = res.data.total;
        this.tableData = res.data.records;
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].userRoleId == "1") {
            this.tableData[i].userRoleId = "管理员"
          }
          if (this.tableData[i].userRoleId == "2") {
            this.tableData[i].userRoleId = "用户"
          }
          if (this.tableData[i].userRoleId == "3") {
            this.tableData[i].userRoleId = "超级管理员"
          }
          if (this.tableData[i].userDirectionId == "1") {
            this.tableData[i].userDirectionId = "前端"
          }
          if (this.tableData[i].userDirectionId == "2") {
            this.tableData[i].userDirectionId = "后端"
          }
          if (this.tableData[i].userDirectionId == "3") {
            this.tableData[i].userDirectionId = "运维"
          }

        }
      })


    },
    filterHandler (value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },

    handleTransparentEvaluation (index, row) {
      this.assessForm.userId = row.id;
      this.dialogEvaluationVisible = true;
    },
    //提交透明评价
    submitEvaluate (assessForm) {

      this.dialogEvaluationVisible = false;
      let params = {
        content: assessForm.content,
        level: assessForm.value,
        isDelete: 0,
        userId: assessForm.userId,
        commentId: 4
      }
      addAssessment(params).then((res) => {
        console.log(params);
      })
      location.reload();
    },

    handleHiddenEvaluation (index, row) {
      this.hideAssessForm.userId = row.id;
      this.dialogHideEvaluationVisible = true;
    },

    //提交隐藏评价
    submitHideEvaluate (hideAssForm) {
      console.log(hideAssForm);
      this.dialogHideEvaluationVisible = false;
      let params = {
        content: hideAssForm.content,
        level: hideAssForm.value,
        isDelete: 0,
        userId: hideAssForm.userId,
        commentId: 4
      }
      addHideAssessment(params).then((res) => {
        console.log(params);
      })
      location.reload();
    },

    //查询评价
    getEvaluation (index, row) {
      getAssessment(this.currentPage, this.pageSize).then((res) => {
        this.assessOptions = res.data.records;
        // console.log(this.assessOptions);
        for (let i = 0; i < this.assessOptions.length; i++) {
          if (this.assessOptions[i].type == "NON_HIDE" && row.id == this.assessOptions[i].userId) {
            console.log(this.assessOptions[i].level);
            console.log(this.assessOptions[i].content);
            alert("评分为" + this.assessOptions[i].level + " 评价内容为" + this.assessOptions[i].content)
          }
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
}

</script>

<style>
</style>