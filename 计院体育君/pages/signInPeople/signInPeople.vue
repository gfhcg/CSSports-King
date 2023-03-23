<template>
	<view class="calendar-content" v-if="showCalendar">

		<!-- <uni-section title="日历" type="line"></uni-section> -->
		<view>
			<!-- 插入模式 -->
			<uni-calendar class="uni-calendar--hook" :showMonth="true" @change="change" @monthSwitch="monthSwitch" />
		</view>
		<uni-section title="运动员" type="line">
			<uni-list border-full v-for="item in signInPeople">
				<uni-list-item :title="item.studentName" :note="item.studentId" :rightText="item.studentPhone" />
			</uni-list>
			<uni-list border-full v-if="signInPeople.length==0">
				<uni-list-item title="暂无运动员签到" note=" " rightText=" " />
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
				signInPeople: [],
				date: '',
				// future:'',
			}
		},
		onReady() {
			this.$nextTick(() => {
				this.showCalendar = true
			})

			this.date = getDate(new Date()).fullDate
			/* setTimeout(() => {
				this.info.date = getDate(new Date(), -30).fullDate
				this.date=getDate(new Date()).fullDate
				// console.log(getDate(new Date()).fullDate)
				this.info.startDate = getDate(new Date(), -60).fullDate
				this.info.endDate = getDate(new Date(), 30).fullDate
				this.info.selected = [{
						date: getDate(new Date(), -3).fullDate,
						info: '打卡'
					},
					{
						date: getDate(new Date(), -2).fullDate,
						info: '签到',
						data: {
							custom: '自定义信息',
							name: '自定义消息头'
						}
					},
					{
						date: getDate(new Date(), -1).fullDate,
						info: '已打卡'
					}
				]
			}, 2000) */
			this.getSignInPeople()
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
				console.log('你点击了', e.fulldate)
				this.date = e.fulldate
				// 模拟动态打卡
				/* if (this.info.selected.length > 5) return
				this.info.selected.push({
					date: e.fulldate,
					info: '打卡'
				}) */
				// console.log(this.isFuture(this.date))
				if (this.isFuture(this.date)) {
					this.signInPeople = []
				} else {
					this.getSignInPeople()

				}

			},
			getSignInPeople() {
				uni.request({
					url: this.$BASE_URL.BASE_URL + '/administrator/signInRecord',
					method: 'GET',
					data: {
						// openId: uni.getStorageSync('openid'),
						openId: 'rtgvfedctrfgvdrtfvdsuihbcvj', //管理员
						date: this.date
					},
					success: (res) => {
						// console.log(res.data.data.signInPeople)
						if (res.data.code == 20000) {
							this.signInPeople = res.data.data.signInPeople
						}
					}
				})
			},
			confirm(e) {
				console.log('confirm 返回:', e)
			},
			monthSwitch(e) {
				console.log('monthSwitchs 返回:', e)
			},
			isFuture(str) {
				let d = new Date(str.replace(/-/g, '/'))
				let todaysDate = new Date()
				if (d.setHours(0, 0, 0, 0) > todaysDate.setHours(0, 0, 0, 0)) {
					return true
				} else {
					return false
				}
			}
		},
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
