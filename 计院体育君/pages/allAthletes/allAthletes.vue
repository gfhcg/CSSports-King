<template>
	<view>

		<uni-indexed-list :options="list" :showSelect="false" @click="bindClick">

		</uni-indexed-list>


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
				list: [],
				rowArr: [],
				select: [],
				tempArr: [],
				stuNumber: [],
				rowArr:[],
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
				// console.log(e.item.name.split('-'))
				let temp = e.item.name.split('-')
				// console.log(temp[1])
				let item = this.rowArr.find(item => {
					return item.student_id == temp[1]
				})
				this.callAthletes(item.student_phone)
				console.log(item.student_phone)
			},
			callAthletes(phoneNumber) {
				uni.makePhoneCall({
					phoneNumber: phoneNumber
				});
			},
			getRowArr() {
				uni.request({
					url: this.$BASE_URL.BASE_URL + '/administrator/allAthletes?state=0',
					method: 'GET',
					success: (res) => {
						if (res.data.code == 20000) {
							this.rowArr = res.data.data
						} else {
							uni.showToast({
								icon: 'error',
								title: '网络错误！',
								mask: true,
								duration: 1500,
								success: () => {}
							})
						}
					},
					fail() {
						uni.showToast({
							icon: 'error',
							title: '网络错误！',
							mask: true,
							duration: 1500,
							success: () => {}
						})

					}
				})
			}


		},
		mounted() {
			this.$refs.loading.open()
			this.getRowArr()
			this.list = getList(0)
			setTimeout(() => {
				this.$refs.loading.close()
			}, 1500)

		},
		onPullDownRefresh() {
			// this.$refs.loading.open()
			this.list = getList(0)

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
		position: sticky;
		bottom: 0rpx;
		left: 540rpx;
		z-index: 999;
		text-align: center;
		line-height: 130rpx;
		box-shadow: $uni-shadow-base;
	}
</style>
