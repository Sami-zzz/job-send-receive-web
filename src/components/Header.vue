<template>
  <div class="header">
    <!-- 折叠图片-->
    <div class="collapse-btn" @click="collapseChange">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">作业后台管理</div>
    <div class="header-right">
      <!-- 全屏和非全屏切换功能-->
      <div class="btn-fullscreen" @click="handldFullScreen">
        <el-tooltip
          :content="fullscreen ? '取消全屏' : '全屏'"
          placement="bottom"
        >
          <i class="el-icon-rank"></i>
        </el-tooltip>
      </div>
      <!--头像图片显示-->
      <div class="user-avator">
        <img src="../assets/img/user.jpg" />
      </div>
      <!-- 退出登录功能-->
      <el-dropdown class="user-name" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ userName }}
          <!--添加一个向下的箭头-->
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="ModifyData">修改资料</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    
  </div>
</template>
<script>
import bus from "../assets/js/bus";
export default {
  data() {
    return {
      collapse: false,
      fullscreen: false,
    };
  },
  computed: {
    userName() {
      return localStorage.getItem("username");
    },
  },
  methods: {
    collapseChange() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    },
    //全屏事件
    handldFullScreen(){
      if(this.fullscreen){
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }else if(document.webkitCancelFullScreen){    //safari、 Chrome
          document.webkitCancelFullScreen();
        }else if(document.mozCancelFullScreen){     //firefox
          document.mozCancelFullScreen();
        }else if(document.msExitFullScreen){        //ie
          document.msExitFullScreen();
        }
      }else{
        let element = document.documentElement;
        if (element.requestFullscreen){
          element.requestFullscreen();
        }else if(element.webkitRequestFullScreen){    //safari、 Chrome
          element.webkitRequestFullScreen();
        }else if(element.mozRequestFullScreen){        //firefox
          element.mozRequestFullScreen();
        }else if(element.msRequestFullScreen){         //ie
          element.msRequestFullScreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    // 触发点击后的退出功能
    handleCommand(command) {
      if (command == "logout") {
        // 本地缓存中移除用户名
        localStorage.removeItem("userName");
        // 跳转至登录页面
        this.$router.push("/");
      } else if (command == "ModifyData") {
        //修改资料功能
        // console.log("1");
        this.$router.push("/ModifyData");
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>
<style  scoped>
.header {
  position: relative;
  background-color: #253041;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #ffffff;
}

.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}

.header .logo {
  float: left;
  line-height: 70px;
}

.header-right {
  float: right;
  padding-right: 50px; /*右边距*/
  display: flex;
  height: 70px;
  align-items: center; /*使右边栏的所有东西居中显示*/
}

.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}

.user-avator {
  margin-left: 20px;
}

.user-avator img {
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.user-name {
  margin-left: 10px;
}

.el-dropdown-link {
  color: #ffffff;
  cursor: pointer;
}
</style>
