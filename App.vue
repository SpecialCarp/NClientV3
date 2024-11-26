<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import url("https://at.alicdn.com/t/c/font_4759663_m9ibnquhtpi.css");
	/*每个页面公共css */
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	li {
		/* 确保li的圆点不显示 */
		list-style: none;
	}
</style>