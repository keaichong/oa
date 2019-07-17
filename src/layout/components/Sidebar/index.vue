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
          title: "权限管理",
          path: "/permission-management",
          hasChildren: true,
          children: [
            {
              title: "角色管理",
              path: "/permission-management/role-management",
              hasChildren: false
            },
            {
              title: "权限设置",
              path: "/permission-management/permission-setting",
              hasChildren: false
            },
            {
              title: "赋权管理",
              path: "/permission-management/empowerment-management",
              hasChildren: false
            }
          ]
        },
        {
          title: "组织管理",
          path: "/organization-management",
          hasChildren: true,
          children: [
            {
              title: "组织架构",
              path: "/organization-management/organization-architecture",
              hasChildren: false
            },
            {
              title: "人员管理",
              path: "/organization-management/staff-management",
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
