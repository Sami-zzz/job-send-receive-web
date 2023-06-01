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
          width="180"
          column-key="direction"
          :filters="direction"
          :filter-method="filterHandler">
        </el-table-column>
        <el-table-column
          prop="group"
          label="组别"
          width="180"
          column-key="group"
          :filters="group"
          :filter-method="filterHandler">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="100">
        </el-table-column>
        <el-table-column
          prop="code"
          label="总积分"
          width="150">
        </el-table-column>

        <el-table-column
          label="操作">
              <template    slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="success" size="mini">评价</el-button>
            </template>
        </el-table-column>

        <el-table-column
          label="评分"
          prop="level">
            <template slot-scope="scope">
                <el-rate
                    v-model="scope.row.level"
                    :colors="colors">
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
            label="成员评价"
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
    import { getAllMerber } from "../../../src/api/index.js";
    import { getAllDirectionTest } from "../../../src/api/index.js";
    import { getAllGroupTest } from "../../../src/api/index.js";
  export default {

    data() {
      return {
        editForm:{
          content:''
        },
        editFormVisible:false,
        value:null,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
        tableData: [
         ],
         direction:[],
         group:[],
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
      handleClick(row){
        this.editFormVisible = true
          console.log(row);
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      getData(currentPage, pageSize){
          getAllMerber(currentPage, pageSize).then((res)=>{  
            let data = res.data.records
            getAllGroupTest().then((res)=>{
              let group = res.data
              for(let i=0;i<data.length;i++){
                for(let j=0;j<group.length;j++){
                  if(data[i].userGroupId==group[j].code){
                    data[i].userGroupId = group[j].name
                  }
                }
              }
              for(let j=0;j<group.length;j++){
                      let obj = {
                        text:group[j].name,
                        value:group[j].name
                      }
                      this.group.push(obj)
                }
            }).then(()=>{

            getAllDirectionTest().then((res)=>{
              let direction = res.data
              for(let i=0;i<data.length;i++){
                for(let j=0;j<direction.length;j++){
                  if(data[i].userDirectionId==direction[j].code){
                    data[i].userDirectionId = direction[j].name
                  }
                }
              }
              for(let j=0;j<direction.length;j++){
                      let obj = {
                        text:direction[j].name,
                        value:direction[j].name
                      }
                      this.direction.push(obj)
                }
              this.tableData=[]
            for(let i =0;i<data.length;i++){
              let obj = {
              id:data[i].id,
              direction: data[i].userDirectionId,
              group: data[i].userGroupId,
              name: data[i].name,
              sex: data[i].sex=='FEMALE'?'女':'男',
              level:1,
              code:10
            }
            this.tableData.push(obj)
            }
            })
            })
            
            

          })
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
    },
    mounted () {
    this.getData(this.currentPage, this.pageSize)
  }
  }
</script>