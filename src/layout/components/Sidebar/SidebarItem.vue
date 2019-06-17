<template>
  <div
    v-if="!item.hidden"
    class="menu-wrapper"
  >
    <template v-if="!item.hasChildren">
      <app-link :to="resolvePath(item.path)">
        <el-menu-item
          :index="item.path"
          :class="{'submenu-title-noDropdown':!isNest}"
        >
          <item
            :icon="item.icon"
            :title="item.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu
      v-else
      :index="item.path"
      popper-append-to-body
    >
      <template slot="title">
        <item
          :icon="item.icon"
          :title="item.title"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :base-path="resolvePath(child.path)"
        :item="child"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
