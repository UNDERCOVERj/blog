<template>
	<div class="settings">
		<div class="hd-settings">
			<h2 class="hd-title">发布文章</h2>
		</div>
		<ul class="settings-ul clearfix">
			<li class="settings-li">
				<div class="settings-title settings-title_info boxSizing">个人信息</div>
				<div class="settings-input">
					<span class="settings-span">账号：</span>
					<input type="text" class="settings-input_text">
				</div>
				<div class="settings-input">
					<span class="settings-span">姓名：</span>
					<input type="text" class="settings-input_text">
				</div>
				<div class="settings-input">
					<span class="settings-span">邮箱：</span>
					<input type="text" class="settings-input_text">
				</div>
				<div class="settings-input clearfix">
					<span class="settings_save">保存信息</span>
				</div>
			</li>
			<li class="settings-li">
				<div class="settings-title settings-title_info boxSizing">个人信息</div>
				<div class="settings-input">
					<span class="settings-span">账号：</span>
					<input type="text" class="settings-input_text">
				</div>
				<div class="settings-input">
					<span class="settings-span">姓名：</span>
					<input type="text" class="settings-input_text">
				</div>
				<div class="settings-input">
					<span class="settings-span">邮箱：</span>
					<input type="text" class="settings-input_text">
				</div>
				<div class="settings-input clearfix">
					<span class="settings_save">保存信息</span>
				</div>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	export default {
		created(){
			this.$store.dispatch('changeManageFlag','settings')
		}
	}
</script>
