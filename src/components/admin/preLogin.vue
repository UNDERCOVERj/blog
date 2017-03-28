<template>
	<div class="preLogin">未登录,{{time}}秒后自动跳转到登录页...</div>
</template>
<script type="text/javascript">
	export default {
		data (){
			return {
				time:3,
				timer:null
			}
		},
		created (){
			var self=this;
			(function f(){
				self.timer=setTimeout(function(){
					--self.time
					if(self.time==-1){
						clearTimeout(self.timer)
						self.$router.replace('/admin/login')
					}
					f();
				},1000)
			})()
		},
		destroyed (){
			clearTimeout(this.timer)
		}
	}
</script>
