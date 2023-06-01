<!-- 超管进行人员管理 -->
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
        :filters="[{text: '团队一', value: '团队一'}, {text: '团队二', value: '团队二'}]"
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
        prop="sex"
        label="性别"
        width="140"
      >
      </el-table-column>

      <el-table-column
        prop="userRoleId"
        label="权限"
        width="160"
        :filters="[{text: '管理员', value: '管理员'}, {text: '队员', value: '队员'}]"
        :filter-method="filterHandler"
      >
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">

          <el-button
            size="mini"
            @click="updateUserRole(scope.$index, scope.row)"
          >更改权限</el-button>
          <el-button
            size="mini"
            @click="handleDel(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog
      title="更改权限"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="diaDate">
        <el-form-item
          label="现权限"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="diaDate.roleId"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          label="更改后的权限"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="diaDate.newRoleId"
            placeholder="请选择权限"
          >
            <el-option
              v-for="item in totalRole"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitUpdate()"
        >确 定</el-button>
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
import { getUserInfo, updateUserRole, userDelete, selectUserRole } from '../../api'
export default {
  mounted () {
    this.getData(this.currentPage, this.pageSize)
    this.getRole()
  },
  data () {
    return {
      userId: 4,


      //当前页数
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [2, 4, 10, 20],
      // 默认每页显示的条数（可修改）
      pageSize: 10,
      // value: null,
      tableData: [],

      dialogFormVisible: false,
      diaDate: {
        user: "",
        roleId: "",
        newRoleId: ""
      },
      formLabelWidth: '120px',
      totalRole: []

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
          if (this.tableData[i].sex == "MALE") {
            this.tableData[i].sex = "男"
          }
          if (this.tableData[i].sex == "FEMALE") {
            this.tableData[i].sex = "女"
          }
          if (this.tableData[i].userRoleId == "1") {
            this.tableData[i].userRoleId = "用户"
          }
          if (this.tableData[i].userRoleId == "2") {
            this.tableData[i].userRoleId = "管理员"
          }
          if (this.tableData[i].userRoleId == "3") {
            this.tableData[i].userRoleId = "超管"
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
    getRole () {
      selectUserRole().then((res) => {
        // console.log(res.data);
        this.totalRole = res.data;
        // console.log(this.totalRole);
      })
    },
    filterHandler (value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    handleDel (index, row) {
      console.log(index, row);
      console.log('删除');
      // userDelete(id).then((res) => {
      //   console.log(res);
      // })

    },
    updateUserRole (index, row) {
      console.log(index, row);
      console.log('更改权限');
      this.dialogFormVisible = true
      this.diaDate.roleId = row.userRoleId
      this.diaDate.user = row.id;
    },

    submitUpdate () {
      this.dialogFormVisible = false
      let params = {
        updateRoleId: this.diaDate.user,
        userId: this.userId,
        roleId: this.diaDate.newRoleId
      }
      // console.log(params);
      updateUserRole(params).then((res) => {
        // console.log(res);
        this.$message({
          message: "修改成功！",
          type: 'success'
        });
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