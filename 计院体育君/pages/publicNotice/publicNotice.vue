<template>
	<view>
		<!-- <uni-section :title="'日期范围用法：' + '[' + range + ']'" type="line"></uni-section> -->
		<view class="example-body">
			
				
				<view class="week">
					
					<!-- <uni-icons type="calendar-filled" size="25" color="#007AFF"></uni-icons> -->
					{{range[0]+" —— "+range[1]}}
				</view>
					
		
			<!-- <uni-datetime-picker v-model="range" type="daterange" show="false" /> -->
		</view>

		<view class="changeWeek">
			<button class="lastWeek" @click="lastWeekStudent">
				<uni-icons type="back" size="30" color="#9e9e9e"></uni-icons>
			</button>
			<button class="nextWeek" @click="nextWeekStudent" :disabled="btnDisable">
				<uni-icons type="forward" size="30" color="#9e9e9e"></uni-icons>
			</button>
		</view>

		<uni-section title="运动员" type="line">
			<uni-list border-full v-for="item in students">
				<uni-list-item :title="item.studentName" :note="item.studentId" :rightText="item.nums" />
			</uni-list>
		</uni-section>
		<w-loading text=" " mask="true" click="true" ref="loading"></w-loading>
	</view>
</template>

<script>
	/**
	 * 获取任意时间
	 */
	function getDate(date, AddDayCount ) {
		if (!date) {
			date = new Date()
		}
		if (typeof date !== 'object') {
			date = date.replace(/-/g, '/')
		}
		const dd = new Date(date)

		dd.setDate(dd.getDate() - AddDayCount) // 获取AddDayCount天后的日期
		
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
				current: 3,
				total: 10,
				pageSize: 10,
				single: '',
				datetimesingle: '',
				range: [0, 0],
				datetimerange: [],
				start: '',
				end:' ',
				week: 0,
				students: [],
				btnDisable: true,
			}
		},
		watch: {
			datetimesingle(newval) {
				console.log('单选:', this.datetimesingle);
			},
			range(newval) {
				console.log('范围选:', this.range);
			},
			datetimerange(newval) {
				console.log('范围选:', this.datetimerange);
			}
		},
		mounted() {
			this.$refs.loading.open()
			this.range[1]=getDate(new Date(),0).fullDate
			this.end=this.range[1]
			if(getDate(new Date()).day==0){
				this.range[0]=getDate(new Date(),6).fullDate
				this.start=this.range[0]
			}else{
				let n=getDate(new Date(),0).day-1
				this.range[0]=getDate(new Date(),n).fullDate
				this.start=this.range[0]
			}
			
			// console.log(getDate(new Date(),0).day)
			// console.log(getDate(new Date(),0).fullDate)
			setTimeout(() => {
				this.current = 5
			}, 3000)

			setTimeout(() => {
				this.datetimesingle = Date.now() - 2 * 24 * 3600 * 1000
				this.single = '2021-2-12'
				this.datetimerange = ["2021-07-08 0:01:10", "2021-08-08 23:59:59"]
			}, 3000)
			this.getStudentInfo(this.week)
		},
		methods: {
			add() {
				this.total += 10
			},
			reset() {
				this.total = 0
				this.current = 1
			},
			change(e) {
				console.log(e)
				this.current = e.current
			},

			weekChange(e) {
				this.single = e
				console.log('change事件:', this.single = e);
			},
			changeLog(e) {
				console.log('change事件:', e);
			},
			maskClick(e) {
				console.log('maskClick事件:', e);
			},
			lastWeekStudent() {
				// this.$refs.loading.open()
				this.week--;
				this.end=getDate(this.start,1).fullDate 
				this.start=getDate(this.start,7).fullDate
				this.range[0]=this.start
				this.range[1]=this.end
				this.getStudentInfo(this.week);
				this.btnDisable=this.week<0 ? false : true
			},
			nextWeekStudent() {
				// this.$refs.loading.open()
				this.start=getDate(this.end,-1).fullDate
				if(this.isFuture(getDate(this.end,-7).fullDate)){
					this.end=getDate(new Date(),0).fullDate
				}else{
					this.end=getDate(this.end,-7).fullDate 
				}
				this.range[0]=this.start
				this.range[1]=this.end
				this.week++;
				this.getStudentInfo(this.week);
				this.btnDisable=this.week<0 ? false : true

			},
			getStudentInfo(week) {
				uni.request({
					url: this.$BASE_URL.BASE_URL + '/common/publicNotice?week=' + week,
					method: 'GET',
					success: (res) => {
						console.log(res)
						setInterval(()=>{
							this.$refs.loading.close()
						},1500)
						if (res.data.code == 20000) {
							this.students = res.data.data
						}else{
							uni.showToast({
								icon: 'error',
								title: '网络错误！',
								mask: true,
								duration: 1500,
								success: () => {
									setInterval(()=>{
										this.$refs.loading.close()
									},1500)
									
								}
							})
						}
					}
				})
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
		}
	}
</script>

<style lang="scss">
	.example-body {
		background-color: #fff;
		padding: 10px;
		.week{
			uni-icons{
				margin:0 auto;
			}
			height: 60rpx;
			line-height: 60rpx;
			// background-color: #aaaaff;
			margin-left: 50rpx;
			margin:0 auto;
			color: #007AFF;
			font-weight: 600;
			text-align: center;
			
		}
	
	}

	.changeWeek {
		button {
			width: 374rpx;
			height: 70rpx;
			color: #fff;
			background-color: #ececec;
			font-weight: 600;
			letter-spacing: 6rpx;
			line-height: 70rpx;
		}

		.lastWeek {
			float: left;
		}

		.nextWeek {
			float: right;
		}
	}
</style>
