<template>
	<view>

		<uni-indexed-list :options="list" :showSelect="showSelect" @click="bindClick"></uni-indexed-list>
		<view class="subBtn" @click="subSign" v-if="signState==1">
			签到
		</view>
		<view class="hasSign" @click="hasSign">
			{{signState==1 ? '已':'未'}}签
		</view>

		<!-- <uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
			:direction="direction" @trigger="trigger" @fabClick="fabClick" /> -->
		<w-loading text=" " mask="true" click="true" ref="loading"></w-loading>
	</view>
</template>

<script>
	import {
		getList
	} from '@/common/athletes.js'
	export default {
		data() {
			return {
				showSelect:true,
				signState: 1,
				list: [],
				rowArr: [],
				select: [],
				tempArr: [],
				stuNumber: [],
				title: 'uni-fab',
				directionStr: '垂直',
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'horizontal',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF',
					iconColor: '#fff'
				},
				is_color_type: false,
				content: [{
						iconPath: '/static/image.png',
						selectedIconPath: '/static/image-active.png',
						text: '相册',
						active: false
					},
					{
						iconPath: '/static/home.png',
						selectedIconPath: '/static/home-active.png',
						text: '首页',
						active: false
					},
					{
						iconPath: '/static/star.png',
						selectedIconPath: '/static/star-active.png',
						text: '收藏',
						active: false
					}
				]

			};
		},
		onBackPress() {
			if (this.$refs.fab.isShow) {
				this.$refs.fab.close()
				return true
			}
			return false
		},

		methods: {
			bindClick(e) {
				console.log(e.select)
				this.select = e.select
				// console.log('点击item，返回数据' + JSON.stringify(e))
				// this.list
			},
			subSign() {
				if (this.select.length == 0) {
					uni.showToast({
						icon: 'error',
						title: '未勾选运动员！',
						mask: true,
						duration: 1500,
						success: () => {
						}
					})
				} else {
					this.$refs.loading.open()
					this.getStuNumber()
					setTimeout(() => {
						uni.request({
							url: this.$BASE_URL.BASE_URL + '/administrator/signIn',
							method: 'POST',
							data: {
								openId: uni.getStorageSync('openid'),
								signInPeople: JSON.parse(JSON.stringify(this.stuNumber))
							},
							success: (res) => {
								// console.log(res)
								if (res.data.code == 20000) {
									// setTimeout(()=>{})
									uni.showToast({
										icon: 'success',
										title: '签到成功！',
										mask: true,
										duration: 1500,
										success: () => {
											this.$refs.loading.close()
											setTimeout(() => {
												/**
												 * @author ETtian
												 * @description 得到未选择所有元素
												 */

												for (let i = 0; i < this.list
													.length; i++) {
													this.list[i].data = this.list[
														i].data.filter(
													item => {
														return this.select
															.find(it => {
																return it
																	.name ==
																	item
															}) == null
													})
												}
												console.log(this.list)
											}, 1500)
										}
									})


								} else {
									uni.showToast({
										icon: 'error',
										title: '网络错误！',
										mask: true,
										duration: 1500,
										success: () => {
											this.$refs.loading.close()

										}
									})
								}
							},
							fail() {
								uni.showToast({
									icon: 'error',
									title: '网络错误！',
									mask: true,
									duration: 1500,
									success: () => {
										this.$refs.loading.close()
									}
								})
							}
						})
					}, 1500)
				}


			},
			getStuNumber() {
				for (let i = 0; i < this.select.length; i++) {
					let temp = this.select[i].name.split('-')
					this.stuNumber.push(temp[1])
				}
			},
			hasSign() {
				this.$refs.loading.open()
				if (this.signState == 1) {
					this.list = getList(2)
					this.signState = 0
					this.showSelect=false
					setTimeout(() => {
						this.$refs.loading.close()
					}, 1500)
				} else {
					this.list = getList(1)
					this.signState = 1
					this.showSelect=true
					setTimeout(() => {
						this.$refs.loading.close()
					}, 1500)
				}
			}


		},
		mounted() {
			// console.log(getList())
			this.$refs.loading.open()
			this.list = getList(1)
			setTimeout(() => {
				this.$refs.loading.close()
			}, 1500)

		},
		onPullDownRefresh() {
			// this.$refs.loading.open()
			this.list = getList(1)

			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 2000);
		},
	}
</script>

<style lang="scss">
	$uni-shadow-base:0 1px 5px 2px rgba($color: #000000, $alpha: 0.3) !default;

	.subBtn {
		width: 130rpx;
		height: 130rpx;
		font-size: 36rpx;
		font-weight: 600;
		color: azure;
		background-color: #007AFF;
		border-radius: 50%;
		position: fixed;
		bottom: 250rpx;
		left: 540rpx;
		z-index: 999;
		text-align: center;
		line-height: 130rpx;
		box-shadow: $uni-shadow-base;
	}

	.hasSign {
		width: 130rpx;
		height: 130rpx;
		font-size: 36rpx;
		font-weight: 600;
		color: azure;
		background-color: #007AFF;
		border-radius: 50%;
		position: fixed;
		bottom: 80rpx;
		left: 540rpx;
		z-index: 999;
		text-align: center;
		line-height: 130rpx;
		box-shadow: $uni-shadow-base;
	}
</style>
