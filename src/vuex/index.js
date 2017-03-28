/*
* @Author: Administrator
* @Date:   2017-03-10 09:31:37
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-16 21:28:36
*/

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state={
	loginway:'login',
	manageFlag:'home',
	leftManageInfo:{
		'home':'主页',
		'publish':'发布文章',
		'articleManage':'文章管理',
		'classes':'分类/标签',
		'links':'友链管理',
		'settings':'系统设置'
	},
	modifyFlag:false,//为true就是修改
	modifyId:'2',
	loginFlag:false,
	homeFlag:'',
	scrollData:0,
	newestArticles:null,
	nowarticle:null
}
const mutations={
	CHANGE_LOGINWAY(state,type){
		state.loginway=type;//改变登录还是注册
	},
	CHANGE_MANAGEFLAG(state,type){
		state.manageFlag=type;//改变后台的leftbar的flag，
	},
	CHANGE_MODIFYFLAG(state,flag){
		state.modifyFlag=flag;
	},
	CHANGE_MODIFYID(state,id){
		state.modifyId=id;
	},
	CHANGE_LOGINFLAG(state,flag){
		state.loginFlag=flag
	},
	CHANGE_HOMEFLAG(state,flag){
		state.homeFlag=flag
	},
	CHANGE_SCROLLDATA(state,data){
		state.scrollData=data
	},
	CHANGE_NEWESTARTICLES(state,data){
		state.newestArticles=data
	},
	CHANGE_NOWARTICLE(state,data){
		state.nowarticle=data
	}
}
const actions={
	//改变登录方式
	changeLoginway({commit},type){
		commit('CHANGE_LOGINWAY',type);//改变登录还是注册
	},
	changeManageFlag({commit},type){
		commit('CHANGE_MANAGEFLAG',type)//改变后台的leftbar的flag，
	},
	changeModifyFlag({commit},flag){
		commit('CHANGE_MODIFYFLAG',flag)//改变是modify还是publish的flag
	},
	changeModifyId({commit},id){
		commit('CHANGE_MODIFYID',id)//改变modifyid
	},
	changeLoginFlag({commit},flag){
		commit('CHANGE_LOGINFLAG',flag)
	},
	changeHomeFlag({commit},flag){
		commit('CHANGE_HOMEFLAG',flag)
	},
	changeScrollData({commit},data){
		commit('CHANGE_SCROLLDATA',data)
	},
	changeNewestArticles({commit},data){
		commit('CHANGE_NEWESTARTICLES',data)
	},
	changeNowarticle({commit},data){
		commit('CHANGE_NOWARTICLE',data)
	}
}
const getters={
	getLoginway:function(state){
		return state.loginway;//得到登录还是注册
	},
	getManageFlag:function(state){
		return state.manageFlag;//得到后台的leftbar的flag，
	},
	getLeftManageInfo:function(state){
		return state.leftManageInfo;//得到manage.vue的leftbar的信息
	},
	getModifyFlag:function(state){
		return state.modifyFlag;
	},
	getModifyId:function(state){
		return state.modifyId
	},
	getLoginFlag:function(state){
		return state.loginFlag
	},
	//首页的barFlag
	getHomeFlag:function(state){
		return state.homeFlag
	},
	getScrollData:function(state){
		return state.scrollData
	},
	getNewestArticles:function(state){
		return state.newestArticles//返回最新的五篇文章
	},
	getNowarticle:function(state){
		return state.nowarticle
	}

}
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})