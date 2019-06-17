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
    path: '/platform-management',
    component: Layout,
    redirect: '/platform-management/rights-management',
    meta: { title: '平台管理' },
    children: [
      {
        path: 'rights-management',
        name: 'rights-management',
        component: () => import('@/views/permission-management/index'),
        meta: { title: '权限管理' }
      },
      {
        path: 'menu-management',
        name: 'menu-management',
        component: () => import('@/views/menu-management/index'),
        meta: { title: '菜单管理' }
      },
      {
        path: 'user-management',
        name: 'user-management',
        component: () => import('@/views/user-management/index'),
        meta: { title: '用户管理' }
      },
      {
        path: 'admin-management',
        name: 'admin-management',
        component: () => import('@/views/admin-management/index'),
        meta: { title: '管理员管理' }
      }
    ]
  },
  {
    path: '/enterprise-management',
    component: Layout,
    redirect: '/enterprise-management/enterprise-list',
    meta: { title: '企业管理' },
    children: [
      {
        path: 'enterprise-list',
        name: 'enterprise-list',
        component: () => import('@/views/enterprise-list/index'),
        meta: { title: '企业列表' }
      },
      {
        path: 'enterprise-permission',
        name: 'enterprise-permission',
        component: () => import('@/views/permission-management/index'),
        meta: { title: '企业权限' }
      },
      {
        path: 'enterprise-menu',
        name: 'enterprise-menu',
        component: () => import('@/views/menu-management/index'),
        meta: { title: '企业菜单' }
      }
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
