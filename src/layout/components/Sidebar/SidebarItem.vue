<template>
  <template v-if="!item.hidden">
    <template v-if="showSidebarItem(item.children, item)">
      <Link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
          <item :icon="onlyOneChild.meta?.icon || item.meta?.icon" />
          <template #title>{{ onlyOneChild.meta?.title }}</template>
        </el-menu-item>
      </Link>
    </template>
    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </template>
      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
/*Initialization parameters such as importing components, proxy, state, etc.*/
import { getCurrentInstance, onMounted } from 'vue'
import Link from './Link'
import Item from './Item'
import { isExternal } from '@/utils/validate'
import path from 'path'
import { RouteItemTy } from '@/types/router'
let { proxy }: any = getCurrentInstance()
defineProps({
  //Each router Item
  item: {
    type: Object,
    required: true
  },
  //Used to determine whether it is a sub-Item and set the response style
  isNest: {
    type: Boolean,
    default: false
  },
  //Basic path, used for splicing
  basePath: {
    type: String,
    default: ''
  }
})
onMounted(() => {
  // console.log("I mounted");
  // console.log(proxy.item);
})
//Display the situation of sidebarItem
proxy.onlyOneChild = null
let showSidebarItem = (children = [], parent: RouteItemTy) => {
  const showingChildren = children.filter((item: RouteItemTy) => {
    if (item.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      proxy.onlyOneChild = item
      return true
    }
  })
  if (showingChildren.length === 1 && !parent?.alwaysShow) {
    return true
  }
  if (showingChildren.length === 0) {
    proxy.onlyOneChild = { ...parent, path: '', noChildren: true }
    return true
  }
  return false
}
let resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(proxy.basePath)) {
    return proxy.basePath
  }
  return path.resolve(proxy.basePath, routePath)
}
</script>

<style lang="scss">
// menu hover
/* .submenu-title-noDropdown,
  .el-submenu__title {
    &:hover {
      background-color: $menuHover !important;
    }
  }

  .is-active>.el-submenu__title {
    color: $subMenuActiveText !important;
  }*/
</style>
