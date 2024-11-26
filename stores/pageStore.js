// 页面缓存数据
import {
	ref
} from 'vue'
import {
	defineStore
} from 'pinia'

export const usePageStore = defineStore(()=>{
	const page = ref({
		index: 1,
		maxIndex: 20,
		
	})
})