<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse"
      background-color="#334256" text-color="#ffffff" active-text-color="#20a0ff"
      router
    >
      <template v-for="item in items">
        <template>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            {{item.title}}
          </el-menu-item>
        </template>
      </template>

    </el-menu>
  </div>
</template>
<script>
  import bus from '../assets/js/bus'

  export default {
    data(){
      return{
        collapse: false,
        items: [
          {
            icon: 'el-icon-document',
            index: 'AdminInfo',
            title: '首页'
          },
          {
            icon: 'el-icon-document',
            index: 'JobGet',
            title: '作业收取'
          },
          {
            icon: 'el-icon-document',
            index: 'JobPost',
            title: '作业发布'
          },
          {
            icon: 'el-icon-document',
            index: 'JobManage',
            title: '作业管理'
          },
          {
            icon: 'el-icon-document',
            index: 'MemberManage',
            title: '成员管理'
          },
          {
            icon: 'el-icon-document',
            index: 'JobPostponeManage',
            title: '作业延期'
          }
        ]
      }
    },
    computed:{
      onRoutes(){
        return this.$route.path.replace('/','')
      }
    },
    // 页面创建完成执行
    created() {
      //通过Bus进行组件间的通信，来折叠侧边栏
      bus.$on('collapse',msg =>{
        this.collapse = msg
      })
    }
  }
</script>
<style scoped>
  /*scoped表示该css样式只在该vue页面中起作用*/
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    background-color: #334256;
    overflow-y: scroll;
  }
  .sidebar-el-menu:not(.el-menu--collapse){
    width:150px;
  }

  .sidebar::-webkit-scrollbar{
    width: 0;
  }

  .sidebar > ul {
    height: 100%;
  }
</style>

