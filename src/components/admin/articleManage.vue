<template>
	<div class="mg-art">
		<div class="hd-mg">
			<h2 class="hd-title">文章管理</h2>
		</div>
		<div class="md-mg">
			<ul class="md-th">
				<li :class="'mg-col-'+key" class="md-td" v-for="(info,key) in th">{{info}}</li>
			</ul>
			<ul class="md-tr" v-for="(article,index) in articles">
				<li class="md-td mg-col-0">{{article.articleTitle}}</li>
				<li class="md-td mg-col-1" >{{article.createTime}}
					<!-- new Date(article.createTime).getFullYear()+'/'+(1+new Date(article.createTime).getMonth())+'/'+new Date(article.createTime).getDate() -->
				</li>
				<li class="md-td mg-col-2">{{article.categoryName}}</li>
				<li class="md-td mg-col-3">{{article.state?'已发布':'未发布'}}</li>
				<li class="mg-col-4 md-td">
					<span class="md-edit md-btn" @click="changeModifyId(article.articleId)">编辑</span>
					<span class="md-delete md-btn" @click="deleteArticle(article.articleId)">删除</span>
					<span class="md-view md-btn">预览</span>
				</li>
			</ul>
		</div>
		<div class="ft-mg">
			<ul class="ft-pg_ul">
				<span class="ft-pg_li boxSizing" v-if="curPage!=1" @click="subCurPage">←</span>
				<li class="ft-pg_li boxSizing" v-for="n in filteredPage" @click="changeCurPage(n)" :class="{li_active:curPage==n}">{{n}}</li>
				<span class="ft-pg_li boxSizing" v-if="curPage!=pageSum" @click="addCurPage">→</span>
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
import {mapGetters} from 'vuex'
	export default{
		data(){
			return {
				th:{
					"0":'文章标题',
					"1":'发布时间',
					"2":'所属分类',
					"3":'发布状态',
					"4":'操作'
				},
				pageSum:2,
				curPage:1,
				articles:[
					{
						articleTitle:'012345678912345678945623',
						createTime:'Sat Mar 11 2017 19:45:38 GMT+0800 (中国标准时间)',
						categoryName:'默认分类',
						state:true,//若已发布就为true
						tags:['开心','难过'],
						content:'我是大帅比',
						articleId:1
					},
				],
			}
		},
		computed:{
			filteredPage:function(){
				if(this.pageSum<4){
					var arr=[];
					for(var i=0;i<this.pageSum;i++){
						arr.push(i+1)
					}
					return arr
				}
				if(this.curPage>2&&this.curPage<this.pageSum-1){
					return ['...',this.curPage-1,this.curPage,this.curPage+1,'...']
				}else if(this.curPage==1){
					return [this.curPage,this.curPage+1,this.curPage+2,'...']
					
				}else if(this.curPage==2){
					return [this.curPage-1,this.curPage,this.curPage+1,'...']
				}
				else if(this.curPage==this.pageSum-1){
					return ['...',this.curPage-1,this.curPage,this.curPage+1]
				}else if(this.curPage==this.pageSum){
					return ['...',this.curPage-2,this.curPage-1,this.curPage]
				}
			}
		},
		methods:{
			changeModifyId:function(id){
				//设置需要修改文章的id
				this.$store.dispatch('changeModifyFlag',true)
				this.$store.dispatch('changeModifyId',id)
				this.$router.push('/admin/manage/publish')
			},
			deleteArticle (id){
				var data={
					"id":id,
					"curPage":this.curPage,
					"method":'delete'
				};
				var stringifyData=JSON.stringify(data);
				var url='/myBlog/admin/article/'+id+'/delete';
				var self=this
				this.$http.post(url,stringifyData).then(function(res){
					self.articles=res.data["data"];
					self.pageSum=parseInt(JSON.parse(res.data.inf).totalArticle)
					console.log('返回文章成功'+res.data)
				},function(res){
					console.log('返回文章错误'+res.status)
				})
			},
			changeCurPage(n){
				if(typeof n == 'number'){
					this.curPage=n;
					console.log(n)
				}
				//每次点击page改变curpage
			},
			addCurPage (){
				if(this.curPage<this.pageSum){
					this.curPage++//将curPage自加
					console.log(this.curPage)
				}
			},
			subCurPage (){
				if(this.curPage>1){
					this.curPage--
				}
			},
			pageAPI(){
				var self=this,query=this.$route.query;
				this.$http.get('/myBlog/admin/article/manage?page='+query.page).then(function(res){
					self.articles=res.data["data"];
					self.pageSum=parseInt(JSON.parse(res.data.inf).totalArticle)
					console.log('返回文章成功'+res.data)
				},function(res){
					console.log('返回文章错误'+res.status)
				})
			}
		},
		watch:{
			curPage(to,from){
				this.$router.push('/admin/manage/articleManage?page='+to)
			},
			$route(to,from){
				this.curPage=parseInt(to.query.page)
				this.pageAPI()
			}
		},
		created(){
			var query=this.$route.query
			this.$store.dispatch('changeManageFlag','articleManage')
			if(!query.hasOwnProperty('page')){
				this.$router.replace('/admin/manage/articleManage?page=1')
			}else{
				this.pageAPI();
			}
		}
	}
</script>
