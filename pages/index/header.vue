<template>
	<header :style="{ height: headerHeight, backgroundColor: props.backgroundColor }" style="display: flex; justify-content: space-between; padding: 0 1em">
		<view class="" style="display: flex; height: 100%; align-items: center">
			<uni-icons type="bars" size="30" color="#bfbfbf" @click="drawer.open()"></uni-icons>
			<text style="font-size: 45rpx; color: #fff; margin-left: 1em">NClientV3</text>
		</view>
		<view class="" style="display: flex; height: 100%; align-items: center">
			<uni-icons style="margin-left: 0.4em" type="search" size="30" color="#fff"></uni-icons>
			<uni-icons style="margin-left: 0.4em" custom-prefix="iconfont" :size="30" :type="`icon-language-${language.get()}`" color="#fff" @click="language.next()"></uni-icons>
			<uni-icons style="margin-left: 0.4em" fontFamily="iconfont" :size="30" color="#fff">{{ '\ue8cb' }}</uni-icons>
		</view>
	</header>
	<uni-drawer ref="drawer" mode="left" :width="320">
		<view class="close">
			<button @click="drawer.close()"><text class="word-btn-white">关闭Drawer</text></button>
		</view>
	</uni-drawer>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';

const props = defineProps({
	height: {
		type: [Number, String],
		default: '120rpx'
	},
	backgroundColor: {
		type: String,
		default: '#282828'
	}
});

const drawer = ref(null);

const language = ref({
	index: 0,
	value: ['unknown', 'chinese', 'english', 'japanese'],
	next() {
		this.index < 3 ? this.index++ : (this.index = 0);
	},
	get() {
		return this.value[this.index];
	}
});

const headerHeight = computed(() => (typeof props.height === 'string' ? props.height : props.height + 'px'));
</script>

<style lang="scss">
@font-face {
	font-family: 'iconfont'; /* Project id 4759663 */
	src: url('data:application/x-font-woff2;charset=utf-8;base64,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')
			format('woff2'),
		url('//at.alicdn.com/t/c/font_4759663_khktmvtx5j.woff?t=1732590643262') format('woff'),
		url('//at.alicdn.com/t/c/font_4759663_khktmvtx5j.ttf?t=1732590643262') format('truetype'),
		url('//at.alicdn.com/t/c/font_4759663_khktmvtx5j.svg?t=1732590643262#iconfont') format('svg');
}

header {
	width: 100%;
}
</style>
