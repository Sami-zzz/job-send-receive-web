<template>

  <div class="box">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="用户名修改"
        prop="name"
      >
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="用户性别修改">
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

      <el-form-item
        label="班级信息修改"
        prop="userClass"
      >
        <el-input v-model="ruleForm.userClass"></el-input>
      </el-form-item>

      <el-form-item
        label="手机号修改"
        prop="phone"
      >
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>

      <!-- <el-form-item
        label="修改密码"
        prop="password"
      >
        <el-input
          type="password"
          v-model="ruleForm.password"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="checkPass"
      >
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          auto-complete="off"
        ></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserInfoById, userUpdate } from '../../../src/api'
export default {
  data () {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("昵称不能为空"));
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
    // var validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     if (this.ruleForm.checkPass !== "") {
    //       this.$refs.ruleForm.validateField("checkPass");
    //     }
    //     callback();
    //   }
    // };
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请再次输入密码"));
    //   } else if (value !== this.ruleForm.password) {
    //     callback(new Error("两次输入密码不一致!"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      userId: 1,
      ruleForm: {
        // password: "",
        class: "",
        phone: "",
        // checkPass: "",
        name: "",
        sex: "",
        userClass: "",
      },
      rules: {
        // password: [{ validator: validatePass, trigger: "blur" }],
        // checkPass: [{ validator: validatePass2, trigger: "blur" }],
        name: [{ validator: checkName, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        sex: [{ trigger: "blur" }],
      },
    };
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let params = this.userId;
      getUserInfoById(params).then((res) => {
        // console.log(res.data);
        this.ruleForm = res.data;
        // console.log(this.ruleForm);
        this.ruleForm.password = ""
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // localStorage.setItem("username", this.ruleForm.name);
          // location.reload();
          let params = {
            id: this.userId,
            code: this.ruleForm.code,
            name: this.ruleForm.name,
            sex: this.ruleForm.sex,
            phone: this.ruleForm.phone,
            userClass: this.ruleForm.userClass,
            // password: this.ruleForm.password,
            // userRoleId: this.ruleForm.userRoleId,
            // userGroupId: this.ruleForm.userGroupId,
            // userDirectionId: this.ruleForm.userDirectionId,
          }
          userUpdate(params).then((res) => {
            // console.log(params);
            localStorage.setItem("username", this.ruleForm.name);
            console.log(res);
            alert("submit!");
            // location.reload();
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