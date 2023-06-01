<template>
  <div>
    
    <el-form :model="jobPostForm" :rules="rules" ref="jobPostForm" label-width="150px" class="demo-jobPostForm">
      <h2>请填写作业详细信息</h2>
      <el-form-item label="作业标题" prop="title">
        <el-input v-model="jobPostForm.title"></el-input>
      </el-form-item>
      <el-form-item label="作业积分" prop="code">
        <el-input v-model.number="jobPostForm.code"></el-input>
      </el-form-item>

      <el-form-item label="选择发布" prop="direction"  class="demo-form-inline">
        <el-col :span="11">
          <el-select v-model="jobPostForm.direction" placeholder="请选择方向">
            <el-option :label="p.name" :value="p.id" v-for="p in direction" :key="p.id"></el-option>
          </el-select>
        </el-col>
         <el-col class="line" :span="2">&nbsp;</el-col>
         
        <el-col :span="11">
          <el-select v-model="jobPostForm.group" placeholder="请选择团队" prop="group">
            <el-option :label="p.name" :value="p.id" v-for="p in group" :key="p.id"></el-option>
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item label="截止时间" required>
        <el-col :span="11">
          <el-form-item prop="forecastDate">
            <el-date-picker type="date" placeholder="选择日期" v-model="jobPostForm.forecastDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">&nbsp;</el-col>
        <el-col :span="11">
          <el-form-item prop="forecastDate">
            <el-time-picker placeholder="选择时间" v-model="jobPostForm.forecastDate" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
    
      <el-form-item label="作业内容" prop="jobcontent">
        <el-input type="textarea" v-model="jobPostForm.jobcontent"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm('jobPostForm')">立即发布</el-button>
        <el-button @click="resetForm('jobPostForm')">重置</el-button>
      </el-form-item>
    </el-form> 
    

  </div>
</template>
<script>
import { postJob ,getAllGroupTest ,getAllDirectionTest} from '../../../src/api/index.js'
  export default {
    data() {
      return {
        group:[],
        direction:[],
        jobPostForm: {
          code:'',
          title: '',
          direction: '',
          group: '',
          forecastDate: '',
          jobcontent: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入作业标题', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          code:[
      { required: true, message: '积分不能为空'},
      { type: 'number', message: '积分必须为数字值'}
    ],
          direction: [
            { required: true, message: '请选择方向', trigger: 'change' }
          ],
          forecastDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          jobcontent: [
            { required: true, message: '请填写作业内容', trigger: 'blur' }
          ]
        }
      };
    },
    mounted(){
        getAllGroupTest().then((res)=>{
          console.log(res);
          this.group=res.data
        })
        getAllDirectionTest().then((res)=>{
          this.direction=res.data
      })
    },
    methods: {
      submitForm(formtitle) {
        this.$refs[formtitle].validate((valid) => {
          if (valid) {
          let timeData = new Date(this.jobPostForm.forecastDate).getTime();
          let params = 
          {
            directionId: this.jobPostForm.direction,
            groupId: this.jobPostForm.group,
            job:{
            userId:localStorage.getItem('username'),
            title: this.jobPostForm.title,
            url:'',
            forecastDate: timeData,
            content: this.jobPostForm.jobcontent,
            code:this.jobPostForm.code
        }
          }
            console.log(params);
            postJob(params).then((res) => {
            console.log(res);
            this.options = res.data;
          })
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formtitle) {
        this.$refs[formtitle].resetFields();
      },

    }
  }
</script>

<style>
  .demo-jobPostForm {
    margin-top: 50px;
    width: 70%;
  }

  h2 {
    margin-left: 100px;
    margin-bottom: 30px;
    font-weight: 400;
  }
</style>