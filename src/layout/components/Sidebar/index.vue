<template>
  <div>
    <logo
      v-if="showLogo"
      :collapse="isCollapse"
    />
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        :active-text-color="variables.menuActiveText"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :collapse="isCollapse"
        mode="vertical"
      > 
        <sidebar-item
          v-for="route in routers"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import Logo from './Logo'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      routers: [
        {
          title: "首页",
          path: "/",
          hasChildren: false
        },
        {
          title: "平台管理",
          path: "/platform-management",
          hasChildren: true,
          children: [
            {
              title: "权限管理",
              path: "/platform-management/rights-management",
              hasChildren: false
            },
            {
              title: "菜单管理",
              path: "/platform-management/menu-management",
              hasChildren: false
            },
            {
              title: "用户管理",
              path: "/platform-management/user-management",
              hasChildren: false
            },
            {
              title: "管理员管理",
              path: "/platform-management/admin-management",
              hasChildren: false
            }
          ]
        },
        {
          title: "企业管理",
          path: "/enterprise-management",
          hasChildren: true,
          children: [
            {
              title: "企业列表",
              path: "/enterprise-management/enterprise-list",
              hasChildren: false
            },
            {
              title: "企业权限",
              path: "/enterprise-management/enterprise-permission",
              hasChildren: false
            },
            {
              title: "企业菜单",
              path: "/enterprise-management/enterprise-menu",
              hasChildren: false
            }
          ]
        }
      ],
      showLogo: true
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
    variables() {
      return variables;
    }
  }
}
</script>
<style>
  .el-menu-vertical-demo{
    width: 300px;
    height: 100%;
  }
  .sidebarLogo{
    width: 32px;
    height: 32px;
    vertical-align: middle;
    margin-right: 12px;
  }
  .sidebarTitle{
    display: inline-block;
    margin: 0;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 14px;
    font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
    vertical-align: middle;
  }
</style>
