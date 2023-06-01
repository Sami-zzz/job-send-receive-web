<template>
  <div>
    <Header></Header>
    <SuperAdminAside></SuperAdminAside>
    <div
      class="content-box"
      :class="{'content-collapse':collapse}"
    >
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import Header from './Header.vue'
import bus from '../assets/js/bus'
import SuperAdminAside from './SuperAdminAside.vue'
export default {
  components: {
    Header,
    SuperAdminAside
  },
  data () {
    return {
      collapse: false
    }
  },
  created () {
    //通过Bus 进行组件间的通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg;
    })
  }
}
</script>
