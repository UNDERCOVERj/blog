<template>
	<div class="cla">
		<div class="hd-cla">
			<h2 class="hd-title">标签/分类管理</h2>
		</div>
		<div class="md-cla clearfix">
			<div class="md-cla_lt">
				<p class="md-lt_title boxSizing">
					分类列表
				</p>
				<p class="md-lt_classes boxSizing">
					<span class="md-lt_class" v-for="item in categories">{{item['categoryName']+' ('+item['totalCategory']+')'}}</span>
				</p>
			</div>
			<div class="md-cla_rt">
				<p class="md-rt_title boxSizing">
					标签列表
				</p>
				<p class="md-rt_tags boxSizing">
					<span class="md-rt_tag" v-for="tag in tags">{{tag['tagName']+'('+tag['totalTag']+')'}}</span>
				</p>
			</div>
		</div>
		<div class="ft-cla">
			<div class="ft-cla_search">
				<input type="text" placeholder="请输入分类名称" class='ft-cla_search_input' v-model="categoryItem">
				<span class="ft-cla_search_btn" @click="sendCategory">保存分类</span>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import {mapGetters} from 'vuex'
	export default{
		data(){
			return {
				tags:[
					{
						'tagName':'展望',
						"totalTag":10
					},
					{
						'tagName':'失望',
						"totalTag":4
					},
					{
						'tagName':'爱好',
						"totalTag":15
					}
				],
				categories:[
					{
						'categoryName':'js',
						'totalCategory':20
					},
					{
						'categoryName':'css',
						'totalCategory':15
					},
					{
						'categoryName':'html',
						'totalCategory':25
					},
					
				],
				categoryItem:''
			}

		},
		methods:{
			sendCategory(){
				var self=this;
				if(this.categoryItem){
					var data={
						categoryName:this.categoryItem
					}
					this.$http.post('/myBlog/admin/category/add.do',JSON.stringify(data)).then(function(res){
						console.log('发送分类成功:'+res.status)
						var a={
							'categoryName':self.categoryItem,
							'totalCategory':0
						}
						self.categories.push(a)
						self.categoryItem='';
					})
				}
			}
		},
		created(){
			var self=this;
			this.$store.dispatch('changeManageFlag','classes')
			this.$http.get('/myBlog/admin/catAndTag').then(function(res){
				console.log('返回分类标签成功')
				self.tags=res.data.tags;
				self.categories=res.data.categories
			},function(res){
				console.log('失败')
			})
		}
	}
</script>
