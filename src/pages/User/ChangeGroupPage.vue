<template>
  <div class="box">
    <el-row>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="申请更换："
          prop="apply"
        >
          <el-select
            v-model="ruleForm.apply"
            placeholder="请选择更换后的小组"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>

          </el-select>
        </el-form-item>

        <el-form-item
          label="申请理由"
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
    </el-row>
  </div>
</template>
<script>
import { getAllGroupTest, changeGroup } from '../../../src/api';
export default {
  mounted () {
    this.getData();
  },

  data () {
    return {
      options: [],
      ruleForm: {
        apply: "",
        reason: "",
      },
      rules: {
        apply: [
          {
            required: true,
            message: "请选择申请更换的方向",
            trigger: "change",
          },
        ],
        reason: [
          { required: true, message: "请填写申请理由", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    getData () {
      getAllGroupTest().then((res) => {
        // console.log(res.data);
        this.options = res.data;
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          // console.log(this.options);
          console.log(this.ruleForm.apply);
          console.log(this.options.length);
          for (var i = 0; i < this.options.length; i++) {
            // console.log(this.options[i].id);
            if (this.ruleForm.apply === this.options[i].id) {
              console.log(this.ruleForm.apply + '被选中了');
            }
          }
          let params = {
            applyId: 2,
            reason: this.ruleForm.reason,
            type: 0,
            groupId: this.ruleForm.apply
          };
          changeGroup(params).then((res) => {
            console.log(params);
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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