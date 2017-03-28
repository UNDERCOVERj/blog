<template>
	<div class="home">
		<header class="clearfix" :class="{'slideUp':scrollData>50,'slideDown':scrollData<50}">
			<router-link to="/home/list?page=1" class="hd-home_left" tag="div">
				<img src="../../../static/img/person.jpg" alt="person">
				<h1>三角度</h1>
			</router-link>
			<ul class="hd-home_right">
				<li>
					<router-link to="/home/list?page=1" class="hd-home_right-item" :class="{home_active:homeFlag=='list'}">首页</router-link>
				</li>	
				<li>
					<router-link to="/home/archives?page=1" class="hd-home_right-item" :class="{home_active:homeFlag=='archives'}">归档</router-link>
				</li>
				<li>
					<router-link to="/home/about" class="hd-home_right-item" :class="{home_active:homeFlag=='about'}">关于</router-link>
				</li>	
			</ul>
		</header>
		<section>
			<router-view></router-view>
		</section>
		<footer>
			<ul class="ft-home_ul">
				<li class="ft-home_li boxSizing" v-for="link in url"><a :href="link.urlAddress">{{link.urlName}}</a></li>
			</ul>
			<div class="ft-info">
				<p>时间丢下我轰轰烈烈向前跑</p>
				<p>© 2017 </p>
				<p>by UNDERCOVERj</p>
			</div>
		</footer>
	</div>
</template>
<script type="text/javascript">
	import {mapGetters} from 'vuex'
	import '../../../static/css/animate.css'
	export default {
		data (){
			return {
				timer:null,
				pageSum:10,
				curPage:1,
				url:[
					{urlName:'github',urlAddress:'https://github.com/UNDERCOVERj'},
					{urlName:'csdn',urlAddress:'http://blog.csdn.net/github_37037281'},
					{urlName:'微博',urlAddress:'http://weibo.com/2371190212/profile?rightmod=1&wvr=6&mod=personinfo'},
				]
			}
		},
		computed:{
			...mapGetters({
				homeFlag:'getHomeFlag',
				scrollData:'getScrollData',
				newestArticles:'getNewestArticles'
			})
		},
		created (){
			var self=this
			window.onscroll=function (){
				if(self.timer){
					clearTimeout(self.timer)
				}
				self.timer=setTimeout(function(){
					var scrollTop=document.body.scrollTop+document.documentElement.scrollTop
					self.$store.dispatch('changeScrollData',scrollTop)
				},50)
			}
			this.$http.get('/myBlog/url/list').then(function(res){
				console.log('获取url正确')
			},function(res){
				console.log('获取url错误')
			})
		}
	}
</script>
