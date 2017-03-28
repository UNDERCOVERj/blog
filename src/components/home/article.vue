<template>
	<div class="articleHead fade-in">
		<div class="article">
			<h1 class="artTitle">{{article.articleTitle}}</h1>
			<p class="artInfo">
				发布于  {{article.createTime|clipTime}}&nbsp;/&nbsp;{{article.categoryName}}
			</p>
			<div class="artTags">
				<span class="artTag" v-for="tag in article.tags"># {{tag}}</span>
			</div>
			<div class="artContent" v-html="article.content"></div>
		</div>
		<div class="commentBox">
				<div class="comment boxSizing">
					<div class="comment-info">
						<input type="text" placeholder="昵称" v-model="visitorName"> 
						<input type="email" placeholder="邮箱" v-model="visitorEmail"> 
					</div>
					<textarea v-model="content" placeholder="留下评论吧"></textarea>
					<p><button @click="commitComment">提交</button></p>
				</div>
				<div class="single-comment boxSizing" v-for="comment in comments" v-if="comments.length>0">
					<div>
						<img src="../../../static/img/person.jpg" alt="img" width="40" height="40">
						<span>{{comment['visitorName']}}</span>
					</div>
					<p class="singleComment-info">{{comment['content']}}</p>
					<p class="singleComment-time">{{comment['createTime']|sliceTime}}</p>
				</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import {mapGetters} from 'vuex'
import '../../../static/css/animate.css'
	export default {
		data (){
			return {
				article:{},
				visitorName:'',
				visitorEmail:'',
				content:'',
				comments:[]
			}
		},
		computed:{
			...mapGetters({
				storeArticle:'getNowarticle'
			})
		},
		filters:{
			clipTime(str){
				var a=str.split(' ')[0]
				return a
			},
			sliceTime(str){
				var a=str.slice(0,-2);
				return a
			}
		},
		methods:{
			commitComment (){
				var self=this;
				var visitorName=this.visitorName.trim(),content=this.content.trim(),
					visitorEmail=this.visitorEmail.trim();
				var data={
					"visitorName":visitorName,
					"content":content,
					"visitorEmail":visitorEmail,
					"articleId":this.article.articleId
				}
				if(visitorName&&content&&visitorEmail){
					this.$http.post('/myBlog/article/comment/add',JSON.stringify(data)).then(function(res){
						self.comments.unshift(res.data.comment)
						self.content='';
						self.visitorEmail=''
						self.visitorName=''
					}, function(res){
						console.log('刷新失败')
					})
				}
			}
		},
		created (){
			var self=this;
			this.$store.dispatch('changeHomeFlag','article')
			if(!this.storeArticle){
				this.$http.get('/myBlog/home/'+this.$route.params.id+'/article').then(function(res){
					self.article=res.data['data'].article
					self.comments=res.data['data'].commentList
					console.log('成功')
				},function(res){
					console.log('失败')
				})
			}else{
				this.article=this.storeArticle.article;
				this.comments=this.storeArticle.commentList;
			}
		},
		destroyed(){
			this.$store.dispatch('changeNowarticle',null)
		}
	}
</script>
