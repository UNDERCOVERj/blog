<template>
	<div class="about fade-in">
		<p class="aboutPortrait">头像：<img src="../../../static/img/portrait.jpg"></p>
		<p class="aboutMyname">名字：UNDERCOVERj</p>
		<p class="aboutSex">性别：男</p>
		<p class="aboutBlog">微博：<a href="http://weibo.com/2371190212/profile?topnav=1&wvr=6">Ssssalute_</a></p>
		<p class="aboutGit">github: <a href="https://github.com/UNDERCOVERj">https://github.com/UNDERCOVERj</a></p>
		<p class="aboutDesc">个人简介：我最大的弱点就是太帅</p>

	</div>

</template>
<script type="text/javascript">
	export default {
		created(){
			this.$store.dispatch('changeHomeFlag','about')
		}
	}
</script>
