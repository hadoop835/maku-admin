import htpp from '@/utils/request'

export const useMenuNavApi = (data: any) => {
	return htpp.post('/v1/system/menu/listMenuTree',data)
}

export const useAuthorityListApi = () => {
	return htpp.get('/sys/menu/authority')
}

export const useMenuListApi = (type: Number) => {
	// 菜单类型 0：菜单  1：按钮  2：接口
	const menuType = type === 2 ? 2 : 0

	return htpp.get('/sys/menu/list?type=' + menuType)
}

export const useMenuApi = (id: Number) => {
	return htpp.get('/sys/menu/' + id)
}

export const useMenuSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return htpp.put('/sys/menu', dataForm)
	} else {
		return htpp.post('/sys/menu', dataForm)
	}
}
