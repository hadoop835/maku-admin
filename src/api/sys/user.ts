import http from '@/utils/request'
import cache from '@/utils/cache'
import constant from '@/utils/constant'

export const getUserInfoInfo = () => {
	return http.get('v1/user/getUserLoginInfo')
}

export const updatePasswordApi = (data: any) => {
	return http.put('/sys/user/password', data)
}

export const useUserApi = (id: number) => {
	return http.get('/sys/user/' + id)
}

export const useUserExportApi = () => {
	location.href = constant.apiUrl + '/sys/user/export?access_token=' + cache.getToken()
}

export const useUserSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return http.put('/sys/user', dataForm)
	} else {
		return http.post('/sys/user', dataForm)
	}
}
