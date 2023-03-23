<template>
	<view>
		<uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="info" :current="current" :mode="mode"
			:dots-styles="dotsStyles" field="content" >
			<swiper class="swiper-box" @change="change" :current="swiperDotIndex" autoplay interval='2000' circular>
				<swiper-item v-for="(item, index) in img" :key="index">
					<image :src="item" mode="widthFix" lazy-load style="width:100%;"></image>
					<!-- <view class="swiper-item" :class="'swiper-item' + index">
						<text style="color: #fff; font-size: 32px;">{{index+1}}</text>
					</view> -->
				</swiper-item>
			</swiper>
		</uni-swiper-dot>

		<view >
			<uni-section title="管理员登录" subTitle="仅限重邮计算机学院田径队使用,请输入管理员码" type="line" padding>
				<uni-easyinput prefixIcon="locked-filled" v-model="password" placeholder="请输入管理员码"
					@iconClick="iconClick">
				</uni-easyinput>

			</uni-section>
			<button class="addBtn" @click="logIn">登录</button>
			<view style="width: 140rpx;margin:0 auto;margin-top: 20rpx;">
				<!-- <uni-link href="https://uniapp.dcloud.io/" text="访客入口" color="#007aff" ></uni-link> -->
			</view>
			

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				password: '',
				img:[
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
						bottom:10,
						backgroundColor: 'rgba(83, 200, 249,0.3)',
						border: '1px rgba(83, 200, 249,0.3) solid',
						color: '#fff',
						selectedBackgroundColor: '#007AFF',
						selectedBorder: '1px #00346d solid'
					},
				swiperDotIndex: 0
			}
		},
		methods: {
			logIn() {
				// wquhfciwbnoishcjx
				if (this.password == '1') {
					uni.redirectTo({
						url: '/pages/index/index'
					});
				} else {
					uni.showToast({
						icon: 'error',
						title: '密码错误！',
						mask: true,
						duration: 1500,
						success: () => {

						}
					})
				}

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
			}


		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}

	.addBtn {
		width: 700rpx;
		color: #fff;
		background-color: #007AFF;
		font-weight: 600;
		letter-spacing: 6rpx;
	
	}

	.uni-mt-5 {
		/* margin-top: 10rpx; */
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
</style>
