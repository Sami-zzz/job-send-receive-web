<template>
  <div class="box">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="延期作业"
        prop="job"
      >
        <el-select
          v-model="ruleForm.job"
          placeholder="请选择申请延期的作业"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item
        label="延期时间"
        required
      >
        <el-col :span="11">
          <el-form-item prop="date">
            <el-date-picker
              v-model="ruleForm.date"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

      </el-form-item> -->

      <el-form-item
        label="延期天数"
        prop="date"
      >
        <el-input v-model.number="ruleForm.date"></el-input>
      </el-form-item>

      <el-form-item
        label="延期理由"
        prop="reason"
      >
        <el-input
          type="textarea"
          v-model="ruleForm.reason"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >提交申请</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addUserJobPostpone, getAllUserJobs } from '../../../src/api/index.js';
export default {
  data () {
    var checkDate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('时间不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        }
      }, 1000);
    };
    return {
      userId: 1,
      options: [],
      ruleForm: {
        job: "",
        date: null,
        reason: "",
      },
      rules: {
        job: [
          {
            required: true,
            message: "请选择申请延期的作业",
            trigger: "change",
          },
        ],
        date: [
          { validator: checkDate, trigger: 'blur' }
        ],
        reason: [
          { required: true, message: "请填写延期理由", trigger: "blur" },
        ],
      },
    };
  },
  mounted () {
    this.getData();
  },
  methods: {
    getData () {
      let params = this.userId;
      getAllUserJobs(params).then((res) => {
        console.log(res.data);
        // this.options = res.data;
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].state == "CONFIRMED") {
            this.options.push(res.data[i])
          }
        }
      })
    },

    submitForm (formName) {
      let params = {
        userJobId: this.ruleForm.job,
        day: this.ruleForm.date,
        reason: this.ruleForm.reason,
      }
      addUserJobPostpone(params).then((res) => {
        console.log(res);
        alert("submit!");
      })

    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.box {
  width: 800px;
  margin-top: 40px;
  margin-left: 200px;
}
</style>