import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index')
      }
    ]
  },
  {
    path: '/permission-management',
    component: Layout,
    redirect: '/permission-management/role-management',
    meta: { title: '权限管理' },
    children: [
      {
        path: 'role-management',
        name: 'role-management',
        component: () => import('@/views/permission-management/role-management'),
        meta: { title: '角色管理' }
      },
      {
        path: 'permission-setting',
        name: 'permission-setting',
        component: () => import('@/views/permission-management/permission-setting'),
        meta: { title: '权限设置' }
      },
      {
        path: 'empowerment-management',
        name: 'empowerment-management',
        component: () => import('@/views/permission-management/empowerment-management'),
        meta: { title: '赋权管理' }
      }
    ]
  },
  {
    path: '/organization-management',
    component: Layout,
    redirect: '/organization-management/organization-architecture',
    meta: { title: '组织管理' },
    children: [
      {
        path: 'organization-architecture',
        name: 'organization-architecture',
        component: () => import('@/views/organization-architecture/index'),
        meta: { title: '组织架构' }
      },
      {
        path: 'staff-management',
        name: 'organization-staffManagement',
        component: () => import('@/views/staff-management/index'),
        meta: { title: '人员管理' }
      },
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash',
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
