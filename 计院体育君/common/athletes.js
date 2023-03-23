import {
	pinyin
} from 'pinyin-pro';

export function getList(state){
	let row=[];
	let rowArr=[];
	let athletes = [];
	uni.request({
		url: 'https://gfhcg.com:8081/api/administrator/allAthletes?state='+state,
		method: 'GET',
		success: (res) => {
			// console.log(res)
			if (res.data.code == 20000) {
				row = res.data.data
				for (let i = 0; i < res.data.data.length; i++) {
					athletes.push(res.data.data[i].student_name+'-'+res.data.data[i].student_id)
					// +'-'+res.data.data[i].student_phone
				}
				// console.log(athletes)
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
	let list = [{
		'letter': 'A',
		'data': []
	}, {
		'letter': 'B',
		'data': []
	}, {
		'letter': 'C',
		'data': []
	}, {
		'letter': 'D',
		'data': []
	}, {
		'letter': 'E',
		'data': []
	}, {
		'letter': 'F',
		'data': []
	}, {
		'letter': 'G',
		'data': []
	}, {
		'letter': 'H',
		'data': []
	}, {
		'letter': 'I',
		'data': []
	}, {
		'letter': 'J',
		'data': []
	}, {
		'letter': 'K',
		'data': []
	}, {
		'letter': 'L',
		'data': []
	}, {
		'letter': 'M',
		'data': []
	}, {
		'letter': 'N',
		'data': []
	}, {
		'letter': 'O',
		'data': []
	}, {
		'letter': 'P',
		'data': []
	}, {
		'letter': 'Q',
		'data': []
	}, {
		'letter': 'R',
		'data': []
	}, {
		'letter': 'S',
		'data': []
	}, {
		'letter': 'T',
		'data': []
	}, {
		'letter': 'U',
		'data': []
	}, {
		'letter': 'V',
		'data': []
	}, {
		'letter': 'W',
		'data': []
	}, {
		'letter': 'X',
		'data': []
	}, {
		'letter': 'Y',
		'data': []
	}, {
		'letter': 'Z',
		'data': []
	}]
	
	
	setTimeout(() => {
	for (let i = 0; i < athletes.length; i++) {
		let n = pinyin(athletes[i], {
			pattern: 'initial'
		})
		// console.log(n)
			switch(n.charAt(0).toUpperCase())
			{
			    case 'A':
			        list[0].data.push(athletes[i])
			        break;
			    case 'B':
			        list[1].data.push(athletes[i])
			        break;
			    case 'C':
			        list[2].data.push(athletes[i])
			        break;
			    case 'D':
			        list[3].data.push(athletes[i])
			        break;
				case 'E':
				    list[4].data.push(athletes[i])
				    break;
				case 'F':
				    list[5].data.push(athletes[i])
				    break;
				case 'G':
				    list[6].data.push(athletes[i])
				    break;
				case 'H':
				    list[7].data.push(athletes[i])
				    break;
				case 'I':
				    list[8].data.push(athletes[i])
				    break;
				case 'J':
				    list[9].data.push(athletes[i])
				    break;
				case 'K':
				    list[10].data.push(athletes[i])
				    break;
				case 'L':
				    list[11].data.push(athletes[i])
				    break;
				case 'M':
				    list[12].data.push(athletes[i])
				    break;
				case 'N':
				    list[13].data.push(athletes[i])
				    break;
				case 'O':
				    list[14].data.push(athletes[i])
				    break;
				case 'P':
				    list[15].data.push(athletes[i])
				    break;
				case 'Q':
				    list[16].data.push(athletes[i])
				    break;
				case 'R':
				    list[17].data.push(athletes[i])
				    break;
				case 'S':
				    list[18].data.push(athletes[i])
				    break;
				case 'T':
				    list[19].data.push(athletes[i])
				    break;
				case 'U':
				    list[20].data.push(athletes[i])
				    break;
				case 'V':
				    list[21].data.push(athletes[i])
				    break;
				case 'W':
				    list[22].data.push(athletes[i])
				    break;
				case 'X':
				   list[23].data.push(athletes[i])
				    break;
				case 'Y':
				    list[24].data.push(athletes[i])
				    break;
				case 'Z':
				    list[25].data.push(athletes[i])
				    break;
			}
	}
	// console.log(list)
	
	// return list;
	// return 1;
	}, 1500)
	
	return list;
	
}






/* export default {
	'list': list,
	'rowArr':rowArr */
	/* 'list': [{
		'letter': 'A',
		'data': [
			'阿克苏机场',
			'阿拉山口机场',
			'阿勒泰机场',
			'阿里昆莎机场',
			'安庆天柱山机场',
			'澳门国际机场'
		]
	}, {
		'letter': 'B',
		'data': [
			'保山机场',
			'包头机场',
			'北海福成机场',
			'北京南苑机场',
			'北京首都国际机场'
		]
	}, {
		'letter': 'C',
		'data': [
			'长白山机场',
			'长春龙嘉国际机场',
			'常德桃花源机场',
			'昌都邦达机场',
			'长沙黄花国际机场',
			'长治王村机场',
			'常州奔牛机场',
			'成都双流国际机场',
			'赤峰机场'
		]
	}, {
		'letter': 'D',
		'data': [
			'大理机场',
			'大连周水子国际机场',
			'大庆萨尔图机场',
			'大同东王庄机场',
			'达州河市机场',
			'丹东浪头机场',
			'德宏芒市机场',
			'迪庆香格里拉机场',
			'东营机场',
			'敦煌机场'
		]
	}, {
		'letter': 'E',
		'data': [
			'鄂尔多斯机场',
			'恩施许家坪机场',
			'二连浩特赛乌苏国际机场'
		]
	}, {
		'letter': 'F',
		'data': [
			'阜阳西关机场',
			'福州长乐国际机场'
		]
	}, {
		'letter': 'G',
		'data': [
			'赣州黄金机场',
			'格尔木机场',
			'固原六盘山机场',
			'广元盘龙机场',
			'广州白云国际机场',
			'桂林两江国际机场',
			'贵阳龙洞堡国际机场'
		]
	}, {
		'letter': 'H',
		'data': [
			'哈尔滨太平国际机场',
			'哈密机场',
			'海口美兰国际机场',
			'海拉尔东山国际机场',
			'邯郸机场',
			'汉中机场',
			'杭州萧山国际机场',
			'合肥骆岗国际机场',
			'和田机场',
			'黑河机场',
			'呼和浩特白塔国际机场',
			'淮安涟水机场',
			'黄山屯溪国际机场'
		]
	}, {
		'letter': 'I',
		'data': []
	}, {
		'letter': 'J',
		'data': [
			'济南遥墙国际机场',
			'济宁曲阜机场',
			'鸡西兴凯湖机场',
			'佳木斯东郊机场',
			'嘉峪关机场',
			'锦州小岭子机场',
			'景德镇机场',
			'井冈山机场',
			'九江庐山机场',
			'九寨黄龙机场'
		]
	}, {
		'letter': 'K',
		'data': [
			'喀什机场',
			'克拉玛依机场',
			'库车龟兹机场',
			'库尔勒机场',
			'昆明巫家坝国际机场'
		]
	}, {
		'letter': 'L',
		'data': [
			'拉萨贡嘎机场',
			'兰州中川机场',
			'丽江三义机场',
			'黎平机场',
			'连云港白塔埠机场',
			'临沧机场',
			'临沂机场',
			'林芝米林机场',
			'柳州白莲机场',
			'龙岩冠豸山机场',
			'泸州蓝田机场',
			'洛阳北郊机场'
		]
	}, {
		'letter': 'M',
		'data': [
			'满洲里西郊机场',
			'绵阳南郊机场',
			'漠河古莲机场',
			'牡丹江海浪机场'
		]
	}, {
		'letter': 'N',
		'data': [
			'南昌昌北国际机场',
			'南充高坪机场',
			'南京禄口国际机场',
			'南宁吴圩机场',
			'南通兴东机场',
			'南阳姜营机场',
			'宁波栎社国际机场'
		]
	}, {
		'letter': 'O',
		'data': []
	}, {
		'letter': 'P',
		'data': [
			'普洱思茅机场'
		]
	}, {
		'letter': 'Q',
		'data': [
			'齐齐哈尔三家子机场',
			'秦皇岛山海关机场',
			'青岛流亭国际机场',
			'衢州机场',
			'泉州晋江机场'
		]
	}, {
		'letter': 'R',
		'data': [
			'日喀则和平机场'
		]
	}, {
		'letter': 'S',
		'data': [
			'三亚凤凰国际机场',
			'汕头外砂机场',
			'上海虹桥国际机场',
			'上海浦东国际机场',
			'深圳宝安国际机场',
			'沈阳桃仙国际机场',
			'石家庄正定国际机场',
			'苏南硕放国际机场'
		]
	}, {
		'letter': 'T',
		'data': [
			'塔城机场',
			'太原武宿国际机场',
			'台州路桥机场 (黄岩机场)',
			'唐山三女河机场',
			'腾冲驼峰机场',
			'天津滨海国际机场',
			'通辽机场',
			'铜仁凤凰机场'
		]
	}, {
		'letter': 'U',
		'data': []
	}, {
		'letter': 'V',
		'data': []
	}, {
		'letter': 'W',
		'data': [
			'万州五桥机场',
			'潍坊机场',
			'威海大水泊机场',
			'文山普者黑机场',
			'温州永强国际机场',
			'乌海机场',
			'武汉天河国际机场',
			'乌兰浩特机场',
			'乌鲁木齐地窝堡国际机场',
			'武夷山机场',
			'梧州长洲岛机场'
		]
	}, {
		'letter': 'X',
		'data': [
			'西安咸阳国际机场',
			'西昌青山机场',
			'锡林浩特机场',
			'西宁曹家堡机场',
			'西双版纳嘎洒机场',
			'厦门高崎国际机场',
			'香港国际机场',
			'襄阳刘集机场',
			'兴义机场',
			'徐州观音机场'
		]
	}, {
		'letter': 'Y',
		'data': [
			'延安二十里堡机场',
			'盐城机场',
			'延吉朝阳川机场',
			'烟台莱山国际机场',
			'宜宾菜坝机场',
			'宜昌三峡机场',
			'伊春林都机场',
			'伊宁机场',
			'义乌机场',
			'银川河东机场',
			'永州零陵机场',
			'榆林榆阳机场',
			'玉树巴塘机场',
			'运城张孝机场'
		]
	}, {
		'letter': 'Z',
		'data': [
			'湛江机场',
			'昭通机场',
			'郑州新郑国际机场',
			'芷江机场',
			'重庆江北国际机场',
			'中卫香山机场',
			'舟山朱家尖机场',
			'珠海三灶机场'
		]
	}] */
/* } */
