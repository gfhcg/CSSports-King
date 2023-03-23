<template>
	<page-meta :page-style="'overflow:'+(show?'hidden':'visible')"></page-meta>
	<view class="container">
		<uni-notice-bar show-icon scrollable text="问题反馈(QQ群号:588045950)" />
		<uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="info" :current="current" :mode="mode"
			:dots-styles="dotsStyles" field="content">
			<swiper class="swiper-box" @change="change" :current="swiperDotIndex" autoplay interval='2000' circular>
				<swiper-item v-for="(item, index) in img" :key="index">
					<image :src="item" mode="widthFix" lazy-load style="width:100%;"></image>
					<!-- <view class="swiper-item" :class="'swiper-item' + index">
						<text style="color: #fff; font-size: 32px;">{{index+1}}</text>
					</view> -->
				</swiper-item>
			</swiper>
		</uni-swiper-dot>

		<uni-card title="训练公示" sub-title=" " extra=">" :thumbnail="publicNotice" @click="goToPublicNotice">
			<text class="uni-body">每周训练次数公示</text>
		</uni-card>

		<uni-card v-if="role==0" title="签到" sub-title=" " extra=">" :thumbnail="signIn" @click="goToSingIn">
			<text class="uni-body">进行每日训练签到</text>
		</uni-card>

		<uni-card v-if="role==0" title="添加运动员" sub-title=" " extra=">" :thumbnail="addAthletes"
			@click="goToAddAthletes">
			<text class="uni-body">添加需要签到的运动员</text>
		</uni-card>

		<uni-card v-if="role==0" title="运动员" sub-title=" " extra=">" :thumbnail="allAthletes" @click="goToAllAthletes">
			<text class="uni-body">查看所有运动员</text>
		</uni-card>

		<uni-card v-if="role==0" title="签到记录" sub-title=" " extra=">" :thumbnail="log" @click="goToSignInPeople">
			<text class="uni-body">查看所有运动员的签到记录</text>
		</uni-card>

		<uni-card v-if="role==1" title="签到记录" sub-title=" " extra=">" :thumbnail="log" @click="goToSignInRecord">
			<text class="uni-body">查看自己的签到记录</text>
		</uni-card>

		<uni-card title="比赛报名" sub-title=" " extra=">" :thumbnail="sport" @click="goToHonour">
			<text class="uni-body">报名近期赛事</text>
		</uni-card>

		<uni-card title="计科荣耀" sub-title=" " extra=">" :thumbnail="trophy" @click="goToHonour">
			<text class="uni-body">忆往昔峥嵘岁月</text>
		</uni-card>

		<uni-popup ref="popup" background-color="#fff" @change="propupChange" :is-mask-click="false">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<!-- <text class="text">popup 内容</text> -->
				<uni-title type="h2" title="首次绑定" align="center"></uni-title>
				<uni-section title="身份" type="line" padding>
					<uni-data-select v-model="selectValue" :localdata="range" @change="selectChange"
						placeholder="请选择身份"></uni-data-select>
				</uni-section>

				<uni-section title="昵称" type="line" padding>
					<uni-easyinput prefixIcon="heart-filled" v-model="nickName" placeholder="请输入昵称"
						@iconClick="iconClick" type="text" maxlength="8">
					</uni-easyinput>
				</uni-section>

				<uni-section title="学号" type="line" padding>
					<uni-easyinput prefixIcon="person-filled" v-model="studentId" placeholder="请输入学号"
						@iconClick="iconClick" type="number" maxlength="10">
					</uni-easyinput>
				</uni-section>

				<uni-section title="手机号" type="line" padding>
					<uni-easyinput prefixIcon="phone-filled" v-model="studentPhone" placeholder="请输入手机号"
						@iconClick="iconClick" type="number" maxlength="11">
					</uni-easyinput>
				</uni-section>

				<!-- <view class="captcha">
						<uni-easyinput prefixIcon="locked-filled" v-model="captcha" placeholder="请输入验证码"
							@iconClick="iconClick">
						</uni-easyinput>
						<button class="getCaptcha">获取验证码</button>
					</view> -->

				<button class="bindBtn" @click="bind">绑定</button>
				</uni-section>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				role: -1,
				nickName: '',
				studentId: '',
				studentPhone: '',
				signIn: 'https://gfhcg-blog.oss-cn-shanghai.aliyuncs.com/%E8%AE%A1%E9%99%A2%E4%BD%93%E8%82%B2%E5%90%9B/signIn.png',
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				addAthletes: 'https://gfhcg-blog.oss-cn-shanghai.aliyuncs.com/%E8%AE%A1%E9%99%A2%E4%BD%93%E8%82%B2%E5%90%9B/addAthletes.png',
				allAthletes: 'https://gfhcg-blog.oss-cn-shanghai.aliyuncs.com/%E8%AE%A1%E9%99%A2%E4%BD%93%E8%82%B2%E5%90%9B/athletes.png',
				trophy: 'https://gfhcg-blog.oss-cn-shanghai.aliyuncs.com/%E8%AE%A1%E9%99%A2%E4%BD%93%E8%82%B2%E5%90%9B/trophy.png',
				sport: 'https://gfhcg-blog.oss-cn-shanghai.aliyuncs.com/%E8%AE%A1%E9%99%A2%E4%BD%93%E8%82%B2%E5%90%9B/sport.png',
				publicNotice:'https://gfhcg-blog.oss-cn-shanghai.aliyuncs.com/%E8%AE%A1%E9%99%A2%E4%BD%93%E8%82%B2%E5%90%9B/publicNotice.png',
				log: 'https://gfhcg-blog.oss-cn-shanghai.aliyuncs.com/%E8%AE%A1%E9%99%A2%E4%BD%93%E8%82%B2%E5%90%9B/log.png',
				img: [
					'https://gfhcg-blog.oss-cn-shanghai.aliyuncs.com/%E8%AE%A1%E9%99%A2%E4%BD%93%E8%82%B2%E5%90%9B/swiper_img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202303120914385.jpg',
					'https://gfhcg-blog.oss-cn-shanghai.aliyuncs.com/%E8%AE%A1%E9%99%A2%E4%BD%93%E8%82%B2%E5%90%9B/swiper_img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202303120914381.jpg',
					'https://gfhcg-blog.oss-cn-shanghai.aliyuncs.com/%E8%AE%A1%E9%99%A2%E4%BD%93%E8%82%B2%E5%90%9B/swiper_img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202303120914382.jpg',
					'https://gfhcg-blog.oss-cn-shanghai.aliyuncs.com/%E8%AE%A1%E9%99%A2%E4%BD%93%E8%82%B2%E5%90%9B/swiper_img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202303120914383.jpg',
					'https://gfhcg-blog.oss-cn-shanghai.aliyuncs.com/%E8%AE%A1%E9%99%A2%E4%BD%93%E8%82%B2%E5%90%9B/swiper_img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230312091438.jpg',
				],
				info: [{
						colorClass: 'uni-bg-red',
						url: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
						content: '内容 A'
					},
					{
						colorClass: 'uni-bg-green',
						url: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
						content: '内容 B'
					},
					{
						colorClass: 'uni-bg-blue',
						url: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
						content: '内容 C'
					},
					{
						colorClass: 'uni-bg-blue',
						url: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
						content: '内容 C'
					},
					{
						colorClass: 'uni-bg-blue',
						url: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
						content: '内容 C'
					}
				],
				dotStyle: [{
						backgroundColor: 'rgba(0, 0, 0, .3)',
						border: '1px rgba(0, 0, 0, .3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
						selectedBorder: '1px rgba(0, 0, 0, .9) solid'
					},
					{
						backgroundColor: 'rgba(255, 90, 95,0.3)',
						border: '1px rgba(255, 90, 95,0.3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
						selectedBorder: '1px rgba(255, 90, 95,0.9) solid'
					},
					{
						backgroundColor: 'rgba(83, 200, 249,0.3)',
						border: '1px rgba(83, 200, 249,0.3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
						selectedBorder: '1px rgba(83, 200, 249,0.9) solid'
					}
				],
				modeIndex: -1,
				styleIndex: -1,
				current: 0,
				mode: 'default',
				dotsStyles: {
					bottom: 10,
					backgroundColor: 'rgba(83, 200, 249,0.3)',
					border: '1px rgba(83, 200, 249,0.3) solid',
					color: '#fff',
					selectedBackgroundColor: '#007AFF',
					selectedBorder: '1px #00346d solid'
				},
				swiperDotIndex: 0,
				selectValue: "",
				range: [{
						value: 0,
						text: "我是管理员"
					},
					{
						value: 1,
						text: "我是运动员"
					},
					{
						value: 2,
						text: "我是访客"
					},
				],
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				studentId: '',
				studentPhone: '',
				captcha: ''
			}
		},
		methods: {
			goToPublicNotice(){
				uni.navigateTo({
					url: '/pages/publicNotice/publicNotice'
				});
			},
			goToSingIn() {
				uni.navigateTo({
					url: '/pages/signIn/signIn'
					// url: '/pages/test/test'
				});
			},
			goToAddAthletes() {
				uni.navigateTo({
					url: '/pages/addAthletes/addAthletes'
				});
			},
			goToAllAthletes() {
				uni.navigateTo({
					url: '/pages/allAthletes/allAthletes'
				});
			},
			goToSignInPeople() {
				uni.navigateTo({
					url: '/pages/signInPeople/signInPeople'
				});
			},
			goToSignInRecord() {
				uni.navigateTo({
					url: '/pages/signInRecord/signInRecord'
				});
			},
			goToHonour() {
				uni.showToast({
					icon: 'error',
					title: '敬请期待',
					mask: true,
					duration: 1500,
					success: () => {

					}
				})
			},
			getUserProfile() {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						// console.log(res)
						uni.setStorageSync('code', res.code);

						uni.request({
							url: this.$BASE_URL.BASE_URL + '/openId?code=' + uni.getStorageSync(
								'code'),
							method: 'GET',
							success: (res) => {
								// console.log(res)
								// console.log(res.data.openid)
								if (res.errMsg == "request:ok") {
									console.log(res.data.openid)
									uni.setStorageSync('openid', res.data.openid);
									// console.log(uni.getStorageSync('openid'))
									this.recognize()
								}
								// 获取用户信息
								/* uni.getUserInfo({
									provider: 'weixin',
									success: function(infoRes) {
										console.log('用户昵称为：' + infoRes.userInfo
											.nickName);
									}
								}); */
							}
						})
					}
				})


			},
			change(e) {
				this.current = e.detail.current
				// console.log(e.detail.current)
			},
			selectStyle(index) {
				this.dotsStyles = this.dotStyle[index]
				this.styleIndex = index
			},
			selectMode(mode, index) {
				this.mode = mode
				this.modeIndex = index
				this.styleIndex = -1
				this.dotsStyles = this.dotStyle[0]
			},
			clickItem(e) {
				this.swiperDotIndex = e
			},
			onBanner(index) {
				console.log(22222, index);
			},
			propupChange(e) {
				this.show = e.show
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			selectChange(e) {
				this.role = e
				console.log("e:", e);
			},
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			//用户首次绑定
			bind() {
				// this.$refs.popup.close()
				if (this.studentId.length == 10 && this.studentPhone.length == 11 && this.role != -1 && this.nickName
					.length != 0) {
					uni.request({
						url: this.$BASE_URL.BASE_URL + '/role/bind',
						method: 'POST',
						data: {
							openId: uni.getStorageSync('openid'),
							// openId:'rtgvfedctrfgvdrtfvacasd',//运动员
							// openId:'rtgvfedctrfgvdrtfvdsuihbcvj',//管理员
							studentId: this.studentId,
							nickName: this.nickName,
							studentPhone: this.studentPhone,
							role: this.role
						},
						success: (res) => {
							console.log(res)
							uni.setStorageSync('studentId', this.studentId);
							if (res.data.code == 20000) {
								this.$refs.popup.close()
							} else if (res.data.code == 20003) {
								uni.showToast({
									icon: 'error',
									title: '绑定失败!',
									mask: true,
									duration: 1500,
									success: () => {}
								})
							} else if (res.data.code == 20002) {
								uni.showToast({
									icon: 'error',
									title: '已被绑定!',
									mask: true,
									duration: 1500,
									success: () => {}
								})
							}
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

			},
			recognize() {
				uni.request({
					url: this.$BASE_URL.BASE_URL + '/role/recognize',
					method: 'POST',
					data: {
						openId: uni.getStorageSync('openid'),
						// openId:'rtgvfedctrfgvdrtfvacasd',//运动员
						// openId:'rtgvfedctrfgvdrtfvdsuihbcv55555j',//管理员
					},
					success: (res) => {
						console.log(res)
						if (res.data.code == 20000) {
							this.role = res.data.data.role
							uni.setStorageSync('studentId', res.data.data.role);
							console.log(this.role)
							if (res.data.data.role == -1) {
								this.toggle('center')
							}
						}
					}
				})
			}




		},
		mounted() {
			this.getUserProfile()
		}
	}
</script>

<style lang="scss">
	.container {
		/* padding: 20px; */
		font-size: 14px;
		line-height: 24px;
	}

	.swiper-box {
		height: 480rpx;
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 200px;
		color: #fff;
	}

	.swiper-item0 {
		background-color: #a1c9fd;
	}

	.swiper-item1 {
		background-color: #66a0f7;
	}

	.swiper-item2 {
		background-color: #007aff;
	}

	.swiper-item3 {
		background-color: #66a0f7;
	}

	.swiper-item4 {
		background-color: #007aff;
	}

	.swiper-item5 {
		background-color: #007aff;
	}

	.image {
		width: 750rpx;
	}

	/* #ifndef APP-NVUE */
	::v-deep .image img {
		-webkit-user-drag: none;
		-khtml-user-drag: none;
		-moz-user-drag: none;
		-o-user-drag: none;
		user-drag: none;
	}

	/* #endif */

	@media screen and (min-width: 500px) {
		.uni-swiper-dot-box {
			width: 400px;
			margin: 0 auto;
			margin-top: 8px;
		}

		.image {
			width: 100%;
		}
	}

	.uni-bg-red {
		background-color: #ff5a5f;
	}

	.uni-bg-green {
		background-color: #09bb07;
	}

	.uni-bg-blue {
		background-color: #007aff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 20rpx;
	}

	.example-body-item {

		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 15rpx;
		padding: 15rpx;
		height: 60rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		padding: 0 15rpx;
		/* #endif */
		flex: 1;
		border-color: #e5e5e5;
		border-style: solid;
		border-width: 1px;
		border-radius: 5px;
	}

	.example-body-item-text {
		font-size: 28rpx;
		color: #333;
	}

	.example-body-dots {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50px;
		background-color: #333333;
		margin-left: 10rpx;
	}

	.active {
		border-style: solid;
		border-color: #007aff;
		border-width: 1px;
	}

	@mixin flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	@mixin height {
		/* #ifndef APP-NVUE */
		height: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
	}

	.box {
		@include flex;
	}

	.button {
		@include flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		height: 35px;
		margin: 0 5px;
		border-radius: 5px;
	}

	.example-body {
		background-color: #fff;
		padding: 10px 0;
	}

	.button-text {
		color: #fff;
		font-size: 12px;
	}

	.popup-content {
		// @include flex;
		// align-items: center;
		// justify-content: center;
		width: 600rpx;
		padding: 15px;
		height: 1050rpx;
		background-color: #fff;
	}

	.popup-height {
		@include height;
		width: 200px;
	}

	.text {
		font-size: 12px;
		color: #333;
	}

	/* 	.popup-success {
		color: #fff;
		background-color: #e1f3d8;
	}

	.popup-warn {
		color: #fff;
		background-color: #faecd8;
	}

	.popup-error {
		color: #fff;
		background-color: #fde2e2;
	}

	.popup-info {
		color: #fff;
		background-color: #f2f6fc;
	}

	.success-text {
		color: #09bb07;
	}

	.warn-text {
		color: #e6a23c;
	}

	.error-text {
		color: #f56c6c;
	}

	.info-text {
		color: #909399;
	}

	.dialog,
	.share {
		/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	}

	.dialog-box {
		padding: 10px;
	}

	.dialog .button,
	.share .button {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		margin: 0;
		margin-top: 10px;
		padding: 3px 0;
		flex: 1;
	}

	.dialog-text {
		font-size: 14px;
		color: #333;
	}

	*/ .captcha {
		margin-top: 10rpx;
		// width: 300rpx;
		@include flex;
	}

	.getCaptcha {
		width: 220rpx;
		height: 72rpx;
		color: #fff;
		background-color: #007aff;
		/* position: absolute;
		right: 60rpx;
		bottom: 230rpx; */
		line-height: 72rpx;
		font-size: 28rpx;
		letter-spacing: 2rpx;
		margin-left: 10rpx;
	}

	.bindBtn {
		color: #fff;
		background-color: #007aff;
		margin-top: 20rpx;
		height: 80rpx;
		line-height: 80rpx;
		letter-spacing: 4rpx;
		font-weight: 600;
	}
</style>
