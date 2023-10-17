import { defineStore } from 'pinia'
import { useAccountLoginApi, useMobileLoginApi, useLogoutApi } from '@/api/auth'
import { getUserInfoInfo } from '@/api/sys/user'
import cache from '@/utils/cache'
import { useAuthorityListApi } from '@/api/sys/menu'
import { useRouterStore } from '@/store/modules/router'
export const useUserStore = defineStore('userStore', {
	state: () => ({
		// 用户信息
		user: {
			id: '',
			superAdmin: 0,
			userName: '',
			avatar: ''
		},
		// 权限列表
		authorityList: [],
		// 访问token
		token: cache.getToken(),
		userInfo:{
			id: '',
			superAdmin: 0,
			userName: '',
			avatar: ''
		},
		// 刷新token
		refreshToken: cache.getRefreshToken()
	}),
	actions: {
		setUser(val: any) {
			this.user = val
		},
		userInfo(user: any) {
			this.userInfo = user
		},
		setToken(val: any) {
			this.token = val
			cache.setToken(val)
		},
		setRefreshToken(val: any) {
			this.refreshToken = val
			cache.setRefreshToken(val)
		},
		// 账号登录
		async accountLoginAction(loginForm: any) {
			const { data } = await useAccountLoginApi(loginForm) 
			this.setToken(data.token)
			this.userInfo(data.userInfo)
			//this.setRefreshToken(data.refresh_token)
		},
		// 手机号登录
		async mobileLoginAction(loginForm: any) {
			const { data } = await useMobileLoginApi(loginForm)
			this.setToken(data.token)
			this.setRefreshToken(data.refresh_token)
		},
		// 获取用户信息
		async getUserInfoInfo() {
			const { data } = await getUserInfoInfo()
			this.setUser(data)
		},
		// 获取权限
		async getAuthorityListAction() {
			const { data } = await useAuthorityListApi()
			this.authorityList = data || []
		},
		// 用户退出
		async logoutAction() {
			await useLogoutApi()

			// 移除 token
			this.setToken(null)
			this.setRefreshToken(null)
		}
	}
})
