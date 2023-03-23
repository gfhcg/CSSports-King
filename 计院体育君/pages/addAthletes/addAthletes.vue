<template>
	<view>
		<view class="">
			<uni-section title="学号" type="line" padding>

				<uni-easyinput class="uni-mt-5" type="number" trim="all" v-model="studentId" placeholder="请输入学号"
					maxlength='10'>
				</uni-easyinput>
			</uni-section>

			<uni-section title="姓名" type="line" padding>

				<uni-easyinput class="uni-mt-5" type="text" trim="all" v-model="studentName" placeholder="请输入姓名">
				</uni-easyinput>
			</uni-section>
			<uni-section title="班级" type="line" padding>

				<uni-easyinput class="uni-mt-5" type="number" trim="all" v-model="studentClass" placeholder="请输入班级"
					maxlength='8'>
				</uni-easyinput>
			</uni-section>
			<uni-section title="电话" type="line" padding>

				<uni-easyinput class="uni-mt-5" type="number" trim="all" v-model="studentPhone" placeholder="请输入手机号"
					maxlength='11'>
				</uni-easyinput>
			</uni-section>
			<button class="addBtn" @click="addAthletes">添加</button>
		</view>

		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="不同意" confirmText="同意" title="授权" content="计科体育君将收集相关个人信息仅用于首次身份绑定且确保不会用于其他用途"
				@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				studentId: '',
				studentName: '',
				studentClass: '',
				studentPhone: '',
				msgType: 'success',

			};
		},
		methods: {
			addAthletes() {
				if (this.studentId.length == 10 && this.studentClass.length == 8 && this.studentPhone.length == 11) {
					uni.request({
						url: this.$BASE_URL.BASE_URL + '/administrator/addAthletes',
						method: 'POST',
						data: {
							studentId: this.studentId,
							studentName: this.studentName,
							studentClass: this.studentClass,
							studentPhone: this.studentPhone
						},
						success: (res) => {
							if (res.data.code == 20000) {
								uni.showToast({
									icon: 'success',
									title: '添加成功！',
									mask: true,
									duration: 1500,
									success: () => {}
								})
								setTimeout(() => {
									this.studentId = ''
									this.studentName = ''
									this.studentClass = ''
									this.studentPhone = ''
								})

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
				} else {
					uni.showToast({
						icon: 'error',
						title: '信息有误！',
						mask: true,
						duration: 1500,
						success: () => {}
					})
				}
				/* 	if (this.studentId == '' || this.studentName == '' || this.studentClass == '' || this.studentPhone == '') {
						uni.showToast({
							icon: 'error',
							title: '不能为空！',
							mask: true,
							duration: 1500,
							success: () => {}
						})
					} else if (this.studentId.length != 10 || this.studentName.length == 1 || this.studentClass != 8 || this
						.studentPhone.length != 11) {
						uni.showToast({
							icon: 'error',
							title: '信息有误！',
							mask: true,
							duration: 1500,
							success: () => {}
						})
					} else {
						
					} */

			},
			dialogConfirm() {
				console.log('点击确认')
				// this.messageText = `点击确认了 ${this.msgType} 窗口`
				// this.$refs.message.open()
			},
			dialogClose() {
				// console.log('点击关闭')
				uni.navigateBack({
					delta: 1
				});
			},
			dialogToggle(type) {
				this.msgType = type
				this.$refs.alertDialog.open()
			},
		},
		mounted() {
			this.dialogToggle('error');
		}
	}
</script>

<style lang="scss">
	.uni-mt-5 {
		margin-top: 5px;
	}

	.addBtn {
		width: 700rpx;
		color: #fff;
		background-color: #007AFF;
		font-weight: 600;
		letter-spacing: 6rpx;
	}
</style>
