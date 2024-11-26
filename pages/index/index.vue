<template>
	<Header />
	<view class="main">
		<ul class="main" style="">
			<navigator v-for="(item, index) in galleries" :key="index"
				:url="`/pages/gallery/gallery?link=${item.link}`">
				<li class="comic-item">
					<div class="pic-wrapper">
						<!-- <image :src="item.thumbnail" class="pic" mode="aspectFit"></image> -->
					</div>
					<view class="comic-info">
						<image class="language" :src="getIcon(item.language)" style="width: 48rpx; height: 32rpx"></image>
						<text class="title">{{ item.title }}</text>
					</view>
				</li>
			</navigator>
		</ul>
	</view>
	<Footer />
</template>

<script setup>
	// 引入组件
	import Footer from './footer.vue';
	import Header from './header.vue';

	// 
	import {
		galleries,
		getPage,
		getIcon
	} from './index.js'
	import {
		ref
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'

	onLoad(() => {
		getPage({
			page: 1,
			language: null
		})
		console.log(galleries.value);
	})
</script>

<style lang="scss">
	ul.main {
		width: 100%;
		height: calc(100vh - 200rpx);
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1em;
		padding: 1em;
		overflow: hidden;
		overflow-y: scroll;
		background-color: rgba(0, 0, 0, 1);
		color: #eee;

		li.comic-item {
			width: 100%;
			padding-top: 141.4%;
			overflow: hidden;
			position: relative;
			background-color: rgba(66, 66, 66, 1);

			.pic-wrapper {
				position: absolute;
				top: 0;
				width: 100%;
				height: 100%;

				.pic {
					width: 100%;
					height: 100%;
				}
			}

			.comic-info {
				position: absolute;
				top: 0;
				display: flex;
				width: 100%;
				height: 100%;
				flex-direction: column;
				justify-content: space-between;
				align-items: end;

				.language {
					text-align: right;
				}

				.title {
					max-height: 24%;
					width: 100%;

					&:active {
						max-height: 100%;
					}

					background-color: rgba(0, 0, 0, 0.7);
				}
			}
		}
	}
</style>