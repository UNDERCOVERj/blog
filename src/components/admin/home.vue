<template>
	<div class="adHome">
		<div class="hd-adHome">
			<h2 class="hd-title">主页</h2>
		</div>
		<div class="md-data">
			<ul class="md-data_ul">
				<li class="md-data_li md-data_art boxSizing">
					<p class="md-data_p">
						发表了<br><span class="md-data_span">{{totalArticle}}</span><br>篇文章
					</p>
				</li>
				<li class="md-data_li md-data_message boxSizing">
					<p class="md-data_p">
						收到了<br><span class="md-data_span">{{totalComment}}</span><br>条留言
					</p>
				</li>
			</ul>
			<ul class="md-data_ul clearfix">
				<li class="md-data_newArt">
					<div class="md-newArt_title">最新文章</div>
					<div class="md-newArt_content">
						<ul class="md-newArt_ul">
							<li class="md-newArt_li" v-for="article in articles">{{article.articleTitle}}</li>
						</ul>
					</div>
				</li>
				<li class="md-data_newArt">
					<div class="md-newArt_title">最新文章</div>
					<div class="md-newArt_content">
						<ul class="md-newArt_ul">
							<li class="md-newArt_li" v-for="article in articles">{{article.articleTitle}}</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>

	</div>
</template>
<script type="text/javascript">
	export default {
		data(){
			return {
				totalArticle:14,
				totalComment:10,
				articles:[
					{
						articleTitle:'0',
						createTime:'Sat Mar 11 2017 19:45:38 GMT+0800 (中国标准时间)',
						categoryName:'默认分类',
						state:true,//若已发布就为true
						tags:['开心','难过'],
						content:'我是大帅比',
						id:1
					},
					{
						articleTitle:'1',
						createTime:'Sat Mar 11 2017 14:45:38 GMT+0800 (中国标准时间)',
						categoryName:'css',
						state:false,//若已发布就为true
						tags:['开心','难过'],
						content:'我是大帅比',
						id:1
					},
					{
						articleTitle:'2',
						createTime:'Sat Mar 11 2017 20:46:38 GMT+0800 (中国标准时间)',
						categoryName:'javascript',
						state:true,//若已发布就为true
						tags:['开心','难过'],
						content:'我是大帅比',
						id:1
					},
					{
						articleTitle:'3',
						createTime:'Sat Mar 11 2017 10:45:38 GMT+0800 (中国标准时间)',
						categoryName:'javascript',
						state:true,//若已发布就为true,
						tags:['展望','失落'],
						content:'我是大帅比',
						id:1

					},
					{
						articleTitle:'3',
						createTime:'Sat Mar 11 2017 10:45:38 GMT+0800 (中国标准时间)',
						categoryName:'javascript',
						state:true,//若已发布就为true,
						tags:['展望','失落'],
						content:'我是大帅比',
						id:1

					}
				]
			}
		},
		created (){
			var self=this;
			this.$store.dispatch('changeManageFlag','home')
			this.$http.get('/myBlog/admin/index/list').then(function(res){
				self.articles=res.data.articles;
				self.totalArticle=res.data.totalArticle;
				self.totalComment=res.data.totalComment;
				console.log('主页返回成功')
			},function(res){
				console.log('主页返回失败')
			})
		}
	}
</script>
