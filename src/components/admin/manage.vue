<!--进入后直接跳到admin/manage/main-->
<template>
	<div class="manage clearfix">
		<!--后台header头部-->
		<div class="lt-manage">
			<div class="lt-manage_title clearfix">
				<div class="lt-person_img">	
					<img src="../../../static/img/person.jpg" alt="person">
				</div>
				<div class="lt-person_des">三角度</div>
			</div>
			<ul class="lt-manage_ul">
				<li class="lt-manage_li" v-for="(info,key) in leftManageInfo">
					<router-link :to="computedURL(key)" tag="span" class="lt-manage_span" :class="{lt_span_active:manageFlag==key}">{{info}}</router-link>
				</li>
			</ul>
		</div>
		<div class="rt-manage">
			<div class="rt-manage_title"></div>
			<router-view></router-view>
		</div>
	</div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
	export default {
		computed:{
			...mapGetters({
				manageFlag:'getManageFlag',
				leftManageInfo:'getLeftManageInfo',
				loginFlag:'getLoginFlag'
			})
		},
		methods:{
			computedURL(key){
				if(key=='articleManage'){
					return '/admin/manage/articleManage?page=1'
				}else{
					return '/admin/manage/'+key
				}
			}
		},
		created(){
			if(!this.loginFlag&&!sessionStorage.getItem('loginFlag')){
				this.$router.replace('/admin/preLogin')
			}
		}
	}
</script>
