<template>
	<el-container class="layout-container layout-columns">
		<el-aside class="layout-sidebar aside-expend" :class="sidebarClass">
			<div class="sidebar-logo">
				<el-avatar src="./favicon.ico"></el-avatar>
			</div>
			<el-scrollbar>
				<div class="columns-menu ">
					<div
						v-for="menu in routerStore.menuRoutes"
						:key="menu.path"
						class="columns-menu-item"
						:class="{ active: menuPath === menu.path }"
						@click="handleMenu(menu)"
					>
					   <div class="columns-menu-item-box-top"><div></div></div>
					   <div class="columns-menu-item-box"><div></div></div>
					   <div class="icon">
					   <el-icon><component :is="menu.meta?.icon || 'el-icon-menu'" /></el-icon>
					   </div>
						<span class="title">{{ menu.meta?.title }}</span>
						<div class="columns-menu-item-box-bottom"><div></div></div>
					</div>
				</div>
			</el-scrollbar>
		</el-aside>
		<el-container>
			<el-header class="layout-header" :style="layoutHeaderHeight">
				<div class="navbar-container" :class="headerClass">
					<NavbarLeft />
					<NavbarRight />
				</div>
			</el-header>
			<div class="layout-main">
				<div v-if="subMenus.length > 0 && appStore.sidebarOpened" class="columns-sub-menu">
					<el-menu
						:default-active="defaultActive"
						:collapse="!appStore.sidebarOpened"
						:unique-opened="appStore.theme.uniqueOpened"
						background-color="transparent"
						:collapse-transition="false"
						mode="vertical"
					>
						<menu-item v-for="menu in subMenus" :key="menu.path" :menu="menu"></menu-item>
					</el-menu>
				</div>
				<Tabs v-if="theme.isTabsView" />
				<Main />
			</div>
		</el-container>
	</el-container>
</template>

<script setup lang="ts">
import { useRouterStore } from '@/store/modules/router'
import { useAppStore } from '@/store/modules/app'
import NavbarLeft from '@/layout/components/Navbar/NavbarLeft.vue'
import NavbarRight from '@/layout/components/Navbar/NavbarRight.vue'
import Main from '@/layout/components/Main/index.vue'
import Tabs from '@/layout/components/Tabs/index.vue'
import MenuItem from '@/layout/components/Menu/MenuItem.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import { color } from 'echarts'

const routerStore = useRouterStore()
const appStore = useAppStore()
const route = useRoute()
const router = useRouter()

const defaultActive = computed(() => {
	const { path } = route
	return path
})

const subMenus = ref<any[]>([])
watch(route, () => {
	subMenus.value = []
	initSubMenu()
})

onMounted(() => {
	initSubMenu()
})

const menuPath = ref<string>('')
const initSubMenu = () => {
	menuPath.value = defaultActive.value
	for (const menu of routerStore.menuRoutes) {
		// 是否包含当前路由
		const exist = findRoute(menu.children as RouteRecordRaw[])
		if (exist) {
			subMenus.value = menu.children as RouteRecordRaw[]

			menuPath.value = menu.path
			break
		}
	}
}

const findRoute = (menus: RouteRecordRaw[]): boolean => {
	for (const menu of menus) {
		// 有子菜单的情况
		if (menu.children && menu.children.length > 0) {
			if (findRoute(menu.children)) {
				return true
			}
		} else if (menu.path === defaultActive.value) {
			return true
		}
	}
	return false
}

const handleMenu = (menu: any) => {
	if (menu.children && menu.children.length > 0) {
		const leafRoute = findLeafRoute(menu.children)
		router.push(leafRoute.path)
	} else {
		router.push(menu.path)
	}
}

const findLeafRoute = (menus: RouteRecordRaw[]): any => {
	for (const menu of menus) {
		// 有子菜单的情况
		if (menu.children && menu.children.length > 0) {
			return findLeafRoute(menu.children)
		} else {
			return menu
		}
	}
	return null
}

const headerClass = computed(() => (appStore.theme.headerStyle === 'theme' ? 'header-theme' : ''))

const sidebarClass = computed(() => {
	return appStore.theme.sidebarStyle === 'dark' ? 'sidebar-dark' : ''
})

const theme = computed(() => appStore.theme)
const layoutHeaderHeight = computed(() => {
	if (!theme.value.isTabsView) {
		return 'height:var(--theme-header-height) !important'
	} else {
		return ''
	}
})
</script>

<style lang="scss" scoped>
.sidebar-logo {
	height: var(--theme-header-height);
	line-height: var(--theme-header-height);
	border-bottom: var(--theme-border-color-light) 1px solid;
	text-align: center;
	.el-avatar {
		width: 30px;
		height: 30px;
		vertical-align: middle;
	}
}
.columns-menu {
	flex: 1;
	.columns-menu-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; 
		cursor: pointer;
		transition: all 0.3s ease;
		height: 80px;
        width: 88px;
        position: relative;
        font-weight: 400;
		&:hover {
			.columns-menu-item-box{
				div {
            background-color: #ffffff;
            opacity: 0.1;
			}

          }
			//background-color: #fff;
		}
		::v-deep(.svg-icon) {
			align-items: center;
			cursor: pointer;
			svg {
				font-size: 21px;
				color: var(--theme-menu-text-color) !important;
			}
		}
		.columns-menu-item-box-top {
			top: 0;
			position: absolute;
			right: 0;
			height: 8px;
			width: 8px; 
			div { 
				height: 8px;
			    width: 8px; 
				border-bottom-right-radius: 8px;
			}
		}
		.columns-menu-item-box-bottom{
            bottom: 0;
			position: absolute;
			right: 0;
			height: 8px;
			width: 8px; 
			div{
				border-top-right-radius: 8px;
				height: 8px;
			    width: 8px; 
			}
		}
		.columns-menu-item-box {
          position: absolute;
          width: 80px;
          height: 64.1px;
          top: 8px;
          left: 8px;
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
          div {
            width: 72px;
            height: 64px;
            border-radius: 8px;
          }
        }

		
		.icon {
          position: absolute;
          top: 16px;
          color: #fff;
          padding: 0 32px;
          font-size: 24px;
          height: 24px;
          line-height: 24px;
        }

        .title {
          padding: 0 16px;
          position: absolute;
          width: 100%;
          top: 44px;
          color: #fff;
          font-size: 14px;
          opacity: 0.6;
          text-align: center;
          height: 20px;
          line-height: 20px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
        }
	}
	.active {
		//background-color: var(--el-color-primary);
		//background-color: #fff;
		.columns-menu-item-box-top {
			background-color: #fff;
			div {background-color: var(--el-color-primary);;}
		}
		.columns-menu-item-box-bottom{
			background-color: #fff;
			div {
				background-color: var(--el-color-primary);
			}
		}
		.columns-menu-item-box{
			background-color: #fff;
			
		}
		.title {
          color: var(--el-color-primary);
          ;
          opacity: 1;
        }
		.icon{
			color: var(--el-color-primary);
        }

	}
}

.layout-sidebar {
	&.aside-expend {
		width: 88px !important;
		background-color: var(--el-color-primary);
	}
	::v-deep(.el-menu-item) {
		padding-left: 6px !important;
		padding-right: 10px !important;
	}
}

.layout-header {
	height: var(--theme-header-height) !important;
	border-bottom: 51px solid #8c8c8c !important;
}
.layout-main {
	display: block;
	width: 100%;
	height: 100%;
	.el-menu {
		border-right: none !important;
	}
	.el-menu-item {
		height: 40px !important;
		line-height: 40px !important;
		font-size: 14px !important;
		color: var(--theme-menu-text-color) !important;
		&:hover {
			color: var(--el-color-primary) !important;
		}
	}
	.el-menu-item.is-active {
		border-right: none;
		right: 0;
		color: var(--theme-menu-hover-color) !important;
	}
}
.column-menu {
	display: block;
}
.columns-sub-menu {
	width: 120px;
	height: 100%;
	display: block;
	float: left;
	border-right: var(--theme-border-color-light) 1px solid;
	background: #fff;
}
.navbar-container {
	height: var(--theme-header-height);
	display: flex;
	align-items: center;
	background: var(--theme-header-bg-color);
	border-bottom: 1px solid var(--theme-border-color-light);
	color: var(--theme-header-text-color);
	::v-deep(.svg-icon) {
		align-items: center;
		cursor: pointer;
		height: var(--theme-header-height);
		line-height: var(--theme-header-height);
		padding: 0 12px;
		svg {
			color: var(--theme-header-text-color) !important;
			font-size: 16px;
		}
		&:hover {
			background: var(--theme-header-hover-color);
		}
	}
}
  
</style>
