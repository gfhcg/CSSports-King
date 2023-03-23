<template>
	<view class="calendar-content" v-if="showCalendar">

		<uni-section title="签到记录" type="line"></uni-section>
		<view>
			<!-- 插入模式 -->
			<uni-calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="true" @change="change"
				@monthSwitch="monthSwitch" />
		</view>
		<uni-section title="总签到次数" type="line">
			<uni-list border-full >
				<uni-list-item :title="total" note=" " rightText=" " />
			</uni-list>
		</uni-section>
		
	</view>
</template>


<script>
	/**
	 * 获取任意时间
	 */
	function getDate(date, AddDayCount = 0) {
		if (!date) {
			date = new Date()
		}
		if (typeof date !== 'object') {
			date = date.replace(/-/g, '/')
		}
		const dd = new Date(date)

		dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期

		const y = dd.getFullYear()
		const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
		const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
		return {
			fullDate: y + '-' + m + '-' + d,
			year: y,
			month: m,
			date: d,
			day: dd.getDay()
		}
	}
	export default {
		components: {},
		data() {
			return {
				showCalendar: false,
				info: {
					lunar: true,
					range: true,
					insert: false,
					selected: []
				},
				total:''
			}
		},
		onReady() {
			this.$nextTick(() => {
				this.showCalendar = true
			})
			
			uni.request({
				url: this.$BASE_URL.BASE_URL + '/athlete/signInRecord',
				method: 'GET',
				data:{
					// openId: uni.getStorageSync('openid'),
					openId:'rtgvfedctrfgvdrtfvacasd',//运动员
					// studentId:uni.getStorageSync('studentId')
					studentId:2021211964
				},
				success: (res) => {
					console.log(res)
					if (res.data.code == 20000) {
						this.info.selected=res.data.data.signInRecord
						this.total=res.data.data.signInRecord.length+'次'
					}
				}
			})
			
			
			
			
			
			
			// TODO 模拟请求异步同步数据
			setTimeout(() => {
				this.info.date = getDate(new Date(), -30).fullDate
				this.info.startDate = getDate(new Date(), -60).fullDate
				this.info.endDate = getDate(new Date(), 30).fullDate
			/* 	this.info.selected = [{
						date: getDate(new Date(), -3).fullDate,
						info: '已签到'
					},
					{
						date: getDate(new Date(), -2).fullDate,
						info: '已签到',
						data: {
							custom: '自定义信息',
							name: '自定义消息头'
						}
					},
					{
						date: getDate(new Date(), -1).fullDate,
						info: '已签到'
					},
					{
						date: '2023-03-01',
						info: '已签到'
					},
					{
						date: '2023-02-22',
						info: '已签到'
					}
				] */
			}, 500)
		},
		methods: {
			open() {
				this.$refs.calendar.open()
			},
			close() {
				console.log('弹窗关闭');
			},
			change(e) {
				console.log('change 返回:', e)
				// 模拟动态打卡
			/* 	if (this.info.selected.length > 5) return
				this.info.selected.push({
					date: e.fulldate,
					info: '打卡'
				}) */
			},
			confirm(e) {
				console.log('confirm 返回:', e)
			},
			monthSwitch(e) {
				console.log('monthSwitchs 返回:', e)
			}
		}
	}
</script>



<style lang="scss">
	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.calendar-button {
		flex: 1;
		font-weight: bold;
		font-size: 32rpx;
	}
</style>
