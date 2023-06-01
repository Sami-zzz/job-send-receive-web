<template>
  <div class="login-wrap">
    <div class="ms-title">作业收发系统后台管理登录</div>
    <div class="ms-login">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item prop="userCode">
          <el-input
            v-model="ruleForm.userCode"
            placeholder="用户CODE"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button
            type="primary"
            @click="submitForm"
          >登录</el-button>
        </div>
      </el-form>
      <div class="register">
        <el-button @click="register">注册</el-button>
      </div>
    </div>

  </div>
</template>
<script>
import { getLoginStatus } from "../api/index";
import { mixin } from "../mixins";
export default {
  mixins: [mixin],
  data () {
    return {
      ruleForm: {
        userCode: '',
        password: ''
      },
      rules: {
        userCode: [
          { required: true, message: '请输入用户CODE', trigger: "blur" }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    register () {
      this.$router.push("/Register")
    },
    submitForm () {
      // let params = new URLSearchParams();
      // params.append("code", this.ruleForm.userCode);
      // params.append("password", this.ruleForm.password);
      let params = {
        code: this.ruleForm.userCode,
        password: this.ruleForm.password
      }
      // getLoginStatus(params)
      //   .then((res) => {
      //     console.log(res.data);
      //     if (res.data.status == 1) {
      //       //将输入的用户名存放到本地缓存中，可用去其他的vue页面获取
      //       localStorage.setItem("userCode", this.ruleForm.userCode);
      //       localStorage.setItem("userId", this.ruleForm.userId); 
      //       this.$router.push("/Info")
      //       this.notify("登录成功", "success");
      //     } else {
      //       this.notify("登录失败", "error");
      //     }
      //   });

      // localStorage.setItem("username", this.ruleForm.username);
      this.$router.push("/AdminInfo")
      // this.$router.push("/Info")
      // this.$router.push("/SuperAdminInfo")
      this.notify("登录成功", "success");
    }

  }
}
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
  top: 50%;
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
  top: 50%;
  width: 300px;
  height: 200px;
  margin-left: -190px;
  margin-top: -150px;
  padding: 40px;
  border-radius: 5px;
  background: #ffffff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}

.register button {
  width: 100%;
  margin-top: 20px;
}
</style>
