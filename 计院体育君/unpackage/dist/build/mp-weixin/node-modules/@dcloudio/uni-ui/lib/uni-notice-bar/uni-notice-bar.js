(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["node-modules/@dcloudio/uni-ui/lib/uni-notice-bar/uni-notice-bar"],{"492c":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var i={uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons")]).then(n.bind(null,"6f2e"))}},o=function(){var t=this.$createElement;this._self._c},a=[]},"4ab9":function(t,e,n){"use strict";var i=n("ab11"),o=n.n(i);o.a},ab11:function(t,e,n){},d47c:function(t,e,n){"use strict";n.r(e);var i=n("fd5b"),o=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},f524:function(t,e,n){"use strict";n.r(e);var i=n("492c"),o=n("d47c");for(var a in o)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("4ab9");var u=n("f0c5"),c=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,"2373abc7",null,!1,i["a"],void 0);e["default"]=c.exports},fd5b:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"UniNoticeBar",emits:["click","getmore","close"],props:{text:{type:String,default:""},moreText:{type:String,default:""},backgroundColor:{type:String,default:"#FFF9EA"},speed:{type:Number,default:100},color:{type:String,default:"#FF9A43"},fontSize:{type:Number,default:14},moreColor:{type:String,default:"#FF9A43"},single:{type:[Boolean,String],default:!1},scrollable:{type:[Boolean,String],default:!1},showIcon:{type:[Boolean,String],default:!1},showGetMore:{type:[Boolean,String],default:!1},showClose:{type:[Boolean,String],default:!1}},data:function(){var t="Uni_".concat(Math.ceil(1e6*Math.random()).toString(36)),e="Uni_".concat(Math.ceil(1e6*Math.random()).toString(36));return{textWidth:0,boxWidth:0,wrapWidth:"",webviewHide:!1,elId:t,elIdBox:e,show:!0,animationDuration:"none",animationPlayState:"paused",animationDelay:"0s"}},computed:{isShowGetMore:function(){return!0===this.showGetMore||"true"===this.showGetMore},isShowClose:function(){return(!0===this.showClose||"true"===this.showClose)&&(!1===this.showGetMore||"false"===this.showGetMore)}},mounted:function(){var t=this;this.$nextTick((function(){t.initSize()}))},methods:{initSize:function(){var e=this;if(this.scrollable){var n=[],i=new Promise((function(n,i){t.createSelectorQuery().in(e).select("#".concat(e.elId)).boundingClientRect().exec((function(t){e.textWidth=t[0].width,n()}))})),o=new Promise((function(n,i){t.createSelectorQuery().in(e).select("#".concat(e.elIdBox)).boundingClientRect().exec((function(t){e.boxWidth=t[0].width,n()}))}));n.push(i),n.push(o),Promise.all(n).then((function(){e.animationDuration="".concat(e.textWidth/e.speed,"s"),e.animationDelay="-".concat(e.boxWidth/e.speed,"s"),setTimeout((function(){e.animationPlayState="running"}),1e3)}))}},loopAnimation:function(){},clickMore:function(){this.$emit("getmore")},close:function(){this.show=!1,this.$emit("close")},onClick:function(){this.$emit("click")}}};e.default=n}).call(this,n("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'node-modules/@dcloudio/uni-ui/lib/uni-notice-bar/uni-notice-bar-create-component',
    {
        'node-modules/@dcloudio/uni-ui/lib/uni-notice-bar/uni-notice-bar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("f524"))
        })
    },
    [['node-modules/@dcloudio/uni-ui/lib/uni-notice-bar/uni-notice-bar-create-component']]
]);
