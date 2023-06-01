<template>
  <div class="box">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="code"
        label="用户code"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="userDirectionId"
        label="方向"
        width="180"
        column-key="userDirectionId"
      >
      </el-table-column>
      <el-table-column
        prop="userGroupId"
        label="组别"
        width="180"
        column-key="group"
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
        width="180"
      >
      </el-table-column>

      <el-table-column
        prop="userClass"
        label="班级"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="userRoleId"
        label="权限"
        width="180"
      >
      </el-table-column>

      <el-table-column label="操作">
        <template>
          <el-button
            size="mini"
            type="primary"
            @click="EditInfo"
          >修改资料</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
  
  <script>
import { getUserInfoById } from '../../../src/api'
export default {
  data () {
    return {
      userId: 1,
      value: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      tableData: [],
    }
  },
  mounted () {
    this.getData()
  },

  methods: {
    getData () {
      let params = this.userId;
      getUserInfoById(params).then((res) => {
        // console.log(res.data);
        let list = []
        let resObj = res.data
        list.push(resObj)
        // console.log(list);
        this.tableData = list
        // console.log(this.tableData.length);
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
    EditInfo () {
      this.$router.push("/ModifyData")
    }
  },
}

  </script>
  
  <style>
</style>