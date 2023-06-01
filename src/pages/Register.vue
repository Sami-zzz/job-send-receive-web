<template>
  <div class="login-wrap">
    <div class="ms-title">作业收发系统注册页面</div>
    <div class="ms-login">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item prop="code">
          <el-input
            v-model="ruleForm.code"
            placeholder="用户CODE"
          ></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="sex">
          <el-select
            v-model="ruleForm.sex"
            placeholder="请选择性别"
          >
            <el-option
              label="男"
              value="MALE"
            ></el-option>
            <el-option
              label="女"
              value="FEMALE"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
            v-model="ruleForm.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="direction">
          <el-select
            v-model="ruleForm.direction"
            placeholder="请选择方向"
          >
            <el-option
              label="前端"
              value="1"
            ></el-option>
            <el-option
              label="后端"
              value="2"
            ></el-option>
            <el-option
              label="运维"
              value="3"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="ruleForm.password"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            placeholder="请确认密码"
            type="password"
            v-model="ruleForm.checkPass"
            auto-complete="off"
          ></el-input>
        </el-form-item>

        <div class="register-btn">
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
            >提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>

  </div>
</template>

<script>
import { userRegister } from '../../src/api'
export default {
  data () {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("昵称不能为空"));
      }
      callback();
    };

    var checkSex = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("性别不能为空"));
      }
      callback();
    };

    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("学号不能为空"));
      }
      callback();
    };

    var checkDirection = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("方向不能为空"));
      }
      callback();
    };
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else if (value.length != 11) {
        return callback(new Error("手机号位数错误"));
      } else if (value[0] <= 9 && value[0] >= 0) {
        // console.log(value);
        callback();
      } else {
        return callback(new Error("手机号错误"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        direction: "",
        password: "",
        phone: "",
        checkPass: "",
        name: "",
        sex: "",
        code: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        name: [{ validator: checkName, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        sex: [{ validator: checkSex, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }],
        direction: [{ validator: checkDirection, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // location.reload();
          let params = {
            code: this.ruleForm.code,
            name: this.ruleForm.name,
            sex: this.ruleForm.sex,
            phone: this.ruleForm.phone,
            password: this.ruleForm.password,
            userDirectionId: this.ruleForm.direction,
          }
          //   console.log(params);
          userRegister(params).then((res) => {
            console.log(params);
          })
        }
        else {
          alert("error submit!!");
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
.login-wrap {
  position: relative;
  background: url('../assets/img/background.jpg');
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 35%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  color: #fff;
}
.ms-login {
  position: absolute; /*绝对定位*/
  left: 50%;
  top: 30%;
  width: 300px;
  height: 500px;
  margin-left: -190px;
  margin-top: -150px;
  padding: 40px;
  border-radius: 5px;
  background: #ffffff;
}
.register button {
  margin-left: 110px;
  margin-top: 20px;
}
</style>