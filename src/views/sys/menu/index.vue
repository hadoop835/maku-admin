<template>  
<el-card class="mod__menu">
<el-container>
	<el-header>
		<el-form :inline="true">
			<el-form-item>
				<el-button v-auth="'sys:menu:save'" type="primary" @click="addOrUpdateHandle()">新增</el-button>
			</el-form-item>
			<el-form-item>
				<el-button plain @click="toggleExpandAll()">
					<template v-if="!isExpandAll">
						全部展开&nbsp;<el-icon><ArrowDown /></el-icon>
					</template>
					<template v-else>
						全部收起&nbsp;<el-icon><ArrowUp /></el-icon>
					</template>
				</el-button>
			</el-form-item>
		</el-form>
	</el-header>
		<el-main class="nopadding">
		<m-table >
			<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column label="#" type="index" width="50"></el-table-column>
				<el-table-column label="编码" prop="sn" width="100"></el-table-column>
				<el-table-column label="角色名称" prop="name" width="150"></el-table-column>
				<el-table-column label="状态" prop="status" width="80"></el-table-column>
		</m-table>
		</el-main>
		<add-or-update ref="addOrUpdateRef" @refresh-data-list="getDataList"></add-or-update>
</el-container> 
</el-card>
</template>

<script setup lang="ts">
import { useCrud } from '@/hooks'
import { reactive, ref, nextTick } from 'vue'
import AddOrUpdate from './add-or-update.vue'
import { IHooksOptions } from '@/hooks/interface'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'

const state: IHooksOptions = reactive({
	dataListUrl: '/sys/menu/list',
	deleteUrl: '/sys/menu',
	isPage: false
})

const addOrUpdateRef = ref()
const addOrUpdateHandle = (id?: number) => {
	addOrUpdateRef.value.init(id)
}

const { getDataList, deleteHandle } = useCrud(state)

// 是否展开，默认全部折叠
const isExpandAll = ref(false)
// 是否重新渲染表格状态
const refreshTable = ref(true)

// 切换 展开和折叠
const toggleExpandAll = () => {
	refreshTable.value = false
	isExpandAll.value = !isExpandAll.value
	nextTick(() => {
		refreshTable.value = true
	})
}
</script>
