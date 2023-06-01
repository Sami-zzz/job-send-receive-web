import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../pages/Login.vue'], resolve)
    },
    {
      path: '/Register',
      component: resolve => require(['../pages/Register.vue'], resolve)
    },
    {
      path: '/Info',
      component: resolve => require(['../components/Home.vue'], resolve),
      children: [
        {
          path: '/Info',
          component: resolve => require(['../pages/User/InfoPage.vue'], resolve)
        },
        {
          path: '/JobComfirm',
          component: resolve => require(['../pages/User/JobComfirmPage.vue'], resolve)
        },
        {
          path: '/JobSubmit',
          component: resolve => require(['../pages/User/JobSubmitPage.vue'], resolve)
        },
        {
          path: '/Notice',
          component: resolve => require(['../pages/User/NoticePage.vue'], resolve)
        },
        {
          path: '/Delay',
          component: resolve => require(['../pages/User/DelayPage.vue'], resolve)
        },
        {
          path: '/ChangeDirection',
          component: resolve => require(['../pages/User/ChangeDirectionPage.vue'], resolve)
        },
        {
          path: '/ChangeGroup',
          component: resolve => require(['../pages/User/ChangeGroupPage.vue'], resolve)
        },
        {
          path: '/Grade',
          component: resolve => require(['../pages/User/GradePage.vue'], resolve)
        },
        {
          path: '/ModifyData',
          component: resolve => require(['../pages/User/ModifyDataPage.vue'], resolve)
        },

      ]
    },
    {
      path: '/AdminInfo',
      component: resolve => require(['../components/AdminHome.vue'], resolve),
      children: [
        {
          path: '/AdminInfo',
          component: resolve => require(['../pages/Admin/AdminInfoPage.vue'], resolve)
        },
        {
          path: '/JobPost',
          component: resolve => require(['../pages/Admin/JobPostPage.vue'], resolve)
        },
        {
          path: '/JobGet',
          component: resolve => require(['../pages/Admin/JobGetPage.vue'], resolve)
        },
        {
          path: '/JobManage',
          component: resolve => require(['../pages/Admin/JobManagePage.vue'], resolve)
        },
        {
          path: '/MemberManage',
          component: resolve => require(['../pages/Admin/MemberManagePage.vue'], resolve)
        },
        {
          path: '/JobPostponeManage',
          component: resolve => require(['../pages/Admin/JobPostponeManagePage.vue'], resolve)
        }
      ]
    },
    {
      path: '/SuperAdminInfo',
      component: resolve => require(['../components/SuperAdminHome.vue'], resolve),
      children: [
        {
          path: '/SuperAdminInfo',
          component: resolve => require(['../pages/SuperAdmin/SuperAdminInfoPage.vue'], resolve)
        },
        {
          path: '/PersonnelManagement',
          component: resolve => require(['../pages/SuperAdmin/PersonnelManagementPage.vue'], resolve)
        },
        {
          path: '/ApprovalApplication',
          component: resolve => require(['../pages/SuperAdmin/ApprovalApplicationPage.vue'], resolve)
        },
        {
          path: '/Evaluate',
          component: resolve => require(['../pages/SuperAdmin/EvaluatePage.vue'], resolve)
        },

      ]
    }

  ]
})
