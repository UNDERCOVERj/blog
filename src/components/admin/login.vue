<template>
	<div class="login">
		<div class="content-login boxSizing">
			<div class="top-login">
				<span @click="changeLoginway('login')" :class="{login_active:loginway==='login'}" class="boxSizing">登录</span>
				<b>·</b>
				<span @click="changeLoginway('register')" :class="{login_active:loginway==='register'}" class="boxSizing">注册</span>
			</div>
			<div v-if="loginway==='login'">
			 	<div class="div-input">
				 	<input type="text" placeholder="手机号或邮件箱" class="top-input normal-input boxSizing" name="adminName" v-model="adminName">
				</div>
			 	<div class="div-input">
			 		<input type="password" placeholder="密码" class="bottom-input normal-input boxSizing" name="adminPassword" v-model="adminPassword">
			 	</div>
			 	<div class="forget">
			 		<span @click="changeLoginway('register')">忘记密码？</span>
			 	</div>
			 	<p @click="postLoginMessage">
			 		<button class="button-login">登录</button>
			 	</p>
			</div>
			<div v-if="loginway==='register'">
			 	<div class="div-input">
				 	<input type="text" placeholder="你的昵称" class="top-input normal-input boxSizing">
				</div>
			 	<div class="div-input">
			 		<input type="password" placeholder="手机号" class="middle-input normal-input boxSizing">
			 	</div>
			 	<div class="div-input">
			 		<input type="password" placeholder="输入密码" class="bottom-input normal-input boxSizing">
			 	</div>
			 	<button class="button-login">注册</button>
			</div>
		</div>
	</div>	
</template>
<script type="text/javascript">
	import　　{mapGetters} from 'vuex'
	export default {
		data(){
			return {
				adminPassword:'',
				adminName:''
				//发送登录名和密码
			}
		},
		computed:{
			...mapGetters({
				loginway:'getLoginway'
				//登录还是注册
			})
		},
		methods:{
			changeLoginway(type){
				this.$store.dispatch('changeLoginway',type)
				//改变登录还是注册的loginway
			},
			postLoginMessage(){
				var self=this;
				var data={
					"adminName":this.adminName,
					"adminPassword":this.adminPassword
				}
				var stringifyData=JSON.stringify(data)
				this.$http.post('/myBlog/admin/login.do',stringifyData).then(function(res){
					//这里返回后台页面也就是文章数据
					sessionStorage.setItem('loginFlag',true)
					self.$store.dispatch('changeLoginFlag',true)
					this.$router.replace('/admin/manage/home')
					console.log(res.body)
					console.log(res.data)
					console.log(res.status)
					
				},function(res){
					console.log('error'+res.status)
				})


			}
		}/*,
		created(){
			this.$store.dispatch('changeLoginFlag',true)
			this.$router.replace('/admin/manage/home')
		}*/

	}
</script>
