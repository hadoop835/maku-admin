import http from '@/utils/request'

export const useCaptchaEnabledApi = () => {
	return http.get('/sys/auth/captcha/enabled')
}

export const useCaptchaApi = () => {
	return http.get('/sys/auth/captcha')
}

export const useSendCodeApi = (mobile: string) => {
	return http.post('/sys/auth/send/code?mobile=' + mobile)
}

export const useAccountLoginApi = (data: any) => {
	return http.post('/v1/user/login', data)
}

export const useMobileLoginApi = (data: any) => {
	return http.post('/sys/auth/mobile', data)
}

export const useLogoutApi = () => {
	return http.post('/sys/auth/logout')
}
